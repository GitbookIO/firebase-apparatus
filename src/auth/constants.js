/* @flow */

import type { ProviderId } from './types';

// Allowed exported providers
export const ALLOWED_PROVIDERS: ProviderId[] = [
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com'
];

// Exported keys for <providerUserInfo> users elements
export const ALLOWED_PROVIDERS_KEYS = [
    'providerId',
    'rawId',
    'email',
    'displayName',
    'photoUrl'
];

// Exported keys from the Google API
export const EXPORT_KEYS = [
    'localId',
    'email',
    'emailVerified',
    'passwordHash',
    'salt',
    'displayName',
    'photoUrl',
    'lastLoginAt',
    'createdAt',
    'phoneNumber'
];

// Renamed keys at export
export const EXPORT_RENAMED_KEYS: { [string]: string } = {
    lastLoginAt: 'lastSignedInAt'
};

// Renamed keys at import
export const IMPORT_RENAMED_KEYS: { [string]: string } = {
    lastLoginAt: 'lastSignedInAt'
};

// Keys needing base64 re-encoding
export const BASE64_KEYS = ['passwordHash', 'salt'];

// Maximum size of a batch upload/download for auth accounts
export const MAX_BATCH_SIZE = 1000;
