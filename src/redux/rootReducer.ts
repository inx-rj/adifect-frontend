import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './reducers/auth/auth.slice';
import { inviteUserSlice } from './reducers/inviteUser/inviteUser.slice';

// Combine all reducers.
export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  inviteUser: inviteUserSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;