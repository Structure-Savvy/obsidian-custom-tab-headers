# Usage

The [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target=_blank } plugin lets you customize Obsdian's tab headers using frontmatter, CSS, and advanced logic. You can enhance your tabs with emojis, icons, classes, and tooltips, all dynamically configurable.

## Getting Started

To enable custom tab headers:

1. Open **Settings** → **Custom Tab Headers**
2. Toggle **Enable custom tab headers**

Once enabled, the plugin allows you to configure titles, styles, and tooltips based on:

- File and folder name
- Frontmatter keys
- Custom CSS classes

## Customizing Tab Headers

### 1. Main Title

The main tab title can display either the file name or a value from your frontmatter.

**Setting Path**:
*Settings → Custom Tab Headers → Main Title*

| Option                | Description                                |
| --------------------- | ------------------------------------------ |
| Enable main title     | Toggle the main title customization on/off |
| Mode                  | Choose `basename` or `frontmatter`         |
| Frontmatter key       | Default: `tab_main_title`                  |
| Class source          | Choose `global` or `frontmatter`           |
| Frontmatter class key | Default: `tab_main_title_class`            |

**Example Frontmatter**:

```yaml
---
tab_main_title: 📁 Dashboard
tab_main_title_class: urgent important
---
```

**Example Output**:

![Custom tab headers main title with emojis example]()

### 2. Secondary Title

Secondary titles appear to the right of the main title, ideal for showing project or folder names.

**Setting Path**:
*Settings → Custom Tab Headers → Secondary Title*

| Option                 | Description                                     |
| ---------------------- | ----------------------------------------------- |
| Enable secondary title | Toggle the secondary title customization on/off |
| Mode                   | Choose `folder` or `frontmatter`                |
| Frontmatter key        | Default: `tab_secondary_title`                  |
| Class source           | Choose `global` or `frontmatter`                |
| Frontmatter class key  | Default: `tab_secondary_title_class`            |

**Example Frontmatter**:

```yaml
---
tab_secondary_title: Project Beta
tab_secondary_title_class: subtle
---
```

**Example Output**:

![Custom tab headers secondary title example]()

### 3. Tooltip

Tooltips show on tab header hover and can display the file name, path, or a frontmatter-defined message.

**Setting Path**:
*Settings → Custom Tab Headers → Tooltip*

| Option          | Description                                 |
| --------------- | ------------------------------------------- |
| Enable tooltip  | Toggle the tooltip customization on/off     |
| Mode            | Choose `basename`, `path`, or `frontmatter` |
| Frontmatter key | Default: `tab_tooltip`                      |

**Example Frontmatter**:

```yaml
---
tab_tooltip: Slides due at 2pm
---
```

**Example Output**:

![Custom tab headers tooltip example]()

### 4. Global Class Setting

To apply a class across all tab headers:

**Setting Path**:
*Settings → Custom Tab Headers → General*

| Option             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| Global title class | Add a global class applied to all titles (e.g., `custom-tab`) |

**Example CSS Snippet**:

```css
.custom-tab-header-title-main.custom-tab {
    color: var(--text-accent-1);
    font-weight: 200;
    text-transform: uppercase;
}
```

**Example Output**:

![Custom tab headers main title styled with global CSS example]()

## Styling with CSS

Use the frontmatter class fields to conditionally style tab headers.

**Example CSS Snippet:**

```css
.custom-tab-header-title-main.urgent.important {
    color: red;
    font-weight: bold;
}

.custom-tab-header-title-secondary.subtle {
    font-style: italic;
    font-variant: small-caps;
}
```

**Example Output**:

![Custom tab headers titles styled conditionally with CSS example]()

## Advanced Visuals with SVGs

You can inject inline SVG icons with full color and layout control:

```css
.custom-tab-header-title-main.urgent.important .icon::before {
    --custom-tab-header-icon-svg: url('data:image/svg+xml;utf8,<svg ... />');
    --custom-tab-header-icon-color: var(--color-red);
    content: '';
    display: inline-block;
    top: 0.15em;
}
```

## Frontmatter Reference

| Key                         | Purpose                   |
| --------------------------- | ------------------------- |
| `tab_main_title`            | Main title content        |
| `tab_main_title_class`      | Main title CSS class      |
| `tab_secondary_title`       | Secondary title content   |
| `tab_secondary_title_class` | Secondary title CSS class |
| `tab_tooltip`               | Tooltip text              |

You can rename these keys in settings to match your naming preferences.

## Summary

The plugin is flexible enough to support:

- Minimal emoji-based indicators
- Class-driven design systems with CSS
- Fully automated tab headers based on metadata

Ready to take it further? Jump into:

- [Basic Examples](../examples/basic.md/)
- [Advanced Examples](../examples/advanced.md/)
