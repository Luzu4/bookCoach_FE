import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {
    Grid,
    Stack,
} from "@mui/material";
import {useEffect, useState} from "react";
import {
    useGetAllGamesQuery,
    useUpdateUserGamesMutation,
} from "../../store/bookCoachApi";
import {Game, Role} from "../../interfaces";
import {SelectChangeEvent} from "@mui/material/Select";
import SelectDropDownEnum from "../selectDropDown/SelectDropDownEnum";
import MultiSelectDropDownGames from "../selectDropDown/MultiSelectDropDownGames";


const boxContainerStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type props={
    userId:string;
    userGames:Game[];
    userRole:string;
    refetch:any;
}

const EditUser: React.FC<props> = ({userId,userGames,userRole,refetch}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const [role, setRole] = useState<string>(userRole);
    const [games,setGames] = useState<string[]>()

    const {data:allGamesData} = useGetAllGamesQuery();
    const [availableGames, setAvailableGames] = useState<Game[]>([]);

    useEffect(()=>{
        if(allGamesData){
            setAvailableGames(allGamesData);
            setGames(userGames.map(game=>game.name));
        }
    },[allGamesData])

    const [updateUserGamesAndRole] = useUpdateUserGamesMutation();

    const handleEditButtonClick = ()=>{
        const gamesId: number[] = [];

        if(allGamesData){
            games?.map(game=>{
                allGamesData.forEach(gameObject=>{
                    if(gameObject.name===game){
                        gamesId.push(gameObject.id);
                    }
                })
            })
            let userDataToSave = {
                "role": role,
                "gamesId": gamesId,
                "userId":userId
            }
            updateUserGamesAndRole(userDataToSave);
            refetch();
            setOpen(false);
        }
    }
    const handleChangeRole = (event: SelectChangeEvent)=>{
        setRole(event.target.value);
    }
    return (
        <div>
            <Button onClick={handleOpen}>EDIT</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxContainerStyle}>
                    <Grid container spacing={2}
                          justifyContent="center"
                          alignItems="center">
                        <Stack direction="column" spacing={2}>

                            <SelectDropDownEnum handleChange={handleChangeRole} roles={Object.keys(Role)} id={role} initialValue={userRole}/>

                            <MultiSelectDropDownGames availableGames={availableGames} setGames={setGames} userGames={userGames.map(game=>game.name)}/>

                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <Button onClick={handleClose} variant="contained">Cancel</Button>
                            <Button onClick={handleEditButtonClick} variant="contained">Edit</Button>
                        </Stack>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default EditUser