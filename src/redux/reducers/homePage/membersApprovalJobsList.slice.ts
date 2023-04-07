import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  membersApprovalJobsList: {
    loading: false,
    data: [],
    freshJobMessage: ""
  },
};

export const membersApprovalJobsListSlice = createSlice({
  name: "membersApprovalJobsList",
  initialState,
  reducers: {
    SET_MEMBERS_APPROVAL_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_MEMBERS_APPROVAL_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      membersApprovalJobsList: {
        ...state.membersApprovalJobsList,
        loading: action.payload,
      },
    }),

    SET_MEMBERS_APPROVAL_JOBS_DATA: (state, action) => ({
      ...state,
      membersApprovalJobsList: {
        ...state.membersApprovalJobsList,
        data: action.payload,
      },
    }),

    CLEAR_MEMBERS_APPROVAL_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_MEMBERS_APPROVAL_JOBS_LOADING,
  SET_MEMBERS_APPROVAL_JOBS_LIST_LOADING,
  SET_MEMBERS_APPROVAL_JOBS_DATA,
  CLEAR_MEMBERS_APPROVAL_JOBS,
} = membersApprovalJobsListSlice.actions;

export const MEMBERS_APPROVAL_JOBS_DATA = (state: RootState) =>
  state.homePage.membersApprovalJobsList.membersApprovalJobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
