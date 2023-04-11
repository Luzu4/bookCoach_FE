import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";


type UserState = {
    id: number,
    userName: string,
    authenticated: boolean
}

const defaultUserState: UserState = {id:0, userName:"",authenticated: false};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState,
    reducers:{
        setAuthenticated(state,action){
            console.log(action.payload);
            return action.payload;
        },

    },
});

export const userActions = userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export default userSlice;