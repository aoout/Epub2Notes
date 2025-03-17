import { App, Notice, PluginSettingTab, Setting } from 'obsidian';
import Epub2NotesPlugin from './main';

export class Epub2NotesSettingTab extends PluginSettingTab {
	plugin: Epub2NotesPlugin;

	constructor(app: App, plugin: Epub2NotesPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h3', {text: 'Epub书库设置'});

		new Setting(containerEl)
			.setName('添加Epub书库路径')
			.setDesc('添加一个新的epub书库文件夹路径')
			.addText(text => {
				text.setPlaceholder('输入epub书库文件夹路径');
				text.inputEl.onkeydown = async (e: KeyboardEvent) => {
					if (e.key === 'Enter' && text.getValue()) {
						this.plugin.settings.epubLibraryPaths.push(text.getValue());
						await this.plugin.saveSettings();
						this.display();
						new Notice('书库路径添加成功');
						text.setValue('');
					}
				};
			});

		containerEl.createEl('h4', {text: '当前书库路径列表'});

		this.plugin.settings.epubLibraryPaths.forEach((path, index) => {
			new Setting(containerEl)
				.setName(`书库路径 ${index + 1}`)
				.addText(text => text
					.setValue(path)
					.setDisabled(true))
				.addButton(button => button
					.setButtonText('删除')
					.onClick(async () => {
						this.plugin.settings.epubLibraryPaths.splice(index, 1);
						await this.plugin.saveSettings();
						this.display();
					}));
		});
	}
}