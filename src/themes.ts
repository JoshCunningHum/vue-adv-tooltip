// Preset Themes

import { TooltipStyles } from "./types/common";

const stellaris: TooltipStyles = {
    // tw
    container: "text-xs p-0.5 century-gothic bg-neutral-900/80",
    containerLocked: "shadow-[inset_0px_0px_25px_-12px_#00d0ff]",

    // tw
    content: "py-2 px-6 border border-[#30584a]",
    // tw
    contentLocked: ` `,

    // tw
    originPoint: "",
    originPointLocked: "",
};

// TODO: Add Baldur's Gate 3 Tooltip Theme
const bg3: TooltipStyles = {};

export const theme = {
    stellaris,
    bg3,
};
