import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import "./NavBar.css";

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Toolbar className="navBar">
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        BOOK COACH
                    </Typography>
                    <Button color="inherit">Login/Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}