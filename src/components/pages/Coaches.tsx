import React, {useEffect, useState} from 'react';
import {useGetAllCoachesByGameIdQuery} from "../../store/bookCoachApi";
import {Coach} from "../../interfaces";
import { useParams } from 'react-router-dom'
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";

const Coaches = () => {
    const [allCoaches, setAllCoaches] = useState<Coach[]>([]);
    const [gameId, setGameId] = useState<string>("0");
    const { id } = useParams()


    const {data:coachesFetch} = useGetAllCoachesByGameIdQuery(gameId);

    useEffect(()=>{
        if(coachesFetch){
            setAllCoaches(coachesFetch);
        }
        if(id){
            setGameId(id);
        }
    },[coachesFetch,allCoaches,id])

    return (
        <div style={{color:"white"}}>
            <Grid container spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
            {allCoaches.map((coach)=>(
                <Grid key={coach.id} item xs={4}>
                    <CoachCard coachNick={coach.nickName}
                               coachName={coach.nickName}
                               description=""
                               gameName=""
                               imgPath=""/>
                </Grid>
            ))}</Grid>

        </div>
    );
};

export default Coaches;
