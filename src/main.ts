import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import { AdvTooltipPlugin } from "./plugin";

const app = createApp(App);

app.use(AdvTooltipPlugin);
app.mount("#app");
