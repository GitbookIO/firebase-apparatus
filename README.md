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

type ProviderUserInfo = {
    providerId: ProviderId,
    rawId: string,
    email?: string,
    displayName?: string,
    photoUrl?: string
};

type AuthUser = {
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
 */
```
