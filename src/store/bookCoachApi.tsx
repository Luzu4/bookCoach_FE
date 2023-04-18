import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Game ={
    id:number,
    name:string
}

type User = {
    id: number,
    email: string,
    nick_name: string,
    password: string,
    user_type: number,
    details_id: number,
}

type Lesson =
    {
        id:number;
        date:string;
        time:string;
        playerNote: string;
        playerId:number;
        playerEmail:string;
        game:{};
        user:{};

    }

export const bookCoachApi = createApi({
    reducerPath: 'bookCoachApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllGames: builder.query<Game[],void>({
            query: () => "game/all"
        }),
        getGameById: builder.query<Game, number>({
            query: (id) => `game/${id}`,
        }),
        getAllByType: builder.query<User[], string>({
            query: (type)=> `user/type/${type}`,
        }),
        getAllUserGamesByUserId: builder.query<Game[], string>({
            query: (id)=> `game/user/${id}`,
        }),
        getFreeLessonsByGameIdAndUserId: builder.query<Lesson[], { id:string; userId:string }>({
            query: (arg)=>{
                const {id,userId} = arg;
                return`lesson/free/game/${id}/user/${userId}`;
            }
        }),
        addNewLesson: builder.mutation({
            query: (payload) => ({
                url: 'lesson/save',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
        addPlayerToLesson: builder.mutation({
            query: (payload) => ({
                url: 'lesson/add/player',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post'],
        }),
    }),
})

export const { useAddPlayerToLessonMutation, useGetAllByTypeQuery, useGetAllUserGamesByUserIdQuery, useGetFreeLessonsByGameIdAndUserIdQuery, useAddNewLessonMutation } = bookCoachApi