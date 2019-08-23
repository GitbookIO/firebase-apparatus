import { ALLOWED_PROVIDERS, ALLOWED_PROVIDERS_KEYS, BASE64_KEYS, IMPORT_KEYS, IMPORT_RENAMED_KEYS } from '../constants';
import { toWebSafeBase64 } from './toWebSafeBase64';
import { validateUser } from './validateUser';
/*
 * Transform an <AuthUser> to a Google API user
 */
export function transformUser(user) {
    // Validate user before transform
    validateUser(user);
    // Convert user
    const googleUser = {};
    IMPORT_KEYS.forEach(key => {
        const value = user[key];
        // Ignore missing value
        if (typeof value === 'undefined') {
            return;
        }
        // Encode key if needed
        const googleValue = BASE64_KEYS.includes(key) && typeof value === 'string'
            ? toWebSafeBase64(value)
            : value;
        // Rename key
        const newKey = IMPORT_RENAMED_KEYS[key] || key;
        googleUser[newKey] = googleValue;
    });
    // Map providerUserInfo
    if (user.providerUserInfo) {
        googleUser.providerUserInfo = user.providerUserInfo
            .filter(({ providerId }) => ALLOWED_PROVIDERS.includes(providerId))
            .map(providerInfo => {
            const googleProviderInfo = {};
            ALLOWED_PROVIDERS_KEYS.forEach(key => {
                googleProviderInfo[key] = providerInfo[key];
            });
            return googleProviderInfo;
        });
    }
    return googleUser;
}
