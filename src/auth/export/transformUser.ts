import {
    ALLOWED_PROVIDERS,
    ALLOWED_PROVIDERS_KEYS,
    BASE64_KEYS,
    EXPORT_KEYS,
    EXPORT_RENAMED_KEYS
} from '../constants';
import { AuthUser, GoogleUser, ProviderUserInfo } from '../types';
import { convertToNormalBase64 } from './convertToNormalBase64';

/*
 * Transform Google users to the <AuthUser> type
 */
export function transformUser(googleUser: GoogleUser): AuthUser {
    const user: Partial<AuthUser> = {};

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
                const providerInfo: Partial<ProviderUserInfo> = {};
                ALLOWED_PROVIDERS_KEYS.forEach(key => {
                    providerInfo[key] = googleProviderInfo[key];
                });

                return providerInfo as ProviderUserInfo;
            });
    }

    return user as AuthUser;
}
