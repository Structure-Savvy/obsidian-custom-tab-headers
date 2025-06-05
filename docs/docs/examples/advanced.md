# Advanced Examples

This section demonstrates how to automate and scale your Obsidian workflows with real-world, advanced use cases. If you've mastered the basics and want to create a smarter, more integrated workspace, you're in the right place.

---

## Automating Custom Tab Headers — Part 1: Project Workspaces

### Overview

In this section, you'll build a reusable system to generate project workpsaces complete with custom tab headers, task tracking, and templated notes automatically.

### Required Plugins

To follow along, make sure the following plugins are installed:

- [Custom Tab Headers](https://github.com/Structure-Savvy/obsidian-custom-tab-headers){: .external-link target="_blank" }
- [Dataview](https://blacksmithgu.github.io/obsidian-dataview/){: #dataview-plugin .external-link target="_blank" }
- [Tasks](https://publish.obsidian.md/tasks/Introduction){: #tasks-plugin .external-link target="_blank" }
- [Templater](https://silentvoid13.github.io/Templater/){: #templater-plugin .external-link target="_blank" }
- [Meta Bind](https://www.moritzjung.dev/obsidian-meta-bind-plugin-docs/){: #metabind-plugin .external-link target="_blank" }

### Use Case

You manage work projects inside Obsidian. Each time you start a new project, you manually duplicate a set of template files: notes, a task tracker, and a dasboard.

This example will show you how to automate that process so a single button click creates a new, fully integrated project workspace.

### Step-by-Step Setup

#### Step 1: Create the folder structure

Replicate the following structure in your Obsidian vault:

<pre>
<span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29.87.16 2.593.64 4.01 1.055 1.083.316 2.198-.548 2.355-1.664.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534-.683-1.725-.848-3.233-.716-4.577.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86.217-.47.379-.885.46-1.27.08-.38.08-.72-.014-1.043-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg></span> Vault Root/
├── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> _templates/
│   └── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> work/
│       ├── create_work_project_template.md
│       ├── custom_tab_header_edit_template.md
│       ├── custom_tab_header_frontmatter_template.md
│       ├── dashboard_template.md
│       ├── notes_template.md
│       └── tracker_template.md
└── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> Work/
    ├── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> Projects/
    └── Dashboard.md
</pre>

#### Step 2: Setup the template files

Each file in `_templates/work/` has a specific role:

- `dashboard_template.md`
    - Purpose: Dynamic task dashboard
    - Plugins used: [Dataview](#dataview-plugin), [Tasks](#tasks-plugin)
- `notes_template.md`
    - Purpose: Daily notes template
    - Plugins used: [Dataview](#dataview-plugin), [Templater](#templater-plugin)
- `tracker_template.md`
    - Purpose: Task list template
    - Plugins used: [Dataview](#dataview-plugin), [Tasks](#tasks-plugin)
- `custom_tab_header_frontmatter_template.md`<br>
Frontmatter for Custom Tab Headers using **Templater**
- `custom_tab_header_edit_template.md`<br>
Frontmatter editing UI using **Meta Bind**

**:material-file: dashboard_template.md**

This file provides a live overview of your tasks, grouped by date and status, and uses the Tasks plugin.

??? example "`_templates/work/dashboard_template.md` (click to expand)"

    ````markdown
    # `$= dv.current().file.folder.split('/').pop() + ' ' + dv.current().file.name`

    ## Tasks

    ### Due Today

    ```tasks
    not done
    due today
    folder includes {{ query.file.folder }}
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    ```

    ---

    ### Due This Week

    ```tasks
    not done
    due before in 7 days
    folder includes {{ query.file.folder }}
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    ```

    ---

    ### All Tasks

    ```tasks
    folder includes {{ query.file.folder }}
    group by status reverse
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    sort by due date reverse, priority
    ```
    ````

**:material-file: notes_template.md**

This file serves as the tempalte for your project notes.

??? example "`_templates/work/notes_template.md` (click to expand)"
    ````markdown
    # `$= dv.current().file.folder.split('/').pop() + ' ' + dv.current().file.name`

    ## <% tp.date.now("YY.MM.DD") %>

    - 
    ````

**:material-file: tracker_template.md**

This file serves as the template for your project tasks.

??? example "`_templates/work/tracker_template.md` (click to expand)"

    ````markdown
    # `$= dv.current().file.folder.split('/').pop() + ' ' + dv.current().file.name`

    ## Tasks

    - [ ] 
    ````

**:material-file: custom_tab_header_frontmatter_template.md**

This file serves as the template for your frontmatter data. The keys listed below are for the Custom Tab Header plugin.

??? example "`_templates/work/custom_tab_header_frontmatter_template.md` (click to expand)"

    ````markdown
    ---
    tab_main_title: <% tp.file.title %>
    tab_main_title_class:
    tab_secondary_title: <% tp.file.folder(true).split('/').pop() %>
    tab_secondary_title_class: subtle
    tab_tooltip: <% tp.file.path(true).replace('.md', '').replaceAll('/', ' / ') %>
    ---
    ````

**:material-file: custom_tab_header_edit_template.md**

This file serves as the template for editing the frontmatter while in reading mode. The inputs are from the Meta Bind plugin.

??? example "`_templates/work/custom_tab_header_edit_template.md` (click to expand)"

    ````markdown
    > [!NOTE]- Tab Header Frontmatter
    > 
    > tab_main_title:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_main_title]`
    > 
    > tab_main_title_class:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_main_title_class]`
    > 
    > tab_secondary_title:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_secondary_title]`
    > 
    > tab_secondary_title_class:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_secondary_title_class]`
    > 
    > tab_tooltip:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_tooltip]`
    > 
    ````

#### Step 3: Create the automation script

**:material-file: create_work_project_template.md**

This script uses Templater to automate:

- Folder and file creation
- Merging frontmatter, content, and Meta Bind UI
- Opening the new dashboard
- Deleting itself post-run

This file is the backbone of your automation.

??? example "`_templates/work/create_work_project_template.md` (click to expand)"

    ````markdown
    <%*
    // Temporary Templater file path.
    const tempFilePath = tp.file.path(true);

    // Get the project folder name via system prompt.
    const projectFolder = await tp.system.prompt("Enter project name:");

    // Check if a project folder name was entered. If it's missing, cancel creation.
    if (!projectFolder) {
    new Notice("Creation cancelled — folder name missing.");
    return;
    }

    // Get the new project folder path
    const targetFolder = `Work/Projects/${projectFolder}`;

    // Check if the project folder exists. If it does, cancel creation, otherwise create.
    const folderExists = tp.app.vault.getFolderByPath(targetFolder);
    if (!folderExists) {
        await tp.app.vault.createFolder(targetFolder);
    } else {
        new Notice("Creation cancelled - folder name already exists.");
        return;
    }

    // Function to create project files
    async function createFile(templateFile, fileName, frontmatterFile, editFile) {
        // Check if the file already exists, if it does, don't do anything, otherwise create the new file.
        const fileExists = tp.app.vault.getAbstractFileByPath(`${targetFolder}/${fileName}.md`);
        
        if (!fileExists) {
            // Get the content of the frontmatter file, main template file, and the edit file
            const frontmatterContent = await tp.app.vault.cachedRead(frontmatterFile);
            const templateFileContent = await tp.app.vault.cachedRead(templateFile);
            const editFileContent = await tp.app.vault.cachedRead(editFile);
            const newFileContent = `${frontmatterContent}\n\n${templateFileContent}\n\n${editFileContent}\n`
            
            // Create new file
            return await tp.file.create_new(newFileContent, fileName, false, targetFolder);
        }
    }

    // Get the template files
    const frontmatter = tp.file.find_tfile("_templates/work/custom_tab_header_frontmatter_template.md");
    const dashboard = tp.file.find_tfile("_templates/work/dashboard_template.md");
    const notes = tp.file.find_tfile("_templates/work/notes_template.md");
    const tracker = tp.file.find_tfile("_templates/work/tracker_template.md");
    const edit = tp.file.find_tfile("_templates/work/custom_tab_header_edit_template.md");

    // Create the project files
    await createFile(dashboard, "Dashboard", frontmatter, edit);
    await createFile(notes, "Notes", frontmatter, edit);
    await createFile(tracker, "Tracker", frontmatter, edit);

    // Open the new dashboard file
    const dashboardFile = tp.app.vault.getAbstractFileByPath(`${targetFolder}/Dashboard.md`);
    if (dashboardFile) {
        await tp.app.workspace.getLeaf(true).openFile(dashboardFile);
    }

    // Delete the temporary Templater file
    setTimeout(async () => {
        const tempFile = tp.app.vault.getAbstractFileByPath(tempFilePath);
        if (tempFile) {
                await tp.app.vault.delete(tempFile);
        }
    }, 500);
    %>
    ````

#### Step 4: Create the global dashboard

**:material-file: Dashboard.md**

The top-level `Work/Dashboard.md` acts as a control center to create new projects and view tasks across all projects. It includes:

- A Tasks dashboard grouped by time and status
- Editable tab header fields via Meta Bind

??? example "`Work/Dashboard.md` (click to expand)"

    ````markdown
    ---
    tab_main_title: <% tp.file.title %>
    tab_main_title_class:
    tab_secondary_title: <% tp.file.folder(true).split('/').pop() %>
    tab_secondary_title_class: subtle
    tab_tooltip: <% tp.file.path(true).replace('.md', '').replaceAll('/', ' / ') %>
    ---

    # `$= dv.current().file.folder.split('/').pop() + ' ' + dv.current().file.name`

    ## Tasks

    ### Due Today

    ```tasks
    not done
    due today
    folder includes {{ query.file.folder }}
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    ```

    ---

    ### Due This Week

    ```tasks
    not done
    due before in 7 days
    folder includes {{ query.file.folder }}
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    ```

    ---

    ### All Tasks

    ```tasks
    folder includes {{ query.file.folder }}
    group by status reverse
    filter by function task.description.length > 0
    group by function \
        const heading = task.hasHeading ? task.heading : ''; \
        return `[[${task.file.pathWithoutExtension}#${heading}]]`;
    sort by due date reverse, priority
    ```

    > [!NOTE]- Tab Header Frontmatter
    > 
    > tab_main_title:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_main_title]`
    > 
    > tab_main_title_class:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_main_title_class]`
    > 
    > tab_secondary_title:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_secondary_title]`
    > 
    > tab_secondary_title_class:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_secondary_title_class]`
    > 
    > tab_tooltip:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_tooltip]`
    > 
    ````

#### Step 5: Try it out

1. Open `Work/Dashboard.md`.
2. Switch to reading mode.
3. Run Templater (e.g. `Alt + R`) to execute the template.
4. Click the **Add new project** button.
5. Enter a project name when prompted.
6. Your new workspace appears intantly, fully configured.

---

## Automating Custom Tab Headers — Part 2: Custom Icons and Styling

### Overview

This section builds upon [Part 1](#automating-custom-tab-headers-part-1-project-workspaces) by adding iconography and styling to your tab headers using CSS snippets.

### Use Case

You want to add custom styles and SVG icons to your tab headers to visually distinguish different types of notes or tasks.

### Step-by-Step

#### Step 1: Create the folder structure

Create the following file structure:

<pre>
<span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.355 18.538a68.967 68.959 0 0 0 1.858-2.954.81.81 0 0 0-.062-.9c-.516-.685-1.504-2.075-2.042-3.362-.553-1.321-.636-3.375-.64-4.377a1.7 1.7 0 0 0-.358-1.05l-3.198-4.064a4 4 0 0 1-.076.543c-.106.503-.307 1.004-.536 1.5-.134.29-.29.6-.446.914l-.31.626c-.516 1.068-.997 2.227-1.132 3.59-.124 1.26.046 2.73.815 4.481q.192.016.386.044a6.36 6.36 0 0 1 3.326 1.505c.916.79 1.744 1.922 2.415 3.5zM8.199 22.569q.11.019.22.02c.78.024 2.095.092 3.16.29.87.16 2.593.64 4.01 1.055 1.083.316 2.198-.548 2.355-1.664.114-.814.33-1.735.725-2.58l-.01.005c-.67-1.87-1.522-3.078-2.416-3.849a5.3 5.3 0 0 0-2.778-1.257c-1.54-.216-2.952.19-3.84.45.532 2.218.368 4.829-1.425 7.531zM5.533 9.938q-.035.15-.098.29L2.82 16.059a1.6 1.6 0 0 0 .313 1.772l4.116 4.24c2.103-3.101 1.796-6.02.836-8.3-.728-1.73-1.832-3.081-2.55-3.831zM9.32 14.01c.615-.183 1.606-.465 2.745-.534-.683-1.725-.848-3.233-.716-4.577.154-1.552.7-2.847 1.235-3.95q.17-.35.328-.664c.149-.297.288-.577.419-.86.217-.47.379-.885.46-1.27.08-.38.08-.72-.014-1.043-.095-.325-.297-.675-.68-1.06a1.6 1.6 0 0 0-1.475.36l-4.95 4.452a1.6 1.6 0 0 0-.513.952l-.427 2.83c.672.59 2.328 2.316 3.335 4.711q.136.317.253.653"></path></svg></span> Vault Root/
└── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> .obsidian/
    └── <span class="twemoji"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 20H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6l2 2h7a2 2 0 0 1 2 2H4v10l2.14-8h17.07l-2.28 8.5c-.23.87-1.01 1.5-1.93 1.5"></path></svg></span> snippets/
        └── custom_tab_headers.css
</pre>

#### Step 2: Define your icon variables

In `.obsidian/snippets/custom_tab_headers.css`, create a new rule to define your icon SVG variables:

!!! example "`.obsidian/snippets/custom_tab_headers.css`"

    ````css
    .custom-tab-header-wrapper {
        --work-hub-icon-svg: url('data:image/svg+xml;utf8,');
        
        --urgent-icon-svg: url('data:image/svg+xml;utf8,');
        
        --important-icon-svg: url('data:image/svg+xml;utf8,');
        
        --not-icon-svg: url('data:image/svg+xml;utf8,');
        
        --no-tasks-icon-svg: url('data:image/svg+xml;utf8,');
    }
    ````

Next, go to [Lucide.dev](https://lucide.dev/icons/){: .external-link target="_blank" } and choose an icon for each status.

To add these to our CSS file, click on an icon and select **Copy SVG**. Then, paste it inside the url delcaration after `utf8,` and before the last quotation mark. Do this for each status.

**Example**: `--work-hub-icon-svg: url('data:image/svg+xml;utf8,<svg ...>...</svg>);`

Full icon example:

!!! example "`.obsidian/snippets/custom_tab_headers.css`"

    ```css
    .custom-tab-header-wrapper {
        --work-hub-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-briefcase-icon lucide-briefcase"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>');
        
        --urgent-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>');
        
        --important-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>');
        
        --not-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list-icon lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>');
        
        --no-tasks-icon-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>');
    }
    ```

#### Step 3: Colorize your icons

Enhance visibility of your tab icons by adding color to them.

To do this, underneath each `<status>-icon-svg` css variable, we'll declare a color.

Full icon color example:

!!! example "`.obsidian/snippets/custom_tab_headers.css`"

    ```css
    /* =====
       Icons
       ===== */
    .custom-tab-header-wrapper {
        --work-hub-icon-svg: url('...');
        --work-hub-icon-color: var(--color-cyan);
        
        --urgent-icon-svg: url('...');
        --urgent-icon-color: var(--color-red);
        
        --important-icon-svg: url('...');
        --important-icon-color: var(--color-yellow);
        
        --not-icon-svg: url('...');
        --not-icon-color: var(--color-blue);
        
        --no-tasks-icon-svg: url('...');
        --no-tasks-icon-color: var(--color-green);
    }
    ```

#### Step 4: Add the SVG icons to their respective tab

Now you'll link each icon to the appropriate tab header class using `::before` and `::after` pseudo-elements.

To do this, add the following contents below your `.custom-tab-header-wrapper` declaration from the step before:

!!! example "`.obsidian/snippets/custom_tab_headers.css`"

    ```css
    /* ==========
       Main Title
       ========== */

    /* Work Hub */
    .custom-tab-header-title-main.work-hub .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--work-hub-icon-svg);
            --custom-tab-header-icon-color: var(--work-hub-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }

    /* Urgent & Important */
    .custom-tab-header-title-main.urgent.important .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--urgent-icon-svg);
            --custom-tab-header-icon-color: var(--urgent-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }

        &::after {
            --custom-tab-header-icon-svg: var(--important-icon-svg);
            --custom-tab-header-icon-color: var(--important-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }

    /* Not-Urgent & Important */
    .custom-tab-header-title-main.not-urgent.important .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--important-icon-svg);
            --custom-tab-header-icon-color: var(--important-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }

    /* Urgent & Not-Important */
    .custom-tab-header-title-main.urgent.not-important .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--urgent-icon-svg);
            --custom-tab-header-icon-color: var(--urgent-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }

    /* Not-Urgent & Not-Important */
    .custom-tab-header-title-main.not-urgent.not-important .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--not-icon-svg);
            --custom-tab-header-icon-color: var(--not-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }

    /* No Tasks */
    .custom-tab-header-title-main.no-tasks .icon {
        &::before {
            --custom-tab-header-icon-svg: var(--no-tasks-icon-svg);
            --custom-tab-header-icon-color: var(--no-tasks-icon-color);
            content: '';
            display: inline-block;
            top: 0.15em;
        }
    }
    ```

#### Step 5: Customize the secondary title

The main title is now styled, but now we want to customize the styling of the secondary title. This will visually differentiate the secondary title from the main title.

Add the following contents to the bottom of the file:

!!! example "`.obsidian/snippets/custom_tab_headers.css`"

    ```css
    /* ===============
       Secondary Title
       =============== */
    .custom-tab-header-title-secondary.subtle {
        font-style: italic;
        font-variant: small-caps;
    }
    ```

#### Step 6: Activate the snippet

1. Open Obsidian.
2. Go to **Settings** → **Appearance** → **CSS Snippets**.
3. Enable `custom_tab_headers.css`.

Your tab headers should now display custom icons and colors based on their classification.

---

## Automating Custom Tab Headers — Part 3: Dynamic Classification

## Overview

This section builds upon [Part 1](#automating-custom-tab-headers-part-1-project-workspaces) and [Part 2](#automating-custom-tab-headers-part-2-custom-icons-and-styling) by automating the classification of each project's urgency and priority using the Eisenhower Matrix.

### Use Case

You want your tab headers to automatically update with icons and styles based on task priority and urgency following the Eisenhower Matrix.

### Step-by-Step

#### Step 1: Determine project status based on the Eisenhower Matrix

First, delete the placeholder project folder you created at the end of [Part 2](#automating-custom-tab-headers-part-2-custom-icons-and-styling).

Then, open up `_templates/work/dashboard_template.md` in source mode and add the following at the bottom:

!!! example "`_templates/work/dashboard_template.md`"

    ````markdown
    ```dataviewjs
    // Find the tasks
    const tasks = dv.pages().file.tasks
        .where(t => !t.completed && t.description && t.description.length > 0 && t.path.includes(dv.current().file.folder));

    // Define the quadrants
    let urgencyThreshold = 2;
    let quadrants = {
        "urgent important": 0,
        "urgent not-important": 0,
        "not-urgent important": 0,
        "not-urgent not-important": 0
    };

    // Count tasks by quadrant
    for (const task of tasks) {
        const urgent = task.due && moment(task.due).diff(moment(), 'days') <= urgencyThreshold;
        const important = task.priority && ["A", "1", "high"].includes(task.priority.toLowerCase());

        if (urgent && important) quadrants["urgent important"]++;
        else if (urgent) quadrants["urgent not-important"]++;
        else if (important) quadrants["not-urgent important"]++;
        else quadrants["not-urgent not-important"]++;
    }

    // Determine dominant quadrant
    let dominantClass;
    const total = Object.values(quadrants).reduce((a, b) => a + b, 0);

    // Output a status class like 'urgent important' or 'no-tasks'
    if (total === 0) {
        dominantClass = "no-tasks";
    } else {
        dominantClass = Object.entries(quadrants).reduce((a, b) => b[1] > a[1] ? b : a)[0];
    }
    ```
    ````

This code calculates the dominant task quadrant and assigns a classification.

#### Step 2: Auto-update frontmatter

Now let's bind the calculated status to your file's frontmatter using Meta Bind.

Append this right after the code from the previous step:

!!! example "`_templates/work/dashboard_template.md`"

    ````markdown
    ```dataviewjs
    // Content from the previous step here...

    // Bind to frontmatter using Meta Bind API
    const mb = app.plugins.getPlugin('obsidian-meta-bind-plugin')?.api;

    if (mb) {
        const bindTarget = mb.parseBindTarget('tab_main_title_class', dv.current().file.path);
        mb.setMetadata(bindTarget, dominantClass);
    }
    ```
    ````

This sets the `tab_main_title_class` frontmatter value dynamically based on your task matrix.

#### Step 3: Prevent manual overrides

Now that the `tab_main_title_class` value is generated automatically, we need to remove the manual input to avoid conflicts.

??? note "Test to see the conflict in action (click to expand)"
    Switch back to reading mode, go to the `Work/Dashboard` file, and click the **Add new project** button. Now watch your frontmatter `tab_main_title_class` value change to `no-tasks` automatically (since there are no tasks assigned yet).

    The problem with this is, now that we have the the auto generated value, if you go into the Meta Bind input box for the `tab_main_title_class` and change it, the logic you just wrote will automatically change the value back to `no-tasks`. This makes that input box useless, so you neeed to do remove that input.

    Once again, delete the new project you just generated.

Open `_templates/work/custom_tab_header_edit_template.md` in source mode and remove the following lines:

!!! example "`_templates/work/custom_tab_header_edit_template.md`"

    ````markdown
    ```dataviewjs
    > tab_main_title_class:
    > 
    > `INPUT[text(class(meta-bind-full-width)):tab_main_title_class]`
    ```
    ````

This ensures that the user can't accidentally override the auto-generated value from the matrix logic.

#### Step 4: Generate a real project

You're now ready to generate your first real project.

1. Open `Work/Dashboard.md`.
2. Switch to reading mode.
3. Click the **Add new project** button.
4. Enter a project name when prompted.
5. Your new workspace appears intantly, fully configured.

You should now see `tab_main_title_class` auto-populate with the correct value: `no-tasks`, unless you've already assigned tasks.

---

## Automating Custom Tab Headers — Part 4: Results

### Final Outcome

Your tab headers now adapt automatically based on project priorities. No more manual toggling. Just clear, dynamic status indicators driven by your real task data.

=== "With Custom Tab Headers"

    ![Custom tab headers with automated tabs example]()

=== "Without"

    ![Custom tab headers without automated tabs example]()

### Wrap-Up

You now have a fully automated system for:

- Creating new project workspaces
- Styling tab headers based on task priority
- Dynamically updating frontmatter
- Visualizing project status at a glance

Time to focus on what actually matters: **doing the work**.
