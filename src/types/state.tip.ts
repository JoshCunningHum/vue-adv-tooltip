import { AdvTooltipContext } from "@/components/Tooltip/AdvTooltip.vue";
import { TooltipStackItem } from "@/components/TooltipLayer/TooltipLayer.vue";
import { computed, onBeforeUnmount, ref } from "vue";
import { useAdvLayerHelper } from "./state.layer";

const AdvTipHelper = ({ id, hover, locked, nested, origin }: AdvTooltipContext) => {
    const {
        context: { data, theme },
    } = useAdvLayerHelper({});

    const stackItem = computed<TooltipStackItem>(() => ({ component: true, id }));

    /**
     * What index of the stack is the current tooltip.
     * Used for determining z-index;
     */
    const index = ref(-1);

    // Shown when either mouse on trigger or until the mouse has not gone away from the trigger

    // When mouse hovers on a trigger, wait for it to go 'away' to the trigger

    const add = () => {};
    const remove = () => {};

    // Auto-remove when unmounted
    onBeforeUnmount(remove);

    return {
        index,
        theme,

        add,
        remove,
    };
};

// Used to be shared composable
export const useAdvTipHelper = AdvTipHelper;
