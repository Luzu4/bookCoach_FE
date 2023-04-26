import React, {useEffect, useState} from 'react';

import {
    useGetAllUsersQuery,

} from "../../store/bookCoachApi";

import {UserForTable} from "../../interfaces";
import UsersTableList from "../tables/UsersTableList";



const Users = () => {
    const {data: allUsers, refetch} = useGetAllUsersQuery("");

    const [tableData, setTableData] = useState<UserForTable[]>([]);


    useEffect(() => {
        if(allUsers){
            setTableData(allUsers);
        }
    }, [allUsers])


    return (
        <div>
            <UsersTableList data={tableData} refetch={refetch}/>
        </div>
    );
};

export default Users;
