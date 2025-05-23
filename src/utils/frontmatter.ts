import { App, parseYaml, TFile } from "obsidian";

export async function getFrontmatter(app: App, file: TFile): Promise<Record<string, any> | null> {
    try {
        const content = await this.app.vault.read(file);
        const match = /^---\n([\s\S]+?)\n---/.exec(content);
        if (!match) return null;

        const yaml = match[1];
        const data = parseYaml(yaml);
        return data;
    } catch (err) {
        return null;
    }
}
