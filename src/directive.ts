import { Directive } from "vue";
import {
    TooltipDirection,
    TooltipDirectiveOptions,
    TooltipOptionBase,
} from "./types/common";

export const vTooltip: Directive<
    HTMLElement,
    TooltipDirectiveOptions,
    TooltipDirection
> = (el, { dir, modifiers, value }) => {
    const inp =
        typeof value === "object"
            ? value
            : ({ text: `${value}` } as TooltipOptionBase);

    let { direction } = inp;

    // Apply direction modifier
    // Usage: v-tip.right="{...}"
    // TODO: Add this information in the README
    if (!direction) {
        direction =
            (Object.keys(modifiers).find(
                (k) => modifiers[k as TooltipDirection]
            ) as TooltipDirection) || "auto";
    }

    if (dir.created) {
        // TODO: Create a more sophisticated way of tooltip registration
        el.dataset.__TOOLTIP__ = JSON.stringify(inp);
    }

    if (dir.updated) {
    }
};
