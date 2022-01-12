import { App } from 'vue';
import { VextAPI } from './api';
import { VextWebUIImpl } from './webui';
import { VextEmulatorImpl } from './emulator';
import { injectionSymbol } from './composition';

export { VextAPI } from './api';
export { VextWebUIImpl } from './webui';
export { VextEmulatorImpl } from './emulator';
export { VextEmulatorRegistry, VextEmulatorEventHandler } from './registry';
export { useVext } from './composition';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $vext: VextAPI
    }
}

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
    useEmulator: () => !Object.prototype.hasOwnProperty.call(window, 'WebUI'),
};

const VextPlugin = {
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

export default VextPlugin;
