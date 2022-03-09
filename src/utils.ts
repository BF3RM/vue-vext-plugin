/**
 * Checks whether we are running in a VEXT environment
 */
export function isVextEnvironment(): boolean {
    return Object.prototype.hasOwnProperty.call(window, 'WebUI');
}