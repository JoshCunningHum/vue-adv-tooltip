// Dictates the whole locking and origin-locked compoutation of tooltips

import { TT_DEFAULTS } from "@/constants";
import { useSharedMouse } from "@/types/state";
import { onKeyStroke, set, toRefs, useTimeoutFn, watchImmediate } from "@vueuse/core";
import { computed, MaybeRefOrGetter, onBeforeMount, onBeforeUnmount, toValue, watch } from "vue";
import { AdvTooltipProps, injectAdvTooltipContext } from "../Tooltip/AdvTooltip.vue";
import { normalizeOptions } from "../utils/extractor.options";
import { extpos, setpos } from "../utils/pos";
import { mMult, vAdd } from "../utils/vector";
import { DIR_VECTORS } from "./positioning";

interface TipLockingProps {
    options: MaybeRefOrGetter<AdvTooltipProps>;
}

export const useTipLocking = ({ options: _options }: TipLockingProps) => {
    const options = computed(() => normalizeOptions(toValue(_options)));
    const {
        hover,
        locked,
        stacked,
        origin: { locked: origin, normal: originNormal },
        dir: { locked: dir },
        containerSize: size,
        nested,
    } = injectAdvTooltipContext();

    // TODO: Add a check to force-lock on unnested tooltips
    const lock = () => nested.value && set(locked, true);

    // # Locked MS Delay
    const delay = computed(() => options.value.delayMs || TT_DEFAULTS.delayMs!);
    const { start, stop } = useTimeoutFn(lock, delay);

    // When hovering the trigger, wait for DEFAULT_SECONDS to lock
    watchImmediate(hover.trigger, (hovered) => {
        if (locked.value) return;
        if (hovered) start();
        else stop();
    });

    // # Locked on key
    // ? Note: this is not reactive because why? When I see a usecase is provided for a changing-lock-key, I will create a watcher for this
    if (options.value.lockKey) {
        console.log(options.value.unlockKey);
        onKeyStroke(
            options.value.lockKey,
            () => {
                if (!locked.value) lock();
            },
            { dedupe: true }
        );
    }

    // # Unlock on key
    if (options.value.unlockKey) {
        onKeyStroke(
            options.value.unlockKey,
            () => {
                console.log("test");
                if (locked.value) set(locked, false);
            },
            { dedupe: true }
        );
    }

    // Compute mouse direction for follow / lock of container
    const { w: cbW, h: cbH } = toRefs(
        computed(() => {
            const dirvector = DIR_VECTORS[dir.value];
            const relbounds = mMult(extpos(size), dirvector);
            const [w, h] = vAdd(extpos(origin), relbounds);
            return { w, h };
        })
    );

    const { ndx, ndy, lx, ly } = useSharedMouse();
    watch(
        [lx, ly],
        ([mx, my]) => {
            // Disable syncing when hovering on tip
            if (hover.tip.value || stacked.value) return;

            // Container bounds
            const [cl, ct] = extpos(origin);
            const [cr, cb] = extpos(cbW, cbH);

            // Mouse normalized dx/dy
            const [dx, dy] = extpos(ndx, ndy);

            // Get the target change
            const tx = mx < cl ? 1 : mx > cr ? -1 : 0;
            const ty = my < ct ? 1 : my > cb ? -1 : 0;

            // Compare the projected mouse dx/dy
            const sx = tx === 0 || dx === 0 || tx === dx;
            const sy = ty === 0 || dy === 0 || ty === dy;

            // If at least 1 axis is false, sync the mouse
            if (!sx || !sy) setpos(origin, originNormal);
        },
        // ? Might want to disable this, it messes up with HMR and could affect development -- Needs more testing
        { flush: "pre" } // Prevent the tooltip from moving at more tick
    );

    // Unlock when trigger and tip is unhovered
    watch(
        [hover.tip, hover.trigger],
        async () => {
            if (hover.tip.value || hover.trigger.value || stacked.value) return;
            set(locked, false);
        },
        {
            flush: "post",
        }
    );

    onBeforeUnmount(() => set(locked, false));
    onBeforeMount(() => set(locked, false));
};
