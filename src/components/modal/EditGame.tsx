import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useForm, SubmitHandler} from "react-hook-form";
import {useAppDispatch} from "../../store/store";
import {userSelector} from "../../store/userSlice";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {
    useGetGameByIdQuery,
    useGetUserByEmailQuery,
    useUpdateGameDataMutation,
    useUpdateUserDataMutation
} from "../../store/bookCoachApi";

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

interface formInput {
    name: string;
    shortGameName: string;
    description: string;
    imageUrl: string;
}

type props={
    gameId:number,
}

const EditGame: React.FC<props> = ({gameId}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch();


    const {register, handleSubmit} = useForm<formInput>();

    const [game, setGame] = React.useState<formInput>({
        name: "",
        shortGameName: "",
        description: "",
        imageUrl: "",
    });

    const {data: gameDataFetch} = useGetGameByIdQuery(gameId)

    useEffect(() => {

        if(gameDataFetch){
            setGame({
                name: gameDataFetch.name,
                shortGameName: gameDataFetch.shortGameName,
                description: gameDataFetch.description,
                imageUrl: gameDataFetch.imageUrl,

            })
        }


    }, [gameDataFetch])

    const [updateGameData, response] = useUpdateGameDataMutation();
    const onSubmit: SubmitHandler<formInput> = data => {

        const reqBody = {
            id:gameId,
            name: data.name,
            shortGameName:data.shortGameName,
            description: data.description,
            imageUrl: data.imageUrl,
        };

        updateGameData(reqBody);


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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}
                              justifyContent="center"
                              alignItems="center">
                            <Grid item xs={12}
                                  textAlign={"center"}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Settings
                                </Typography>
                            </Grid>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("name")} value={game.name} onChange={(event)=>setGame({...game,name:event.target.value})} type="text" id="outlined-basic" label="Name"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("shortGameName")} value={game.shortGameName} onChange={(event)=>setGame({...game,shortGameName:event.target.value})}  type="text" id="outlined-basic" label="ShortGameName"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("description")} value={game.description} onChange={(event)=>setGame({...game,description:event.target.value})}  type="text" id="outlined-basic" label="Description"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("imageUrl")} value={game.imageUrl} onChange={(event)=>setGame({...game,imageUrl:event.target.value})}  type="text" id="outlined-basic" label="ImageUrl"
                                           variant="outlined"/>
                            </FormControl>
                            <Stack direction="row" spacing={12}>
                                <Button onClick={handleClose} variant="contained">Cancel</Button>
                                <Button type="submit" variant="contained">Edit</Button>
                            </Stack>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default EditGame