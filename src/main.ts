import { Plugin } from "obsidian";
import { EpubImportModal } from "./modal";
import { parseEpubToMarkdown } from "./parser";
import { Epub2NotesSettings, DEFAULT_SETTINGS } from "./settings";
import { Epub2NotesSettingTab } from "./settingTab";

export default class MyPlugin extends Plugin {
	settings: Epub2NotesSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new Epub2NotesSettingTab(this.app, this));

		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new EpubImportModal(
					this.app,
					this.settings.epubLibraryPaths,
					(filePath: string) => {
						parseEpubToMarkdown(this.app, filePath);
					},
				).open();
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData(),
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
