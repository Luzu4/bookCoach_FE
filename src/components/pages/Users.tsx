import React, {useEffect, useState} from 'react';

import {
    useGetAllUsersQuery,

} from "../../store/bookCoachApi";

import {UserForTable} from "../../interfaces";
import {useLocalState} from "../../store/useLocalStorage";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import UsersTableList from "../tables/UsersTableList";



const Users = () => {

    const [jwt, setJwt] = useLocalState("", "jwt")
    const userData = useSelector(userSelector);

    const {data: allUsers} = useGetAllUsersQuery("");

    const [tableData, setTableData] = useState<UserForTable[]>([]);


    useEffect(() => {
        if(allUsers){
            setTableData(allUsers);
        }
    }, [allUsers])


    return (
        <div>
            <UsersTableList data={tableData}/>
        </div>
    );
};

export default Users;
