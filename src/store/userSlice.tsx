import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ResponseAuthData, TokenData, UserStateData} from "../interfaces";
import jwt_decode from "jwt-decode";

interface AuthenticatePayload {
    email: string;
    password: string;
}

const defaultUserState: UserStateData = {email: "", role: "", isAuthenticated: false};

export const authenticateUser = createAsyncThunk(
    "user/authenticate",
    async (payload: AuthenticatePayload) => {
        try{
            const response = await fetch("/api/v1/auth/authenticate", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "post",
                body: JSON.stringify(payload),
            });

            const data: ResponseAuthData = await response.json();
            const decodedToken: TokenData = jwt_decode(data.token);

            const userData: UserStateData = {
                email: decodedToken.sub,
                role: decodedToken.role.authority,
                isAuthenticated: true
            };

            localStorage.setItem("jwt", "\"" + data.token + "\"");
            return userData;
        }catch(e){
            throw e;
        }

    }
);

export const checkToken = createAsyncThunk(
    "user/checkToken",
    async (token: string) => {
        const response = await fetch("/api/v1/auth/checktoken", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Invalid Token");
        }

        const data: UserStateData = await response.json();
        data.isAuthenticated = true;
        return data;
    }
);

export const registerUser = createAsyncThunk(
    "user/authenticate",
    async (payload: AuthenticatePayload) => {
        const response = await fetch("api/v1/auth/register", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error("Something went wrong! Try again");
        }

        const data: ResponseAuthData = await response.json();
        const decodedToken: TokenData = jwt_decode(data.token);

        const userData: UserStateData = {
            email: decodedToken.sub,
            role: decodedToken.role.authority,
            isAuthenticated: true
        };

        localStorage.setItem("jwt", "\"" + data.token + "\"");
        return userData;
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState,
    reducers: {
        setUserInformation(state, action: PayloadAction<UserStateData>) {
            return action.payload;
        },
        setAuthenticated(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
    },
    extraReducers: builder => {
        //@ts-ignore
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(checkToken.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(authenticateUser.rejected, (state, action)=>{
            console.log("ERRRROR")
            console.log(action.error);
            return
        })
    }
});

export const userActions = {...userSlice.actions, authenticateUser};
export const userSelector = (state: RootState) => state.user;

export default userSlice;