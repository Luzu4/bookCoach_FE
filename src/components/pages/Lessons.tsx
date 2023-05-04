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
import AddNewLesson from "../modal/AddNewLesson";
import {Grid} from "@mui/material";


const Lessons = () => {

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
    const [deleteLesson] = useRemoveLessonByIdMutation();
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
            .catch((error) => {
                console.log(error)
            });
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
                    {userData.role === "COACH" ?
                        <AddNewLesson refetchTable={getCoachLesson} setTableData={setTableData}/> : ""}
                    {userData.role === "ADMIN" ?
                        <AddNewLesson refetchTable={getAdminLesson} setTableData={setTableData}/> : ""}
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
