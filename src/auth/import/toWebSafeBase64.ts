/*
 * Encode base64 values for Google API
 */
export function toWebSafeBase64(str: string): string {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}
