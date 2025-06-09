import { isRef, toValue } from "vue";

export function serialize(obj: any, level: number = 0): string {
    if (isRef(obj)) return serialize(toValue(obj));
    if (Array.isArray(obj)) return `[${obj.map((o) => serialize(o, level + 1)).join(", ")}]`;
    if (typeof obj === "object") {
        return `{\n${Object.entries(obj)
            .map(([k, v]) => {
                return `${"\t".repeat(level + 1)}${k}: ${serialize(v, level + 1)},`;
            })
            .join("\n")}\n${"\t".repeat(level)}}`;
    }
    if (typeof obj === "number") return obj.toFixed(2);
    if (typeof obj === "string") return `"${obj}"`;
    return `${obj}`;
}

export function serializehtml(obj: any, level: number = 0): string {
    if (isRef(obj)) return serializehtml(toValue(obj));
    if (Array.isArray(obj)) return `[${obj.map((o) => serializehtml(o, level + 1)).join(", ")}]`;
    if (typeof obj === "object") {
        return `{\n${Object.entries(obj)
            .map(([k, v]) => {
                return `${"\t".repeat(level + 1)}${sp("text-neutral-400", k)}: ${serializehtml(
                    v,
                    level + 1
                )},`;
            })
            .join("\n")}\n${"\t".repeat(level)}}`;
    }
    if (typeof obj === "number") return sp("text-orange-500", obj.toFixed(2));
    if (typeof obj === "string") return sp("text-yellow-500", `"${obj}"`);

    const bool_colors = ["dev-false", "dev-true"];

    if (typeof obj === "boolean") return sp(bool_colors[obj ? 1 : 0], obj + "");
    return `${obj}`;
}

function sp(classes: string, html: string) {
    return `<span class="${classes}">${html}</span>`;
}
