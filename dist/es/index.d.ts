import { GoogleApi } from './apis';
import { AuthUser, HashOptions } from './auth/types';
interface ApparatusParameters {
    projectId: string;
    token: string;
}
declare class Apparatus {
    projectId: string;
    token: string;
    googleApi: GoogleApi;
    constructor({ projectId, token }: ApparatusParameters);
    authExport(): Promise<AuthUser[]>;
    authImport(users: AuthUser[], hashOptions?: HashOptions): Promise<void>;
}
export default Apparatus;
