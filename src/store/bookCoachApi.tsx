import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Game, Lesson, User, UserForTable} from "../interfaces";

const prepareHeaders = (headers: Headers) => {
    // @ts-ignore
    headers.set('Authorization', `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`);

}

export const bookCoachApi = createApi({
    reducerPath: 'bookCoachApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/',
        prepareHeaders
    }),

    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getAllGames: builder.query<Game[], void>({
            query: () => "game/all"
        }),
        getAllLessons: builder.mutation<Lesson[], void>({
            query: () => 'lesson/all'
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
        getLessonsByPlayerId: builder.mutation<Lesson[], void>({
            query: () => ({
                url: 'lesson/all/player',
            })
        }),
        getLessonsByCoachId: builder.mutation<Lesson[], void>({
            query: () => ({
                url: `lesson/all/coach`,
            })
        }),
        removeLessonById: builder.mutation({
            query: (lessonId) => ({
                url: `lesson/remove/${lessonId}`,
                method: "DELETE",
            })
        }),
        removeGameById: builder.mutation({
            query: (gameId) => ({
                url: `game/delete/${gameId}`,
                method: "DELETE",
            })
        }),
        removePlayerFromLesson: builder.mutation({
            query: (lessonId) => ({
                url: `lesson/remove/player/${lessonId}`,
                method: "PATCH"
            })
        }),
        getLessonsByUserIdAndDate: builder.query<Lesson[], string>({
            query: (date) => ({
                url: `lesson/all/coach/date/${date}`
            })
        }),
        getGamesByUser: builder.query<Game[], string>({
            query: () => ({
                url: `game/user`
            })
        }),
        addNewLessons: builder.mutation({
            query: (payload) => ({
                url: `lesson/add`,
                method: "PUT",
                body: payload,

            })
        }),
        getAllUsers: builder.query<UserForTable[], string>({
            query: () => ({
                url: `user/all`
            })
        }),
        updateUserGames: builder.mutation({
            query: (payload) => ({
                url: `user/admin/edit`,
                method: "PATCH",
                body: payload
            })
        }),
        getHappyStudents: builder.query({
            query: () => ({
                url: `happy`
            })
        }),
        getUserByEmail: builder.query({
            query: (userEmail) => ({
                url: `user/${userEmail}`
            })
        }),
        updateUserData: builder.mutation({
            query: (payload) => ({
                url: `user/edit`,
                method: "PATCH",
                body: payload
            })
        }),
        updateGameData: builder.mutation({
            query: (payload) => ({
                url: `game/edit`,
                method: "PATCH",
                body: payload
            })
        }),
        addNewGame: builder.mutation({
            query: (payload) => ({
                url: `game/add`,
                method: "PUT",
                body: payload,
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
    useGetLessonsByPlayerIdMutation,
    useGetLessonsByCoachIdMutation,
    useRemoveLessonByIdMutation,
    useRemovePlayerFromLessonMutation,
    useGetLessonsByUserIdAndDateQuery,
    useGetGamesByUserQuery,
    useAddNewLessonsMutation,
    useGetAllUsersQuery,
    useUpdateUserGamesMutation,
    useGetGameByIdQuery,
    useGetHappyStudentsQuery,
    useGetUserByEmailQuery,
    useUpdateUserDataMutation,
    useUpdateGameDataMutation,
    useAddNewGameMutation,
    useGetAllLessonsMutation,
    useRemoveGameByIdMutation

} = bookCoachApi