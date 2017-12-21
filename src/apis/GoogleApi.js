/* @flow */

import Api from './Api';
import { ORIGINS } from './constants';

/*
 * Return an Api instance for Google
 */
class GoogleApi extends Api {
    constructor(refreshToken: string, opts?: Object = {}): void {
        super(ORIGINS.GOOGLE, refreshToken, opts);
    }
}

export default GoogleApi;
