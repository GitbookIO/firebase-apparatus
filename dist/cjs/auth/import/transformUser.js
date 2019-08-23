"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var toWebSafeBase64_1 = require("./toWebSafeBase64");
var validateUser_1 = require("./validateUser");
/*
 * Transform an <AuthUser> to a Google API user
 */
function transformUser(user) {
    // Validate user before transform
    validateUser_1.validateUser(user);
    // Convert user
    var googleUser = {};
    constants_1.IMPORT_KEYS.forEach(function (key) {
        var value = user[key];
        // Ignore missing value
        if (typeof value === 'undefined') {
            return;
        }
        // Encode key if needed
        var googleValue = constants_1.BASE64_KEYS.includes(key) && typeof value === 'string'
            ? toWebSafeBase64_1.toWebSafeBase64(value)
            : value;
        // Rename key
        var newKey = constants_1.IMPORT_RENAMED_KEYS[key] || key;
        googleUser[newKey] = googleValue;
    });
    // Map providerUserInfo
    if (user.providerUserInfo) {
        googleUser.providerUserInfo = user.providerUserInfo
            .filter(function (_a) {
            var providerId = _a.providerId;
            return constants_1.ALLOWED_PROVIDERS.includes(providerId);
        })
            .map(function (providerInfo) {
            var googleProviderInfo = {};
            constants_1.ALLOWED_PROVIDERS_KEYS.forEach(function (key) {
                googleProviderInfo[key] = providerInfo[key];
            });
            return googleProviderInfo;
        });
    }
    return googleUser;
}
exports.transformUser = transformUser;
