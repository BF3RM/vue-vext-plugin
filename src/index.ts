import { App } from 'vue';
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
	useEmulator?: boolean | (() => boolean);

	/**
	 * Overrides the default interface implementation
	 */
	interface?: IVextInterface;
}

const defaultOptions: VextPluginOptions = {
	useEmulator: () => !window.hasOwnProperty('WebUI'),
};

const VextPlugin = {
	install(app: App, options = {}) {
		const config = Object.assign(defaultOptions, options);

		if (config.interface) {
			app.config.globalProperties.$vext = config.interface;
			return;
		}

		const useEmulator =
			typeof config.useEmulator === 'function'
				? config.useEmulator()
				: config.useEmulator;

		if (useEmulator) {
			app.config.globalProperties.$vext = new VextEmulatorImpl();

			return;
		}

		app.config.globalProperties.$vext = new VextWebUIImpl();
	},
};

export default VextPlugin;
