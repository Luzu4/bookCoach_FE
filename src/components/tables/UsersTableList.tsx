import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import React from "react";
import {Lesson, UserForTable} from "../../interfaces";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import EditUser from "../modal/EditUser";


type TableProps = {
    data: UserForTable[],
}

const UsersTableList: React.FC<TableProps> = ({data}) => {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70, flex: 0.1},
        {field: 'email', headerName: 'Email', width: 200, flex: 0.2},
        {field: 'nickName', headerName: 'Nick Name', width: 200, flex: 0.1},
        {field: 'role', headerName: 'role', width: 200, flex: 0.1},
        {field: 'userDetails', headerName: 'Games', flex: 0.3,
        renderCell: (params)=>{
            let arrayGames:string[] = [];
            params.row.userDetails.game.map((game: { name: string; })=>{
                arrayGames.push(game.name+", ");
            });
            return <div>{arrayGames}</div>;
        }},
        {
            field: 'action',
            filterable: false,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <EditUser userId={params.id+""} userGames={params.row.userDetails.game} userRole={params.row.role}/>;
        },},
    ];
    return (
        <div style={{height: 400, minWidth: 300,}}>
            <DataGrid
                style={{color: "#E9B872"}}
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default UsersTableList;