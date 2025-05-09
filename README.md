# Vue Advance Tooltip

I play a lot of stellaris and I really like their tooltip system. A container appears when you hover over something and it follows your mouse, and not remain stationary.

There is also some tooltips which contains a 'tooltipable' item inside the tooltip container, where after a delay, it locks the current tooltip in place for you to hover those 'tooltipable' items! This is the same with Baldur's Gate 3's tooltip where you can press `T` to lock the current tooltip in place instead of a delay.

I want to implement that in some of my apps, that is why I made this library.

P.S. Credits to [Jet UI Library](https://github.com/sjmc11/jet-ui.git#v0.0.1) as I used the library as a template for this plugin.

## Features

- **Following Container**: The tooltip container will follow the mouse, as long as it is hovering on a tooltipable item.
- **Auto Placement**: Since different parts of the site can contain a tooltipable item, the container can auto-adjust on where it should be placed, relative to the mouse. This is also overrideable if you wish to show tooltips only on specific direction.
- **Nestable Tooltips**: You can nest tooltips! and you can select which triggers the inner tooltips to appear; delay/keypress.
- **Directive/Component**: If you want to just show a simple tooltip, you can use the `v-tooltip` directive (overrideable) or if you want a complex tooltip (e.g. nested), you can use the `AdvTooltip` component (kinda overrideable but better imported for type support)
- **Efficient**: Only runs on a single mouse move event no matter how many tooltip components you are using.

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

Import the components you need in your Vue application:

```ts
import { createApp } from "vue";
import { Button, Card } from "jet-ui-library";
import "jet-ui-library/dist/style.css";

const app = createApp(App);

app.component("Button", Button);
app.component("Card", Card);

app.mount("#app");
```

You can also use the components directly in your templates:

```vue
<template>
  <div>
    <Button>Click Me</Button>
    <Card>
      <p>This is a card component.</p>
    </Card>
  </div>
</template>
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
