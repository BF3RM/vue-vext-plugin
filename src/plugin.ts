import { App } from "vue";
import { VextAPI } from "./api";
import { VextWebUIImpl } from "./webui";
import { VextEmulatorImpl } from "./emulator";
import { injectionSymbol } from './composition';
import { isVextEnvironment } from "./utils";

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
            const useEmulator =
                typeof config.useEmulator === 'function'
                    ? config.useEmulator()
                    : config.useEmulator;

            if (useEmulator) {
                api = new VextEmulatorImpl();
            } else {
                api = new VextWebUIImpl();
            }
        }

        app.config.globalProperties.$vext = api;
        app.provide(injectionSymbol, api);
    },
};