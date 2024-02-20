import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthedUser } from "../types";
import { RootState } from "../store";

const initialState: AuthedUser = {};
export const authedUser = createSlice({
  name: "authedUserSlice",
  initialState,
  reducers: {
    setAuthedUser: (state: AuthedUser, action: PayloadAction<AuthedUser>) => {
      localStorage.setItem("authedUser", JSON.stringify(action.payload));
      return { ...state, id: action.payload.id };
    },
  },
});
export const authedReducer = authedUser.reducer;
export const { setAuthedUser } = authedUser.actions;
export const authedUserSelector = (state: RootState) =>
  localStorage.getItem("authedUser")
    ? JSON.parse(localStorage.getItem("authedUser") as string)
    : state.authedUser;
