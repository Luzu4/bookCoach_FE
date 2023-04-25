import React, {useEffect, useState} from 'react';
import {useGetAllCoachesByGameIdQuery, useGetGameByIdQuery} from "../../store/bookCoachApi";
import {Coach, UserDetails} from "../../interfaces";
import { useParams } from 'react-router-dom'
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";

type StaffType = {
    nickName: string;
    userDetails?: UserDetails;
}

const Coaches = () => {
    const [allCoaches, setAllCoaches] = useState<StaffType[]>([]);
    const [gameId, setGameId] = useState<string>("0");
    const { id } = useParams()


    const {data:coachesFetch} = useGetAllCoachesByGameIdQuery(gameId);
    // @ts-ignore
    const {data:gameFetch} = useGetGameByIdQuery(id,{skip:!id});
    useEffect(()=>{
        if(coachesFetch){
            setAllCoaches(coachesFetch);
        }
        if(id){
            setGameId(id);

        }
    },[coachesFetch,gameFetch,allCoaches,id])

    return (
        <div style={{color:"white"}}>
            <Grid container spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
            {allCoaches.map((coach)=>(
                <Grid key={coach.nickName} item xs={4}>
                    <CoachCard coachNick={coach.nickName}
                               coachName={coach.nickName}
                               description={coach.userDetails?.description}
                               gameName={gameFetch?.name}
                               imgPath={coach.userDetails?.imageUrl}/>
                </Grid>
            ))}</Grid>

        </div>
    );
};

export default Coaches;
