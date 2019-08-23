import Apparatus from '../..';
import { AuthUser } from '../types';
export declare function authExport(apparatus: Apparatus, users?: AuthUser[], nextPage?: string): Promise<AuthUser[]>;
