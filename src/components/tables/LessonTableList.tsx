import {DataGrid, GridColDef, GridRowId} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import React from "react";
import {Lesson} from "../../interfaces";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {useRemoveLessonByIdMutation, useRemovePlayerFromLessonMutation} from "../../store/bookCoachApi";


type TableProps = {
    data: Lesson[],
}

const LessonsTableList: React.FC<TableProps> = ({data}) => {

    const userData = useSelector(userSelector);

   const [deleteLesson, response] = useRemoveLessonByIdMutation();
   const [deletePlayerFromLesson, responsex] = useRemovePlayerFromLessonMutation();

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'date', headerName: 'Date', width: 200},
        {field: 'time', headerName: 'Time', width: 200},
        {field: 'userId', headerName: 'Coach Nick', width: 200},
        {field: 'gameName', headerName: 'Game', width: 200},
        {field: 'status', headerName: 'status', width: 130,},
        {
            field: 'action',
            filterable: false,
            disableColumnMenu: true,
            headerName: 'Actions',
            sortable: false,
            renderCell: (params) => {
                return <div>{(userData.role === "COACH") ? <Button onClick={()=>deleteLesson(params.id)}
                                    color="secondary">DELETE</Button>:
                    <Button onClick={() => deletePlayerFromLesson(params.id)}
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