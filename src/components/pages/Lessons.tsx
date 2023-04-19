import React, {useEffect, useState} from 'react';
import LessonsTableList from "../tables/LessonTableList";
import {useGetLessonsByCoachIdQuery, useGetLessonsByPlayerIdQuery} from "../../store/bookCoachApi";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";
import {Lesson} from "../../interfaces";
import {useLocalState} from "../../store/useLocalStorage";



const Lessons = () => {

    const [jwt, setJwt] = useLocalState("", "jwt")
    const userData = useSelector(userSelector);

    const {data:lessonsForPlayer} = useGetLessonsByPlayerIdQuery(jwt);
    const {data:lessonsForCoach} = useGetLessonsByCoachIdQuery(jwt);

    const[tableData, setTableData] = useState<Lesson[]>([]);

    useEffect(()=>{
      if(lessonsForCoach && userData.role === "COACH"){
          setTableData(lessonsForCoach);
      }
      if(lessonsForPlayer && userData.role ==="PLAYER"){
          setTableData(lessonsForPlayer);
      }
    },[lessonsForCoach, lessonsForCoach])



    return (
        <div>
            <LessonsTableList data={tableData}/>
        </div>
    );
};

export default Lessons;
