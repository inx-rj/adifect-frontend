import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth/auth.slice";
import { companiesSlice } from "./reducers/companies/companies.slice";

// Combine all reducers.
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  companies: companiesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;