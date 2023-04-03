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

function App() {

    const{data:allCoaches} = useGetAllByTypeQuery(1);

    const dispatch = useAppDispatch();


    useEffect(()=>{
        dispatch(coachesActions.replaceCoaches(allCoaches))
    },[dispatch,allCoaches]);

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={"/lessons/register"} element={<VisitFormRegister/>}/>
            </Routes>
        </div>
    );
}

export default App;
