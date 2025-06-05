import { MarkdownView, TFile, View, WorkspaceLeaf } from "obsidian";
import CustomTabHeaderPlugin from "../main";
import { ViewPatcher } from "./patcher";
import { getFrontmatter } from "src/utils/frontmatter";

export class TabManager {
    private patchedViews = new WeakSet<View>();
    private pinnedLeaves = new WeakSet<WorkspaceLeaf>();
    private viewPatcher: ViewPatcher;

    constructor(private plugin: CustomTabHeaderPlugin) {
        this.viewPatcher = new ViewPatcher(plugin);
    }

    initialize() {
        this.plugin.app.workspace.onLayoutReady(async () => {
            if (!this.plugin.settings.enableCustomTabHeader) return;
            await this.updateAllTabHeaders();
        });

        this.registerEventHandlers();
        this.patchExistingViews();
    }

    cleanup() {
        const leaves = this.plugin.app.workspace.getLeavesOfType('markdown');
        for (const leaf of leaves) {
            this.resetTabHeader(leaf);
        }
    }

    private registerEventHandlers() {
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('window-open', (win) => {
                setTimeout(() => {
                    this.plugin.app.workspace.getLeavesOfType('markdown').forEach(leaf => {
                        this.viewPatcher.patchView(leaf.view);
                        this.updateTabHeader(leaf);
                    });
                }, 100);
            })
        );

        this.plugin.registerEvent(
            this.plugin.app.workspace.on('layout-change', () => {
                this.plugin.app.workspace.getLeavesOfType('markdown').forEach(leaf => {
                    this.viewPatcher.patchView(leaf.view);
                    this.updateTabHeader(leaf);

                    if (!this.pinnedLeaves.has(leaf)) {
                        leaf.on('pinned-change', () => {
                            this.viewPatcher.patchView(leaf.view);
                            this.updateTabHeader(leaf);
                        });
                        this.pinnedLeaves.add(leaf);
                    }
                });
            })
        );

