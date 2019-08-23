import { AxiosInstance } from 'axios';
interface AccessToken {
    token: string;
    refreshToken: string;
    expiresAt: number;
}
export declare class Api {
    client: AxiosInstance;
    refreshToken: string;
    accessToken: AccessToken | null;
    constructor(baseURL: string, refreshToken: string, opts?: {
        [key: string]: any;
    });
    getAccessToken(): Promise<string>;
    request<T>(opts: {
        [key: string]: any;
    }): Promise<T>;
    get<T>(url: string, opts?: {
        [key: string]: any;
    }): Promise<T>;
    post<T>(url: string, data: {
        [key: string]: any;
    }, opts?: {
        [key: string]: any;
    }): Promise<T>;
}
export {};
