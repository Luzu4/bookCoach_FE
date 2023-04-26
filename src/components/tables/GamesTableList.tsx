import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import React from "react";
import {Game} from "../../interfaces";
import EditGame from "../modal/EditGame";
import {Stack} from "@mui/material";


type TableProps = {
    data: Game[],
    handleDeleteButton: any,
    refetch:any


}

const GamesTableList: React.FC<TableProps> = ({data, handleDeleteButton,refetch}) => {

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', flex: 0.1},
        {field: 'name', headerName: 'Name', width: 200, flex: 0.1},
        {field: 'shortGameName', headerName: 'ShortGameName', width: 200, flex: 0.1},
        {field: 'description', headerName: 'Description', width: 200, flex: 0.1},
        {field: 'imageUrl', headerName: 'ImageURL', width: 200, flex: 0.1},
        {
            field: 'action',
            filterable: false,
            flex:0.2,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <div><Stack direction="row" spacing={2}><Button onClick={() => handleDeleteButton(params.id)}
                                    color="secondary">DELETE</Button>
                    <EditGame gameId={+params.id} refetch={refetch} /></Stack></div>;
            },
        },
    ];
    return (
        <div style={{height: 400, minWidth: 300, padding:"40px"}}>
            <DataGrid
                style={{color: "#E9B872", borderColor:"#A63D40"}}
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default GamesTableList;