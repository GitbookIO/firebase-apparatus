import Apparatus from '../..';
import { MAX_BATCH_SIZE } from '../constants';
import { AuthUser, GoogleHashOptions, GoogleUser, HashOptions } from '../types';
import { transformHashOptions } from './transformHashOptions';
import { transformUser } from './transformUser';

/*
 * Run auth:import on Google API
 */
async function serialAuthImport(
    apparatus: Apparatus,
    // Result accumulator to iterate
    googleUsers: GoogleUser[],
    // Hash options
    googleHashOpts: GoogleHashOptions
): Promise<void> {
    // Split the users array to max batch size
    const usersToUpload = googleUsers.slice(0, MAX_BATCH_SIZE);
    const remainingUsers = googleUsers.slice(MAX_BATCH_SIZE);

    // No users to upload, we're done
    if (!usersToUpload.length) {
        return;
    }

    // Payload for the API
    const data = {
        ...googleHashOpts,
        targetProjectId: apparatus.projectId,
        users: usersToUpload
    };

    // Import users
    await apparatus.googleApi.post(
        '/identitytoolkit/v3/relyingparty/uploadAccount',
        data
    );

    // Import remaning users
    await serialAuthImport(apparatus, remainingUsers, googleHashOpts);
}

/*
 * Validate options and launch import
 */
export async function authImport(
    apparatus: Apparatus,
    // Result accumulator to iterate
    users: AuthUser[],
    // Hash options
    hashOptions: HashOptions = {}
): Promise<void> {
    // Validate options and transform for Google API
    const googleHashOpts = transformHashOptions(hashOptions);

    // Validate and transform users
    const googleUsers = users.map(transformUser);

    await serialAuthImport(apparatus, googleUsers, googleHashOpts);
}
