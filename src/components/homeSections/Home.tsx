import React, {useEffect, useState} from 'react';
import {Grid} from "@mui/material";
import SearchInput from "../searchInput/SearchInput";
import GameCard from "../card/GameCard";
import {useCookies} from "react-cookie";
import {Button, Container} from "reactstrap";
import {Link} from "react-router-dom";

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

interface User {
    name:string,
}

const Home = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [loadingGames, setLoadingGames] = useState(false);


    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [cookies] = useCookies(['XSRF-TOKEN']);

    useEffect(()=>{
        setLoadingGames(true);

        fetch('/game/all')
            .then(response=> response.json())
            .then(data=>{
                setGames(data);
                setLoadingGames(false);
            })
    },[])



    useEffect(() => {
        setLoading(true);
        fetch('api/user', { credentials: 'include' })
            .then(response => response.text())
            .then(body => {
                if (body === '') {
                    setAuthenticated(false);
                } else {
                    setUser(JSON.parse(body));
                    setAuthenticated(true);
                }
                setLoading(false);
            });
    }, [setAuthenticated, setLoading, setUser])

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8080';
        }
        // redirect to a protected URL to trigger authentication
        window.location.href = `//${window.location.hostname}${port}/api/private`;
    }

    const logout = () => {
        console.log(cookies['XSRF-TOKEN'])
        console.log("WYZEJ XSRF-TOKEN")
        fetch('/api/logout', {
            method: 'POST', credentials: 'include',
            headers: { 'X-XSRF-TOKEN': cookies['XSRF-TOKEN'] }
        })
            .then(res => res.json())
            .then(response => {
                window.location.href = window.location.origin;

            });
    }

//r4KDOg3i0iEV8VmRpMWRU6zz2rn1IOHy
    const message = user ?
        <h2>Welcome, {user.name}!</h2> :
        <p>Please log in to manage your JUG Tour.</p>;

    const button = authenticated ?
        <div>
            <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
            <br/>
            <Button color="link" onClick={()=>{logout()}}>Logout</Button>
        </div> :
        <Button color="primary" onClick={()=>{login()}}>Login</Button>;


    if (loading) {
        return <p>Loading...</p>;
    }

    if(loadingGames){
        return <p>Loading...</p>
    }

    return (
        <div>
                <div>
                    <button onClick={()=>{login()}}>Siemanko</button>
                    <Button color="link" onClick={()=>{logout()}}>Logout</Button>
                    {message}
                    {button}
                    {games.map(game=>
                    <div key={game.id}>
                        {game.name}
                    </div>)}
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
