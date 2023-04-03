import React, {useEffect, useState} from 'react';
import{SelectChangeEvent} from '@mui/material/Select';
import {Grid} from "@mui/material";
import "./VisitFormRegister.css";
import {useForm, SubmitHandler} from "react-hook-form";
import {useSelector} from "react-redux";
import {coachesSelector} from "../../store/coachesSlice"
import {getCoachesGamesData} from "../../store/coachesActions";
import {useAppDispatch} from "../../store/store";
import SelectDropDown from "../selectDropDown/SelectDropDown";

type FormValues = {
    email: string;
    gameId: string;
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

    const [gameId, setGameId] = useState('');
    const handleChangeGameName = (event: SelectChangeEvent) => {
        setGameId(event.target.value);
    };

    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
        data.coachId = coachId;
        data.gameId= gameId;
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
                        <SelectDropDown id={coachId} handleChange={handleChangeCoachNick} values={coaches}/>
                    </Grid>
                    <Grid item xs={5}>
                        Email:<input type="email" {...register("email")}/><br/>
                    </Grid>
                    <Grid item xs={5}>
                        GameName:
                        {(games.length > 0) &&
                            <SelectDropDown id={gameId} handleChange={handleChangeGameName} values={games}/>
                        }
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
