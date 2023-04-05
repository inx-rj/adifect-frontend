import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth/auth.slice";
import { companiesSlice } from "./reducers/companies/companies.slice";
import { inviteUserSlice } from "./reducers/inviteUser/inviteUser.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configReducer } from "./reducers/config/config.reducer";
import { ActionTypes } from "helper/actions";

const persistAppConfig = {
  key: "app",
  storage: storage,
  whitelist: ["app"],
};

// Combine all reducers.
const appReducer = combineReducers({
  config: persistReducer(persistAppConfig, configReducer),
  auth: authSlice.reducer,
  companies: companiesSlice.reducer,
  inviteUser: inviteUserSlice.reducer,
});

export const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === ActionTypes.DESTROY_SESSION) {
    storage.removeItem("persist:app");
    state = undefined;
    window.location.reload();
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
