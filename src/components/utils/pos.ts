import { isRef, Ref, ref, toValue } from "vue";

export type Pos = {
    x: Ref<number>;
    y: Ref<number>;
};

export function pos(initialX?: number, initialY?: number) {
    return {
        x: ref(initialX || 0),
        y: ref(initialY || 0),
    };
}

function extpos(pos: Pos): [number, number];
function extpos(pos: [Ref<number>, Ref<number>]): [number, number];
function extpos(pos: Ref<number>, y: Ref<number>): [number, number];
function extpos(
    pos: Pos | [Ref<number>, Ref<number>] | Ref<number>,
    y?: Ref<number>
): [number, number] {
    if (Array.isArray(pos)) {
        return [pos[0].value, pos[1].value];
    } else if (isRef(pos)) {
        const _y = y?.value || 0;
        return [pos.value, _y];
    }

    return [pos.x.value, pos.y.value];
}

export function extposref(pos: Pos): [Ref<number>, Ref<number>] {
    return [pos.x, pos.y];
}

function setpos(destination: Pos, x: Pos): void;
function setpos(destination: Pos, x: number | Ref<number>, y: number | Ref<number>): void;
function setpos(d: Pos, x: number | Ref<number> | Pos, y?: number | Ref<number>) {
    if (isRef(x) || typeof x === "number") {
        [d.x.value, d.y.value] = [toValue(x), toValue(y!)];
    } else if (typeof x === "object") {
        [d.x.value, d.y.value] = [x.x.value, x.y.value];
    }
}

export { setpos, extpos };
