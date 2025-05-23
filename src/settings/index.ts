export interface CustomTabHeaderSettings {
    enableCustomTabHeader: boolean;
    globalTitleClass: string;

    enableMainTitle: boolean;
    mainTitleMode: 'basename' | 'frontmatter';
    mainTitleKey: string;
    mainTitleClassMode: 'global' | 'frontmatter';
    mainTitleClassKey: string;

    enableSecondaryTitle: boolean;
    secondaryTitleMode: 'folder' | 'frontmatter';
    secondaryTitleKey: string;
    secondaryTitleClassMode: 'global' | 'frontmatter';
    secondaryTitleClassKey: string;

    enableTooltip: boolean;
    tooltipMode: 'basename' | 'path' | 'frontmatter';
    tooltipKey: string;
}

export const DEFAULT_SETTINGS: CustomTabHeaderSettings = {
    enableCustomTabHeader: true,
    globalTitleClass: '',

    enableMainTitle: true,
    mainTitleMode: 'basename',
    mainTitleKey: 'tab_main_title',
    mainTitleClassMode: 'global',
    mainTitleClassKey: 'tab_main_title_class',

    enableSecondaryTitle: true,
    secondaryTitleMode: 'folder',
    secondaryTitleKey: 'tab_secondary_title',
    secondaryTitleClassMode: 'global',
    secondaryTitleClassKey: 'tab_secondary_title_class',

    enableTooltip: true,
    tooltipMode: 'basename',
    tooltipKey: 'tab_tooltip',
};
