import { createSlice } from "@reduxjs/toolkit";
import { InviteUserInitialType } from "../../../helper/types/profileDropdown/inviteUserType";
import { RootState } from "redux/rootReducer";

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
  inviteMembersList: {
    loading: false,
    data: [],
  },
  workflowInviteUserList: {
    loading: false,
    data: [],
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

    SET_INVITE_MEMBER_LIST_DATA: (state, action) => ({
      ...state,
      inviteMembersList: {
        ...state.inviteMembersList,
        hasData: true,
        data: action.payload,
      },
    }),

    SET_WORKFLOW_INVITE_USER_LIST_LOADING: (state, action) => ({
      ...state,
      workflowInviteUserList: {
        ...state.workflowInviteUserList,
        loading: action.payload,
      },
    }),

    SET_WORKFLOW_INVITE_USER_LIST_DATA: (state, action) => ({
      ...state,
      workflowInviteUserList: {
        ...state.workflowInviteUserList,
        hasData: true,
        data: action.payload,
      },
    }),
  },
});

export const {
  SET_INVITE_USER_LOADING,
  SET_INVITE_USER_LIST_LOADING,
  SET_INVITE_USER_LIST_DATA,
  SET_INVITE_MEMBER_LIST_DATA,
  SET_WORKFLOW_INVITE_USER_LIST_LOADING,
  SET_WORKFLOW_INVITE_USER_LIST_DATA,
} = inviteUserSlice.actions;

export const INVITE_USER_LIST = (state: RootState) => state.inviteUser;
