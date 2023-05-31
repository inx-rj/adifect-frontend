import { combineReducers } from "redux";
import { damSlice } from "./dam.slice";

export const mediaReducer = combineReducers({
  dam: damSlice.reducer,
});
