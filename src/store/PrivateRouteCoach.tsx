import React from 'react';
import {useLocalState} from "./useLocalStorage";
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux";
import {userSelector} from "./userSlice";

// @ts-ignore
const PrivateRouteCoach = ({children}) => {
    const [jwt] = useLocalState("", "jwt");
    const userStatus = useSelector(userSelector);

    if (!jwt || !userStatus.isAuthenticated || (userStatus.role !== "COACH")) {
        return <Navigate to="/"/>
    }
    return children;
};

export default PrivateRouteCoach;
