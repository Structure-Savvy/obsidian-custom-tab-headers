# Settings Reference

All settings are configurable via the [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target=_blank } plugin settings tab inside [Obsidian](https://obsidian.md/){: .external-link target=_blank }.

You can access them via:

- **Settings** → **Custom Tab Headers**
- **Editor** → **Context Menu** → *Customize tab headers*
- **Editor** → **More options (...)** → *Customize tab headers*
- **Active Tab** → **Context Menu** → *Customize tab headers*

---

## General

### Enable custom tab headers

Master toggle to turn the plugin on or off.

### Global title class

Applies a custom CSS class to all tab headers. This is useful for consistent, global styling.

---

## Main Title

Controls the main tab title shown in each tab.

### Enable main title

Toggle main title display.

### Main title mode

Choose what the main title displays:

- `basename`: Use the file's base name.
- `frontmatter`: Use a value from frontmatter.

### Main title frontmatter key

If using `frontmatter`, specify the key (default: `tab_main_title`).

### Main title class mode

Defines how the main title's CSS class is applied:

- `global`: Use the global title class from general settings.
- `frontmatter`: Use a class defined in frontmatter.

### Main title class frontmatter key

If using `frontmatter`, specify the key (default: `tab_main_title_class`).

---

## Secondary Title

Controls the secondary tab title shown in each tab.

### Enable secondary title

Toggle secondary title display.

### Secondary title mode

Choose what the secondary title displays:

- `folder`: Use the file's parent folder name.
- `frontmatter`: Use a value from frontmatter.

### Secondary title frontmatter key

If using `frontmatter`, specify the key (default: `tab_secondary_title`).

### Secondary title class mode

Defines how the secondary title's CSS class is applied:

- `global`: Use the global title class from general settings.
- `frontmatter`: Use a class defined in frontmatter.

### Secondary title class frontmatter key

If using `frontmatter`, specify the key (default: `tab_secondary_title_class`).

---

## Tooltip

Customizes the text shown when hovering over a tab.

### Enable tooltip title

Toggle tooltip title display.

### Tooltip mode

Choose what the tooltip title displays:

- `basename`: Use the file's base name.
- `path`: Use the full file path.
- `frontmatter`: Use a value from frontmatter.

### Tooltip frontmatter key

If using `frontmatter`, specify the key (default: `tab_Tooltip`).

---

## Notes

- Frontmatter-based values are dynamically pulled from each file's YAML frontmatter block.
- If a selected frontmatter key is missing or empty, the plugin will fall back to the default Obsidian settings.
- Class values (e.g. `tab_main_title_class`) can be used to apply targeted styles via your custom CSS.
