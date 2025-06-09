import { AdvTooltipContext } from "@/components/Tooltip/AdvTooltip.vue";
import { computed, onBeforeUnmount, watch } from "vue";
import { useAdvLayerHelper } from "./state.layer";
import { promiseTimeout, whenever } from "@vueuse/core";
import { clone } from "@/components/utils/clone";
import { TT_RENDER_DELAYS_MS } from "@/constants";

const AdvTipHelper = ({ id, hover, locked, nested, origin }: AdvTooltipContext) => {
    const { context: _ } = useAdvLayerHelper({});
    const { stack, theme, top } = _;

    /**
     * What index of the stack is the current tooltip.
     * Used for determining z-index;
     */
    const index = computed(() => stack.value.findIndex((i) => i.id === id));
    const inStack = computed(() => index.value !== -1);

    const add = () => {
        // Check if already in the stack
        if (index.value !== -1) return;
        console.log(`Adding ${id}`);

        if (top.value?.id === id) return; // Ignore when already on top of stack
        stack.value.push({ id, component: true });
    };
    const remove = () => {
        if (index.value === -1) return;
        console.log(`Removing ${id}`);
        stack.value.splice(index.value, 1);
    };

    /**
     * Add condition:
     * - When the tooltip is hovered: add in the stack
     */
    whenever(hover.tip, add, { flush: "pre" });

    // Execute when closing a child/nested tooltip (changing the 'top')
    // Check if it is still 'hovering' on the parent (this)
    watch(top, (top) => {
        if (hover.tip.value) return;
        if (top?.id !== id) return;
        remove();
    });

    watch(
        hover.tip,
        async (onTip) => {
            /**
             * Remove condition
             * - When trigger gets unmounted
             * - When tip is not hovered anymore and not on the stack but also not on top
             */

            if (onTip) return;

            await promiseTimeout(TT_RENDER_DELAYS_MS);

            const topId = top.value?.id;
            console.log(`Attempt remove: ${id}`, clone(stack.value));

            if (inStack.value && topId !== id) return;

            remove();
        },
        {
            flush: "post",
        }
    );

    // Auto-remove when unmounted
    onBeforeUnmount(remove);

    return {
        index,
        theme,
        inStack,

        add,
        remove,
    };
};

// Used to be shared composable
export const useAdvTipHelper = AdvTipHelper;
