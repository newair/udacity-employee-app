import { combineReducers } from "redux";
import { userReducer } from "./users";
import { questionsReducer } from "./questions";
import { authedReducer } from "./authedUser";
import { pollApi } from "../api/api";

export const rootReducer = combineReducers({
  users: userReducer,
  questions: questionsReducer,
  authedUser: authedReducer,
  [pollApi.reducerPath]: pollApi.reducer,
});
