import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";
import {useGetAllByTypeQuery} from "../../store/bookCoachApi";
import {UserDetails} from "../../interfaces";

type StaffType = {
    nickName: string;
    userDetailsAll?: UserDetails;
}

function getRandom(arr: any[], n: number) {
    if (arr) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}

const StaffSection = () => {
    const {data: staffDataFetch} = useGetAllByTypeQuery("COACH");
    const [staff, setStaff] = useState<StaffType[]>();
    useEffect(() => {
        if (staffDataFetch) {
            if (staffDataFetch.length > 0) {
                setStaff(getRandom(staffDataFetch, 3));
            }
        }
    }, [staffDataFetch])

    return (
        <div style={{paddingBottom: "10px"}}>
            <Grid>
                <Grid style={{color: "#E9B872"}}>
                    <h1>OUR STAFF</h1>
                </Grid>
                <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                    {staff?.map((member) => (
                        <Grid margin={"30px"} item xs={6} sm={4} lg={3} key={member.nickName}>
                            <CoachCard coachNick={member.nickName}
                                       coachName={member.nickName}
                                       description={member.userDetailsAll?.description}
                                // @ts-ignore
                                       gameName={getRandom(member.userDetailsAll?.game, 1)[0].name}
                                       imgPath={member.userDetailsAll?.imageUrl}/>
                        </Grid>
                    ))}
                </Grid>


            </Grid>
        </div>
    );
};

export default StaffSection;
