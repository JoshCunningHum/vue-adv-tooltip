// Options you pass when doing app.use(TooltipPlugin, { ...options })

// ? Add Global Tooltip Options? Like the delay etc etc. Although those things are already configurable in the tooltip layer
export interface TooltipPluginOptions {
    componentName?: string;
    directiveName?: string;
    unstyled?: boolean;
}

export const DefaultPluginOption: TooltipPluginOptions = {};
