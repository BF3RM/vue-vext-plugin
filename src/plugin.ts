import { App } from "vue";
import { VextAPI } from "./api";
import { injectionSymbol } from './composition';
import { isVextEnvironment } from "./utils";
import { VextAPIDelegator } from "./delegator";

export interface VextPluginOptions {
    /**
     * Overrides the default emulator check
     */
    useEmulator?: boolean | (() => boolean);

    /**
     * Overrides the default api implementation
     */
    api?: VextAPI;
}

const defaultOptions: VextPluginOptions = {
    useEmulator: () => !isVextEnvironment(),
};

export const VextPlugin = {
    install(app: App, options = {}) {
        const config = Object.assign(defaultOptions, options);

        let api = config.api;

        if (!api) {
            api = new VextAPIDelegator(config.useEmulator)
        }

        app.config.globalProperties.$vext = api;
        app.provide(injectionSymbol, api);
    },
};