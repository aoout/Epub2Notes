import { App, Notice } from "obsidian";
import { parseEpub } from "@denstepa/epub-parser";
import * as fs from "fs/promises";
import * as path from "path";
import AdmZip from "adm-zip";

export async function parseEpubToMarkdown(app: App, filePath: string) {
	try {
		const buffer = await fs.readFile(filePath);
		const epubData = await parseEpub(buffer);

		//  @ts-ignore
		const attachmentFolder = app.vault.getConfig("attachmentFolderPath");
		await app.vault.createFolder(attachmentFolder).catch(() => {});

		const zip = new AdmZip(buffer);
		const zipEntries = zip.getEntries();
		const imageFiles: { [key: string]: Buffer } = {};

		zipEntries.forEach((entry) => {
			if (entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i)) {
				imageFiles[entry.entryName] = entry.getData();
			}
		});

		const imageMap: { [key: string]: string } = {};
		for (const [relativePath, data] of Object.entries(imageFiles)) {
			const fileName = path.basename(relativePath);
			const newPath = path
				.join(attachmentFolder, fileName)
				.replace(/\\/g, "/"); // 替换 \ 为 /
			await app.vault.createBinary(newPath, data);
			imageMap[fileName] = newPath;
		}

		const title = epubData.info?.title || "Untitled";
		let markdown = `# ${title}\n\n`;

		if (epubData.sections && epubData.sections.length > 0) {
			for (const section of epubData.sections) {
				let sectionMarkdown = section.toMarkdown();
				sectionMarkdown = sectionMarkdown.replace(
					/!\[.*?\]\((.*?)\)/g,
					(match, imgPath) => {
						const fileName = path.basename(imgPath);
						const newPath =
							imageMap[fileName] || imgPath.replace(/\\/g, "/"); // 确保任何未替换的路径也规范化
						return `![${fileName}](${newPath})`;
					},
				);
				markdown += `${sectionMarkdown}\n\n`;
			}
		} else {
			markdown += "No content available.\n";
		}

		const fileName = `${path.basename(filePath, ".epub")}.md`;
		await app.vault.create(fileName, markdown);
		new Notice(`Imported ${fileName} successfully with images!`);
	} catch (e) {
		new Notice(`Failed to import EPUB: ${e.message}`);
	}
}
