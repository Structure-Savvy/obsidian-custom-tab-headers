import { Setting } from "obsidian";

export function setSettingDisabled(setting: Setting, disabled: boolean) {
    setting.components.forEach(c => c.setDisabled(disabled));

    if (disabled) {
        setting.settingEl.addClass('is-disabled');
    } else {
        setting.settingEl.removeClass('is-disabled');
    }
}

export function createSettingsGroup(container: HTMLElement, title: string): HTMLElement {
    const group = container.createDiv('setting-group');
    group.createEl('h3', { text: title });
    return group;
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeout: ReturnType<typeof setTimeout>;
    return((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    }) as T;
}
