# Vue Advance Tooltip

I play a lot of stellaris and I really like their tooltip system. A container appears when you hover over something and it follows your mouse, and not remain stationary.

There is also some tooltips which contains a 'tooltipable' item inside the tooltip container, where after a delay, it locks the current tooltip in place for you to hover those 'tooltipable' items! This is the same with Baldur's Gate 3's tooltip where you can press `T` to lock the current tooltip in place instead of a delay.

I want to implement that in some of my apps, that is why I made this library.

P.S. Credits to [Jet UI Library](https://github.com/sjmc11/jet-ui.git#v0.0.1) as I used the library as a template for this plugin.

## Features

### Quick Terminology

Before we go with the features, its important which 'thing' I am talking about.

**Trigger** - Refers to the DOM element that triggers the tooltip to appear

**Tip** - Refers to the tooltip/content that appears when the trigger is hovered

**TooltipLayer** - Refers to the DOM Layer where the tooltips gets teleported

---

### Following Container

The tip will follow the mouse, as long as it is hovering on a trigger.

### Auto Placement

Since different parts of the site can contain a trigger, the tip can auto-adjust on where it should be placed, relative to the mouse. This is also overrideable if you wish to show tips only on specific direction.

### Nestable tooltips

You can nest tooltips! and you can select which triggers the inner tooltips to appear; delay/keypress.

### Directive/Component

If you want to just show a simple tooltip, you can use the `v-tooltip` directive (overrideable) or if you want a complex tooltip (e.g. nested), you can use the `AdvTooltip` component (kinda overrideable but better imported for type support)

### Efficient

Only runs on a single mouse move event no matter how many tooltip components you are using. Also, handles unmounting/mounting efficiently, so no worries on loading a page with bunch of tooltips, since those are only shown/loaded in the DOM when the trigger is hovered.

## Installation

You can install Jet UI Library via npm or yarn by pulling it directly from GitHub:

```bash
npm install git+https://github.com/sjmc11/jet-ui.git#v0.0.1
```

Or using yarn:

```bash
yarn add git+https://github.com/sjmc11/jet-ui.git#v0.0.1
```

## Usage

### Component

```tsx
<template>
    // Using data prop for simple text
    <AdvTooltip text="Tooltip here" >
        <span>Hover Me</span>
    </AdvTooltip>

    // Using the #tip slot
    <AdvTooltip>
        <span>Complex Hover Me</span>
        <template #tip>
            <div>
                <h1>This is a complex tooltip </h1>
                <AdvTooltip>
                    <span>This is another tooltip inside a tooltip</span>
                    <template #tip>
                        <div>This is the tooltip of a text inside a tooltip!</span>
                    </template>
                </AdvTooltip>
            </div>
        </template>
    </AdvTooltip>
</template>
```

### Directive

```tsx
<template>
    // Simple tooltip
    <span v-tooltip="'Tooltip Text'">
        Hover me
    </span>
<template>
```

### Type Safety

#### Directive

In order to use the directive with proper typings, add this type declaration. Replace the `vTooltip` to whatever you set the directive name is.

```ts
import { vTooltip } from "vue-adv-tooltip";

declare module "@vue/runtime-core" {
    export interface ComponentCustomProperties {
        vTooltip: typeof vTooltip;
    }
}
```

### Storybook

Jet UI Library uses Storybook for component documentation and testing. To start the Storybook server:

```bash
npm run storybook
```

This will launch a local Storybook server where you can interact with and test components.

### Tailwind CSS

Jet UI Library uses Tailwind CSS for styling. Ensure that your project is set up to handle Tailwind's utility classes. If not already configured, you can add Tailwind by following the [official Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

## Development

If you want to contribute or modify the library, you can clone the repository and start development:

```bash
git clone https://github.com/sjmc11/jet-ui.git
cd jet-ui
npm install
npm run dev
```

### Building the Library

To build the library for production:

```bash
npm run build
```

This will create the library bundle in the `dist/` directory, ready to be published or used as a package.

## Versioning

Jet UI Library uses [SemVer](https://semver.org/) for versioning. For available versions, check the [tags on this repository](https://github.com/yourusername/jet-ui-library/tags).
