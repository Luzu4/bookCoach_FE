export interface ResponseAuthData {
    token: string;
    email: string;
    role: string;
}

export interface TokenData {
    role: { authority: string },
    sub: string,
    exp:number,
}

export interface UserStateData {
    email: string,
    role: string,
    isAuthenticated: boolean
}

export interface Game {
    id:number,
    name:string
}

export interface Coach {
    id:number,
    nickName:string,
    email:string,
}

export interface Lesson {
        id: number;
        date: string;
        time: string;
        playerNote: string;
        playerId: number;
        playerEmail: string;
        game: {};
        user: {};

    }

export interface User {
    id: number;
    email: string;
    nickName: string;
    password: string;
    user_type: number;
    details_id: number;
}

export interface UserDetails{
    id:number;
    language: string;
    country: string;
    city: string;
    game: Game[];
}

export interface UserForTable {
    id: number;
    email:string;
    nickName: string;
    role: string;
    userDetails: UserDetails[];
}

export enum Role {
    ADMIN="ADMIN",
    COACH = "COACH",
    PLAYER = "PLAYER",
}