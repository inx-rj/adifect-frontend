import { combineReducers } from '@reduxjs/toolkit';
import { configAppSlice } from './app/app.slice';
import { configTabSlice } from './tabbing/tabbing.slice';

export const configReducer = combineReducers({
  app: configAppSlice.reducer,
  tab: configTabSlice.reducer
});
