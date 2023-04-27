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
import {useGetUserByEmailQuery, useUpdateUserDataMutation} from "../../store/bookCoachApi";

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
    city: string;
    country: string;
    language: string;
    description: string;
    imageUrl: string;
}


const EditUserData: React.FC = () => {
    const userData = useSelector(userSelector);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const dispatch = useAppDispatch();


    const {register, handleSubmit} = useForm<formInput>();

    const [user, setUser] = React.useState<formInput>({
        email: "",
        password: "",
        confirmPassword: "",
        nickName: "",
        city: "",
        country: "",
        language: "",
        description: "",
        imageUrl: "",
    });
    const {data: userDataFetch} = useGetUserByEmailQuery(userData.email);

    useEffect(() => {
        if (userDataFetch) {
            setUser({
                email: userDataFetch.email,
                password: "",
                confirmPassword: "",
                nickName: userDataFetch.nickName,
                city: userDataFetch.userDetails.city,
                country: userDataFetch.userDetails.country,
                language: userDataFetch.userDetails.language,
                description: userDataFetch.userDetails.description,
                imageUrl: userDataFetch.userDetails.imageUrl
            })
        }


    }, [userDataFetch])

    const [updateUserData, response] = useUpdateUserDataMutation();
    const onSubmit: SubmitHandler<formInput> = data => {

        const reqBody = {
            email: data.email,
            password: data.password,
            nickName: data.nickName,
            city: data.city,
            country: data.country,
            language: data.language,
            description: data.description,
            imageUrl: data.imageUrl
        };
        if (data.password === data.confirmPassword) {
            updateUserData(reqBody)
        } else {
            alert("passwords must be identical")
        }


    }

    return (
        <div>
            <Button color="inherit" onClick={handleOpen}>Settings</Button>
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
                                <TextField {...register("email")} value={user.email}
                                           onChange={(event) => setUser({...user, email: event.target.value})}
                                           type="email" label="Email"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("nickName")} value={user.nickName}
                                           onChange={(event) => setUser({...user, nickName: event.target.value})}
                                           type="text" label="NickName"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("city")} value={user.city}
                                           onChange={(event) => setUser({...user, city: event.target.value})}
                                           type="text" label="City"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("country")} value={user.country}
                                           onChange={(event) => setUser({...user, country: event.target.value})}
                                           type="text" label="Country"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("language")} value={user.language}
                                           onChange={(event) => setUser({...user, language: event.target.value})}
                                           type="text" label="Language"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("description")} value={user.description}
                                           onChange={(event) => setUser({...user, description: event.target.value})}
                                           type="text"
                                           label="Description"
                                           variant="outlined"/>
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("imageUrl")} value={user.imageUrl}
                                           onChange={(event) => setUser({...user, imageUrl: event.target.value})}
                                           type="text" label="ImageUrl"
                                           variant="outlined"/>
                            </FormControl>

                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    {...register("password")}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                <TextField {...register("confirmPassword")} type="password"
                                           label="ConfirmPassword"
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

export default EditUserData