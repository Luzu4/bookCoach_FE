import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

type CardProps = {
    coachName: string;
    gameName?: string;
    coachNick: string;
    description?: string;
    imgPath?: string;
}

const CoachCard: React.FC<CardProps> = ({coachName, gameName, coachNick, description, imgPath}) => {
    const navigate = useNavigate();
    const handleClickBook = () => {
        navigate("/lessons/register");
    }
    return (
        <Card style={{backgroundColor: "#A63D40", color: "#E9B872"}}>
            <CardHeader
                title={coachName}
                subheader={gameName}/>
            <CardMedia
                component="img"
                height="194"
                image={imgPath}
                alt={coachNick}/>
            <CardContent>
                <Typography variant="body1" color="#E9B872">
                    {description}
                </Typography>
            </CardContent>
            <CardActions style={{display: "flex", justifyContent: "center"}}>
                <Button variant="outlined" color="inherit" onClick={handleClickBook}>
                    Book
                </Button>
            </CardActions>
        </Card>
    );
}

export default CoachCard;