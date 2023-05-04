import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import GameCard from "../card/GameCard";
import {useGetAllGamesQuery} from "../../store/bookCoachApi";
import {Game} from "../../interfaces";

function getRandom(arr: Game[], n: number) {
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

const Home = () => {
    const {data: gamesDataFetch} = useGetAllGamesQuery();
    const [games, setGames] = useState<Game[]>();
    useEffect(() => {
        if (gamesDataFetch) {
            setGames(getRandom(gamesDataFetch, 3));
        }
    }, [gamesDataFetch])

    return (
        <div>
            <Grid>
                <Grid style={{color: "#E9B872"}}>
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
                <Grid>
                    <SearchInput/>
                </Grid>
                <Grid container spacing={3} display={"flex"} justifyContent={"center"}>
                    {games?.map(game => (
                        <Grid margin={"30px"} item lg={3} sm={4} xs={6} key={game.id}>
                            <GameCard
                                description={game.description}
                                gameName={game.name}
                                shortGameName={game.shortGameName}
                                imgPath={game.imageUrl}
                                gameId={game.id}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;
