import { combineReducers } from '@reduxjs/toolkit';
import { notificationSlice } from './notification.slice';
import { channelSlice } from './channel.slice';

export const commonReducer = combineReducers({
  notification: notificationSlice.reducer,
  channel: channelSlice.reducer,
});