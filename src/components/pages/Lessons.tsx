import React, {useEffect, useState} from 'react';
import LessonsTableList from "../tables/LessonTableList";
import {
    useGetAllLessonsQuery,
    useGetLessonsByCoachIdQuery,
    useGetLessonsByPlayerIdQuery,
    useRemoveLessonByIdMutation, useRemovePlayerFromLessonMutation
} from "../../store/bookCoachApi";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {Lesson} from "../../interfaces";
import {useLocalState} from "../../store/useLocalStorage";
import AddNewLesson from "../modal/AddNewLesson";
import {Grid} from "@mui/material";


const Lessons = () => {

    const [jwt, setJwt] = useLocalState("", "jwt")
    const userData = useSelector(userSelector);

    const {data: lessonsForPlayer, refetch:refetchPlayer} = useGetLessonsByPlayerIdQuery();
    const {data: lessonsForCoach, refetch:refetchCoach} = useGetLessonsByCoachIdQuery();
    const {data: lessonsForAdmin, refetch:refetchAdmin} = useGetAllLessonsQuery();

    const [tableData, setTableData] = useState<Lesson[]>([]);


    useEffect(() => {
        if (lessonsForCoach && (userData.role === "COACH")) {
            setTableData(lessonsForCoach);
        }
        if (lessonsForPlayer && userData.role === "PLAYER") {
            setTableData(lessonsForPlayer);
        }
        if(lessonsForAdmin && (userData.role ==="ADMIN")){
            setTableData(lessonsForAdmin);
        }
    }, [lessonsForCoach, lessonsForPlayer,lessonsForAdmin])
    const [deleteLesson, response] = useRemoveLessonByIdMutation();
    const handleDeleteButton = (lessonId: any)=>{
        deleteLesson(lessonId);
        refetchCoach();
        refetchAdmin();

    }

    const [deletePlayerFromLesson, responsex] = useRemovePlayerFromLessonMutation();
    const handleUnbookButton = (lessonId: any)=>{
        deletePlayerFromLesson(lessonId);
        refetchPlayer();
        refetchCoach();
        refetchAdmin();

    }


    return (
        <div>
            <Grid container display="flex" alignContent={"center"}>
                <Grid item xs={12}>
            {userData.role === "COACH" || userData.role === "ADMIN" ? <AddNewLesson refetchAdmin={refetchAdmin} refetchCoach={refetchCoach}/> : "" }
                </Grid>
                <Grid item xs={12}>
            <LessonsTableList data={tableData} handleDeleteButton={handleDeleteButton} handleUnbookButton={handleUnbookButton}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Lessons;
