import { combineReducers } from '@reduxjs/toolkit';
import { communicationSlice } from 'redux/reducers/profile/commun.slice';

export const profileReducer = combineReducers({
  commun: communicationSlice.reducer,
});
