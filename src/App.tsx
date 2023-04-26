import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {Route, Routes} from "react-router";
import VisitFormRegister from "./components/pages/VisitFormRegister";
import {useAppDispatch} from "./store/store";
import {useLocalState} from "./store/useLocalStorage";
import {checkToken} from "./store/userSlice";
import Coaches from "./components/pages/Coaches";
import Lessons from "./components/pages/Lessons";
import Users from "./components/pages/Users";
import jwt_decode from "jwt-decode";
import {Role, TokenData} from "./interfaces";
import PrivateRouteRole from "./store/PrivateRouteRole";
import Games from "./components/pages/Games";
import Footer from "./components/footer/Footer";

function App() {

    const dispatch = useAppDispatch();

    const [jwt,setJwt] = useLocalState("", "jwt");

    useEffect(()=>{
        if(jwt){
            const decodedToken: TokenData = jwt_decode(jwt);
            if(Date.now() >= decodedToken.exp*1000){
                localStorage.removeItem("jwt");
                setJwt("");
                window.location.href = "/";
            }else{
                dispatch(checkToken(jwt));
            }
        }
    },[])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<Main/>}/>
                <Route path={"/lessons/register"} element={<VisitFormRegister/>}/>
                <Route path={"/user/coach/lessons"} element={

                        <PrivateRouteRole roles={[Role.COACH, Role.ADMIN]}>
                    <Lessons/>
                        </PrivateRouteRole>
                }/>
                <Route path={"/user/player/lessons"} element={
                        <PrivateRouteRole roles={[Role.PLAYER]}>
                        <Lessons/>
                        </PrivateRouteRole>
                }/>
                <Route path={"/coaches/game/:id"} element={<Coaches/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/games"} element={
                    <PrivateRouteRole roles={[Role.ADMIN]}>
                        <Games/>
                    </PrivateRouteRole>

                }/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
