import { GoogleApi } from './apis';
import { authExport, authImport } from './auth';
import { AuthUser, HashOptions } from './auth/types';

// Parameters for the Apparatus instance
interface ApparatusParameters {
    // Firebase project ID
    projectId: string;
    // Firebase CI token with access to projectId
    token: string;
}

export class Apparatus {
    public projectId: string;
    public token: string;
    public googleApi: GoogleApi;

    constructor({ projectId, token }: ApparatusParameters) {
        if (!projectId) {
            throw new Error('Missing "projectId" parameter');
        }
        if (!token) {
            throw new Error('Missing "token" parameter');
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
    public async authExport(): Promise<AuthUser[]> {
        return authExport(this);
    }

    /*
     * Run the equivalent of auth:import command
     */
    public async authImport(
        users: AuthUser[],
        hashOptions: HashOptions = {}
    ): Promise<void> {
        if (!users) {
            throw new Error('Missing "users" parameter');
        }

        return authImport(this, users, hashOptions);
    }
}
