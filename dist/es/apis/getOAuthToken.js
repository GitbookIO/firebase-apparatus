var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import querystring from 'querystring';
import { ORIGINS } from './constants';
/*
 * Get an OAuth access token for the given <refreshToken>
 */
export function getOAuthToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create an axios client
        const client = axios.create({
            baseURL: ORIGINS.GOOGLE,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const { data } = yield client.post('/oauth2/v3/token', querystring.stringify({
            refresh_token: refreshToken,
            client_id: '563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com',
            client_secret: 'j9iVZfS8kkCEFUPaAeJV0sAi',
            grant_type: 'refresh_token'
        }));
        return data;
    });
}
