import { inject } from "vue";
import { VextAPI } from "./api";

export const injectionSymbol = Symbol('vext');

export function useVext(): VextAPI {
    return inject(injectionSymbol)!;
}