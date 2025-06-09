// A whole dedicated composable mainly to acquire and bind/unbind triggers
// * Why?
// * The tooltip component can accept multiple targets on which to apply the tooltip reveal
// * Dynamic handling of binding/unbinding is quite complex, especially these are found inside a <slot /> which makes it even more difficult

import { TT_RENDER_DELAYS_MS, TT_TRIGGER } from "@/constants";
import { promiseTimeout, useMutationObserver } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ShallowRef } from "vue";

interface TriggerBinderProps {
    leftBound: Readonly<ShallowRef<HTMLSpanElement | null>>;
    rightBound: Readonly<ShallowRef<HTMLSpanElement | null>>;
    parent: Readonly<ShallowRef<HTMLElement | SVGElement | null | undefined>>;
    event: {
        mouseEnter: () => void;
        mouseLeave: () => void;
    };
}

export const useTriggerBinder = ({
    leftBound: left,
    rightBound: right,
    parent,
    event,
}: TriggerBinderProps) => {
    // # Utils
    const children = () => Array.from(parent.value?.children || []);
    const leftIndex = () => children().indexOf(left.value!);
    const rightIndex = () => children().indexOf(right.value!);
    const getBetween = () => children().splice(leftIndex() + 1, rightIndex());

    // Modify how events are handled

    /** As long as > 1, it will not trigger mouseLeave and will only trigger onEnter when 0.
     * This is to avoid firing onLeave when tooltip leaves a trigger while hovering sibling trigger.
     * Solves cases where two triggers are overlapped
     */
    let hoverCounter = 0;
    const mouseEnter = () => {
        if (hoverCounter === 0) event.mouseEnter();
        hoverCounter++;
    };
    const mouseLeave = async () => {
        await promiseTimeout(TT_RENDER_DELAYS_MS);
        hoverCounter--;
        if (hoverCounter === 0) event.mouseLeave();
    };

    const bindEvents = (e: Node) => {
        // Also add the TT_TRIGGER class for automaticallly identifying nested tooltips
        (e as HTMLElement).classList.add(TT_TRIGGER);

        e.addEventListener("mouseenter", mouseEnter);
        e.addEventListener("mouseleave", mouseLeave);
    };

    const unbindEvents = (e: Node) => {
        e.removeEventListener("mouseenter", mouseEnter);
        e.removeEventListener("mouseleave", mouseLeave);
    };

    // # Handle Dynamic Change
    useMutationObserver(
        parent,
        (mutations) => {
            const c = children();
            const r = rightIndex();
            const l = rightIndex();

            const isLocalTrigger = (n: Node) => {
                const index = c.indexOf(n as Element);
                return l < index && index < r;
            };

            mutations.forEach(({ addedNodes, removedNodes }) => {
                const added = [...addedNodes];
                const removed = [...removedNodes];

                added.filter(isLocalTrigger).forEach(bindEvents);
                removed.filter(isLocalTrigger).forEach(unbindEvents);
            });
        },
        {
            subtree: false,
            attributes: false,
            characterData: false,
            childList: true,
        }
    );

    // # Bind/Unbind onMount/onBeforeMount
    onMounted(() => getBetween().forEach(bindEvents));
    onBeforeUnmount(() => getBetween().forEach(unbindEvents));
};
