<script lang="ts">
import { TooltipDirectiveOptions, TooltipOptionBase, TooltipStyles } from "@/types/common";
import { useAdvLayerHelper } from "@/types/state.layer";
import { useParentElement, watchImmediate, whenever } from "@vueuse/core";
import { serializehtml } from "../utils/serialize";

export interface TooltipLayerProps extends Omit<TooltipOptionBase, "text"> {
    preload?: boolean;
    clipParent?: boolean;
}

// # Tooltip stack
export type TooltipComponentStackItem = {
    // A placeholder, will be adding more fields later
    component: true;
};

export type TooltipDirectiveStackItem = {
    data: TooltipDirectiveOptions;
};

export type TooltipStackItem = { id: string } & (
    | TooltipComponentStackItem
    | TooltipDirectiveStackItem
);

export interface TooltipStackData {
    stack: TooltipStackItem[];
    top?: TooltipStackItem;
}

// # Layer Context
export interface TooltipLayerContext {
    theme: Ref<TooltipStyles>;
    stack: Ref<TooltipStackItem[]>;
    top?: ComputedRef<TooltipStackItem | undefined>;
}
</script>

<script setup lang="ts">
import { dev, TT_CONFIG_KEY, TT_DEFAULTS, TT_TELEPORT_ID } from "@/constants";
import { computed, ComputedRef, inject, nextTick, Ref, watch } from "vue";

const props = defineProps<TooltipLayerProps>();

// Theme
const config = inject(TT_CONFIG_KEY) || {};
const layerTheme = computed(() => props.theme || {});
const theme = computed(() =>
    Object.assign({}, config.unstyled ? {} : TT_DEFAULTS.theme, layerTheme.value)
);

const parent = useParentElement();
whenever(
    () => props.clipParent,
    async () => {
        await nextTick();
        parent.value!.style.overflow = "clip";
    },
    { immediate: true }
);

// Register  theme in the stack
const { context } = useAdvLayerHelper({});
watchImmediate(
    () => props,
    (v) => (context.options.value = { ...v, theme: theme.value })
);

// Stack
const { stack, top } = context;
</script>

<template>
    <div class="tooltiplayer" :id="TT_TELEPORT_ID"></div>
    <Teleport :disabled="!dev" defer to="#dev-display" v-if="dev">
        <pre id="dev-stack-display" class="text-xs" v-html="serializehtml({ stack, top })" />
    </Teleport>
</template>

<style lang="scss" scoped>
.tooltiplayer {
    @apply relative w-0 h-0;
    @apply overflow-visible;
    @apply z-50;
}
</style>
