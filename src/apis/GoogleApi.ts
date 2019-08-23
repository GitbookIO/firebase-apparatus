import { Api } from './Api';
import { ORIGINS } from './constants';

/*
 * Return an Api instance for Google
 */
export class GoogleApi extends Api {
    constructor(refreshToken: string, opts: { [key: string]: any } = {}) {
        super(ORIGINS.GOOGLE, refreshToken, opts);
    }
}
