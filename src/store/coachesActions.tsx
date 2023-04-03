import {coachesActions} from "./coachesSlice";

export const fetchCoachesData = () =>{
    return async (dispatch: any)=>{
        const fetchData = async()=>{
            const response = await fetch(
                'http://localhost:8080/user/type/1'
            );
            if(!response.ok){
                throw  new Error('Could not fetch coaches data!!');
            }

            const data = await response.json();
            return data;
        };

        try{
            const coachesData = await fetchData();
            dispatch(
                coachesActions.replaceCoaches(coachesData)
            )
        } catch(error){
            console.log("HALLLLOOOOOOOOOOO TU JEST BLAD PRZY FETCHOWANIU!!!")
        }

    }
}

export const getCoachesGamesData = (id:string) =>{
    return async (dispatch:any)=>{
        const getData = async ()=>{
            const response = await fetch(`http://localhost:8080/game/user/${id}`, {
                method: "GET"
            });
            const jsonData = await  response.json();
            return jsonData;
        };
        
        return getData();
        
    }
}