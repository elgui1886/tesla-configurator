export function isNoU(value: unknown): boolean {
    return value === undefined || value === null;
}
export function isEoNoU(str: unknown): boolean {
    return isNoU(str) || str === '';
}