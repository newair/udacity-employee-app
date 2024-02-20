import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewQuestion, Questions, User, Users } from "../types";

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["Questions", "Users"],
  endpoints: (builder) => ({
    login: builder.mutation<User, { userName: string; password: string }>({
      query: (user) => ({
        url: `/login`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Questions"],
    }),
    getUsers: builder.query<Users, void>({
      query: () => `/users`,
      providesTags: ["Users"],
    }),
    getQuestions: builder.query<Questions, void>({
      query: () => `/questions`,
      providesTags: ["Questions"],
    }),
    saveQuestion: builder.mutation<void, NewQuestion>({
      query: (question) => ({
        url: `/saveQuestion`,
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Questions", "Users"],
    }),
    saveQuestionAnswer: builder.mutation<void, any>({
      query: (question) => ({
        url: `/questionanswer`,
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetQuestionsQuery,
  useSaveQuestionMutation,
  useSaveQuestionAnswerMutation,
  useLoginMutation,
} = pollApi;
