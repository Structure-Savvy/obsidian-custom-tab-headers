# Sample Generated HTML Reference

This page demonstrates how the tab header HTML output changes based on plugin state and configuration. You can use this to verify plugin behavior or help style your own custom tabs.

---

## Plugin Disabled

When the plugin is disabled, Obsidian renders the default tab header.

### Output

```html
<div class="workspace-tab-header tappable is-active mod-active" draggable="true" aria-label="Dashboard" data-tooltip-delay="300" data-type="markdown">
    <div class="workspace-tab-header-inner">
        <div class="workspace-tab-header-inner-icon">...</div>
        <div class="workspace-tab-header-inner-title">Dashboard</div>
        <div class="workspace-tab-header-status-container"></div>
        <div class="workspace-tab-header-inner-close-button" aria-label="Close">...</div>
    </div>
</div>
```

---

## Plugin Enabled — Default Settings

With the plugin enabled and default options (using file name and folder), the title is enhanced, but no frontmatter is required.

### Settings

**General**:

| Option                    | Value   |
| ------------------------- | ------- |
| Enable custom tab headers | `true`  |
| Global title class        | *blank* |

**Main Title**:

| Option                | Value           |
| --------------------- | --------------- |
| Enable main title     | `true`          |
| Main title mode       | `File basename` |
| Main title class mode | `Global class`  |

**Secondary Title**:

| Option                     | Value          |
| -------------------------- | -------------- |
| Enable secondary title     | `true`         |
| Secondary title mode       | `Folder name`  |
| Secondary title class mode | `Global class` |

**Tooltip**:

| Option         | Value           |
| -------------- | --------------- |
| Enable tooltip | `true`          |
| Tooltip mode   | `File basename` |

### Output

```html
<div class="workspace-tab-header tappable is-active mod-active" draggable="true" aria-label="Dashboard" data-tooltip-delay="300" data-type="markdown">
    <div class="workspace-tab-header-inner">
        <div class="workspace-tab-header-inner-icon">...</div>
        <div class="workspace-tab-header-inner-title">
            <div class="custom-tab-header-wrapper">
                <div class="custom-tab-header-title-main">
                    <span class="icon"></span>
                    <span class="content">Dashboard</span>
                </div>
                <div class="custom-tab-header-title-secondary">
                    <span class="icon"></span>
                    <span class="content">Project 1</span>
                </div>
            </div>
        </div>
        <div class="workspace-tab-header-status-container"></div>
        <div class="workspace-tab-header-inner-close-button" aria-label="Close">...
    </div>
</div>
```

---

## Plugin Enabled — With Frontmatter Customization

This example uses custom frontmatter to define all title content, styling classes, and tooltip text.

### Settings

**General**:

| Option                    | Value   |
| ------------------------- | ------- |
| Enable custom tab headers | `true`  |
| Global title class        | *blank* |

**Main Title**:

| Option                           | Value                  |
| -------------------------------- | ---------------------- |
| Enable main title                | `true`                 |
| Main title mode                  | `Frontmatter key`      |
| Main title frontmatter key       | `tab_main_title`       |
| Main title class mode            | `Frontmatter key`      |
| Main title class frontmatter key | `tab_main_title_class` |

**Secondary Title**:

| Option                                | Value                       |
| ------------------------------------- | --------------------------- |
| Enable secondary title                | `true`                      |
| Secondary title mode                  | `Frontmatter key`           |
| Secondary title frontmatter key       | `tab_secondary_title`       |
| Secondary title class mode            | `Frontmatter key`           |
| Secondary title class frontmatter key | `tab_secondary_title_class` |

**Tooltip**:

| Option                  | Value             |
| ----------------------- | ----------------- |
| Enable tooltip          | `true`            |
| Tooltip mode            | `Frontmatter key` |
| Tooltip frontmatter key | `tab_tooltip`     |

### Example Frontmatter

```yaml
---
tab_main_title: Dash
tab_main_title_class: urgent important
tab_secondary_title: Alpha
tab_secondary_title_class: subtle
tab_tooltip: You have slides due today at 2
---
```

### Generated HTML

```html
<div class="workspace-tab-header tappable is-active mod-active" draggable="true" aria-label="You have slides due today at 2" data-tooltip-delay="300" data-type="markdown">
    <div class="workspace-tab-header-inner">
        <div class="workspace-tab-header-inner-icon">...</div>
        <div class="workspace-tab-header-inner-title">
            <div class="custom-tab-header-wrapper">
                <div class="custom-tab-header-title-main urgent important">
                    <span class="icon"></span>
                    <span class="content">Dash</span>
                </div>
                <div class="custom-tab-header-title-secondary subtle">
                    <span class="icon"></span>
                    <span class="content">Alpha</span>
                </div>
            </div>
        </div>
        <div class="workspace-tab-header-status-container"></div>
        <div class="workspace-tab-header-inner-close-button" aria-label="Close">...</div>
    </div>
</div>
```

---

## Tips

- You can inspect this HTML by opening the developer tools in Obsidian (`Ctrl + Shift + I` or `Cmd + Opt + I`).
- Use the generated classes (like `.urgent`, `.subtle`) in your CSS snippets to visually style tabs.
- The `icon` span is reserved for emoji or SVG injection via CSS.
