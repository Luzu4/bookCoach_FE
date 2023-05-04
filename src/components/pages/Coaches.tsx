import React, {useEffect, useState} from 'react';
import {useGetAllCoachesByGameIdQuery, useGetGameByIdQuery} from "../../store/bookCoachApi";
import {UserDetails} from "../../interfaces";
import {useParams} from 'react-router-dom'
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";

type StaffType = {
    nickName: string;
    userDetails?: UserDetails;
}

const Coaches = () => {
    const [allCoaches, setAllCoaches] = useState<StaffType[]>([]);
    const [gameId, setGameId] = useState<string>("0");
    const {id} = useParams()

    const {data: coachesFetch} = useGetAllCoachesByGameIdQuery(gameId);
    // @ts-ignore
    const {data: gameFetch} = useGetGameByIdQuery(id, {skip: !id});
    useEffect(() => {
        if (coachesFetch) {
            setAllCoaches(coachesFetch);
        }
        if (id) {
            setGameId(id);
        }
    }, [coachesFetch, gameFetch, allCoaches, id])

    return (
        <div style={{color: "#E9B872", paddingBottom: "150px"}}>
            {gameFetch ? <h1>{gameFetch.name}</h1> : "Loading..."}
            <Grid container spacing={3} display={"flex"} justifyContent={"center"}>

                {allCoaches.map((coach) => (
                    <Grid margin={"30px"} item xs={6} sm={4} lg={3} key={coach.nickName}>
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
