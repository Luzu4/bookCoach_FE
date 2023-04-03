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

export const bookCoachApi = createApi({
    reducerPath: 'bookCoachApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        getAllGames: builder.query<Game[],void>({
            query: () => "game/all"
        }),
        getGameById: builder.query<Game, number>({
            query: (id) => `game/${id}`,
        }),
        getAllByType: builder.query<User[], number>({
            query: (type)=> `user/type/${type}`,
        }),
        getAllUserGamesByUserId: builder.query<Game[], string>({
            query: (id)=> `http://localhost:8080/game/user/${id}`,
        }),
    }),
})

export const { useGetGameByIdQuery, useGetAllGamesQuery, useGetAllByTypeQuery, useGetAllUserGamesByUserIdQuery } = bookCoachApi