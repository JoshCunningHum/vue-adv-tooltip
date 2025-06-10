<script lang="ts">
import { dev, TT_TRIGGER } from "@/constants";
import { TooltipStyles } from "@/types/common";
import { set, useElementSize, watchImmediate } from "@vueuse/core";
import { computed, onMounted, useTemplateRef } from "vue";
import Coord from "../Debug/Coord.vue";
import { AdvTooltipProps, injectAdvTooltipContext } from "../Tooltip/AdvTooltip.vue";
import { setpos } from "../utils/pos";
import { serializehtml } from "../utils/serialize";
import { useTipLocking } from "./locking";
import { useTipCompute } from "./positioning";

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
    id,
} = context;

// Handle Locking
useTipLocking({ options });

// Check for any trigger
const nested = context.nested;
function checkNested() {
    const c = container.value;
    if (!c) return;

    const trigger = c.querySelector(`.${TT_TRIGGER}`);
    set(nested, !!trigger);
}

onMounted(checkNested);
</script>

<template>
    <div
        class="origin-point"
        :class="[theme.originPoint, locked && theme.originPointLocked]"
        :style="{ left: lock.x.value + 'px', top: lock.y.value + 'px' }"
    >
        <div class="backdrop" :class="options.backdropClassOnLock"></div>
        <div
            class="_container"
            :style="{
                left: -shift.x + 'px',
                top: -shift.y + 'px',
            }"
            :class="[theme.container, locked && theme.containerLocked]"
            @mouseenter="tip = true"
            @mouseleave="tip = false"
            ref="container"
        >
            <div class="content" :class="[theme.content, locked && theme.contentLocked]">
                <slot />
            </div>
        </div>
        <template v-if="dev">
            <Coord :data="lock" />
            <Coord :data="normal" color="border-purple-500" />
            <pre
                class="debug text-xs absolute bg-neutral-950/80"
                :style="{ top: shift.y + containerSize.height.value + 'px', left: -shift.x + 'px' }"
                v-html="
                    serializehtml({
                        shift,
                        locked,
                        tip,
                        trigger,
                        nested,
                        normal,
                        lock,
                        dir,
                        ogdir: props.options.direction,
                        id,
                    })
                "
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

._container {
    @apply w-max;
    @apply absolute;
}
</style>
