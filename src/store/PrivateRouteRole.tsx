import React from 'react';
import {useLocalState} from "./useLocalStorage";
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux";
import {userSelector} from "./userSlice";
import {Role} from "../interfaces";


type Props = {
    children: any,
    roles?: Role[],

}

const PrivateRouteRole: React.FC<Props> = ({children, roles}) => {
    const [jwt] = useLocalState("", "jwt");
    const userStatus = useSelector(userSelector);

    if (!jwt || !userStatus.isAuthenticated) {
        return <Navigate to="/"/>
    }
    if(roles){
        if (!roles?.some((role) => role === userStatus.role)){
            return <Navigate to="/"/>
        }
    }

    return children;
};

export default PrivateRouteRole;
