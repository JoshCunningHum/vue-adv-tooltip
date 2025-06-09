<script lang="ts">
import { TooltipStyles } from "@/types/common";
import { useElementSize, watchImmediate } from "@vueuse/core";
import { computed, useTemplateRef } from "vue";
import { AdvTooltipProps, injectAdvTooltipContext } from "../Tooltip/AdvTooltip.vue";
import { setpos } from "../utils/pos";
import { serializehtml } from "../utils/serialize";
import { useTipLocking } from "./locking";
import { useTipCompute } from "./positioning";
import Coord from "../Debug/Coord.vue";
import { dev } from "@/constants";

export interface TipProps {
    options: AdvTooltipProps;
    theme: TooltipStyles;
}
</script>

<script setup lang="ts">
const props = defineProps<TipProps>();
const context = injectAdvTooltipContext();

const theme = computed<TooltipStyles>(() => Object.assign({}, props.theme, props.options.theme));
const options = computed(() => props.options);

// Get container size
const container = useTemplateRef("container");
const containerSize = useElementSize(container);
watchImmediate([containerSize.height, containerSize.width], ([y, x]) =>
    setpos(context.containerSize, x, y)
);

// Compute origin positioning
const { shift, dir } = useTipCompute({ options });
const {
    origin: { locked: lock, normal },
    hover: { tip, trigger },
    locked,
} = context;

// Handle Locking
useTipLocking({ options });
</script>

<template>
    <div
        class="origin-point"
        :class="[theme.originPoint]"
        :style="{ left: lock.x.value + 'px', top: lock.y.value + 'px' }"
    >
        <div class="backdrop" :class="options.backdropClassOnLock"></div>
        <div
            class="t-container"
            :style="{
                top: -shift.y + 'px',
                left: -shift.x + 'px',
            }"
            :class="[theme.container, { locked }]"
            @mouseenter="tip = true"
            @mouseleave="tip = false"
            ref="container"
        >
            <div class="content text-xs" :class="theme.content">
                <slot />
            </div>
        </div>
        <template v-if="dev">
            <Coord :data="lock" />
            <Coord :data="normal" color="border-purple-500" />
            <pre
                class="debug text-xs absolute bg-neutral-950/80"
                :style="{ top: shift.y + containerSize.height.value + 'px', left: -shift.x + 'px' }"
                v-html="serializehtml({ shift, locked, tip, trigger, normal, lock, dir })"
            />
        </template>
    </div>
</template>

<style lang="scss" scoped>
// Will not be using scss nested classes to avoid specificity prioritazation of CSS

.origin-point {
    @apply absolute w-px h-px;
    @apply overflow-visible;
}

.t-container {
    @apply w-max;
    @apply absolute;

    &.locked {
    }
}

.content {
}
.backdrop {
}
</style>
