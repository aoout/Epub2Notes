import { App, SuggestModal, Notice } from "obsidian";
import * as fs from "fs/promises";
import * as path from "path";

export class EpubImportModal extends SuggestModal<string> {
	libraryPaths: string[];
	onChoose: (filePath: string) => void;
	epubFiles: string[] = [];

	constructor(
		app: App,
		libraryPaths: string[],
		onChoose: (filePath: string) => void,
	) {
		super(app);
		this.libraryPaths = libraryPaths;
		this.onChoose = onChoose;
	}

	async onOpen() {
		await this.loadEpubFiles();
		if (this.epubFiles.length === 0) {
			new Notice("No EPUB files found in library paths.");
			this.close();
			return;
		}
		super.onOpen();
	}

	async loadEpubFiles() {
		for (const dir of this.libraryPaths) {
			const files = await fs.readdir(dir);
			this.epubFiles.push(
				...files
					.filter((file) => file.toLowerCase().endsWith(".epub"))
					.map((file) => path.join(dir, file)),
			);
		}
	}

	getSuggestions(query: string): string[] {
		return this.epubFiles.filter((file) =>
			file.toLowerCase().includes(query.toLowerCase()),
		);
	}

	renderSuggestion(file: string, el: HTMLElement) {
		el.createEl("div", { text: path.basename(file) });
	}

	onChooseSuggestion(file: string) {
		this.onChoose(file);
	}
}
