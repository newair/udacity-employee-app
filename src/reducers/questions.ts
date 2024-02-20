import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Questions } from "../types";
import { RootState } from "../store";

const initialState: Questions = {};

export const questionSlice = createSlice({
  name: "questionsSlice",
  initialState,
  reducers: {
    addQuestions: (state: Questions, action: PayloadAction<Questions>) => {
      return { ...state, ...action.payload };
    },

    voteQuestion: (
      state: Questions,
      action: PayloadAction<{
        questionId: string;
        userId: string;
        isFirstOption: boolean;
      }>
    ) => {
      const { questionId, userId, isFirstOption } = action.payload;
      state[questionId][isFirstOption ? "optionOne" : "optionTwo"].votes.push(
        userId
      );
    },
  },
});
export const questionsReducer = questionSlice.reducer;
export const { addQuestions, voteQuestion } = questionSlice.actions;
export const questionsSelector = (state: RootState) => state.questions;
