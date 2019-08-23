import {
    ALLOWED_PROVIDERS,
    ALLOWED_PROVIDERS_KEYS,
    IMPORT_KEYS
} from '../constants';
import { AuthUser } from '../types';

export function validateUser(user: AuthUser): void {
    Object.keys(user).forEach(key => {
        if (!IMPORT_KEYS.includes(key)) {
            throw new Error(`Trying to import invalid key ${key}`);
        }
    });

    if (user.providerUserInfo) {
        user.providerUserInfo.forEach(providerInfo => {
            if (!ALLOWED_PROVIDERS.includes(providerInfo.providerId)) {
                throw new Error(
                    `Trying to import invalid provider ${providerInfo.providerId}`
                );
            }

            Object.keys(providerInfo).forEach(key => {
                if (!ALLOWED_PROVIDERS_KEYS.includes(key)) {
                    throw new Error(
                        `Trying to import invalid providerUserInfo key ${key}`
                    );
                }
            });
        });
    }
}
