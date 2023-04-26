import React, {useEffect, useState} from 'react';
import GamesTableList from "../tables/GamesTableList";
import {
    useGetAllGamesQuery,
} from "../../store/bookCoachApi";
import {Game} from "../../interfaces";
import AddNewGame from "../modal/AddNewGame";
import {Grid} from "@mui/material";


const Games = () => {
    const {data: allGamesDataFetch, refetch} = useGetAllGamesQuery();
    const [tableData, setTableData] = useState<Game[]>([]);


    useEffect(() => {
            if(allGamesDataFetch){
                setTableData(allGamesDataFetch);
            }
    }, [allGamesDataFetch])

    // const [deleteLesson, response] = useRemoveLessonByIdMutation();
    const handleDeleteButton = (gameId: any)=>{
        console.log("REMOVE GAME: " + gameId);
    }


    return (
        <div>
            <Grid container display="flex" alignContent={"center"}>
                <Grid item xs={12}>
                    <GamesTableList data={tableData} handleDeleteButton={handleDeleteButton} refetch={refetch}/>
                </Grid>
                <Grid item xs={12}>
                    <AddNewGame refetch={refetch}/>
                </Grid>
            </Grid>


        </div>
    );
};

export default Games;
