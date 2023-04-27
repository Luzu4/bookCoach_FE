import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import React from "react";
import {Lesson} from "../../interfaces";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {Stack} from "@mui/material";


type TableProps = {
    data: Lesson[],
    handleDeleteButton: any,
    handleUnbookButton: any,
}

const LessonsTableList: React.FC<TableProps> = ({data, handleDeleteButton, handleUnbookButton}) => {

    const userData = useSelector(userSelector);

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 10},
        {field: 'date', headerName: 'Date', width: 200, flex: 0.1},
        {field: 'time', headerName: 'Time', width: 200, flex: 0.1},
        {
            field: 'user', headerName: 'Coach Nick', width: 200, flex: 0.1,
            renderCell: (params) => {
                return <div>{params.row.user.nickName}</div>
            }
        },
        {
            field: 'game', headerName: 'Game', width: 200, flex: 0.1,
            renderCell: (params) => {
                return <div>{params.row.game !== null ? <div>{params.row.game.name}</div> :
                    <div>GAME DELETED</div>}</div>;
            }
        },
        {field: 'playerEmail', headerName: 'playerEmail', width: 130, flex: 0.1},
        {
            field: 'action',
            filterable: false,
            width: 150,
            flex: 0.3,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <div>{(Date.now() < Date.parse(params.row.date)) ?
                    <div>{(userData.role === "COACH" || userData.role === "ADMIN") ? <div>
                        {params.row.playerEmail !==null ? <Stack direction="row" spacing={2}><Button onClick={() => handleDeleteButton(params.id)}
                                                                                                     color="secondary">DELETE</Button> <Button
                            onClick={() => handleUnbookButton(params.id)}
                            color="secondary">UNBOOK</Button></Stack>:<Button onClick={() => handleDeleteButton(params.id)}
                                                                              color="secondary">DELETE</Button> }
                        </div>
                         :
                        <Button onClick={() => handleUnbookButton(params.id)}
                                color="secondary">UNBOOK</Button>}</div> : ""}</div>

                    ;
            },
        },
    ];
    return (
        <div style={{height: 400, minWidth: 300, padding: "40px"}}>
            <DataGrid
                style={{color: "#E9B872", borderColor: "#A63D40"}}
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default LessonsTableList;