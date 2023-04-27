import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useGetAllGamesQuery} from "../../store/bookCoachApi";
import {Game} from "../../interfaces";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {FormHelperText, Stack} from "@mui/material";
import "./SearchInput.css";

export default function BasicSelect() {
    const [game, setGame] = React.useState('');
    const {data: allGamesData} = useGetAllGamesQuery();
    const [games, setGames] = useState<Game[]>([]);

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        setGame(event.target.value as string);
    };

    const [selectGameError, setSelectGameError] = useState(false);

    const handleFindCoachClick = () => {
        if (!game){
            setSelectGameError(true);

        }
        if (game) {
            navigate("/coaches/game/" + game)
        }

    }

    useEffect(() => {
        if (allGamesData) {
            setGames(allGamesData);
        }
    }, [allGamesData])
    return (
        <>
            <Box marginBottom={"5rem"}>
                <Stack direction="column" justifyContent={"center"} alignItems={"center"}>
                    <FormControl style={{marginTop: "30px", background: "#E9B872", width: "25%"}}>
                        <InputLabel id="demo-simple-select-label">Game</InputLabel>
                        <Select
                            style={{backgroundColor: "#E9B872"}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={game}
                            label="Age"
                            onChange={handleChange}
                            className={selectGameError ? "danger" : ""}
                        >
                            {games.map(game => (
                                <MenuItem style={{backgroundColor: "#E9B872"}} key={game.id}
                                          value={game.id}>{game.name}</MenuItem>
                            ))}

                        </Select>
                    </FormControl>
                    {selectGameError && <FormHelperText style={{color:"red"}} id="component-error-text"> First Select Game</FormHelperText>}
                    <Button style={{margin: "30px"}} variant="outlined" color="error" onClick={handleFindCoachClick}>Find
                        Coach!</Button>
                </Stack>
            </Box>
        </>
    );
}
