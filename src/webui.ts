import { IVextInterface } from './interface';

export class VextWebUIImpl implements IVextInterface {
    Show(): boolean {
        return WebUI.Call('Show');
    }

    Hide(): boolean {
        return WebUI.Call('Hide');
    }

    BringToFront(): boolean {
        return WebUI.Call('BringToFront');
    }

    BringToBack(): boolean {
        return WebUI.Call('BringToBack');
    }

    EnableKeyboard(): boolean {
        return WebUI.Call('EnableKeyboard');
    }

    EnableMouse(): boolean {
        return WebUI.Call('EnableMouse');
    }

    DisableKeyboard(): boolean {
        return WebUI.Call('DisableKeyboard');
    }

    DisableMouse(): boolean {
        return WebUI.Call('DisableMouse');
    }

    ResetKeyboard(): boolean {
        return WebUI.Call('ResetKeyboard');
    }

    ResetMouse(): boolean {
        return WebUI.Call('ResetMouse');
    }

    DispatchEvent(event: string): boolean {
        return WebUI.Call('DispatchEvent', event);
    }

    DispatchEventLocal(event: string, payload?: any): boolean {
        return WebUI.Call('DispatchEventLocal', event, payload);
    }
}