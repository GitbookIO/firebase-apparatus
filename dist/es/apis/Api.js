var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { FIVE_MINUTES } from './constants';
import { getOAuthToken } from './getOAuthToken';
/*
 * Main interface for an API
 */
export class Api {
    constructor(baseURL, refreshToken, opts = {}) {
        this.accessToken = null;
        if (!baseURL) {
            throw new Error('Missing baseURL parameter');
        }
        if (!refreshToken) {
            throw new Error('Missing refreshToken parameter');
        }
        // Set the refreshToken for requests
        this.refreshToken = refreshToken;
        // Create the axios client
        this.client = axios.create(Object.assign({}, opts, { baseURL }));
        // Default request headers
        this.client.defaults.headers.common['User-Agent'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.common['X-Client-Version'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.post['Content-Type'] = 'application/json';
    }
    // Use last fetched access token or get a new one if necessary
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate that accessToken is valid
            if (!!this.accessToken &&
                this.accessToken.refreshToken === this.refreshToken &&
                this.accessToken.expiresAt > Date.now() + FIVE_MINUTES) {
                return this.accessToken.token;
            }
            // Fetch a new token
            const googleAccessToken = yield getOAuthToken(this.refreshToken);
            this.accessToken = {
                token: googleAccessToken.access_token,
                refreshToken: this.refreshToken,
                expiresAt: Date.now() + googleAccessToken.expires_in * 1000
            };
            return this.accessToken.token;
        });
    }
    // Make an authed request
    request(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get an access token for the request
            const token = yield this.getAccessToken();
            try {
                const { data } = yield this.client.request(Object.assign({}, opts, { headers: Object.assign({}, opts.headers, { Authorization: `Bearer ${token}` }) }));
                // Return data only
                return data;
            }
            catch (error) {
                // Invalid response
                if (error.response) {
                    throw new Error(error.response.data.error.message);
                }
                // No response
                if (error.request) {
                    throw new Error(`No response receveid for ${error.config.method} request to ${error.config.url}`);
                }
                // Invalid request
                throw new Error(`Error setting up request with ${error.config}`);
            }
        });
    }
    // GET <url>
    get(url, opts = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({}, opts, { method: 'get', url }));
        });
    }
    // POST <url> with <data>
    post(url, data, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(Object.assign({}, opts, { method: 'post', url,
                data }));
        });
    }
}
