// Contains global tooltip state management

import { TT_MOUSE_HISTORY_DELAY } from "@/constants";
import { createSharedComposable, reactify, useMouse, useRefHistory } from "@vueuse/core";
import { computed } from "vue";

export const useSharedMouse = createSharedComposable(() => {
    const { x: mx, y: my } = useMouse();
    const { history: hx } = useRefHistory(mx, { capacity: TT_MOUSE_HISTORY_DELAY });
    const { history: hy } = useRefHistory(my, { capacity: TT_MOUSE_HISTORY_DELAY });

    // Record Last X,Y for dx/dy
    const lx = computed(() => hx.value.at(-1)!.snapshot);
    const ly = computed(() => hy.value.at(-1)!.snapshot);

    const dx = computed(() => mx.value - lx.value);
    const dy = computed(() => my.value - ly.value);

    // Normalize dx/dy
    const MathSign = reactify(Math.sign);
    const ndx = MathSign(dx);
    const ndy = MathSign(dy);

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
