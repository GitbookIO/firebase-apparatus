/* @flow */

/*
 * Encode base64 values for Google API
 */
function toWebSafeBase64(str: string): string {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}

export default toWebSafeBase64;
