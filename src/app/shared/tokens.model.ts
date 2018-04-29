import { CognitoAccessToken, CognitoIdToken, CognitoRefreshToken } from "amazon-cognito-identity-js";

export interface Tokens {
    access: CognitoAccessToken;
    id: CognitoIdToken;
    refresh: CognitoRefreshToken;
}
