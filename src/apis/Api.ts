import axios, { AxiosInstance } from 'axios';
import { FIVE_MINUTES } from './constants';
import { getOAuthToken } from './getOAuthToken';

// Type of the stored access token for requests
interface AccessToken {
    // Receveid access_token
    token: string;
    // refreshToken used for this access_token
    refreshToken: string;
    // Expiration time
    expiresAt: number;
}

/*
 * Main interface for an API
 */
export class Api {
    public client: AxiosInstance;
    public refreshToken: string;
    public accessToken: AccessToken | null = null;

    constructor(
        baseURL: string,
        refreshToken: string,
        opts: { [key: string]: any } = {}
    ) {
        if (!baseURL) {
            throw new Error('Missing baseURL parameter');
        }
        if (!refreshToken) {
            throw new Error('Missing refreshToken parameter');
        }
        // Set the refreshToken for requests
        this.refreshToken = refreshToken;
        // Create the axios client
        this.client = axios.create({
            ...opts,
            baseURL
        });

        // Default request headers
        this.client.defaults.headers.common['User-Agent'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.common['X-Client-Version'] =
            'FirebaseCLI/3.15.4';
        this.client.defaults.headers.post['Content-Type'] = 'application/json';
    }

    // Use last fetched access token or get a new one if necessary
    public async getAccessToken(): Promise<string> {
        // Validate that accessToken is valid
        if (
            !!this.accessToken &&
            this.accessToken.refreshToken === this.refreshToken &&
            this.accessToken.expiresAt > Date.now() + FIVE_MINUTES
        ) {
            return this.accessToken.token;
        }

        // Fetch a new token
        const googleAccessToken = await getOAuthToken(this.refreshToken);
        this.accessToken = {
            token: googleAccessToken.access_token,
            refreshToken: this.refreshToken,
            expiresAt: Date.now() + googleAccessToken.expires_in * 1000
        };

        return this.accessToken.token;
    }

    // Make an authed request
    public async request<T>(opts: { [key: string]: any }): Promise<T> {
        // Get an access token for the request
        const token = await this.getAccessToken();
        try {
            const { data } = await this.client.request({
                ...opts,
                headers: {
                    ...opts.headers,
                    Authorization: `Bearer ${token}`
                }
            });
            // Return data only
            return data;
        } catch (error) {
            // Invalid response
            if (error.response) {
                throw new Error(error.response.data.error.message);
            }
            // No response
            if (error.request) {
                throw new Error(
                    `No response receveid for ${error.config.method} request to ${error.config.url}`
                );
            }
            // Invalid request
            throw new Error(`Error setting up request with ${error.config}`);
        }
    }

    // GET <url>
    public async get<T>(
        url: string,
        opts: { [key: string]: any } = {}
    ): Promise<T> {
        return this.request<T>({
            ...opts,
            method: 'get',
            url
        });
    }

    // POST <url> with <data>
    public async post<T>(
        url: string,
        data: { [key: string]: any },
        opts?: { [key: string]: any }
    ) {
        return this.request<T>({
            ...opts,
            method: 'post',
            url,
            data
        });
    }
}
