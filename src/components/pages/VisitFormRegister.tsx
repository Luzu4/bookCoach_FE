import React, {useEffect, useState} from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {Grid} from "@mui/material";
import "./VisitFormRegister.css";
import {useForm, SubmitHandler} from "react-hook-form";
import {useSelector} from "react-redux";
import {coachesSelector} from "../../store/coachesSlice"
import {getCoachesGamesData} from "../../store/coachesActions";
import {useAppDispatch} from "../../store/store";

type FormValues = {
    email: string;
    gameName: number;
    coachId: string;
    date: string;
    time: string;
}
type Game = {
    id: number;
    name: string;
}
type Coach = {
    id: number;
    nickName: string;
}


const VisitFormRegister = () => {
    const [coaches, setCoaches] = useState<Coach[]>([]);
    const coachesStore = useSelector(coachesSelector);

    useEffect(() => {
        setCoaches(coachesStore);
    }, [coachesStore]);

    const [coachId, setCoachId] = React.useState('');
    const handleChangeCoachNick = (event: SelectChangeEvent) => {
        setCoachId(event.target.value);
    };
    const [games, setGames] = useState<Game[]>([]);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getCoachesGamesData(coachId)).then(data => setGames(data));

    }, [coachId, dispatch]);

    const [gameName, setGameName] = useState('');
    const handleChangeGameName = (event: SelectChangeEvent) => {
        setGameName(event.target.value);
    };


    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
        console.log(data);
    }

    return (
        <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>

                <Grid container spacing={2}
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={10}>
                        <h1>Book Your Lesson</h1>
                    </Grid>

                    <Grid item xs={10}>
                        CoachNick:
                        <Select
                            {...register("coachId")}
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={coachId}
                            onChange={handleChangeCoachNick}
                            autoWidth
                            label="gameName"
                            sx={{
                                background: "white"
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {coaches.map((coach) => (
                                <MenuItem key={coach.id} value={coach.id}>{coach.nickName}</MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={5}>
                        Email:<input type="email" {...register("email")}/><br/>
                    </Grid>
                    <Grid item xs={5}>
                        GameName:
                        {(games.length > 0) &&
                            <Select
                                {...register("gameName")}
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={gameName}
                                onChange={handleChangeGameName}
                                autoWidth
                                label="gameName"
                                sx={{

                                    background: "white"
                                }}
                            >
                                <MenuItem value="">
                                    <em>First choose Coach</em>
                                </MenuItem>
                                {games.map((game) => (
                                    <MenuItem key={game.id} value={game.id}>{game.name}</MenuItem>
                                ))}
                            </Select>}
                    </Grid>
                    <Grid item xs={10}>
                        <button type="submit">Submit</button>
                    </Grid>

                </Grid>
            </form>

        </div>
    );
};

export default VisitFormRegister;
