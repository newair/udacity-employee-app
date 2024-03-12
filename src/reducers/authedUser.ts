import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthedUser } from "../types";
import { RootState } from "../store";

const initialState: AuthedUser = {};
export const authedUser = createSlice({
  name: "authedUserSlice",
  initialState,
  reducers: {
    setAuthedUser: (state: AuthedUser, action: PayloadAction<AuthedUser>) => {
      
      console.log("action.payload", action.payload);
      return { ...state, id: action.payload.id, name: action.payload.name};
    },
  },
});
export const authedReducer = authedUser.reducer;
export const { setAuthedUser } = authedUser.actions;
export const authedUserSelector = (state: RootState) =>
state.authedUser;
