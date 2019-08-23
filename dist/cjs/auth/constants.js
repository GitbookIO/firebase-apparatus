"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Allowed exported providers
exports.ALLOWED_PROVIDERS = [
    'google.com',
    'facebook.com',
    'twitter.com',
    'github.com'
];
// Exported keys for <providerUserInfo> users elements
exports.ALLOWED_PROVIDERS_KEYS = [
    'providerId',
    'rawId',
    'email',
    'displayName',
    'photoUrl'
];
// Exported keys from the Google API
exports.EXPORT_KEYS = [
    'localId',
    'email',
    'emailVerified',
    'passwordHash',
    'salt',
    'displayName',
    'photoUrl',
    'lastLoginAt',
    'createdAt',
    'phoneNumber',
    'providerUserInfo'
];
// Renamed keys at export
exports.EXPORT_RENAMED_KEYS = {
    lastLoginAt: 'lastSignedInAt'
};
// Imported keys for the Google API
exports.IMPORT_KEYS = [
    'localId',
    'email',
    'emailVerified',
    'passwordHash',
    'salt',
    'displayName',
    'photoUrl',
    'lastSignedInAt',
    'createdAt',
    'phoneNumber',
    'providerUserInfo'
];
// Renamed keys at import
exports.IMPORT_RENAMED_KEYS = {
    lastSignedInAt: 'lastLoginAt'
};
// Keys needing base64 re-encoding
exports.BASE64_KEYS = ['passwordHash', 'salt'];
// Maximum size of a batch upload/download for auth accounts
exports.MAX_BATCH_SIZE = 1000;
