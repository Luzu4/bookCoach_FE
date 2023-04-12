import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./NavBar.css";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {Link} from "react-router-dom";

export default function NavBar() {

    const [cookies] = useCookies(['XSRF-TOKEN']);
    const authenticated = useSelector(userSelector).authenticated;

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        // redirect to a protected URL to trigger authentication
        window.location.href = `//${window.location.hostname}${port}/api/private`;

    }

    const logout = () => {
        fetch('/api/logout', {
            method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': cookies['XSRF-TOKEN']}
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = window.location.origin;

            });
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar className="navBar">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        BOOK COACH
                    </Typography>
                    {authenticated ? <Button color="inherit" onClick={() => {
                            logout()
                        }}>Logout</Button> :
                        <Button color="inherit" onClick={() => {
                            login()
                        }}>Login/Register</Button>
                    }
                    {authenticated ? <Button ><Link to="/secret">Show Secret for users</Link></Button> : "" }

                </Toolbar>
            </AppBar>
        </Box>
    );
}