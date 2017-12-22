/* @flow */

import 'babel-polyfill';
import { GoogleApi } from './apis';
import { authExport, authImport } from './auth';
import type { AuthUser, HashOptions } from './auth/types';

// Parameters for the Apparatus instance
type Params = {
    projectId: string,
    token: string
};

class Apparatus {
    projectId: string;
    token: string;
    googleApi: GoogleApi;

    constructor({ projectId, token }: Params) {
        if (!projectId) {
            throw new Error('Missing projectId parameter');
        }
        if (!token) {
            throw new Error('Missing token parameter');
        }

        this.projectId = projectId;
        this.token = token;

        // Create the API clients
        this.googleApi = new GoogleApi(token);
    }

    /*
     * Run the equivalent of auth:export command
     * Returns the corresponding JSON
     */
    async authExport(): Promise<AuthUser[]> {
        return authExport(this);
    }

    /*
     * Run the equivalent of auth:import command
     */
    async authImport(
        users: AuthUser[],
        hashOptions: HashOptions
    ): Promise<void> {
        return authImport(this, users, hashOptions);
    }
}

export default Apparatus;
