import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
    Alert,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    Stack,
    TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useForm, SubmitHandler} from "react-hook-form";
import {useAppDispatch} from "../../store/store";
import {registerUser} from "../../store/userSlice";
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
    email: string;
    password: string;
    confirmPassword: string;
    nickName: string;
}


const Signup: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const dispatch = useAppDispatch();


    const {register, handleSubmit, reset} = useForm<formInput>();

    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [nickNameError, setNickNameError] = useState(false);
    const [emailEmptyError, setEmailEmptyError] = useState(false)
    const [emailExistsError, setEmailExistsError] = useState(false)
    const [openConfirm, setOpenConfirm] = React.useState(false);

    const handleCloseConfirmSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenConfirm(false);
        setOpen(false);
        reset();
    };

    const onSubmit: SubmitHandler<formInput> = data => {

        const reqBody = {
            email: data.email,
            password: data.password,
            nickName: data.nickName
        };
        if (data.password === data.confirmPassword && data.email && data.password && data.nickName) {
            dispatch(registerUser(reqBody)).unwrap()
                .then(response => setOpenConfirm(true))
                .catch(error => {
                    if (error.message === "Email already exists in database") {
                        setEmailExistsError(true);
                    }
                });
        } else if (data.password !== data.confirmPassword) {
            setConfirmPasswordError(true);
        } else if (!data.email) {
            setEmailEmptyError(true)
        } else if (!data.nickName) {
            setNickNameError(true)
        } else if (!data.password) {
            setPasswordError(true)
        }
    }


    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>Signup</Button>
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
                                    Signup
                                </Typography>
                            </Grid>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("email")} onChange={() => {
                                    setEmailEmptyError(false)
                                }} type="email" label="Email"
                                           variant="outlined"/>
                                <FormHelperError message={"Field cannot be empty"} isError={emailEmptyError}/>
                                <FormHelperError message={"Email already exists in database!"}
                                                 isError={emailExistsError}/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("nickName")} onChange={() => setNickNameError(false)}
                                           type="text" label="NickName"
                                           variant="outlined"/>
                                <FormHelperError message={"Field cannot be empty"} isError={nickNameError}/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register("password")}
                                    id="outlined-adornment-password"
                                    onChange={() => setPasswordError(false)}
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
                                <FormHelperError message={"Field cannot be empty"} isError={passwordError}/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("confirmPassword")}
                                           onChange={() => setConfirmPasswordError(false)} type="password"
                                           label="ConfirmPassword"
                                           variant="outlined"/>
                                <FormHelperError message={"Passwords are different!"} isError={confirmPasswordError}/>
                            </FormControl>
                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleClose} variant="contained">Cancel</Button>
                                <Button type="submit" variant="contained">Signup</Button>
                            </Stack>
                            <Snackbar open={openConfirm} autoHideDuration={6000} onClose={handleCloseConfirmSnack}>
                                <Alert onClose={handleCloseConfirmSnack} severity="success" sx={{width: '100%'}}>
                                    Confirm you email. Link sent on your email address
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Signup