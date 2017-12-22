/* @flow */

import transformUser from './transformUser';
import transformHashOptions from './transformHashOptions';
import { MAX_BATCH_SIZE } from '../constants';
import type Apparatus from '../..';
import type { AuthUser, HashOptions } from '../types';

/*
 * Run auth:import on Google API
 */
async function authImport(
    apparatus: Apparatus,
    // Result accumulator to iterate
    users: AuthUser[],
    // Hash options
    hashOptions: HashOptions
): Promise<void> {
    // Validate options and transform for Google API
    const googleHashOpts = transformHashOptions(hashOptions);

    // Split the users array to max batch size
    const usersToUpload = users.slice(0, MAX_BATCH_SIZE);
    const remainingUsers = users.slice(MAX_BATCH_SIZE);

    // No users to upload, we're done
    if (!usersToUpload.length) {
        return;
    }

    // Payload for the API
    const data = {
        ...googleHashOpts,
        targetProjectId: apparatus.projectId,
        users: usersToUpload.map(transformUser)
    };

    // Import users
    await apparatus.googleApi.post(
        '/identitytoolkit/v3/relyingparty/uploadAccount',
        data
    );

    // Import remaning users
    await authImport(apparatus, remainingUsers, hashOptions);
}

export default authImport;
