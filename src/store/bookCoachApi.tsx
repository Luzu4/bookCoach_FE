import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Game, Lesson} from "../interfaces";


type User = {
    id: number,
    email: string,
    nickName: string,
    password: string,
    user_type: number,
    details_id: number,
}


const authToken = localStorage.getItem('jwt');

const prepareHeaders = (headers: Headers) => {
    // @ts-ignore
    headers.set('Authorization', `Bearer ${JSON.parse(authToken)}`);


}

export const bookCoachApi = createApi({
    reducerPath: 'bookCoachApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/api/',
        prepareHeaders
    }),

    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllGames: builder.query<Game[], void>({
            query: () => "game/all"
        }),
        getGameById: builder.query<Game, number>({
            query: (id) => `game/${id}`,
        }),
        getAllByType: builder.query<User[], string>({
            query: (type) => `user/type/${type}`,
        }),
        getAllUserGamesByUserId: builder.query<Game[], string>({
            query: (id) => `game/user/${id}`,
        }),
        getFreeLessonsByGameIdAndUserId: builder.query<Lesson[], { id: string; userId: string }>({
            query: (arg) => {
                const {id, userId} = arg;
                return `lesson/free/game/${id}/user/${userId}`;
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
        getAllCoachesByGameId: builder.query<User[], string>({
                query: (id) => `user/coaches/game/${id}`,
            }
        ),
        getLessonsByPlayerId: builder.query<Lesson[], string>({
            query: (jwt) => ({
                url: 'lesson/all/player',
            })
        }),
        getLessonsByCoachId: builder.query<Lesson[], string>({
            query: (jwt) => ({
                url: `lesson/all/coach`,
            })
        }),
        removeLessonById: builder.mutation({
            query:(lessonId)=>({
                url: `lesson/remove/${lessonId}`,
                method: "DELETE",
            })
        }),
        removePlayerFromLesson: builder.mutation({
            query:(lessonId)=>({
                url: `lesson/remove/player/${lessonId}`,
                method: "PATCH"
            })
        })

    }),
})

export const {
    useAddPlayerToLessonMutation,
    useGetAllByTypeQuery,
    useGetAllUserGamesByUserIdQuery,
    useGetFreeLessonsByGameIdAndUserIdQuery,
    useAddNewLessonMutation,
    useGetAllGamesQuery,
    useGetAllCoachesByGameIdQuery,
    useGetLessonsByPlayerIdQuery,
    useGetLessonsByCoachIdQuery,
    useRemoveLessonByIdMutation,
    useRemovePlayerFromLessonMutation,
} = bookCoachApi