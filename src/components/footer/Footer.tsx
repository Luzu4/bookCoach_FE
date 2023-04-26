import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import {Grid} from "@mui/material";


const Footer = () => {
    return (
        <footer>

            <Box py={1} style={{position:"fixed", bottom:0,width:"100%" ,backgroundColor: "#A63D40"}} display="flex" flexWrap="wrap" alignItems="center">
                <Grid container spacing={1} display={"flex"} justifyContent={"center"}>
                    <Grid item xs={12}>
                        <Box component="nav">
                            <Link href="https://github.com/Luzu4" variant="body1" style={{marginRight:"30px", marginLeft:"30px",color: "#E9B872"}}
                            ><GitHubIcon/>GitHub</Link>
                            <Link href="https://www.linkedin.com/in/maciej-bugaj/" variant="body1"
                                  style={{marginRight:"30px", marginLeft:"30px",color: "#E9B872"}}><LinkedInIcon/>LinkedIn</Link>
                            <Link href="https://www.codewars.com/users/Luzu4" variant="body1" style={{marginRight:"30px", marginLeft:"30px",color: "#E9B872"}}
                            ><CodeIcon/>CodeWars</Link>
                            <Link href="https://leetcode.com/Luzu4/" variant="body1" style={{marginRight:"30px", marginLeft:"30px",color: "#E9B872"}}
                            ><CodeIcon/>LeetCode</Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} marginTop={"20px"}>
                        <Typography style={{color: "#E9B872"}} component="p" variant="caption" gutterBottom={false}>©
                            2022
                            Luz </Typography>
                    </Grid>
                </Grid>
            </Box>

        </footer>
    );
}

export default Footer;