/* @flow */

import {
    EXPORT_KEYS,
    ALLOWED_PROVIDERS,
    ALLOWED_PROVIDERS_KEYS,
    EXPORT_RENAMED_KEYS,
    BASE64_KEYS
} from '../constants';
import convertToNormalBase64 from './convertToNormalBase64';
import type { GoogleUser, AuthUser } from '../types';

/*
 * Transform Google users to the <AuthUser> type
 */
function transformUser(googleUser: GoogleUser): AuthUser {
    const user = {};
    EXPORT_KEYS.forEach(key => {
        const googleValue = googleUser[key];
        // Ignore missing value
        if (typeof googleValue === 'undefined') {
            return;
        }

        // Encode value if needed
        const newValue =
            BASE64_KEYS.includes(key) && typeof googleValue === 'string'
                ? convertToNormalBase64(googleValue)
                : googleValue;

        // Rename key
        const newKey = EXPORT_RENAMED_KEYS[key] || key;
        // $FlowFixMe
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
            .filter(({ providerId }) => ALLOWED_PROVIDERS.includes(providerId))
            .map(googleProviderInfo => {
                const providerInfo = {};
                ALLOWED_PROVIDERS_KEYS.forEach(key => {
                    providerInfo[key] = googleProviderInfo[key];
                });

                return providerInfo;
            });
    }

    // $FlowFixMe
    return user;
}

export default transformUser;
