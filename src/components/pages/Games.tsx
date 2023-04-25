import React, {useEffect, useState} from 'react';
import GamesTableList from "../tables/GamesTableList";
import {
    useGetAllGamesQuery,
    useGetLessonsByCoachIdQuery,
    useGetLessonsByPlayerIdQuery,
    useRemoveLessonByIdMutation, useRemovePlayerFromLessonMutation
} from "../../store/bookCoachApi";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {Game, Lesson} from "../../interfaces";
import {useLocalState} from "../../store/useLocalStorage";
import AddNewLesson from "../modal/AddNewLesson";
import AddNewGame from "../modal/AddNewGame";


const Games = () => {

    const [jwt, setJwt] = useLocalState("", "jwt")
    const userData = useSelector(userSelector);

    const {data: allGamesDataFetch} = useGetAllGamesQuery(jwt);

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
    const handleEditButton = (gameId:any)=>{
        console.log(gameId)
    }


    return (
        <div>
            <AddNewGame/>
            <GamesTableList data={tableData} handleDeleteButton={handleDeleteButton} handleEditButton={handleEditButton}/>
        </div>
    );
};

export default Games;
