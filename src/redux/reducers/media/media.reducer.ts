import { combineReducers } from "redux";
import { damSlice } from "./dam.slice";
import { mediaSlice } from "./media.slice";

export const mediaReducer = combineReducers({
  dam: damSlice.reducer,
  media: mediaSlice.reducer
});
