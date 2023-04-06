import React, {useEffect, useState} from 'react';
import {SelectChangeEvent} from '@mui/material/Select';
import {Grid} from "@mui/material";
import "./VisitFormRegister.css";
import {useForm, SubmitHandler} from "react-hook-form";
import {useSelector} from "react-redux";
import {coachesSelector} from "../../store/coachesSlice"
import SelectDropDown from "../selectDropDown/SelectDropDown";
import {
    useAddPlayerToLessonMutation,
    useGetAllUserGamesByUserIdQuery,
    useGetFreeLessonsByGameIdAndUserIdQuery,
} from '../../store/bookCoachApi';
import LessonsTable from "../LessonsTable";

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

type Lesson =
    {

        date: string;
        time: string;
        playerNote?: string;
        playerId?: number;
        playerEmail: string;
        game: {};
        user: {};

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
    const {data} = useGetAllUserGamesByUserIdQuery(coachId, {skip: !coachId});


    const [lessonsDataTable, setLessonsDataTable] = useState<Lesson[]>([]);

    useEffect(() => {
        if (data) {
            setGames(data);
        }
    }, [coachId, data]);


    const [gameId, setGameId] = useState('');
    const handleChangeGameName = (event: SelectChangeEvent) => {
        setGameId(event.target.value);
        setTableWithLessonView(true);
    };

    const [tableWithLessonView, setTableWithLessonView] = useState(false);

    const {data: lessonsData} = useGetFreeLessonsByGameIdAndUserIdQuery({
        id: `${gameId}`,
        userId: `${coachId}`
    }, {skip: !gameId})

    useEffect(() => {
        if (lessonsData) {
            setLessonsDataTable(lessonsData);
        }
    }, [lessonsData])



    const {register, handleSubmit} = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = data => {
        data.coachId = coachId;
        data.gameId = gameId;
        setEmail(data.email);
    }

    const [email, setEmail] = useState("");

    const [addPlayerToLesson] = useAddPlayerToLessonMutation()
    const handleSendButtonClick = (id: string | number) => {
        if (lessonsData && email.length>3) {
            let lessonDataToSave = {
                "playerEmail": email,
                "lessonId": id,
            }
            addPlayerToLesson(lessonDataToSave).unwrap()
                .then(() => {
                })
                .then((error) => {
                    console.log(error)
                })
        }
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
                        Email:<input required type="email" {...register("email")} /><br/>
                    </Grid>
                    <Grid item xs={5}>
                        GameName:
                        {(games.length > 0) &&
                            <SelectDropDown id={gameId} handleChange={handleChangeGameName} values={games}/>
                        }
                    </Grid>
                    {tableWithLessonView &&
                        <LessonsTable data={lessonsDataTable} handleButtonSendClick={handleSendButtonClick}/>}
                    <Grid item xs={10}>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default VisitFormRegister;
