/* @flow */

import querystring from 'querystring';
import axios from 'axios';
import { ORIGINS } from './constants';

// Type of an OAuth Google access token used for requests
type GoogleAccessToken = {
    access_token: string,
    token_type: string,
    expires_in: number,
    id_token: string
};

/*
 * Get an OAuth access token for the given <refreshToken>
 */
async function getOAuthToken(refreshToken: string): Promise<GoogleAccessToken> {
    // Create an axios client
    const client = axios.create({
        baseURL: ORIGINS.GOOGLE,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const { data } = await client.post(
        '/oauth2/v3/token',
        querystring.stringify({
            refresh_token: refreshToken,
            client_id:
                '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
            client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
            grant_type: 'refresh_token'
        })
    );
    return data;
}

export default getOAuthToken;
