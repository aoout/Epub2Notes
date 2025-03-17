# Epub2Notes

Convert EPUB files to Markdown for seamless import into Obsidian.

## Features
- Add multiple local folder paths as EPUB libraries in settings.
- Use the `Import EPUB` command to select and import EPUB files via a native modal.
- Converts EPUB content to Markdown using [epub-parser](https://github.com/denstepa/epub-parser).

## Installation

### Install via Community Plugin Store (Coming soon)
This plugin is available via the Obsidian Community Plugin Store. Search for "Epub2Notes" in Settings > Community Plugins and install it directly.

### Install via BRAT (Beta Testing)
To test Beta builds of this plugin, follow these steps:
1. Install the **BRAT** plugin via Community Plugin Store.
2. Open BRAT settings and add the repository: `https://github.com/aoout/epub2notes`.
3. Enable the beta version and test away! (Read BRAT’s [docs](https://github.com/TfTHacker/obsidian42-brat) for more details.)

### Manually Installing the Plugin
1. Download the latest release from [GitHub Releases](https://github.com/aoout/epub2notes/releases).
2. Copy `main.js` and `manifest.json` to your vault’s plugin folder: `VaultFolder/.obsidian/plugins/epub2notes/`.
3. Enable the plugin in Settings > Community Plugins.

## Usage
1. **Set up EPUB Libraries**:
   - Go to `Settings > Epub2Notes`.
   - Add one or more folder paths containing your EPUB files (e.g., `C:/Books/` or `/home/user/library/`).
2. **Import an EPUB**:
   - Open the Command Palette (`Ctrl/Cmd + P`).
   - Run the `Import EPUB` command.
   - A modal will display all `.epub` files from your libraries. Select one to import.
3. **Result**:
   - The EPUB is parsed and converted to Markdown, saved as a new note in your vault.

## Development
- Built with Obsidian API and [epub-parser](https://github.com/denstepa/epub-parser).
- Want to contribute? Fork the repo, tweak the code, and submit a PR!

## License
0BSD