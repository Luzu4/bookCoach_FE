import * as React from 'react';
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import Button from '@mui/material/Button';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';



type TableProps = {
    data:{}[],
    handleButtonSendClick:(id: string | number)=>void
}

const LessonsTableForRegister:React.FC<TableProps> = ({data,handleButtonSendClick})=>{
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'date', headerName: 'Date', width: 200 },
        { field: 'time', headerName: 'Time', width: 200 },
        { field: 'userId', headerName: 'CoachNick', width: 130, },
        {
            field: 'action',
            filterable:false,
            disableColumnMenu:true,
            headerName: 'Action',
            sortable: false,
            renderCell: (params) => {
                return <Button onClick={()=>handleButtonSendClick(params.id)} type="submit" color="secondary"><ScheduleSendIcon />{params.id}</Button>;
            },
        },
    ];
    return (
        <div style={{ height: 400, minWidth:300, width:800, }}>
            <DataGrid
                style={{color:"#E9B872"}}
                rows={data}
                columns={columns}
            />
        </div>
    );
}

export default LessonsTableForRegister;