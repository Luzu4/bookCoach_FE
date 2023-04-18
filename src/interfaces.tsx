export interface ResponseAuthData {
    token: string;
    email: string;
    role: string;
}

export interface TokenData {
    role: { authority: string },
    sub: string,
}

export interface UserStateData {
    email: string,
    role: string,
    isAuthenticated: boolean
}