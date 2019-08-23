export declare type ProviderId = 'google.com' | 'facebook.com' | 'twitter.com' | 'github.com';
export interface ProviderUserInfo {
    providerId: ProviderId;
    rawId?: string;
    email?: string;
    displayName?: string;
    photoUrl?: string;
    [key: string]: any;
}
export interface AuthUser {
    localId: string;
    email?: string;
    emailVerified?: boolean;
    displayName?: string;
    photoUrl?: string;
    passwordHash?: string;
    salt?: string;
    createdAt?: string;
    lastSignedInAt?: string;
    phoneNumber?: string;
    providerUserInfo?: ProviderUserInfo[];
    [key: string]: any;
}
export interface GoogleProviderUserInfo {
    providerId: ProviderId;
    displayName?: string;
    photoUrl?: string;
    federatedId?: string;
    rawId?: string;
    email?: string;
    screenName?: string;
    [key: string]: any;
}
export interface GoogleUser {
    localId: string;
    email?: string;
    emailVerified?: boolean;
    displayName?: string;
    photoUrl?: string;
    passwordHash?: string;
    salt?: string;
    version?: number;
    passwordUpdatedAt?: number;
    createdAt?: string;
    phoneNumber?: string;
    disabled?: boolean;
    lastLoginAt?: string;
    validSince?: string;
    customAuth?: boolean;
    customAttributes?: string;
    providerUserInfo?: GoogleProviderUserInfo[];
    [key: string]: any;
}
export interface HashOptions {
    hashAlgo?: string;
    hashKey?: string;
    saltSeparator?: string;
    rounds?: number;
    memCost?: number;
    parallelization?: number;
    blockSize?: number;
    dkLen?: number;
}
export interface GoogleHashOptions {
    hashAlgorithm?: string;
    signerKey?: string;
    saltSeparator?: string;
    rounds?: number;
    memoryCost?: number;
    cpuMemCost?: number;
    parallelization?: number;
    blockSize?: number;
    dkLen?: number;
}
