/* @flow */

import {
    EXPORTED_KEYS,
    EXPORTED_PROVIDERS,
    EXPORTED_PROVIDERS_KEYS,
    RENAMED_KEYS,
    BASE64_KEYS
} from './constants';
import convertToNormalBase64 from './convertToNormalBase64';
import type { GoogleUser, AuthUser } from './types';

/*
 * Transform Google users to the <AuthUser> type
 */
function transformUser(googleUser: GoogleUser): AuthUser {
    const {
        providerUserInfo: googleProviderUserInfo,
        ...googleInfos
    } = googleUser;

    const user = {};
    EXPORTED_KEYS.forEach(key => {
        // Encode key if needed
        const googleValue = googleInfos[key];
        const newValue =
            BASE64_KEYS.includes(key) && typeof googleValue === 'string'
                ? convertToNormalBase64(googleValue)
                : googleValue;

        // Rename key
        const newKey = RENAMED_KEYS[key] || key;
        user[newKey] = newValue;
    });

    // Password isn't hashed by default Scrypt
    if (user.passwordHash && googleUser.version !== 0) {
        delete user.passwordHash;
        delete user.salt;
    }

    // Filter out and map providerUserInfo
    user.providerUserInfo = googleProviderUserInfo
        .filter(({ providerId }) => EXPORTED_PROVIDERS.includes(providerId))
        .map(googleProviderInfo => {
            const providerInfo = {};
            EXPORTED_PROVIDERS_KEYS.forEach(key => {
                providerInfo[key] = googleProviderInfo[key];
            });

            return providerInfo;
        });

    // $FlowFixMe
    return user;
}

export default transformUser;
