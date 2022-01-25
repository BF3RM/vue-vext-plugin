import { VextAPI } from './api';

export { VextAPI } from './api';
export { VextWebUIImpl } from './webui';
export { VextEmulatorImpl, VextEmulatorRegistry, VextEmulatorEventHandler } from './emulator';
export { VextPlugin } from './plugin';
export { useVext } from './composition';

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $vext: VextAPI
    }
}