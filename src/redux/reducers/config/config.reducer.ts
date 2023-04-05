import { combineReducers } from '@reduxjs/toolkit';
import { configAppSlice } from './app/app.slice';

export const configReducer = combineReducers({
  app: configAppSlice.reducer,
});
