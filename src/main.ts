import { createApp } from "vue";

import "@fontsource-variable/dm-sans";
import "./assets/fonts.css";
import "./assets/style.css";

import App from "./App.vue";
import { AdvTooltipPlugin } from "./plugin";

const app = createApp(App);

app.use(AdvTooltipPlugin);
app.mount("#app");
