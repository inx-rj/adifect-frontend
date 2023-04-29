import { workFlowTabSlice } from "./reducers/workFlow/workFlow.slice";
import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "redux/reducers/auth/auth.slice";
import { companiesSlice } from "redux/reducers/companies/companies.slice";
import { companiesTagsSlice } from "redux/reducers/companies/companiesTags.slice";
import { inviteUserSlice } from "redux/reducers/inviteUser/inviteUser.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configReducer } from "redux/reducers/config/config.reducer";
import { ActionTypes } from "helper/actions";
import { commonReducer } from "redux/reducers/common/common.reducer";
import { profileReducer } from "redux/reducers/profile/profile.reducer";
import { companyTabSlice } from "./reducers/companyTab/companyTab.slice";
import { homePageReducer } from "./reducers/homePage/homePage.reducer";
import { skillsSlice } from "./reducers/skills/skills.slice";
import { levelsSlice } from "./reducers/levels/levels.slice";
import { inHouseUserSlice } from "./reducers/inHouseUser/inHouseUser.slice";
import { industriesSlice } from "./reducers/industries/industries.slice";
import { companiesReducer } from "./reducers/companies/companies.reducer";

const persistAppConfig = {
  key: "app",
  storage: storage,
  whitelist: ["app"],
};

// Combine all reducers.
const appReducer = combineReducers({
  config: persistReducer(persistAppConfig, configReducer),
  auth: authSlice.reducer,
  common: commonReducer,
  companyTab: companyTabSlice.reducer,
  companies: companiesReducer,
  inviteUser: inviteUserSlice.reducer,
  industries: industriesSlice.reducer,
  homePage: homePageReducer,
  workFlowTab: workFlowTabSlice.reducer,
  skillsTab: skillsSlice.reducer,
  levels: levelsSlice.reducer,
  inHouseUser: inHouseUserSlice.reducer,
  profile: profileReducer,
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
