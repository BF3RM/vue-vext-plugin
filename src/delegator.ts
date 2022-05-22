import { VextAPI } from "./api";
import { VextEmulatorImpl } from "./emulator/emulator";
import { VextWebUIImpl } from "./webui";

export class VextAPIDelegator implements VextAPI {
    private useEmulator: () => boolean;

    private webui = new VextWebUIImpl();
    private emulator = new VextEmulatorImpl();
    
    constructor(useEmulator?: boolean | (() => boolean)) {
        if (typeof useEmulator !== 'function') {
            this.useEmulator = () => useEmulator || false;
        } else {
            this.useEmulator = useEmulator;
        }
    }

    Show(): boolean {
        if (!this.useEmulator()) {
            return this.webui.Show();
        }

        return this.emulator.Show();
    }
    Hide(): boolean {
        if (!this.useEmulator()) {
            return this.webui.Hide();
        }

        return this.emulator.Hide();
    }
    BringToFront(): boolean {
        if (!this.useEmulator()) {
            return this.webui.BringToFront();
        }

        return this.emulator.BringToFront();
    }
    BringToBack(): boolean {
        if (!this.useEmulator()) {
            return this.webui.BringToBack();
        }

        return this.emulator.BringToBack();
    }
    EnableKeyboard(): boolean {
        if (!this.useEmulator()) {
            return this.webui.EnableKeyboard();
        }

        return this.emulator.EnableKeyboard();
    }
    EnableMouse(): boolean {
        if (!this.useEmulator()) {
            return this.webui.EnableMouse();
        }

        return this.emulator.EnableMouse();
    }
    DisableKeyboard(): boolean {
        if (!this.useEmulator()) {
            return this.webui.DisableKeyboard();
        }

        return this.emulator.DisableKeyboard();
    }
    DisableMouse(): boolean {
        if (!this.useEmulator()) {
            return this.webui.DisableMouse();
        }

        return this.emulator.DisableMouse();
    }
    ResetKeyboard(): boolean {
        if (!this.useEmulator()) {
            return this.webui.ResetKeyboard();
        }

        return this.emulator.ResetKeyboard();
    }
    ResetMouse(): boolean {
        if (!this.useEmulator()) {
            return this.webui.ResetMouse();
        }

        return this.emulator.ResetMouse();
    }
    DispatchEvent(event: string, payload?: any): boolean {
        if (!this.useEmulator()) {
            return this.webui.DispatchEvent(event, payload);
        }

        return this.emulator.DispatchEvent(event, payload);
    }
    DispatchEventLocal(event: string, payload?: any): boolean {
        if (!this.useEmulator()) {
            return this.webui.DispatchEventLocal(event, payload);
        }

        return this.emulator.DispatchEventLocal(event, payload);
    }
    
}