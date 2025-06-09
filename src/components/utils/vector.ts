type V = [number, number];

export function vAdd(a: V, b: V): V {
    return [a[0] + b[0], a[1] + b[1]];
}

export function vSubtract(a: V, b: V): V {
    return [a[0] - b[0], a[1] - b[1]];
}

// I probably won't need the functions below but I'll write them anyway
export function vMult(a: V, b: number): V {
    return [a[0] * b, a[1] * b];
}

// Technically not how you would implement matrix multiplication but when data type is [number, number], basically this is how you do it, or not? idk
export function mMult(a: V, b: V): V {
    return [a[0] * b[0], a[1] * b[1]];
}

export function vNorm(a: V): V {
    const c = Math.sqrt(a[0] ^ (2 + a[1]) ^ 2);
    const d = 1 / c;
    return [a[0] * d, a[1] * d];
}
