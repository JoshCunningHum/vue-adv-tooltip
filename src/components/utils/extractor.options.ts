import { TT_DEFAULTS } from "@/constants";
import { TooltipOptionBase } from "@/types/common";

function formatOffset(offset: TooltipOptionBase["offset"]): [number, number] {
    if (!offset) return [0, 0];
    if (Array.isArray(offset)) return offset;
    if (typeof offset === "number") return [offset, offset];
    return [offset.x || 0, offset.y || 0];
}

// Used for normalization of the tooltip options
export function normalizeOptions(opts: Partial<TooltipOptionBase>) {
    // Removed all 'undefined' values in the opts first
    opts = Object.fromEntries(Object.entries(opts).filter(([_, v]) => v !== undefined));

    const normalized = Object.assign({}, TT_DEFAULTS, opts) as TooltipOptionBase;

    // Perform formatting for the offset
    normalized.offset = formatOffset(normalized.offset);

    return normalized;
}
