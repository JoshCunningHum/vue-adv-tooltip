import { TooltipStackItem } from "@/components/TooltipLayer/TooltipLayer.vue";
import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";
import { useSharedMouse } from "./state";

//
interface AdvLayerHelperProps {}

const AdvLayerHelper = ({}: AdvLayerHelperProps) => {
    const { x: mx, y: my } = useSharedMouse();

    // # Layer Context
    const theme = ref({});
    const stack = ref<TooltipStackItem[]>([]);
    const top = computed(() => stack.value.at(-1));

    return {
        mx,
        my,
        context: {
            theme,
            stack,
            top,
        },
    };
};

export const useAdvLayerHelper = createSharedComposable(AdvLayerHelper);
