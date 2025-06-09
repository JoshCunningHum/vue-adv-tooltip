// Another whole file for detecting wether the tooltip is still activated or not
// * Why?
// * The tooltip can be nested, if gets 'locked', the mouse pointer can go outside the trigger
// * There are 2 ways this can happen:
// * - When the mouse pointer go towards the tooltip
// * - When the mouse pointer go away from the tooltip, essentially deactivating the tooltip
// * Computations are needed to decide wether the tooltip should remain activated or not
// * Along with should the tooltip should still follow the mouse pointer (because how would the user able to hover the tooltip when it always move based on mouse position?)

// This also fixes another small issue, when there is no offset, the tooltip will occasionally go above the trigger, causing the trigger to 'mouseout'. It shouldn't 'mouseout'

import { TooltipDirection } from "@/types/common";
import { useSharedMouse } from "@/types/state";
import { set, watchImmediate } from "@vueuse/core";
import { computed, MaybeRefOrGetter, toValue } from "vue";
import { AdvTooltipProps, injectAdvTooltipContext } from "../Tooltip/AdvTooltip.vue";
import { normalizeOptions } from "../utils/extractor.options";
import { extpos, setpos } from "../utils/pos";
import { getScreenSize } from "../utils/screen";
import { mMult, vAdd } from "../utils/vector";

export const DIR_VECTORS: Record<TooltipDirection, [number, number]> = {
    auto: [1, 1], // Set the default by bottom right
    botleft: [-1, 1],
    botright: [1, 1],
    topleft: [-1, -1],
    topright: [1, -1],
};

interface TooltipActivationProps {
    options: MaybeRefOrGetter<AdvTooltipProps>;
}

export const useTipCompute = ({ options: _options }: TooltipActivationProps) => {
    const context = injectAdvTooltipContext();
    const options = computed(() => normalizeOptions(toValue(_options)));

    // Mouse Data
    const { x: mx, y: my } = useSharedMouse();

    // Final DIR
    const dir = computed(() => {
        const screen = getScreenSize();

        const [cW] = extpos(context.containerSize);

        // Compute final tooltip direction
        const dir = options.value.direction!;
        const offset = options.value.offset! as [number, number];
        const mouse = [mx.value, my.value] as [number, number];

        const attemptOffset = mMult(offset, DIR_VECTORS[dir]);
        const attemptOrigin = vAdd(mouse, attemptOffset);
        const cRight = attemptOrigin[0] + cW;

        const isOverlapRight = cRight > screen.w;

        const vAlign = dir.includes("top") ? "top" : "bot";
        const hAlign = dir.includes("left") === isOverlapRight ? "right" : "left";

        const finalDir = (vAlign + hAlign) as TooltipDirection;

        // Update context
        set(context.dir.normal, finalDir);

        return finalDir;
    });

    // Update the original-normal (not locked)
    watchImmediate([dir, mx, my], ([finalDir, mx, my]) => {
        const offset = options.value.offset! as [number, number];
        const mouse = [mx, my] as [number, number];

        const finalOffset = mMult(DIR_VECTORS[finalDir], offset);
        const [ox, oy] = vAdd(mouse, finalOffset);

        // Update context
        setpos(context.origin.normal, ox, oy);
    });

    const shift = computed(() => {
        const screen = getScreenSize();
        const [cW, cH] = extpos(context.containerSize);
        const _dir = dir.value;
        const [_, oy] = extpos(context.origin.locked);

        // Shifting
        const xShift = _dir.includes("left") ? cW : 0;
        const yShift = _dir.includes("bot")
            ? Math.min(0, screen.h - (oy + cH)) * -1
            : cH + Math.min(0, oy - cH);

        return { x: xShift, y: yShift };
    });

    return { shift, dir };
};
