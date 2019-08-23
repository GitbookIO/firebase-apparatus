"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var convertToNormalBase64_1 = require("./convertToNormalBase64");
/*
 * Transform Google users to the <AuthUser> type
 */
function transformUser(googleUser) {
    var user = {};
    constants_1.EXPORT_KEYS.forEach(function (key) {
        var googleValue = googleUser[key];
        // Ignore missing value
        if (typeof googleValue === 'undefined') {
            return;
        }
        // Encode value if needed
        var newValue = constants_1.BASE64_KEYS.includes(key) && typeof googleValue === 'string'
            ? convertToNormalBase64_1.convertToNormalBase64(googleValue)
            : googleValue;
        // Rename key
        var newKey = constants_1.EXPORT_RENAMED_KEYS[key] || key;
        user[newKey] = newValue;
    });
    // Password isn't hashed by default Scrypt
    if (user.passwordHash && googleUser.version !== 0) {
        delete user.passwordHash;
        delete user.salt;
    }
    // Filter out and map providerUserInfo
    if (googleUser.providerUserInfo) {
        user.providerUserInfo = googleUser.providerUserInfo
            .filter(function (_a) {
            var providerId = _a.providerId;
            return constants_1.ALLOWED_PROVIDERS.includes(providerId);
        })
            .map(function (googleProviderInfo) {
            var providerInfo = {};
            constants_1.ALLOWED_PROVIDERS_KEYS.forEach(function (key) {
                providerInfo[key] = googleProviderInfo[key];
            });
            return providerInfo;
        });
    }
    return user;
}
exports.transformUser = transformUser;
