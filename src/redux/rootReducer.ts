import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth/auth.slice";

// Combine all reducers.
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
