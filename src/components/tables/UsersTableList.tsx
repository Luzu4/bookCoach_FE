import {DataGrid, GridColDef} from "@mui/x-data-grid";
import React from "react";
import {UserForTable} from "../../interfaces";
import EditUser from "../modal/EditUser";

type TableProps = {
    data: UserForTable[],
    refetch: any
}
const UsersTableList: React.FC<TableProps> = ({data, refetch}) => {
    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70, flex: 0.1},
        {field: 'email', headerName: 'Email', width: 200, flex: 0.2},
        {field: 'nickName', headerName: 'Nick Name', width: 200, flex: 0.1},
        {field: 'role', headerName: 'role', width: 200, flex: 0.1},
        {
            field: 'userDetails', headerName: 'Games', flex: 0.3,
            renderCell: (params) => {
                let arrayGames: string[] = [];
                params.row.userDetailsAll.game.map((game: { name: string; }) => {
                    arrayGames.push(game.name + ", ");
                });
                return <div>{arrayGames}</div>;
            }
        },
        {
            field: 'action',
            filterable: false,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <EditUser userId={params.id + ""} userGames={params.row.userDetailsAll.game}
                                 userRole={params.row.role} refetch={refetch}/>;
            },
        },
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