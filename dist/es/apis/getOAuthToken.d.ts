interface GoogleAccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    id_token: string;
}
export declare function getOAuthToken(refreshToken: string): Promise<GoogleAccessToken>;
export {};
