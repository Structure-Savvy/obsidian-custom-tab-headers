# Custom Tab Headers

[Custom Tab Headers]() is an [Obsidian](https://obsidian.md/) plugin that gives you complete control over how your editor tabs are titled and styled. No more tab search fatigue.

![Featured image of custom tab headers]()

## Features

- Clean up long tab titles
- Add rich metadata context to tabs
- Improve navigation with meaningful labels
- Customize your tabs visually with CSS

![Animated demo of custom tooltips for custom tab headers]()

## Documentation

See the example below or head on over to the [documentation]() for full details.

## Example

### Frontmatter

```yaml
tab_main_title: 'Custom Title'
tab_main_title_class: 'home main-highlight'
tab_secondary_title: 'Reference'
tab_secondary_title_class: 'subtle'
tab_tooltip: 'My custom tooltip'
```

### Styling with CSS

```css
.custom-tab-header-wrapper {
    --home-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>');
    --home-icon-color: var(--color-accent-1);
}

.custom-tab-header-title-main.home .icon::before {
    --custom-tab-header-icon-svg: var(--home-icon-svg);
    --custom-tab-header-icon-color: var(--home-icon-color);
    content: '';
    display: inline-block;
    top: 0.15em;
}

.custom-tab-header-title-main.main-highlight {
    font-weight: bold;
    color: var(--color-accent-1);
}

.custom-tab-header-title-secondary.subtle {
    font-style: italic;
}
```

![Example of styled custom tab headers]()

## Settings Overview

All settings are configurable via the plugin settings tab inside Obsidian.

### General

- **Enable custom tab headers**: Master switch to turn custom tab headers on or off.
- **Global title class**: Add a CSS class to all custom tab titles for styling.

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

Found a bug? Want a feature? Submit an issue on [Github]().

## License

[Custom Tab Headers]() is licensed under the MIT license. Refer to [LICENSE]() for more information.

## Support

Like what you see? Consider sponsoring me on [Github]().
