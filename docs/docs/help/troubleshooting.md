# Troubleshooting

Having trouble with your tab headers? This page helps you diagnose and fix common issues with the [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target=_blank } plugin.

---

## Tabs Aren't Updating

### Symptoms:

- Tabs show default file names instead of custom titles
- Tooltip isn't visible
- CSS class don't apply

### Solutions:

1. **Ensure the plugin is enabled**
:   Go to **Settings** → **Custom Tab Headers** and check that **Enable custom tab headers** is toggled on.

2. **Confirm feature-specific toggles are on**
:   Make sure **Main Title**, **Secondary Title**, and/or **Tooltip** are enabled depending on what you want to use.

3. **Check the selected modes**

:   - If using `frontmatter` mode, ensure your files contain the correct frontmatter keys.
    - If using `basename` or `folder`, make sure the file path structure is valid.

4. **Trigger a manual refresh**
:   Try toggling the plugin off and back on, or switch between editor and reading mode.

5. **Use the default frontmatter keys** (if unsure):

```yaml
---
tab_main_title: 'Dashboard'
tab_main_title_class: 'urgent'
tab_secondary_title: 'Project X'
tab_secondary_title_class: 'subtle'
tab_tooltip: 'Slides due tomorrow'
---
```

---

## Settings Are Grayed Out

### Cause:

Some options are only active when prerequisite settings are enabled.

### Example:

The **Main Title Frontmatter Key** field is disabled unless:

- Custom Tab Headers is enabled
- Main Title is enabled
- Mode is set to `frontmatter`

### Fix:

Toggle the required parent setting(s) first, then adjust the sub-setting.

---

## CSS Styling Isn’t Applying

### Common Issues:

- Incorrect class name in frontmatter
- CSS snippet not enabled
- CSS targeting the wrong selector

### Fixes:

1. Double-check your frontmatter values match the selectors in your CSS:

   ```yaml
   tab_main_title_class: 'urgent important'
   ```

   ```css
   .custom-tab-header-title-main.urgent.important {
       color: red;
   }
   ```

2. Go to **Settings → Appearance → CSS Snippets**
   Make sure your snippet (e.g., `custom_tab_headers.css`) is enabled.

3. Try reloading your vault (`Ctrl/Cmd + P` → **Reload app without saving**).

---

## Styles Get Overridden Unexpectedly

### Cause:

If you're using dynamic updates (e.g. Dataview or Meta Bind), manually changing the frontmatter may not persist.

### Fix:

- Use automation only for calculated values (like `tab_main_title_class`)
- Avoid manually editing those values unless you’ve removed the automatic update logic

---

## Templater Script Didn't Create Files

### Checklist:

- Is [Templater](){: .external-link target=_blank } installed and working?
- Did you run the script in Reading Mode?
- Did you enter a valid project name when prompted?
- Does a folder with the same name already exist?

Try again, and check the Templater console logs for errors.

---

## Still Having Issues?

If none of the above solved your problem:

- Check the [FAQ](./FAQ.md)
- Review the [Usage Guide](../getting-started/usage.md)
- Visit the [GitHub repo](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target=_blank } to report a bug or ask a question
