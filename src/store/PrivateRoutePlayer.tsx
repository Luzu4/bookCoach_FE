import React from 'react';
import {useLocalState} from "./useLocalStorage";
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux";
import {userSelector} from "./userSlice";

// @ts-ignore
const PrivateRoutePlayer = ({children}) => {
    const [jwt] = useLocalState("", "jwt");
    const userStatus = useSelector(userSelector);

    if (!jwt || !userStatus.isAuthenticated || (userStatus.role !== "PLAYER")) {
        return <Navigate to="/"/>
    }
    return children;
};

export default PrivateRoutePlayer;
