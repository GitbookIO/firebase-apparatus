var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MAX_BATCH_SIZE } from '../constants';
import { transformUser } from './transformUser';
/*
 * Run auth:export on Google API
 */
export function authExport(apparatus, 
// Result accumulator to iterate
users = [], 
// Received token from API to iterate
nextPage) {
    return __awaiter(this, void 0, void 0, function* () {
        // Payload for the API
        const data = Object.assign({ targetProjectId: apparatus.projectId, maxResults: MAX_BATCH_SIZE }, (nextPage ? { nextPageToken: nextPage } : {}));
        const { users: googleUsers, nextPageToken } = yield apparatus.googleApi.post('/identitytoolkit/v3/relyingparty/downloadAccount', data);
        // Return if no more results
        if (!googleUsers || !googleUsers.length) {
            return users;
        }
        // Add receveid users to accumulator and iterate using nextPageToken
        const newAcc = users.concat(googleUsers.map(transformUser));
        return authExport(apparatus, newAcc, nextPageToken);
    });
}
