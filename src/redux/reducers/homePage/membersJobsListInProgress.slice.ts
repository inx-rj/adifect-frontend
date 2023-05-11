import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  membersAdminJobsListInProgress: {
    loading: false,
    data: [],
    freshJobMessage: "",
  },
};

export const membersAdminJobsListInProgressSlice = createSlice({
  name: "membersAdminJobsListInProgress",
  initialState,
  reducers: {
    SET_MEMBERS_ADMIN_JOBS_IN_PROGRESS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_MEMBERS_ADMIN_JOBS_LIST_IN_PROGRESS_LOADING: (state, action) => ({
      ...state,
      membersAdminJobsListInProgress: {
        ...state.membersAdminJobsListInProgress,
        loading: action.payload,
      },
    }),

    SET_MEMBERS_ADMIN_JOBS_IN_PROGRESS_DATA: (state, action) => ({
      ...state,
      membersAdminJobsListInProgress: {
        ...state.membersAdminJobsListInProgress,
        data: action.payload,
      },
    }),

    CLEAR_MEMBERS_ADMIN_IN_PROGRESS_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_MEMBERS_ADMIN_JOBS_IN_PROGRESS_LOADING,
  SET_MEMBERS_ADMIN_JOBS_LIST_IN_PROGRESS_LOADING,
  SET_MEMBERS_ADMIN_JOBS_IN_PROGRESS_DATA,
  CLEAR_MEMBERS_ADMIN_IN_PROGRESS_JOBS,
} = membersAdminJobsListInProgressSlice.actions;

export const MEMBERS_ADMIN_JOBS_IN_PROGRESS_DATA = (state: RootState) =>
  state.homePage.membersAdminJobsListInProgress.membersAdminJobsListInProgress;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
