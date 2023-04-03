import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import coachesSlice from "./coachesSlice";
import thunk from "redux-thunk";
const store = configureStore({
    reducer: {coaches: coachesSlice.reducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;