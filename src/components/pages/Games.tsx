import React, {useEffect, useState} from 'react';
import GamesTableList from "../tables/GamesTableList";
import {
    useGetAllGamesQuery,
} from "../../store/bookCoachApi";
import {Game} from "../../interfaces";
import AddNewGame from "../modal/AddNewGame";


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
            <AddNewGame refetch={refetch}/>
            <GamesTableList data={tableData} handleDeleteButton={handleDeleteButton} refetch={refetch}/>
        </div>
    );
};

export default Games;
