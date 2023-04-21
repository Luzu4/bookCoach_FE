import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import React from "react";
import {Lesson} from "../../interfaces";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";


type TableProps = {
    data: Lesson[],
    handleDeleteButton: any,
    handleUnbookButton: any,
}

const LessonsTableList: React.FC<TableProps> = ({data, handleDeleteButton, handleUnbookButton}) => {

    const userData = useSelector(userSelector);





    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70, flex: 0.1},
        {field: 'date', headerName: 'Date', width: 200, flex: 0.1},
        {field: 'time', headerName: 'Time', width: 200, flex: 0.1},
        {field: 'user', headerName: 'Coach Nick', width: 200, flex: 0.1},
        {field: 'game', headerName: 'Game', width: 200, flex: 0.1},
        {field: 'status', headerName: 'status', width: 130, flex: 0.1},
        {
            field: 'action',
            filterable: false,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <div>{(userData.role === "COACH") ? <Button onClick={() => handleDeleteButton(params.id) }
                                                                   color="secondary">DELETE</Button> :
                    <Button onClick={() => handleUnbookButton(params.id)}
                            color="secondary">UNBOOK</Button>}</div>

                    ;
            },
        },
    ];
    return (
        <div style={{height: 400, minWidth: 300, width: 800,}}>
            <DataGrid
                style={{color: "#E9B872"}}
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default LessonsTableList;