import { App, Plugin } from "obsidian";
import { CustomTabHeaderSettings, DEFAULT_SETTINGS } from "src/settings/index";
import { TabManager } from "src/tab/manager";
import { CustomTabHeaderPluginSettingsTab } from "src/settings/tab";

export default class CustomTabHeaderPlugin extends Plugin {
    settings: CustomTabHeaderSettings;
    tabManager: TabManager;
    pluginManifestId: string;

    async onload() {
        this.pluginManifestId = this.manifest.id;

        await this.loadSettings();
        this.addSettingTab(new CustomTabHeaderPluginSettingsTab(this.app, this));

        this.tabManager = new TabManager(this);
        this.tabManager.initialize();
    }

    onunload() {
        this.tabManager.cleanup();
    }

    async loadSettings() {
        const data = await this.loadData();

        this.settings = Object.assign({}, DEFAULT_SETTINGS, data);

        // fallback for strings:
        this.settings.mainTitleKey = this.settings.mainTitleKey?.trim() || DEFAULT_SETTINGS.mainTitleKey;
        this.settings.secondaryTitleKey = this.settings.secondaryTitleKey?.trim() || DEFAULT_SETTINGS.secondaryTitleKey;
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    openSettings() {
        const setting = (this.app as any).setting;
        setting.open();
        setting.openTabById(this.pluginManifestId);
    }
}
