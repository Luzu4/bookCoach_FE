import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";


type CardProps ={
    gameName: string;
    shortGameName:string;
    description:string;
    imgPath:string;
    gameId:number;
}

const GameCard: React.FC<CardProps>= ({gameId, gameName,shortGameName,description,imgPath})=> {
    const navigate = useNavigate();
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title={gameName}
            />
            <CardMedia
                component="img"
                height="194"
                image={imgPath}
                alt={shortGameName}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

                <CardActions disableSpacing>
                    <Button onClick={()=>navigate("/coaches/game/"+gameId)} variant="outlined" color="error">
                        Search Coach
                    </Button>
                </CardActions>

        </Card>
    );
}

export default GameCard;