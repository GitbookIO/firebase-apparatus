/* @flow */

import transformUser from './transformUser';
import { MAX_BATCH_SIZE } from '../constants';
import type Apparatus from '../..';
import type { AuthUser } from '../types';

/*
 * Run auth:export on Google API
 */
async function authExport(
    apparatus: Apparatus,
    // Result accumulator to iterate
    users?: AuthUser[] = [],
    // Received token from API to iterate
    nextPage?: string
): Promise<AuthUser[]> {
    // Payload for the API
    const data = {
        targetProjectId: apparatus.projectId,
        maxResults: MAX_BATCH_SIZE,
        ...(nextPage ? { nextPageToken: nextPage } : {})
    };

    const {
        users: googleUsers,
        nextPageToken
    } = await apparatus.googleApi.post(
        '/identitytoolkit/v3/relyingparty/downloadAccount',
        data
    );

    // Return if no more results
    if (!googleUsers || !googleUsers.length) {
        return users;
    }

    // Add receveid users to accumulator and iterate using nextPageToken
    const newAcc = users.concat(googleUsers.map(transformUser));
    return authExport(apparatus, newAcc, nextPageToken);
}

export default authExport;
