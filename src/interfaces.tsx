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