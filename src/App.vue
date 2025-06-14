<script setup lang="ts">
import Coord from "./components/Debug/Coord.vue";
import AdvTooltip from "./components/Tooltip/AdvTooltip.vue";
import TooltipLayer from "./components/TooltipLayer/TooltipLayer.vue";
import { serializehtml } from "./components/utils/serialize";
import { dev } from "./constants";
import { useSharedMouse } from "./types/state";
import { theme } from "./themes";

const { ndx, ndy, lx, ly, x, y } = useSharedMouse();
</script>

<template>
    <TooltipLayer clip-parent :theme="theme.stellaris" />
    <div class="h-screen root w-screen">
        <div class="cont h-full">
            <div class="flex">
                <AdvTooltip>
                    <div class="w-min">Static Test</div>
                    <template #tip>
                        <div>Wow great!</div>
                    </template>
                </AdvTooltip>
                <AdvTooltip direction="topright">
                    <div>Nested Test</div>
                    <template #tip>
                        <div>
                            Hover here, there is a toooltip below
                            <br />
                            <AdvTooltip>
                                <div class="underline">This is the tooltip</div>
                                <template #tip>
                                    <div>This is a tooltip inside tooltip</div>
                                    <AdvTooltip text="A very nested tooltip">
                                        <div class="underline">What if you hover here?</div>
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
            <template v-if="dev">
                <Coord :data="[lx, ly]" color="border-cyan-400" />
                <Coord :data="[x, y]" color="border-green-400" />
            </template>
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
