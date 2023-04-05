import { createSlice } from '@reduxjs/toolkit';
import { InviteUserInitialType } from "../../../helper/types/profileDropdown/inviteUserType"
import { RootState } from 'redux/rootReducer';

const initialState: InviteUserInitialType = {
  loading: false,
  inviteUser: {
    loading: false,
    hasData: false,
    inviteUserData: {
      count: 0,
      results: []
    },
  },
  companies: {
    loading: false,
    hasData: false,
    companiesList: [],
  },
};

export const inviteUserSlice = createSlice({
  name: "inviteUser",
  initialState,
  reducers: {
    SET_INVITE_USER_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    INVITE_USER_LIST_LOADING: (state, action) => ({
      ...state,
      inviteUser: {
        ...state.inviteUser,
        loading: action.payload,
      },
    }),

    INVITE_USER_LIST_DATA: (state, action) => ({
      ...state,
      inviteUser: {
        ...state.inviteUser,
        hasData: true,
        inviteUserData: action.payload,
      },
    }),


    COMPANIES_LIST_LOADING: (state, action) => ({
      ...state,
      companies: {
        ...state.companies,
        loading: action.payload,
      },
    }),

    COMPANIES_LIST_DATA: (state, action) => ({
      ...state,
      companies: {
        ...state.companies,
        hasData: true,
        companiesList: action.payload,
      },
    }),
  },
});

export const {
  SET_INVITE_USER_LOADING, INVITE_USER_LIST_LOADING, INVITE_USER_LIST_DATA, COMPANIES_LIST_LOADING, COMPANIES_LIST_DATA } = inviteUserSlice.actions;

export const INVITE_USER_LIST = (state: RootState) => state.inviteUser.inviteUser;
export const COMPANIES_LIST = (state: RootState) => state.inviteUser.companies;
