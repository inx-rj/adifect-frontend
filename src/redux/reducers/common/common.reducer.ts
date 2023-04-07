import { combineReducers } from '@reduxjs/toolkit';
import { notificationSlice } from './notification.slice';

export const commonReducer = combineReducers({
  notification: notificationSlice.reducer,
});