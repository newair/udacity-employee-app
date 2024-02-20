import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Users } from "../types";
import { RootState } from "../store";

const initialState: Users = {};

export const userSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    addUsers: (state: Users, action: PayloadAction<Users>) => {
      return { ...state, ...action.payload };
    },
  },
});
export const userReducer = userSlice.reducer;
export const { addUsers } = userSlice.actions;
export const userSelector = (state: RootState) => state.users;
