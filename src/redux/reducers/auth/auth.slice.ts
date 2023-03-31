import { createSlice } from '@reduxjs/toolkit';
import { AuthInitialType } from '../../../helper/types/auth/authType';
import { RootState } from '../../rootReducer';

const initialState: AuthInitialType = {
  loading: false,
  user: {
    loading: false,
    hasData: false,
    data: {},
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    USER_PROFILE_LOADING: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        loading: action.payload,
      },
    }),

    USER_PROFILE_DATA: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        hasData: true,
        data: action.payload,
      },
    }),

    CLEAR_AUTH: () => ({
      ...initialState
    }),
  },
});

export const {
  CLEAR_AUTH,
  USER_PROFILE_LOADING,
  USER_PROFILE_DATA,
  SET_AUTH_LOADING,
} = authSlice.actions;

export const USER_DATA = (state: RootState) => state.auth.user;
