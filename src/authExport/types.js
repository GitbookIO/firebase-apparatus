/* @flow */

export type ProviderId =
    | 'google.com'
    | 'facebook.com'
    | 'twitter.com'
    | 'github.com';

export type ProviderUserInfo = {
    providerId: ProviderId,
    rawId: string,
    email?: string,
    displayName?: string,
    photoUrl?: string
};

// Return type for the exportUsers method
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

export type GoogleProviderUserInfo = {
    providerId: ProviderId,
    displayName: string,
    photoUrl: string,
    federatedId: string,
    rawId?: string,
    email?: string,
    screenName?: string
};

// Google user received from the API
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
