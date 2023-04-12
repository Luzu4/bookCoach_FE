import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";


type UserState = {
    id: number,
    userName: string,
    authenticated: boolean,

}

const defaultUserState: UserState = {id:0, userName:"",authenticated: false};

const userSlice = createSlice({
    name: 'user',
    initialState: defaultUserState,
    reducers:{
        setAuthenticated(state,action){
            state.authenticated=action.payload
            return state;
        },
        setUserName(state,action){
            state.userName = action.payload
            return state;
        },
        setUserId(state, action){
            state.id = action.payload
            return state;
        },

    },
});

export const userActions = userSlice.actions;
export const userSelector = (state: RootState) => state.user;

export default userSlice;