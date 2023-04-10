import { createSlice } from '@reduxjs/toolkit';
import { InviteUserInitialType } from "../../../helper/types/profileDropdown/inviteUserType"
import { RootState } from 'redux/rootReducer';

const initialState: InviteUserInitialType = {
  loading: false,
  inviteUserList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const inviteUserSlice = createSlice({
  name: "inviteUser",
  initialState,
  reducers: {
    SET_INVITE_USER_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_INVITE_USER_LIST_LOADING: (state, action) => ({
      ...state,
      inviteUserList: {
        ...state.inviteUserList,
        loading: action.payload,
      },
    }),

    SET_INVITE_USER_LIST_DATA: (state, action) => ({
      ...state,
      inviteUserList: {
        ...state.inviteUserList,
        hasData: true,
        data: action.payload,
      },
    }),
  },
});

export const {
  SET_INVITE_USER_LOADING, SET_INVITE_USER_LIST_LOADING, SET_INVITE_USER_LIST_DATA } = inviteUserSlice.actions;

export const INVITE_USER_LIST = (state: RootState) => state.inviteUser;