var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MAX_BATCH_SIZE } from '../constants';
import { transformHashOptions } from './transformHashOptions';
import { transformUser } from './transformUser';
/*
 * Run auth:import on Google API
 */
function serialAuthImport(apparatus, 
// Result accumulator to iterate
googleUsers, 
// Hash options
googleHashOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        // Split the users array to max batch size
        const usersToUpload = googleUsers.slice(0, MAX_BATCH_SIZE);
        const remainingUsers = googleUsers.slice(MAX_BATCH_SIZE);
        // No users to upload, we're done
        if (!usersToUpload.length) {
            return;
        }
        // Payload for the API
        const data = Object.assign({}, googleHashOpts, { targetProjectId: apparatus.projectId, users: usersToUpload });
        // Import users
        yield apparatus.googleApi.post('/identitytoolkit/v3/relyingparty/uploadAccount', data);
        // Import remaning users
        yield serialAuthImport(apparatus, remainingUsers, googleHashOpts);
    });
}
/*
 * Validate options and launch import
 */
export function authImport(apparatus, 
// Result accumulator to iterate
users, 
// Hash options
hashOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate options and transform for Google API
        const googleHashOpts = transformHashOptions(hashOptions);
        // Validate and transform users
        const googleUsers = users.map(transformUser);
        yield serialAuthImport(apparatus, googleUsers, googleHashOpts);
    });
}
