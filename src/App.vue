<script setup lang="ts">
import Coord from "./components/Debug/Coord.vue";
import AdvTooltip from "./components/Tooltip/AdvTooltip.vue";
import TooltipLayer from "./components/TooltipLayer/TooltipLayer.vue";
import { serializehtml } from "./components/utils/serialize";
import { useSharedMouse } from "./types/state";

const { ndx, ndy, lx, ly, x, y } = useSharedMouse();
</script>

<template>
    <TooltipLayer clip-parent />
    <div class="h-screen root w-screen">
        <div class="cont h-full">
            <div class="flex">
                <AdvTooltip>
                    <div class="w-min">Static Test</div>
                    <template #tip="{ locked }">
                        <div
                            :class="{
                                'border border-red-500': locked,
                            }"
                        >
                            Wow great!
                        </div>
                    </template>
                </AdvTooltip>
                <AdvTooltip>
                    <div>Nested Test</div>
                    <template #tip="{ locked }">
                        <div :class="[locked && 'border border-red-500']">
                            Hover here, there is a toooltip below
                            <br />
                            <AdvTooltip>
                                <div :class="[locked && 'border border-red-500']" class="underline">
                                    This is the tooltip
                                </div>
                                <template #tip="{ locked }">
                                    <div>This is a tooltip inside tooltip</div>
                                    <AdvTooltip>
                                        <div
                                            :class="[locked && 'border border-red-500']"
                                            class="underline"
                                        >
                                            What if you hover here?
                                        </div>
                                        <template #tip="{ locked }">
                                            <div :class="[locked && 'border border-red-500']">
                                                A very nested tooltip
                                            </div>
                                        </template>
                                    </AdvTooltip>
                                </template>
                            </AdvTooltip>
                        </div>
                    </template>
                </AdvTooltip>
            </div>
            <div class="grow items-center justify-center flex">
                <AdvTooltip>
                    <div class="w-min">Center Test</div>
                    <template #tip>
                        <div>This is the tooltip</div>
                    </template>
                </AdvTooltip>

                <AdvTooltip>
                    <div>Nested Test</div>
                    <template #tip>
                        <div>
                            Hover here, there is a toooltip below
                            <br />
                            <AdvTooltip>
                                <div class="underline">This is the tooltip</div>
                                <template #tip>
                                    <div>Nested Tooltip</div>
                                </template>
                            </AdvTooltip>
                        </div>
                    </template>
                </AdvTooltip>
            </div>
            <div class="flex">
                <AdvTooltip>
                    <div class="w-min ml-auto">Static Test</div>
                    <template #tip>
                        <div class="">Wow great!</div>
                    </template>
                </AdvTooltip>
            </div>
            <div class="flex justify-between items-center" id="dev-display">
                <pre class="text-xs" v-html="serializehtml({ ndx, ndy })" />
            </div>
            <Coord :data="[lx, ly]" color="border-cyan-400" />
            <Coord :data="[x, y]" color="border-green-400" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.root {
    @apply p-2;
    @apply bg-neutral-800 text-white;

    .cont {
        @apply flex gap-2 flex-col;
        div:not(#dev-display) {
            @apply p-2 px-4;
            @apply border border-neutral-400 rounded-full;
        }
    }
}

.dev {
    @apply text-red-400;
    &:hover {
        @apply text-cyan-500;
    }
}
</style>
