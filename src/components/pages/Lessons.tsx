import React, {useEffect, useState} from 'react';
import LessonsTableList from "../tables/LessonTableList";
import {
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

    const {data: lessonsForPlayer} = useGetLessonsByPlayerIdQuery(jwt);
    const {data: lessonsForCoach} = useGetLessonsByCoachIdQuery(jwt);

    const [tableData, setTableData] = useState<Lesson[]>([]);


    useEffect(() => {
        if (lessonsForCoach && (userData.role === "COACH" || userData.role === "ADMIN")) {
            setTableData(lessonsForCoach);
        }
        if (lessonsForPlayer && userData.role === "PLAYER") {
            setTableData(lessonsForPlayer);
        }
    }, [lessonsForCoach, lessonsForPlayer])
    const [deleteLesson, response] = useRemoveLessonByIdMutation();
    const handleDeleteButton = (lessonId: any)=>{
        deleteLesson(lessonId);
        const index:number = tableData.findIndex(lesson => lesson.id === lessonId);
        const tableDataCopy = [...tableData];
        tableDataCopy.splice( index,1);
        setTableData(tableDataCopy);
    }

    const [deletePlayerFromLesson, responsex] = useRemovePlayerFromLessonMutation();
    const handleUnbookButton = (lessonId: any)=>{
        deletePlayerFromLesson(lessonId);
        const index:number = tableData.findIndex(lesson => lesson.id === lessonId);
        const tableDataCopy = [...tableData];
        tableDataCopy.splice( index,1);
        setTableData(tableDataCopy);
    }


    return (
        <div>
            <Grid container display="flex" alignContent={"center"}>
                <Grid item xs={12}>
            {userData.role === "COACH" ? <AddNewLesson/> : "" }
                </Grid>
                <Grid item xs={12}>
            <LessonsTableList data={tableData} handleDeleteButton={handleDeleteButton} handleUnbookButton={handleUnbookButton}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Lessons;
