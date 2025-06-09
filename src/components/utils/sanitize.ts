export function removeUndefineds(obj: Object) {
    return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => {
            if (v === undefined) return false;
            return true;
        })
    );
}
