/* @flow */

/*
 * Fix base64 encoded values from Google API
 */
function convertToNormalBase64(str: string): string {
    return str.replace(/_/g, '/').replace(/-/g, '+');
}

export default convertToNormalBase64;
