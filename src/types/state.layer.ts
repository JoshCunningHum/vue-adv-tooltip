import { createSharedComposable } from "@vueuse/core";
import { useSharedMouse } from "./state";
import { TooltipLayerContext } from "@/components/TooltipLayer/TooltipLayer.vue";
import { ref } from "vue";

//
interface AdvLayerHelperProps {}

const AdvLayerHelper = ({}: AdvLayerHelperProps) => {
    const { x: mx, y: my } = useSharedMouse();

    // # Layer Context
    const context: TooltipLayerContext = {
        theme: ref({}),
        data: ref({ stack: [], top: undefined }),
    };

    return {
        mx,
        my,
        context,
    };
};

export const useAdvLayerHelper = createSharedComposable(AdvLayerHelper);
