// Accepted providers IDs
export type ProviderId =
    | 'google.com'
    | 'facebook.com'
    | 'twitter.com'
    | 'github.com';

// Type for an auth provider's infos
export interface ProviderUserInfo {
    providerId: ProviderId;
    rawId?: string;
    email?: string;
    displayName?: string;
    photoUrl?: string;
    [key: string]: any;
}

// Input and output type for an auth user
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

// Returned provider infos by the Google API
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

// Returned user infos by the Google API
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

// Options for the auth:import hash algorithm
export interface HashOptions {
    // Hash algorithm used in password for these accounts
    hashAlgo?: string;
    // Key used in hash algorithm
    hashKey?: string;
    // Salt separator which will be appended to salt when verifying password. only used by SCRYPT now
    saltSeparator?: string;
    // Number of rounds for hash calculation
    rounds?: number;
    // Memory cost for firebase scrypt, or cpu/memory cost for standard scrypt
    memCost?: number;
    // Parallelization for standard scrypt
    parallelization?: number;
    // Block size (normally is 8) for standard scrypt
    blockSize?: number;
    // Derived key length for standard scrypt
    dkLen?: number;
}

// Hash options for the Google API
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
