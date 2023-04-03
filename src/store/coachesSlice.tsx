import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

type CoachesState = {
    id: number,
    nickName: string,
    detailsId: number
}[]


const defaultCoachesState: CoachesState = [];

const coachesSlice = createSlice({
    name: 'coaches',
    initialState: defaultCoachesState,
    reducers: {
        replaceCoaches(state, action) {
            return action.payload;
        },
    },
});

export const coachesActions = coachesSlice.actions;
export const coachesSelector = (state: RootState) => state.coaches;

export default coachesSlice;