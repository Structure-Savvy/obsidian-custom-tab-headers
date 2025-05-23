import { MarkdownView, Menu, TFile, View, WorkspaceLeaf } from "obsidian";
import CustomTabHeaderPlugin from "../main";

export class ViewPatcher {
    private patchedViews = new WeakSet<View>();

    constructor(private plugin: CustomTabHeaderPlugin) {}

    patchView(view: View) {
        if (!(view instanceof MarkdownView)) return;

        if (this.patchedViews.has(view)) return;
        this.patchedViews.add(view);

        this.addTabHeaderContextMenu(view);
        this.setupMetadataListener(view);

        // Update initial tab header
        const leaf = this.plugin.app.workspace.getLeavesOfType('markdown').find((leaf: WorkspaceLeaf) => leaf.view === view);
        if (leaf) this.plugin.tabManager.updateTabHeader(leaf);
    }

    private addTabHeaderContextMenu(view: MarkdownView) {
        const original = view.onPaneMenu?.bind(view);
        const plugin = this.plugin;
        view.onPaneMenu = function (menu: Menu, source: string) {
            if (original) original(menu, source);
    
            menu.addItem(item =>
                item
                    .setTitle('Customize tab header')
                    .setIcon('folder-pen')
                    .onClick(() => plugin.openSettings())
            );
        };
    }

    private setupMetadataListener(view: MarkdownView) {
        this.plugin.registerEvent(
            this.plugin.app.metadataCache.on('changed', (file: TFile) => {
                if (file.path === view.file?.path) {
                    const updatedLeaf = this.plugin.app.workspace.getLeavesOfType('markdown').find((leaf: WorkspaceLeaf) => leaf.view === view);
                    if (updatedLeaf) this.plugin.tabManager.updateTabHeader(updatedLeaf);
                }
            })
        );
    }
}
