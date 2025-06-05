# Custom Tab Headers

Customize your editor tabs, style them your way, and eliminate tab search fatigue with the [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers) plugin for [Obsidian](https://obsidian.md/).

![Featured image of custom tab headers]()

---

## Features

- Shorten and simplify cluttered tab titles
- Add context with secondary titles and tooltips
- Use frontmatter and folder structure for dynamic labels
- Style your tabs with CSS, emojis, or inline SVGs
- Integrate with Templater, Dataview, and Meta Bind for automation

![Animated demo of custom tooltips for custom tab headers]()

---

## Documentation

See the example below or [read the full documentation]() for setup, usage, advanced workflows, and troubleshooting.

## Example: Using Emojis and Custom CSS

### Frontmatter

```yaml
# Work/Project 1/Dashboard
---
tab_main_title: Dashboard
tab_main_title_class: urgent important
tab_secondary_title: Project 1
tab_secondary_title_class: subtle
tab_tooltip: You have slides due today at 2
---

# Work/Project 2/Dashboard
---
tab_main_title: Dashboard
tab_main_title_class: urgent not-important
tab_secondary_title: Project 2
tab_secondary_title_class: subtle
tab_tooltip: You need to respond to emails
---
```

### CSS Snippet

```css
/* ==========
   Main Title
   ========== */

/* Urgent & Important */
.custom-tab-header-title-main.urgent.important .icon::before {
    content: '❗⭐';
}

.custom-tab-header-title-main.urgent.important {
    font-weight: bold;
    color: var(--color-red);
}

/* Urgent & Not-Important */
.custom-tab-header-title-main.urgent.not-important .icon::before {
    content: '❗';
}

.custom-tab-header-title-main.urgent.not-important {
    font-weight: bold;
    color: var(--color-accent-1);
}

/* ===============
   Secondary Title
   =============== */

/* Subtle Secondary Title */
.custom-tab-header-title-secondary.subtle {
    font-style: italic;
    font-variant: small-caps;
}
```

### Result

![Custom tab headers with emojis example]()

---

## Settings Overview

All settings are configurable via the plugin settings tab inside Obsidian.

### General

- **Enable custom tab headers**: Master toggle to turn the plugin on or off.
- **Global title class**: Apply a CSS class to all tabs (optional)

### Main Title

- **Enable main title**: Toggle main title display.
- **Mode**:
    - `basename`: Use the file's base name.
    - `frontmatter`: Use a value from frontmatter.
- **Frontmatter key**: If mode is `frontmatter`, specify the key (default: `tab_main_title`).
- **Class Mode**:
    - `global`: Use the global title class.
    - `frontmatter`: Use a class defined in frontmatter.
- **Frontmatter class key**: If class mode is `frontmatter`, specify the key (default: `tab_main_title_class`).

### Secondary Title

- **Enable secondary title**: Toggle secondary title display.
- **Mode**:
    - `folder`: Use the file's folder name.
    - `frontmatter`: Use a value from frontmatter.
- **Frontmatter key**: If mode is `frontmatter`, specify the key (default: `tab_secondary_title`).
- **Class Mode**:
    - `global`: Use the global title class.
    - `frontmatter`: Use a class defined in frontmatter.
- **Frontmatter class key**: If class mode is `frontmatter`, specify the key (default: `tab_secondary_title_class`).

### Tooltip

- **Enable tooltip**: Toggle tooltip to display on tab hover.
- **Mode**:
    - `file`: Use the file's base name.
    - `path`: Use the file's full path.
    - `frontmatter`: Use a value from frontmatter.
- **Frontmatter key**: If mode is `frontmatter`, specify the key (default: `tab_tooltip`).

## Feedback

Found a bug? Want a feature? Open an issue on [Github](https://github.com/Structure-Savvy/obsidian-custom-tab-headers).

## License

Custom Tab Headers is licensed under the [MIT license](https://github.com/Structure-Savvy/obsidian-custom-tab-headers/blob/main/LICENSE).

## Support

Like what you see? Consider sponsoring me on [Github]().
