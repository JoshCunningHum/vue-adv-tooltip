import { InjectionKey } from "vue";
import { TooltipPluginOptions } from "./types/plugin";
import { TooltipOptionBase } from "./types/common";

export const TT_TRIGGER = "__tooltipable__item__";
export const TT_TIP = "__tooltip__container__";
export const TT_TELEPORT_ID = "__tooltips__layer__";

export const TT_CONFIG_KEY: InjectionKey<TooltipPluginOptions> = Symbol("___adv_tooltip___");

export const TT_MOUSE_HISTORY_DELAY = 4; // Use for calculating mouse direction
export const TT_RENDER_DELAYS_MS = 10; // Use for 'waiting' for render updates

// Default Tooltip Options
export const TT_DEFAULTS: TooltipOptionBase = {
    text: "", // Doesn't matter
    offset: [8, 8],
    direction: "auto",
    delayMs: 250,
    theme: {
        container: "",
        content: "text-xs border rounded-md border-neutral-600 bg-neutral-800 p-2",
        originPoint: "",

        contentLocked: "!border-transparent shadow-[inset_0px_0px_35px_-15px_#00d0ff]",
    },
};

// DEV
// export const dev = import.meta.env.DEV;
export const dev = false;
