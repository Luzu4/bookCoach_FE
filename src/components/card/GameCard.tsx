import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


type CardProps ={
    gameName: string;
    shortGameName:string;
    description:string;
    imgPath:string;
}

const GameCard: React.FC<CardProps>= ({ gameName,shortGameName,description,imgPath})=> {
    const loadedImage= require('../images/cs2.jpg');
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title={gameName}
            />
            <CardMedia
                component="img"
                height="194"
                image={loadedImage}
                alt={shortGameName}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

                <CardActions disableSpacing>
                    <Button variant="outlined" color="error">
                        Search Coach
                    </Button>
                </CardActions>

        </Card>
    );
}

export default GameCard;