var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GoogleApi } from './apis';
import { authExport, authImport } from './auth';
class Apparatus {
    constructor({ projectId, token }) {
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
    authExport() {
        return __awaiter(this, void 0, void 0, function* () {
            return authExport(this);
        });
    }
    /*
     * Run the equivalent of auth:import command
     */
    authImport(users, hashOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!users) {
                throw new Error('Missing "users" parameter');
            }
            return authImport(this, users, hashOptions);
        });
    }
}
export default Apparatus;
