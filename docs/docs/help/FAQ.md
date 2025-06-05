# FAQ

<div class="grid cards faq" markdown>

-   #### 1. What does this plugin do?

    ---

    The [Custom Tab Headers]() plugin lets you customize the appearance of Obsidian’s file tabs using frontmatter and CSS. You can control titles, tooltips, and styling with dynamic values like folder names, priorities, or custom icons.

-   #### 2. How do I enable the plugin?

    ---

    Go to **Settings** → **Custom Tab Headers** and toggle on **Enable custom tab headers**.

-   #### 3. What plugins do I need to follow the advanced examples?

    ---

    You'll need:

    - [Templater](){: .external-link target="_blank" } - for automation
    - [Dataview](){: .external-link target="_blank" } - for metadata and task queries
    - [Meta Bind](){: .external-link target="_blank" } - for binding frontmatter to live UI
    - [Tasks](){: .external-link target="_blank" } - for rendering and managing tasks
    - [Custom Tab Headers](){: .external-link target="_blank" } (this plugin)

-   #### 4. What frontmatter fields are used?

    ---

    | Field                       | Description                            |
    | --------------------------- | -------------------------------------- |
    | `tab_main_title`            | Sets the main title text               |
    | `tab_main_title_class`      | Applies a class to the main title      |
    | `tab_secondary_title`       | Sets the subtitle below the main title |
    | `tab_secondary_title_class` | Applies a class to the secondary title |
    | `tab_tooltip`               | Tooltip shown on hover                 |

    !!! note
        You can change these field names in plugin settings.

-   #### 5. How do I style the tab headers?

    ---

    Use CSS snippets in Obsidian. Example:

    ```css
    .custom-tab-header-title-main.urgent.important {
        font-weight: bold;
        color: red;
    }
    ```

    You can use `.icon::before` or `.icon::after` to inject emojis or SVG icons.

-   #### 6. How do I use SVG icons?

    ---

    1. Copy an SVG from [Lucide.dev](https://lucide.dev/icons/){: .external-link target="_blank" }
    2. Use it in a CSS rule:

    ```css
    --custom-tab-header-icon-svg: url('data:image/svg+xml;utf8,<svg ...>');
    ```

    Add it with `::before` or `::after` to the `.icon` container.

-   #### 7. Can I use folder names for titles?

    ---

    Yes. For secondary titles, set **mode** to `folder` in the plugin settings. It will pull the parent folder name automatically.

-   #### 8. Why does my title or tooltip not update?

    ---

    Check the following:

    - Ensure the plugin is enabled
    - Make sur ethe correct mode is selected (e.g. `frontmatter` vs `basename`)
    - Confirm that your frontmatter has the expected key
    - Try refreshing Obsidian or toggling the plugin off and back on

-   #### 9. Why is a setting grayed out?

    ---

    Some fields are only editable when their dependent features are enabled. For example:

    - `tab_main_title_key` is only active if **Main Title** and **Frontmatter Mode** are enabled.
    - Class settings only activate if **Custom Tab Headers** is on.

-   #### 10. Can I Change the default frontmatter keys?

    ---

    Yes. In plugin settings, you can customize the key names for:

    - Main title
    - Main class
    - Secondary title
    - Secondary class
    - Tooltip

-   #### 11. Can I automate tab headers?

    ---

    Yes! Using **Templater**, you can generate entire project folders and automatically:

    - Insert frontmatter
    - Create dashboards, notes, and trackers
    - Inject styling or logic based on task data

    See the [Advanced Examples](../examples/advanced.md/) for full walkthroughs.

-   #### 12. Still need help?

    ---

    If you're stuck or found a bug:

    - Check the [Github repo](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target="_blank" }
    - Create a Github issue

</div>
