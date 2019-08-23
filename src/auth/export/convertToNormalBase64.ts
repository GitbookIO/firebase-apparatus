/*
 * Fix base64 encoded values from Google API
 */
export function convertToNormalBase64(str: string): string {
    return str.replace(/_/g, '/').replace(/-/g, '+');
}
