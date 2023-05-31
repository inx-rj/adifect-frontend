import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  membersAdminJobsListInReview: {
    loading: false,
    data: [],
    freshJobMessage: ""
  },
};

export const membersAdminJobsListInReviewSlice = createSlice({
  name: "membersAdminJobsListInReview",
  initialState,
  reducers: {
    SET_MEMBERS_ADMIN_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_MEMBERS_ADMIN_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      membersAdminJobsListInReview: {
        ...state.membersAdminJobsListInReview,
        loading: action.payload,
      },
    }),

    SET_MEMBERS_ADMIN_JOBS_DATA: (state, action) => ({
      ...state,
      membersAdminJobsListInReview: {
        ...state.membersAdminJobsListInReview,
        data: action.payload,
      },
    }),

    CLEAR_MEMBERS_ADMIN_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
    SET_MEMBERS_ADMIN_JOBS_LOADING,
  SET_MEMBERS_ADMIN_JOBS_LIST_LOADING,
  SET_MEMBERS_ADMIN_JOBS_DATA,
  CLEAR_MEMBERS_ADMIN_JOBS,
} = membersAdminJobsListInReviewSlice.actions;

export const MEMBERS_ADMIN_JOBS_DATA = (state: RootState) =>
  state.homePage.membersJobListInReview.membersAdminJobsListInReview;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
