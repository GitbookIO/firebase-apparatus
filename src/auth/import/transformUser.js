/* @flow */

import toWebSafeBase64 from './toWebSafeBase64';
import {
    ALLOWED_PROVIDERS,
    ALLOWED_PROVIDERS_KEYS,
    IMPORT_KEYS,
    IMPORT_RENAMED_KEYS,
    BASE64_KEYS
} from '../constants';
import type { AuthUser, GoogleUser } from '../types';

/*
 * Transform an <AuthUser> to a Google API user
 */
function transformUser(user: AuthUser): GoogleUser {
    const googleUser = {};
    IMPORT_KEYS.forEach(key => {
        // Encode key if needed
        const value = user[key];
        const googleValue =
            BASE64_KEYS.includes(key) && typeof value === 'string'
                ? toWebSafeBase64(value)
                : value;

        // Rename key
        const newKey = IMPORT_RENAMED_KEYS[key] || key;
        // $FlowFixMe
        googleUser[newKey] = googleValue;
    });

    // Map providerUserInfo
    googleUser.providerUserInfo = user.providerUserInfo
        .filter(({ providerId }) => ALLOWED_PROVIDERS.includes(providerId))
        .map(providerInfo => {
            const googleProviderInfo = {};
            ALLOWED_PROVIDERS_KEYS.forEach(key => {
                googleProviderInfo[key] = providerInfo[key];
            });

            return googleProviderInfo;
        });

    // $FlowFixMe
    return googleUser;
}

export default transformUser;
