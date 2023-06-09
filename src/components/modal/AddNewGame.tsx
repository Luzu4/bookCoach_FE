import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    FormControl,
    Grid,
    Stack,
    TextField
} from "@mui/material";

import {useForm, SubmitHandler} from "react-hook-form";
import {
    useAddNewGameMutation,
} from "../../store/bookCoachApi";
import {useState} from "react";
import FormHelperError from "../FormHelperError";

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

type props = {
    refetch: any
}

const AddNewGame: React.FC<props> = ({refetch}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {register, handleSubmit} = useForm<formInput>();

    const [game, setGame] = React.useState<formInput>({
        name: "",
        shortGameName: "",
        description: "",
        imageUrl: "",
    });

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageUrlError, setImageUrlError] = useState(false);
    const [nameExistsError, setNameExistsError] = useState(false)


    const [addNewGameData] = useAddNewGameMutation();
    const onSubmit: SubmitHandler<formInput> = data => {

        const reqBody = {
            name: data.name,
            shortGameName: data.shortGameName,
            description: data.description,
            imageUrl: data.imageUrl,
        };

        if (data.name.length > 1 && data.imageUrl.length > 0 && data.description.length > 0) {
            addNewGameData(reqBody).unwrap()
                .then()
                .catch(error => {
                    if (error.data.message === "Game already exists!") {
                        setNameExistsError(true);
                    }
                });
            refetch();
        } else if (data.name.length < 1) {
            setNameError(true);
        } else if (data.description.length < 1) {
            setDescriptionError(true);
        } else if (data.imageUrl.length < 1) {
            setImageUrlError(true)
        }


    }
    return (
        <div>
            <Button color="error" variant="outlined" onClick={handleOpen}>Add New Game</Button>
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
                                    Add New Game
                                </Typography>
                            </Grid>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("name")} value={game.name}
                                           onChange={(event) => {
                                               setNameError(false);
                                               setNameExistsError(false);
                                               setGame({...game, name: event.target.value})
                                           }}
                                           type="text" id="outlined-basic" label="Name"
                                           variant="outlined"/>
                                <FormHelperError message={"This field cannot be empty"} isError={nameError}/>
                                <FormHelperError message={"This name already exists in Database"}
                                                 isError={nameExistsError}/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("shortGameName")} value={game.shortGameName}
                                           onChange={(event) => setGame({...game, shortGameName: event.target.value})}
                                           type="text" id="outlined-basic" label="ShortGameName"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("description")} value={game.description} onChange={(event) => {
                                    setDescriptionError(false)
                                    setGame({...game, description: event.target.value})
                                }} type="text" id="outlined-basic" label="Description"
                                           variant="outlined"/>
                                <FormHelperError message={"This field cannot be empty"} isError={descriptionError}/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("imageUrl")} value={game.imageUrl} onChange={(event) => {
                                    setImageUrlError(false)
                                    setGame({...game, imageUrl: event.target.value})
                                }} type="text" id="outlined-basic" label="ImageUrl"
                                           variant="outlined"/>
                                <FormHelperError message={"This field cannot be empty"} isError={imageUrlError}/>
                            </FormControl>
                            <Stack direction="row" spacing={12}>
                                <Button onClick={handleClose} variant="contained">Cancel</Button>
                                <Button type="submit" variant="contained">Add</Button>
                            </Stack>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddNewGame