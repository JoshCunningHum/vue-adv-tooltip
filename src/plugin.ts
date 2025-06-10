import AdvTooltip from "@/components/Tooltip/AdvTooltip.vue";
import { DefaultPluginOption, TooltipPluginOptions } from "@/types/plugin";
import { reactive, type App } from "vue";
import { TT_CONFIG_KEY } from "./constants";
import { vTooltip } from "./directive";

export const AdvTooltipPlugin = {
    install: (app: App, options: TooltipPluginOptions = {}) => {
        const config = Object.assign(DefaultPluginOption, options);

        const { componentName, directiveName } = config;

        // Reactive config to be usable on app instance
        const _config = reactive(config);
        app.provide(TT_CONFIG_KEY, _config);

        // Auto import component name if componentName is provided
        if (componentName) {
            //@ts-ignore
            app.component(componentName, AdvTooltip);
        }

        // Register the directive if provided
        if (directiveName) {
            app.directive(directiveName, vTooltip);
        }
    },
};
