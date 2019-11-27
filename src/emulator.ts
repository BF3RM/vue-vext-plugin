import { IVextInterface } from './interface';
import { VextEmulatorRegistry } from './registry';

export class VextEmulatorImpl implements IVextInterface {
    Show(): boolean {
        return false;
    }

    Hide(): boolean {
        return false;
    }

    BringToFront(): boolean {
        return false;
    }

    BringToBack(): boolean {
        return false;
    }

    EnableKeyboard(): boolean {
        return false;
    }

    EnableMouse(): boolean {
        return false;
    }

    DisableKeyboard(): boolean {
        return false;
    }

    DisableMouse(): boolean {
        return false;
    }

    ResetKeyboard(): boolean {
        return false;
    }

    ResetMouse(): boolean {
        return false;
    }

    DispatchEvent(event: string): boolean {
        VextEmulatorRegistry.INSTANCE
            .getEventHandlers(event)
            .forEach(handler => {
                requestAnimationFrame(() => handler())
            });
        return true;
    }

    DispatchEventLocal(event: string, arg?: any): boolean {
        VextEmulatorRegistry.INSTANCE
            .getLocalEventHandlers(event)
            .forEach(handler => {
                requestAnimationFrame(() => handler(arg))
            });
        return true;
    }
}