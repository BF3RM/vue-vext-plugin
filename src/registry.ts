export interface VextEmulatorEventHandler {
    (...args: any[]): void;
}

export class VextEmulatorRegistry {
    private static handlers = new Map<string, VextEmulatorEventHandler[]>();
    private static localHandlers = new Map<string, VextEmulatorEventHandler[]>();

    /**
     * Registers a new event handler for the given event
     * @param event     The event name
     * @param handler   The event handler
     * @param thisArg   Optional reference to this
     */
    static registerEvent(event: string, handler: VextEmulatorEventHandler, thisArg?: any): VextEmulatorRegistry {
        if (!this.handlers.has(event)) {
            this.handlers.set(event, []);
        }

        this.handlers.get(event)!.push(handler.bind(thisArg));

        return this;
    }

    /**
     * Registers a new local event handler for the given local event
     * @param event     The local event name
     * @param handler   The local event handler
     * @param thisArg   Optional reference to this
     */
    static registerLocalEvent(event: string, handler: VextEmulatorEventHandler, thisArg?: any): VextEmulatorRegistry {
        if (!this.localHandlers.has(event)) {
            this.localHandlers.set(event, []);
        }

        this.localHandlers.get(event)!.push(handler.bind(thisArg));

        return this;
    }

    /** @internal */
    static getEventHandlers(event: string): ReadonlyArray<VextEmulatorEventHandler> {
        return this.handlers.get(event) || [];
    }

    /** @internal */
    static getLocalEventHandlers(event: string): ReadonlyArray<VextEmulatorEventHandler> {
        return this.localHandlers.get(event) || [];
    }
}