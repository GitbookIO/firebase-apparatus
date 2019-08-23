"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function validateUser(user) {
    Object.keys(user).forEach(function (key) {
        if (!constants_1.IMPORT_KEYS.includes(key)) {
            throw new Error("Trying to import invalid key " + key);
        }
    });
    if (user.providerUserInfo) {
        user.providerUserInfo.forEach(function (providerInfo) {
            if (!constants_1.ALLOWED_PROVIDERS.includes(providerInfo.providerId)) {
                throw new Error("Trying to import invalid provider " + providerInfo.providerId);
            }
            Object.keys(providerInfo).forEach(function (key) {
                if (!constants_1.ALLOWED_PROVIDERS_KEYS.includes(key)) {
                    throw new Error("Trying to import invalid providerUserInfo key " + key);
                }
            });
        });
    }
}
exports.validateUser = validateUser;
