# firebase-apparatus

Lightweight implementation of firebase-tools as a Node module.

## Install

```sh
$ npm i firebase-apparatus
```

or

```sh
$ yarn add firebase-apparatus
```

## Usage

```js
import Apparatus from 'firebase-apparatus';

const apparatus = new Apparatus({
    projectId: 'my-firebase-project',
    token: 'my-firebase-ci-token'
});
```

### .authExport()

```js
const users: AuthUser[] = await apparatus.authExport();

/*
type ProviderId =
    | 'google.com'
    | 'facebook.com'
    | 'twitter.com'
    | 'github.com';

export type ProviderUserInfo = {
    providerId: ProviderId,
    rawId?: string,
    email?: string,
    displayName?: string,
    photoUrl?: string
};

export type AuthUser = {
    localId: string,
    email?: string,
    emailVerified?: boolean,
    displayName?: string,
    photoUrl?: string,
    passwordHash?: string,
    salt?: string,
    createdAt?: string,
    lastSignedInAt?: string,
    phoneNumber?: string,
    providerUserInfo?: ProviderUserInfo[]
};
 */
```

### .authImport()

```js
// Array of <AuthUser> to import
const users: AuthUser[] = [ { ... } ];
// Optional hash options for password import
const hashOptions: HashOptions = { ... };

await apparatus.authImport(users, hashOptions);

/*
type HashOptions = {
    // Hash algorithm used in password for these accounts
    hashAlgo?: string,
    // Key used in hash algorithm
    hashKey?: string,
    // Salt separator which will be appended to salt when verifying password. only used by SCRYPT now
    saltSeparator?: string,
    // Number of rounds for hash calculation
    rounds?: number,
    // Memory cost for firebase scrypt, or cpu/memory cost for standard scrypt
    memCost?: number,
    // Parallelization for standard scrypt
    parallelization?: number,
    // Block size (normally is 8) for standard scrypt
    blockSize?: number,
    // Derived key length for standard scrypt
    dkLen?: number
};
 */
```
