import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth/auth.slice";
import { companiesSlice } from "./reducers/companies/companies.slice";
import { inviteUserSlice } from "./reducers/inviteUser/inviteUser.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configReducer } from "./reducers/config/config.reducer";

const persistAppConfig = {
  key: "app",
  storage: storage,
  whitelist: ["app"],
};

// Combine all reducers.
export const rootReducer = combineReducers({
  config: persistReducer(persistAppConfig, configReducer),
  auth: authSlice.reducer,
  companies: companiesSlice.reducer,
  inviteUser: inviteUserSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
