import { combineReducers } from '@reduxjs/toolkit';
import { companiesSlice } from './companies.slice';
import { companiesTagsSlice } from './companiesTags.slice';
import { communitySettingsSlice } from './communitySettings.slice';

export const companiesReducer = combineReducers({
  companyProjects: companiesSlice.reducer,
  companiesTags: companiesTagsSlice.reducer,
  communitySettings: communitySettingsSlice.reducer
});