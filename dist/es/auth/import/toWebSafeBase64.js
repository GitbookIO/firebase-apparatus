/*
 * Encode base64 values for Google API
 */
export function toWebSafeBase64(str) {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}
