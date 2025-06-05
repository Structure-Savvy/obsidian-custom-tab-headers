# Basic Examples

This guide walks you through simple ways to customize your tab headers in Obsidian using the [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target="_blank" } plugin. You'll learn how to elevate your tabs with emojis, CSS classes, and SVG icons.

## Example 1: Using emojis inside frontmatter

Add emojis directly in the frontmatter for easy additional context.

**Obsidian Frontmatter**:

```yaml
# Work/Project 1/Dashboard
---
tab_main_title: ❗⭐ Dashboard
tab_secondary_title: Project 1
tab_tooltip: You have slides due today at 2
---

# Work/Project 2/Dashboard
---
tab_main_title: ❗ Dashboard
tab_secondary_title: Project 2
tab_tooltip: You need to respond to emails
---
```

**Output**:

![Custom tab headers with emojis inside frontmatter example]()

## Example 2: Styling tabs with CSS classes and emojis

Use CSS classes in frontmatter for styling and icon injection via CSS.

**Obsidian Frontmatter**:

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

**CSS Snippet**:

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
    font-style: italic;
    color: var(--color-accent-1);
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

**Output**:

![Custom tab headers with emojis inside custom CSS example]()

## Example 3: Using inline SVGs for icons

Inline SVGs offer greater flexibility than emojis.

**Obsidian Frontmatter**:

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
tab_main_title: Dashboard'
tab_main_title_class: urgent not-important
tab_secondary_title: Project 2
tab_secondary_title_class: subtle
tab_tooltip: You need to respond to emails
---
```

**CSS Snippet**:

```css
/* ==========
   Main Title
   ========== */

/* Urgent & Important - Two SVG Icons */
.custom-tab-header-title-main.urgent.important .icon::before {
    --custom-tab-header-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>');
    --custom-tab-header-icon-color: var(--color-red);
    content: '';
    display: inline-block;
    top: 0.15em;
}

.custom-tab-header-title-main.urgent.important .icon::after {
    --custom-tab-header-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>');
    --custom-tab-header-icon-color: var(--color-yellow);
    content: '';
    display: inline-block;
    top: 0.15em;
}

.custom-tab-header-title-main.urgent.important {
    font-weight: bold;
    font-style: italic;
    color: var(--color-accent-1);
}

/* Urgent & Not-Important - One SVG Icon */
.custom-tab-header-title-main.urgent.not-important .icon::before {
    --custom-tab-header-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>');
    --custom-tab-header-icon-color: var(--color-red);
    content: '';
    display: inline-block;
    top: 0.15em;
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

**Output**:

![Custom tab headers with SVGs inside custom CSS example]()

## Summary

| Technique      | Visual Style        | Config Source     |
| -------------- | ------------------- | ----------------- |
| Emojis in YAML | Basic icon labels   | Frontmatter only  |
| Emojis via CSS | Conditional styles  | Frontmatter + CSS |
| SVG Icons      | Custom visual icons | Frontmatter + CSS |

Experiment with combinations to make your workspace informative and uniquely yours.
