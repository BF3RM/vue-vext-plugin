import { VextAPI } from './api';

export class VextWebUIImpl implements VextAPI {
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

    DispatchEvent(event: string, payload?: any): boolean {
        if (typeof payload === 'object') {
            payload = JSON.stringify(payload);
        }

        return WebUI.Call('DispatchEvent', event, payload);
    }

    DispatchEventLocal(event: string, payload?: any): boolean {
        if (typeof payload === 'object') {
            payload = JSON.stringify(payload);
        }

        return WebUI.Call('DispatchEventLocal', event, payload);
    }
}