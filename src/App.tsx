import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {Navigate, Route, Routes} from "react-router";
import VisitFormRegister from "./components/pages/VisitFormRegister";
import {coachesActions} from "./store/coachesSlice";
import {useAppDispatch} from "./store/store";
import {useCheckIfUserIsAuthenticatedQuery, useGetAllByTypeQuery} from './store/bookCoachApi'
import {userActions, userSelector} from "./store/userSlice";
import Secret from "./components/pages/Secret";
import {useSelector} from "react-redux";
import {useCookies} from "react-cookie";


function App() {

    const {data: allCoaches} = useGetAllByTypeQuery(1);
    const {currentData: userData} = useCheckIfUserIsAuthenticatedQuery('');
    const [cookies] = useCookies(['XSRF-TOKEN']);

    const saveUser = () =>{fetch('/user/save', {
        method:"POST",
        headers: {
            'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).catch(error=>{
        console.log(error)})}

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(coachesActions.replaceCoaches(allCoaches))
    }, [dispatch, allCoaches]);

    useEffect(() => {

        if (userData) {
            console.log(userData)
            dispatch(userActions.setAuthenticated(true));
            dispatch(userActions.setUserName(userData.email));
            dispatch(userActions.setUserId(userData.sub));
            saveUser();

        }


    }, [dispatch, userData])

    const authenticated = useSelector(userSelector).authenticated;

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<Main/>}/>
                {authenticated ? <Route path={"/secret"} element={<Secret/>}/> :
                    <Route path={"/secret"} element={<Navigate to="/" replace={true}/>}/>}
                <Route path={"/lessons/register"} element={<VisitFormRegister/>}/>
            </Routes>
        </div>
    );
}

export default App;
