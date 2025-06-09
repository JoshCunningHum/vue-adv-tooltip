<script lang="ts">
type Coord = { x: number; y: number } | { x: Ref<number>; y: Ref<number> } | [number, number];

export interface DebugCoordProps {
    data: Coord;
    color?: string;
    opacity?: number;
}
</script>

<script setup lang="ts">
import { TT_TELEPORT_ID } from "@/constants";
import { computed, isRef, Ref } from "vue";

const props = defineProps<DebugCoordProps>();

const coords = computed(() => {
    const data = props.data;
    if (Array.isArray(data)) return { x: data[0], y: data[1] };
    if (isRef(data.x) && isRef(data.y)) return { x: data.x.value, y: data.y.value };
    return data as { x: number; y: number };
});

const color = computed(() => props.color || "border-orange-500");
const opacity = computed(() => props.opacity || 0.2);
</script>

<template>
    <Teleport :to="'#' + TT_TELEPORT_ID" defer>
        <div
            class="coord horizontal"
            :class="[color, coords.y]"
            :style="{ top: coords.y + 'px', opacity }"
        />
        <div
            class="coord vertical"
            :class="[color, coords.x]"
            :style="{ left: coords.x + 'px', opacity }"
        />
    </Teleport>
</template>

<style lang="scss" scoped>
.coord {
    @apply absolute border -z-50 pointer-events-none;

    &.horizontal {
        @apply w-screen left-0 right-0 h-px;
    }

    &.vertical {
        @apply h-screen top-0 bottom-0 w-px;
    }
}
</style>
