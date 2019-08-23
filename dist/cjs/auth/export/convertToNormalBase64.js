"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Fix base64 encoded values from Google API
 */
function convertToNormalBase64(str) {
    return str.replace(/_/g, '/').replace(/-/g, '+');
}
exports.convertToNormalBase64 = convertToNormalBase64;
