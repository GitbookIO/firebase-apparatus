/* @flow */

// Accepted providers IDs
export type ProviderId =
    | 'google.com'
    | 'facebook.com'
    | 'twitter.com'
    | 'github.com';

// Type for an auth provider's infos
export type ProviderUserInfo = {
    providerId: ProviderId,
    rawId: string,
    email?: string,
    displayName?: string,
    photoUrl?: string
};

// Input and output type for an auth user
export type AuthUser = {
    localId: string,
    email: string,
    emailVerified: boolean,
    displayName: string,
    photoUrl: string,
    passwordHash?: string,
    salt?: string,
    createdAt?: string,
    lastSignedInAt?: string,
    phoneNumber?: string,
    providerUserInfo: ProviderUserInfo[]
};

// Returned provider infos by the Google API
export type GoogleProviderUserInfo = {
    providerId: ProviderId,
    displayName: string,
    photoUrl: string,
    federatedId: string,
    rawId?: string,
    email?: string,
    screenName?: string
};

// Returned user infos by the Google API
export type GoogleUser = {
    localId: string,
    email: string,
    emailVerified: boolean,
    displayName: string,
    photoUrl: string,
    passwordHash: string,
    salt: string,
    version: number,
    passwordUpdatedAt: number,
    createdAt?: string,
    phoneNumber?: string,
    disabled?: boolean,
    lastLoginAt?: string,
    validSince?: string,
    customAuth?: boolean,
    customAttributes?: string,
    providerUserInfo: GoogleProviderUserInfo[]
};
