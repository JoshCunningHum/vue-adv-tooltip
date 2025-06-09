// Contains global tooltip state management

import { TT_MOUSE_HISTORY_DELAY } from "@/constants";
import { createSharedComposable, toRefs, useMouse, useRefHistory } from "@vueuse/core";
import { computed } from "vue";

export const useSharedMouse = createSharedComposable(() => {
    const { x: mx, y: my } = useMouse();
    const { history: hx } = useRefHistory(mx, { capacity: TT_MOUSE_HISTORY_DELAY });
    const { history: hy } = useRefHistory(my, { capacity: TT_MOUSE_HISTORY_DELAY });

    // Record Last X,Y for dx/dy

    const lx = computed(() => hx.value.at(-1)!.snapshot);
    const ly = computed(() => hy.value.at(-1)!.snapshot);

    const { x: dx, y: dy } = toRefs(
        computed(() => ({
            x: mx.value - lx.value,
            y: my.value - ly.value,
        }))
    );

    // Normalize dx/dy
    const { x: ndx, y: ndy } = toRefs(
        computed(() => ({
            x: Math.sign(dx.value),
            y: Math.sign(dy.value),
        }))
    );

    return {
        x: mx,
        y: my,
        lx,
        ly,
        dx,
        dy,
        ndx,
        ndy,
    };
});
