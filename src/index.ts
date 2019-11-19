import { PluginObject } from 'vue';
import { IVextInterface } from './interface';
import { VextWebUIImpl } from './webui';
import { VextEmulatorImpl } from './emulator';

export { IVextInterface } from './interface';
export { VextWebUIImpl } from './webui';
export { VextEmulatorImpl } from './emulator';
export { VextEmulatorRegistry, VextEmulatorEventHandler } from './registry';

export interface VextPluginOptions {
    /**
     * Overrides the default emulator check
     */
    useEmulator?: boolean | (() => boolean );

    /**
     * Overrides the default interface implementation
     */
    interface?: IVextInterface;
}

const defaultOptions: VextPluginOptions = {
    useEmulator: !WebUI
};

const VextPlugin: PluginObject<VextPluginOptions> = {
    install(Vue, options = {}) {
        const config = Object.assign(defaultOptions, options);

        if (config.interface) {
            Vue.prototype.$vext = config.interface;
            return;
        }

        const useEmulator = typeof config.useEmulator === 'function' ? config.useEmulator() : config.useEmulator;

        if (useEmulator) {
            Vue.prototype.$vext = new VextEmulatorImpl();
            return;
        }

        Vue.prototype.$vext = new VextWebUIImpl();
    }
};

export default VextPlugin;

declare module 'vue/types/vue' {
    interface Vue {
        readonly $vext: IVextInterface;
    }
}