import React from 'react';
import {Grid} from "@mui/material";
import CoachCard from "../card/CoachCard";

const STAFF = [
{
    coachName:"Maciej Bugaj",
    gameName:"Counter-Strike",
    coachNick:"Luz",
    description:"Big coach with big eyes",
    imgPath:'i tak nei dziala?'
},
    {
        coachName:"Bestia East",
        gameName:"Counter-Strike 2",
        coachNick:"Beast",
        description:"Same best coach",
        imgPath:'i tak nei dziala?'
    },
    {
        coachName:"Karol Jan",
        gameName:"Fifa",
        coachNick:"Wrona",
        description:"Like you and your dogs",
        imgPath:'i tak nei dziala?'
    }
]


const StaffSection = () => {
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
                {STAFF.map((member)=>(
                    <Grid key={member.coachName} item xs={4}>
                        <CoachCard coachNick={member.coachNick}
                                  coachName={member.coachName}
                                  description={member.description}
                                  gameName={member.gameName}
                                  imgPath={member.imgPath}/>
                    </Grid>
                ))}


            </Grid>
        </div>
    );
};

export default StaffSection;
