import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    FormControl, FormHelperText,
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
import {authenticateUser} from "../../store/userSlice";
import {useState} from "react";

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
    email: string;
    password: string;
}


const LoginModal: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [userDataError, setUserDataError] = useState(false);
    const [userEmailVerifiedError, setUserEmailVerifiedError] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showPassword, setShowPassword] = React.useState(false);


    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const dispatch = useAppDispatch();
    const {register, handleSubmit} = useForm<formInput>();

    const onSubmit: SubmitHandler<formInput> = data => {

        const reqBody = {
            email: data.email,
            password: data.password
        };
        dispatch(authenticateUser(reqBody)).unwrap()
            .then()
            .catch(error => {
                if (error.message === "Wrong email or password!") {
                    setUserDataError(true)
                } else if (error.message === "Email not verified!") {
                    setUserEmailVerifiedError(true)
                }
            });
    }

    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>Login</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={boxContainerStyle}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}
                              justifyContent="center"
                              alignItems="center">
                            <Grid item xs={12}
                                  textAlign={"center"}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Login
                                </Typography>
                            </Grid>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("email")} type="email" onChange={() => {
                                    setUserDataError(false)
                                }} id="outlined-basic" label="Email"
                                           variant="outlined"/>
                                {userDataError &&
                                    <FormHelperText style={{color: "red"}} id="component-error-text"> Wrong Email or
                                        Password</FormHelperText>}
                                {userEmailVerifiedError &&
                                    <FormHelperText style={{color: "red"}} id="component-error-text"> Email not
                                        verified!</FormHelperText>}
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register("password")}
                                    onChange={() => {
                                        setUserDataError(false)
                                    }}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end">
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"/>
                                {userDataError &&
                                    <FormHelperText style={{color: "red"}} id="component-error-text"> Wrong Email or
                                        Password</FormHelperText>}
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleClose} variant="contained">Cancel</Button>
                                <Button type="submit" variant="contained">Log in</Button>
                            </Stack>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default LoginModal