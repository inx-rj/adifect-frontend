import { combineReducers } from "@reduxjs/toolkit";
import { companiesSlice } from "./companies.slice";
import { companiesTagsSlice } from "./companiesTags.slice";
import { communitySettingsSlice } from "./communitySettings.slice";
import { copyCodeSlice } from "./copyCode.slice";
import { creativeCodeSlice } from "./creativeCode.slice";
import { programsSlice } from "./programs.slice";

export const companiesReducer = combineReducers({
  companyProjects: companiesSlice.reducer,
  companiesTags: companiesTagsSlice.reducer,
  communitySettings: communitySettingsSlice.reducer,
  copyCode: copyCodeSlice.reducer,
  creativeCode: creativeCodeSlice.reducer,
  programs: programsSlice.reducer,
});