        this.plugin.registerEvent(
            this.plugin.app.workspace.on('editor-menu', (menu, editor, view) => {
                const file = view.file;
                if (!file) return;

                menu.addSeparator();

                menu.addItem(item =>
                    item
                        .setTitle('Customize tab header')
                        .setIcon('folder-pen')
                        .onClick(() => this.plugin.openSettings())
                );
            })
        );
    }

    private patchExistingViews() {
        this.plugin.app.workspace.getLeavesOfType('markdown').forEach(leaf => {
            this.viewPatcher.patchView(leaf.view);
        });
    }

    async updateAllTabHeaders() {
        const leaves = this.plugin.app.workspace.getLeavesOfType('markdown');
        for (const leaf of leaves) {
            await this.updateTabHeader(leaf);
        }
    }

    async updateTabHeader(leaf: WorkspaceLeaf) {
        const file = this.getFileFromLeaf(leaf);
        if (!file) return;

        const frontmatter = await getFrontmatter(this.plugin.app, file);
        const { enableCustomTabHeader } = this.plugin.settings;

        const mainTitle = this.getMainTitle(file, frontmatter);
        const secondaryTitle = this.getSecondaryTitle(file, frontmatter);

        const mainTitleClass = this.getMainTitleClass(frontmatter);
        const secondaryTitleClass = this.getSecondaryTitleClass(frontmatter);

        const tooltip = this.getTooltip(file, frontmatter);

        this.updateTabElement(
            leaf,
            { mainTitle, secondaryTitle, mainTitleClass, secondaryTitleClass, tooltip },
            enableCustomTabHeader
        );
    }

    private getFileFromLeaf(leaf: WorkspaceLeaf): TFile | null {
        if (leaf.view instanceof MarkdownView) {
            return leaf.view.file;
        }

        const state = leaf.getViewState();
        if (state.type === 'markdown') {
            const filePath = (state.state as { file?: string })?.file;
            if (filePath) {
                const abstractFile = this.plugin.app.vault.getAbstractFileByPath(filePath);
                if (abstractFile instanceof TFile) {
                    return abstractFile;
                }
            }
        }

        return null;
    }

    private getMainTitle(file: TFile, frontmatter: Record<string, any> | null): string {
        const { enableCustomTabHeader, enableMainTitle, mainTitleMode, mainTitleKey } = this.plugin.settings;

        if (!enableCustomTabHeader || !enableMainTitle) {
            return file.basename;
        }

        if (mainTitleMode === 'frontmatter') {
            return frontmatter?.[mainTitleKey.trim()] ?? file.basename;
        }

        return file.basename;
    }

    private getSecondaryTitle(file: TFile, frontmatter: Record<string, any> | null): string {
        const { enableCustomTabHeader, enableSecondaryTitle, secondaryTitleMode, secondaryTitleKey } = this.plugin.settings;

        if (!enableCustomTabHeader || !enableSecondaryTitle) {
            return '';
        }

        if (secondaryTitleMode === 'folder') {
            return file.path.contains('/') ? file.path.split('/').at(-2) ?? '' : '';
        }

        if (secondaryTitleMode === 'frontmatter') {
            return frontmatter?.[secondaryTitleKey.trim()] ?? '';
        }

        return '';
    }

    private getMainTitleClass(frontmatter: Record<string, any> | null): string {
        const { enableCustomTabHeader, globalTitleClass, enableMainTitle, mainTitleClassMode, mainTitleClassKey } = this.plugin.settings;

        if (!enableCustomTabHeader || !enableMainTitle) {
            return '';
        }

        if (mainTitleClassMode === 'global') {
            return globalTitleClass;
        }

        if (mainTitleClassMode === 'frontmatter') {
            return frontmatter?.[mainTitleClassKey.trim()] ?? '';
        }

        return '';
    }

    private getSecondaryTitleClass(frontmatter: Record<string, any> | null): string {
        const { enableCustomTabHeader, globalTitleClass, enableSecondaryTitle, secondaryTitleClassMode, secondaryTitleClassKey } = this.plugin.settings;

        if (!enableCustomTabHeader || !enableSecondaryTitle) {
            return '';
        }

        if (secondaryTitleClassMode === 'global') {
            return globalTitleClass;
        }

        if (secondaryTitleClassMode === 'frontmatter') {
            return frontmatter?.[secondaryTitleClassKey.trim()] ?? '';
        }

        return '';
    }

    private getTooltip(file: TFile, frontmatter: Record<string, any> | null): string {
        const { enableCustomTabHeader, enableTooltip, tooltipMode, tooltipKey } = this.plugin.settings;

        if (!enableCustomTabHeader || !enableTooltip) {
            return file.basename;
        }

        if (tooltipMode === 'path') {
            if (file.parent) {
                const filePathList = file.parent.path.split('/');
                if (filePathList[0] !== '') {
                    return `${filePathList.join(' / ')} / ${file.basename}`;
                } else {
                    return file.basename;
                }
            }
            return file.basename;
        }

        if (tooltipMode === 'frontmatter') {
            return frontmatter?.[tooltipKey.trim()] ?? file.basename;
        }

        return file.basename;
    }

    private updateTabElement(
        leaf: WorkspaceLeaf,
        data: { mainTitle: string, secondaryTitle: string, mainTitleClass: string, secondaryTitleClass: string, tooltip: string },
        useCustomHeader: boolean
    ) {
        const tabHeader = leaf.tabHeaderEl;
        if (!tabHeader) return;

        const tabtitleEl = leaf.tabHeaderInnerTitleEl;
        if (!tabtitleEl) return;

        const tooltipAttr = 'aria-label';

        if (useCustomHeader) {
            if (tabHeader.getAttribute(tooltipAttr)) {
                tabHeader.setAttribute(tooltipAttr, data.tooltip);
            }

            const document = leaf.getContainer().doc;
            tabtitleEl.textContent = '';

            const wrapper = document.createElement('div');
            wrapper.className = 'custom-tab-header-wrapper';

            const mainContainer = this.createTitleContainer(document, 'main', data.mainTitle, data.mainTitleClass);
            wrapper.appendChild(mainContainer);

            if (data.secondaryTitle) {
                const secondaryContainer = this.createTitleContainer(document, 'secondary', data.secondaryTitle, data.secondaryTitleClass);
                wrapper.appendChild(secondaryContainer);
            }

            tabtitleEl.appendChild(wrapper);
        } else {
            if (tabHeader.getAttribute(tooltipAttr)) {
                tabHeader.setAttribute(tooltipAttr, data.tooltip);
            }

            tabtitleEl.textContent = data.mainTitle;
        }
    }

    private createTitleContainer(doc: Document, type: 'main' | 'secondary', content: string, customClass: string): HTMLDivElement {
        const outer = doc.createElement('div');
        outer.className = `custom-tab-header-title-${type}`;

        const classes = customClass?.split(/\s+/).filter(cls => cls.trim()) ?? [];
        classes.forEach(cls => outer.classList.add(cls));
        
        const innerIcon = doc.createElement('span');
        innerIcon.className = 'icon';
        outer.appendChild(innerIcon);

        const innerContent = doc.createElement('span');
        innerContent.className = 'content';
        innerContent.textContent = content;
        outer.appendChild(innerContent);

        return outer;
    }

    private resetTabHeader(leaf: WorkspaceLeaf) {
        const tabtitleEl = leaf.tabHeaderInnerTitleEl;
        const file = leaf.view instanceof MarkdownView ? leaf.view.file : null;

        if (tabtitleEl && file) {
            tabtitleEl.textContent = file.basename;
        }
    }
}

declare module 'obsidian' {
    interface WorkspaceLeaf {
        tabHeaderEl?: HTMLElement;
        tabHeaderInnerTitleEl?: HTMLElement;
    }
}
