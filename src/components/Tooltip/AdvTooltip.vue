<script lang="ts">
import { TooltipDirection, TooltipOptionBase } from "@/types/common";
import { createContext } from "../utils/createContext";
import { extposref, pos, setpos } from "../utils/pos";
import { removeUndefineds } from "../utils/sanitize";

export interface AdvTooltipProps extends Omit<TooltipOptionBase, "text"> {
    preload?: boolean;
    text?: string;
}

export interface AdvTooltipSlots {
    default(): any;
    tip(props: { hovered: boolean; locked: boolean }): any;
}

// Tooltip Context
type V = {
    x: Ref<number>;
    y: Ref<number>;
};
export interface AdvTooltipContext {
    id: string;
    /**
     * Stores 2 states:
     *  - Hovering the trigger
     *  - Hovering the tip
     *
     * * Tooltip appears when:
     * - Mouse hovers on the trigger
     *
     * * Tooltip hides when:
     * - Mouse is not hovering on trigger and,
     * - Mouse is not hovering on tooltip
     */
    hover: {
        trigger: Ref<boolean>;
        tip: Ref<boolean>;
    };
    origin: {
        normal: V;
        locked: V;
    };
    dir: {
        normal: Ref<TooltipDirection>;
        locked: Ref<TooltipDirection>;
    };
    locked: Ref<boolean>;
    stacked: Ref<boolean>;
    nested: Ref<boolean>;
    containerSize: V;
}

export const [injectAdvTooltipContext, provideAdvTooltipContext] =
    createContext<AdvTooltipContext>("AdvTooltip");
</script>

<script setup lang="ts">
import { TT_DEFAULTS, TT_TELEPORT_ID } from "@/constants";
import { useAdvTipHelper } from "@/types/state.tip";
import { set, syncRef, useParentElement, useTimeoutFn } from "@vueuse/core";
import { computed, ref, Ref, useId, useTemplateRef, watch } from "vue";
import Tip from "../Tip/Tip.vue";
import { useTriggerBinder } from "./triggerhover";

const props = defineProps<AdvTooltipProps>();
const slots = defineSlots<AdvTooltipSlots>();
const id = useId();

// # Prepare context
const hover = {
    trigger: ref(false),
    tip: ref(false),
};

const locked = ref(false);
const origin = {
    normal: pos(),
    locked: pos(),
};

const dir = {
    normal: ref(props.direction || "auto"),
    locked: ref(props.direction || "auto"),
};

// Sync origin-locked with origin-normal unless lock is true
watch(extposref(origin.normal), ([x, y]) => {
    if (locked.value) return;
    setpos(origin.locked, x, y);
});

// Sync dir-locked with dir-normal unless lock is true
watch(dir.normal, (value) => {
    if (locked.value) return;
    set(dir.locked, value);
});

const nested = ref(false);
const stacked = ref(false);
const containerSize = pos(1, 1);

// # Provide context
const context = provideAdvTooltipContext({
    hover,
    id,
    locked,
    nested,
    stacked,
    origin,
    dir,
    containerSize,
});

const { theme: layerTheme, inStack, options: layerOptions } = useAdvTipHelper(context);

const theme = computed(() => Object.assign({}, TT_DEFAULTS.theme, layerTheme.value, props.theme));
syncRef(stacked, inStack, { direction: "rtl" });

const options = computed(() =>
    Object.assign({}, TT_DEFAULTS, layerOptions.value, removeUndefineds({ ...props }))
);

// # Handle Trigger Event Bindings
const _left = useTemplateRef("left-bound");
const _right = useTemplateRef("right-bound");
const parent = useParentElement();

// # Trigger hovering (with delay)
const showDelayMS = computed(() => options.value.delayMs || 0);
const { start: showTrigger } = useTimeoutFn(() => set(hover.trigger, true), showDelayMS, {
    immediate: false,
});

useTriggerBinder({
    leftBound: _left,
    rightBound: _right,
    parent,
    event: {
        mouseEnter: showTrigger,
        mouseLeave: () => set(hover.trigger, false),
    },
});

// # Show the tip
const shown = computed(() => hover.tip.value || hover.trigger.value || inStack.value);
</script>

<template>
    <span class="bound" ref="left-bound" :id="id + 'left'" />
    <slot name="default" />
    <span class="bound" ref="right-bound" :id="id + 'right'" />

    <Teleport :to="'#' + TT_TELEPORT_ID" defer>
        <Tip v-if="shown" :theme :options>
            <slot name="tip" :hovered="hover.tip.value" :locked>
                {{ props.text || "" }}
            </slot>
        </Tip>
    </Teleport>
</template>

<style lang="scss" scoped>
span.bound {
    @apply hidden !important;
}
</style>
