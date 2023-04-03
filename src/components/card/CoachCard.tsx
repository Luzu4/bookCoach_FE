import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import { useNavigate } from "react-router-dom";

type CardProps ={
    coachName: string;
    gameName:string;
    coachNick:string;
    description:string;
    imgPath:string;
}

const CoachCard: React.FC<CardProps>= ({coachName,gameName,coachNick,description,imgPath})=> {
    const loadedImage= require('../images/luz.jpg');
    const navigate = useNavigate();
    const handleClickBook=()=>{
        navigate("/lessons/register");
    }
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        R
                    </Avatar>
                }
                title={coachName}
                subheader={gameName}
            />
            <CardMedia
                component="img"
                height="194"
                image={loadedImage}
                alt={coachNick}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

                <CardActions disableSpacing>
                    <Button variant="outlined" color="error" onClick={handleClickBook}>
                        Book
                    </Button>
                </CardActions>

        </Card>
    );
}

export default CoachCard;