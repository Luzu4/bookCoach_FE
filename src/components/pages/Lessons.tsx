import React, {useEffect, useState} from 'react';
import LessonsTableList from "../tables/LessonTableList";
import {
    useGetAllLessonsMutation,
    useGetLessonsByCoachIdMutation,
    useGetLessonsByPlayerIdMutation,
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

    const [getPlayerLesson] = useGetLessonsByPlayerIdMutation();
    const [getCoachLesson] = useGetLessonsByCoachIdMutation();
    const [getAdminLesson] = useGetAllLessonsMutation();

    const [tableData, setTableData] = useState<Lesson[]>([]);


    useEffect(() => {
        if (userData.role === "COACH") {
            getCoachLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
        if (userData.role === "PLAYER") {
            getPlayerLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
        if (userData.role === "ADMIN") {
            getAdminLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
    }, [getPlayerLesson, getCoachLesson, getAdminLesson])
    const [deleteLesson, response] = useRemoveLessonByIdMutation();
    const handleDeleteButton = (lessonId: any) => {
        deleteLesson(lessonId);
        if (userData.role === "COACH") {
            getCoachLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
        if (userData.role === "ADMIN") {
            getAdminLesson().unwrap().then(response => {
                setTableData(response);
            });
        }

    }

    const [deletePlayerFromLesson] = useRemovePlayerFromLessonMutation();
    const handleUnbookButton = (lessonId: any) => {
        deletePlayerFromLesson(lessonId).unwrap()
            .then()
            .catch((error) => console.log(error.data.message))

        if (userData.role === "PLAYER") {
            getPlayerLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
        if (userData.role === "COACH") {
            getCoachLesson().unwrap().then(response => {
                setTableData(response);
            });
        }
        if (userData.role === "ADMIN") {
            getAdminLesson().unwrap().then(response => {
                setTableData(response);
            });
        }

    }


    return (
        <div>
            <Grid container display="flex" alignContent={"center"}>
                <Grid item xs={12}>
                    {userData.role === "COACH" || userData.role === "ADMIN" ?
                        <AddNewLesson refetchAdmin={getAdminLesson} refetchCoach={getCoachLesson}/> : ""}
                </Grid>
                <Grid item xs={12}>
                    <LessonsTableList data={tableData} handleDeleteButton={handleDeleteButton}
                                      handleUnbookButton={handleUnbookButton}/>
                </Grid>
            </Grid>
        </div>
    );
};

export default Lessons;
