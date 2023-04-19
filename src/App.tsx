import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {Route, Routes} from "react-router";
import VisitFormRegister from "./components/pages/VisitFormRegister";

import {useEffect} from "react";
import {coachesActions} from "./store/coachesSlice";
import {useAppDispatch} from "./store/store";
import {useGetAllByTypeQuery} from './store/bookCoachApi'
import {useLocalState} from "./store/useLocalStorage";
import {checkToken} from "./store/userSlice";
import PrivateRouteCoach from "./store/PrivateRouteCoach";
import PrivateRoutePlayer from "./store/PrivateRoutePlayer";
import Coaches from "./components/pages/Coaches";
import Lessons from "./components/pages/Lessons";

function App() {

    const{data:allCoaches} = useGetAllByTypeQuery("coach");

    const dispatch = useAppDispatch();

    const [jwt, setJwt] = useLocalState("", "jwt");

    if (jwt) {
        dispatch(checkToken(jwt));
    }


    useEffect(()=>{
        dispatch(coachesActions.replaceCoaches(allCoaches))

    },[dispatch,allCoaches]);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={"/lessons/register"} element={<VisitFormRegister/>}/>
                <Route path={"/user/coach/lessons"} element={
                    <PrivateRouteCoach>
                    <Lessons/>
                    </PrivateRouteCoach>
                }/>

                <Route path={"/user/player/lessons"} element={
                    <PrivateRoutePlayer>
                        <Lessons/>
                    </PrivateRoutePlayer>
                }/>

                <Route path={"/coaches/game/:id"} element={<Coaches/>}/>

            </Routes>
        </div>
    );
}

export default App;
