import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./NavBar.css";
import LoginModal from "../modal/Login";
import {userSelector} from "../../store/userSlice";
import {useSelector} from "react-redux";
import {useLocalState} from "../../store/useLocalStorage";
import Signup from "../modal/Signup";
import {useNavigate} from "react-router-dom";
import EditUserData from "../modal/EditUserData";
import {Stack} from "@mui/material";

export default function NavBar() {
    const navigate = useNavigate();
    const userData = useSelector(userSelector);
    const [jwt, setJwt] = useLocalState("", "jwt");
    const handleLogoutClick = () => {
        localStorage.removeItem("jwt");
        setJwt("");
        window.location.href = "/";
    }


    return (
        <Box>
            <AppBar position="fixed" style={{top: 0, marginBottom: "100px"}}>
                <Toolbar className="navBar">
                    <div onClick={() => {
                        window.location.href = "/"
                    }}>
                        <Typography onClick={() => {
                        }} variant="h6" component="div" sx={{flexGrow: 1}}>
                            BOOK COACH
                        </Typography>
                    </div>
                    <div style={{marginLeft:"auto"}}>
                        <Stack direction="row">
                        {userData.isAuthenticated ? <EditUserData/> : ""}

                        {userData.isAuthenticated ? <div>
                            {userData.role === "PLAYER" ?
                                <Button color="inherit" onClick={() => navigate("/user/player/lessons")}>My
                                    Lessons</Button>
                                : ""}
                            {userData.role === "ADMIN" ?
                                <Button color="inherit" onClick={() => navigate("/user/admin/lessons")}>My
                                    Lessons</Button>
                                : ""}
                            {userData.role === "ADMIN" ?
                                <Button color="inherit" onClick={() => navigate("/games")}>Games</Button> : ""}
                            {userData.role === "COACH" ?
                                <Button color="inherit" onClick={() => navigate("/user/coach/lessons")}>My
                                    Lessons</Button> : ""}
                        </div> : ""}
                        {(userData.isAuthenticated && userData.role === "ADMIN") ?
                            <Button color="inherit" onClick={() => navigate("/users")}>USERS</Button> : ""}
                        <div>
                            {userData.isAuthenticated ?
                                <Button color="inherit" onClick={handleLogoutClick}>Logout </Button> :
                                <div><Stack direction="row"><LoginModal/> <Signup/></Stack></div>}
                        </div>
                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}