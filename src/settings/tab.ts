import { App, PluginSettingTab, Setting } from "obsidian";
import CustomTabHeaderPlugin from "../main";
import { createSettingsGroup, setSettingDisabled, debounce } from "./utils";

export class CustomTabHeaderPluginSettingsTab extends PluginSettingTab {
    plugin: CustomTabHeaderPlugin;

    constructor(app: App, plugin: CustomTabHeaderPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.addClass('custom-tab-header-settings');

        this.createGeneralSettings(containerEl);
        this.createMainTitleSettings(containerEl);
        this.createSecondaryTitleSettings(containerEl);
        this.createTooltipSettings(containerEl);
    }

    private updateTabHeadersDebounced = debounce(() => {
        this.plugin.tabManager.updateAllTabHeaders();
    }, 300);

    // === General Settings ===
    private createGeneralSettings(containerEl: HTMLElement) {
        const generalGroup = createSettingsGroup(containerEl, 'General');

        // General toggle
        new Setting(generalGroup)
            .setName('Enable custom tab headers')
            .setDesc('Enable or disable custom tab headers.')
            .addToggle(toggle =>
                toggle
                    .setValue(this.plugin.settings.enableCustomTabHeader)
                    .onChange(async value => {
                        this.plugin.settings.enableCustomTabHeader = value;
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        
        // Global title class
        const globalTitleClassSetting = new Setting(generalGroup)
            .setName('Global title class')
            .setDesc('Set a global class name for all custom titles.')
            .addText(text =>
                text
                    .setPlaceholder('default')
                    .setValue(this.plugin.settings.globalTitleClass)
                    .onChange(async value => {
                        this.plugin.settings.globalTitleClass = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(globalTitleClassSetting, !this.plugin.settings.enableCustomTabHeader);
    }

    // === Main Title Settings ===
    private createMainTitleSettings(containerEl: HTMLElement) {
        const mainGroup = createSettingsGroup(containerEl, 'Main Title');

        // Main title toggle
        const enableMainSetting = new Setting(mainGroup)
            .setName('Enable main title')
            .setDesc('Enable or disable the main tab title.')
            .addToggle(toggle =>
                toggle
                    .setValue(this.plugin.settings.enableMainTitle)
                    .onChange(async value => {
                        this.plugin.settings.enableMainTitle = value;
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(enableMainSetting, !this.plugin.settings.enableCustomTabHeader);

        // Main title mode dropdown
        const mainModeSetting = new Setting(mainGroup)
            .setName('Main title mode')
            .setDesc('Choose what the main title shows.')
            .addDropdown(dropdown =>
                dropdown
                    .addOption('basename', 'File basename')
                    .addOption('frontmatter', 'Frontmatter key')
                    .setValue(this.plugin.settings.mainTitleMode)
                    .onChange(async value => {
                        this.plugin.settings.mainTitleMode = value as 'basename' | 'frontmatter';
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(mainModeSetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableMainTitle));

        // Main title key (only used if frontmatter is selected)
        const mainKeySetting = new Setting(mainGroup)
            .setName('Main title frontmatter key')
            .setDesc('Frontmatter key to use as main title.')
            .addText(text =>
                text
                    .setPlaceholder('tab_main_title')
                    .setValue(this.plugin.settings.mainTitleKey)
                    .onChange(async value => {
                        this.plugin.settings.mainTitleKey = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(mainKeySetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableMainTitle && this.plugin.settings.mainTitleMode === 'frontmatter'));
            
        // Main title class mode dropdown
        const mainClassModeSetting = new Setting(mainGroup)
            .setName('Main title class mode')
            .setDesc('Choose what the main title class uses.')
            .addDropdown(dropdown =>
                dropdown
                    .addOption('global', 'Global class')
                    .addOption('frontmatter', 'Frontmatter key')
                    .setValue(this.plugin.settings.mainTitleClassMode)
                    .onChange(async value => {
                        this.plugin.settings.mainTitleClassMode = value as 'global' | 'frontmatter';
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(mainClassModeSetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableMainTitle));

        // Main title class key (only used if frontmatter is selected)
        const mainClassKeySetting = new Setting(mainGroup)
            .setName('Main class frontmatter key')
            .setDesc('Frontmatter key to use as main title class.')
            .addText(text =>
                text
                    .setPlaceholder('tab_main_title_class')
                    .setValue(this.plugin.settings.mainTitleClassKey)
                    .onChange(async value => {
                        this.plugin.settings.mainTitleClassKey = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(mainClassKeySetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableMainTitle && this.plugin.settings.mainTitleClassMode === 'frontmatter'));
    }

    // === Secondary Title Settings ===
    private createSecondaryTitleSettings(containerEl: HTMLElement) {
        const secondaryGroup = createSettingsGroup(containerEl, 'Secondary Title');
    
        // Secondary title toggle
        const enableSecondarySetting = new Setting(secondaryGroup)
            .setName('Enable secondary title')
            .setDesc('Enable or disable the secondary tab title (e.g. folder name).')
            .addToggle(toggle =>
                toggle
                    .setValue(this.plugin.settings.enableSecondaryTitle)
                    .onChange(async value => {
                        this.plugin.settings.enableSecondaryTitle = value;
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(enableSecondarySetting, !this.plugin.settings.enableCustomTabHeader);
    
        // Secondary title mode dropdown
        const secondaryModeSetting = new Setting(secondaryGroup)
            .setName('Secondary title mode')
            .setDesc('Choose what the secondary title shows.')
            .addDropdown(dropdown =>
                dropdown
                    .addOption('folder', 'Folder name')
                    .addOption('frontmatter', 'Frontmatter key')
                    .setValue(this.plugin.settings.secondaryTitleMode)
                    .onChange(async value => {
                        this.plugin.settings.secondaryTitleMode = value as 'folder' | 'frontmatter';
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(secondaryModeSetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableSecondaryTitle));
    
        // Secondary frontmatter key
        const secondaryKeySetting = new Setting(secondaryGroup)
            .setName('Secondary frontmatter key')
            .setDesc('Frontmatter key to use as the secondary tab title.')
            .addText(text =>
                text
                    .setPlaceholder('tab_secondary_title')
                    .setValue(this.plugin.settings.secondaryTitleKey)
                    .onChange(async value => {
                        this.plugin.settings.secondaryTitleKey = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(secondaryKeySetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableSecondaryTitle && this.plugin.settings.secondaryTitleMode === 'frontmatter'));
        
        // Main title class mode dropdown
        const secondaryClassModeSetting = new Setting(secondaryGroup)
            .setName('Secondary title class mode')
            .setDesc('Choose what the secondary title class uses.')
            .addDropdown(dropdown =>
                dropdown
                    .addOption('global', 'Global class')
                    .addOption('frontmatter', 'Frontmatter key')
                    .setValue(this.plugin.settings.secondaryTitleClassMode)
                    .onChange(async value => {
                        this.plugin.settings.secondaryTitleClassMode = value as 'global' | 'frontmatter';
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(secondaryClassModeSetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableSecondaryTitle));

        // Main title class key (only used if frontmatter is selected)
        const secondaryClassKeySetting = new Setting(secondaryGroup)
            .setName('Secondary class frontmatter key')
            .setDesc('Frontmatter key to use as secondary title class.')
            .addText(text =>
                text
                    .setPlaceholder('tab_secondary_title_class')
                    .setValue(this.plugin.settings.secondaryTitleClassKey)
                    .onChange(async value => {
                        this.plugin.settings.secondaryTitleClassKey = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(secondaryClassKeySetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableSecondaryTitle && this.plugin.settings.secondaryTitleClassMode === 'frontmatter'));
    }

    // === Tooltip Settings ===
    private createTooltipSettings(containerEl: HTMLElement) {
        const tooltipGroup = createSettingsGroup(containerEl, 'Tooltip');

        // Main title toggle
        const enableTooltipSetting = new Setting(tooltipGroup)
            .setName('Enable tooltip')
            .setDesc('Enable or disable the tab tooltip.')
            .addToggle(toggle =>
                toggle
                    .setValue(this.plugin.settings.enableTooltip)
                    .onChange(async value => {
                        this.plugin.settings.enableTooltip = value;
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(enableTooltipSetting, !this.plugin.settings.enableCustomTabHeader);

        // Main title mode dropdown
        const tooltipModeSetting = new Setting(tooltipGroup)
            .setName('Tooltip mode')
            .setDesc('Choose what the tooltip shows.')
            .addDropdown(dropdown =>
                dropdown
                    .addOption('basename', 'File basename')
                    .addOption('path', 'File path')
                    .addOption('frontmatter', 'Frontmatter key')
                    .setValue(this.plugin.settings.tooltipMode)
                    .onChange(async value => {
                        this.plugin.settings.tooltipMode = value as 'basename' | 'path' | 'frontmatter';
                        await this.plugin.saveSettings();
                        await this.plugin.tabManager.updateAllTabHeaders();
                        this.display();
                    })
            );
        setSettingDisabled(tooltipModeSetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableTooltip));

        // Main title key (only used if frontmatter is selected)
        const tooltipKeySetting = new Setting(tooltipGroup)
            .setName('Tooltip frontmatter key')
            .setDesc('Frontmatter key to use as tooltip.')
            .addText(text =>
                text
                    .setPlaceholder('tab_tooltip')
                    .setValue(this.plugin.settings.tooltipKey)
                    .onChange(async value => {
                        this.plugin.settings.tooltipKey = value;
                        await this.plugin.saveSettings();
                        this.updateTabHeadersDebounced();
                    })
            );
        setSettingDisabled(tooltipKeySetting, !(this.plugin.settings.enableCustomTabHeader && this.plugin.settings.enableTooltip && this.plugin.settings.tooltipMode === 'frontmatter'));
    }
}
