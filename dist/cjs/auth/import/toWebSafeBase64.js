"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Encode base64 values for Google API
 */
function toWebSafeBase64(str) {
    return str.replace(/\//g, '_').replace(/\+/g, '-');
}
exports.toWebSafeBase64 = toWebSafeBase64;
