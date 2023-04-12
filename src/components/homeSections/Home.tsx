import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import GameCard from "../card/GameCard";
import {useSelector} from "react-redux";
import {userSelector} from "../../store/userSlice";

const GAMES =[
    {
        gameName:"Counter-Strike",
        shortGameName:"CS2",
        description:"Nice game for nice people",
        imgPath:"I tak nie dziala",
    },
    {
        gameName:"Diablo 4",
        shortGameName:"D4",
        description:"Scary game for man",
        imgPath:"I tak nie dziala",
    },
    {
        gameName:"Fifa 2046",
        shortGameName:"Fifa",
        description:"Not for real man",
        imgPath:"I tak nie dziala",
    }
]

interface Game {
    id:number,
    name:string,
}


const Home = () => {

    const user = useSelector(userSelector).userName;


//r4KDOg3i0iEV8VmRpMWRU6zz2rn1IOHy
    const message = user ?
        <h2>Welcome, {user}!</h2> :
        <p>Please log in to manage your JUG Tour.</p>;


    return (
        <div>
                <div>
                    {message}

                </div>

                <Grid container spacing={3}
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        item xs={10}>
                        <h1>BEST SITE TO FIND COACH</h1>
                        <p>Why do we use it?
                            It is a long established fact that a reader will be distracted by the readable content of a
                            page
                            when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
                            normal
                            distribution of letters, as opposed to using 'Content here, content here', making it look
                            like
                            readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as
                            their default model text, and a search for 'lorem ipsum' will uncover many web sites still
                            in
                            their infancy. Various versions have evolved over the years, sometimes by accident,
                            sometimes on
                            purpose (injected humour and the like).

                        </p>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        item xs={10}>
                        <SearchInput/>
                    </Grid>
                    {GAMES.map(game=>(
                        <Grid key={game.gameName} item xs={4}>
                            <GameCard
                                description={game.description}
                                      gameName={game.gameName}
                                      shortGameName={game.shortGameName}
                                      imgPath={game.imgPath}/>
                        </Grid>
                    ))}
                </Grid>
        </div>
    );
};

export default Home;
