import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./NavBar.css";
import LoginModal from "../modal/Login";
import userSlice, {userSelector} from "../../store/userSlice";
import {useSelector} from "react-redux";
import {useLocalState} from "../../store/useLocalStorage";
import Signup from "../modal/Signup";

export default function NavBar() {

    const userData = useSelector(userSelector);
    const [jwt,setJwt] = useLocalState("","jwt");
    const handleLogoutClick = () => {
        localStorage.setItem("jwt", "\"\"");
        setJwt("");
        window.location.href = "/";
    }


    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar className="navBar">
                    <div onClick={()=>{
                        window.location.href="/"}}>
                    <Typography onClick={()=>{}} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BOOK COACH
                    </Typography>
                    </div>
                    <div>
                    <Button color="inherit">Login/Register</Button>
                    </div>

                    <div>{userData.isAuthenticated ? <Button onClick={handleLogoutClick}>Logout </Button> : <div><LoginModal/> <Signup/></div> }

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}