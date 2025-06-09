// Contains common tooltip helper functions and plugin types
export type TooltipDirection = "auto" | "topleft" | "botleft" | "topright" | "botright";

export interface TooltipStyles {
    container?: string;
    originPoint?: string;
    content?: string;

    containerLocked?: string;
    originPointLocked?: string;
    contentLocked?: string;
}

export interface TooltipOptionBase {
    text: string; // The text tooltip to display, for simple tooltips
    direction?: TooltipDirection;
    lockMs?: number;
    lockKey?: string | string[];
    unlockKey?: string | string[]; // When enabled, will not unlock on hover outside
    onlyUnlockOnClick?: boolean; // Unlock on 'click' outside. When enabled, will not unlock on hover outside
    delayMs?: number; // MS delay to show popup container
    backdropClassOnLock?: string; // Backdrop only appears when unlockKey/unlcokOnOutside is set
    offset?: [number, number] | { x?: number; y?: number } | number; // The distance between tooltip origin point. Default to 16x16
    theme?: TooltipStyles;
}

// Used by directives
export type TooltipDirectiveOptions = TooltipOptionBase | string | number;
