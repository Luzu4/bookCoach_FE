import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
import {setupListeners} from '@reduxjs/toolkit/query'
import {bookCoachApi} from './bookCoachApi'
import userSlice from "./userSlice";

const store = configureStore({
    reducer: {user: userSlice.reducer, [bookCoachApi.reducerPath]: bookCoachApi.reducer,},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookCoachApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;

