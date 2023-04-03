import React from 'react';
import './App.css';
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {Route, Routes} from "react-router";
import VisitFormRegister from "./components/pages/VisitFormRegister";
import {useAppDispatch} from "./store/store"
import {fetchCoachesData} from "./store/coachesActions";
import {useEffect} from "react";

function App() {

    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchCoachesData());
    },[dispatch]);


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
