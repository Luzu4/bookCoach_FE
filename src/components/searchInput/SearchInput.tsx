import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useGetAllGamesQuery} from "../../store/bookCoachApi";
import {Game} from "../../interfaces";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";

export default function BasicSelect() {
    const [game, setGame] = React.useState('');
    const {data:allGamesData} = useGetAllGamesQuery();
    const [games, setGames] = useState<Game[]>([]);

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const handleFindCoachClick = ()=>{
        if(game){
            navigate("/coaches/game/"+game)
        }

    }

    useEffect(()=>{
        if(allGamesData){
            setGames(allGamesData);
        }
    },[allGamesData])
    return (
        <>
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth style={{background: "#E9B872"}}>
                <InputLabel id="demo-simple-select-label">Game</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={game}
                    label="Age"
                    onChange={handleChange}
                >

                    {games.map(game=>(
                        <MenuItem value={game.id}>{game.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            <Button onClick={handleFindCoachClick}>Find Coach!</Button>
        </Box>
        </>
    );
}