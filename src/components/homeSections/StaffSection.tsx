import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";
import {useGetAllByTypeQuery} from "../../store/bookCoachApi";
import {UserDetails} from "../../interfaces";

type StaffType = {
    nickName: string;
    userDetails?: UserDetails;
}

function getRandom(arr: any[], n: number) {
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

const StaffSection = () => {

    const {data: staffDataFetch} = useGetAllByTypeQuery("COACH");

    const [staff, setStaff] = useState<StaffType[]>();

    useEffect(() => {
        if (staffDataFetch) {
            setStaff(getRandom(staffDataFetch, 3));
        }

    }, [staffDataFetch])


    return (
        <div>
            <Grid container spacing={3}
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                    item xs={12}>
                    <h1>OUR STAFF</h1>
                </Grid>
                {staff?.map((member) => (
                    <Grid key={member.nickName} item xs={4}>
                        <CoachCard coachNick={member.nickName}
                                   coachName={member.nickName}
                                   description={member.userDetails?.description}
                            // @ts-ignore
                                   gameName={getRandom(member.userDetails?.game, 1)[0].name}
                                   imgPath={member.userDetails?.imageUrl}/>
                    </Grid>
                ))}


            </Grid>
        </div>
    );
};

export default StaffSection;
