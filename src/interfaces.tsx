export interface TokenData {
    role: { authority: string },
    sub: string,
    exp: number,
}

export interface UserStateData {
    email: string,
    role: string,
    isAuthenticated: boolean
}

export interface Game {
    name: string,
    shortGameName: string,
    description: string,
    imageUrl: string,
    id: number
}

export interface Lesson {
    id: number;
    date: string;
    time: string;
    playerNote: string;
    playerId: number;
    playerEmail: string;
    game: Game;
    user: User;

}

export interface User {
    id: number;
    email: string;
    nickName: string;
    password: string;
    user_type: number;
    userDetails: UserDetails;
}

export interface UserDetails {
    id: number;
    language: string;
    country: string;
    city: string;
    imageUrl: string;
    description: string;
    game: Game[];
}

export interface UserForTable {
    id: number;
    email: string;
    nickName: string;
    role: string;
    userDetails: UserDetails[];
}

export enum Role {
    ADMIN = "ADMIN",
    COACH = "COACH",
    PLAYER = "PLAYER",
}

export interface HappyStudent {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
}
