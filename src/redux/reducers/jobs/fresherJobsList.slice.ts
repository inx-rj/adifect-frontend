import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  freshersJobsList: {
    loading: false,
    data: null,
    freshJobMessage: ""
  },
  count: {
    totalJobCount: 0,
    inProgressJobs: 0
  }
};

export const freshersJobsListSlice = createSlice({
  name: "freshersJobsList",
  initialState,
  reducers: {
    SET_FRESHERS_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_FRESHERS_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      freshersJobsList: {
        ...state.freshersJobsList,
        loading: action.payload,
      },
    }),

    SET_FRESHERS_JOBS_DATA: (state, action) => ({
      ...state,
      freshersJobsList: {
        ...state.freshersJobsList,
        data: action.payload,
      },
    }),
    SET_USER_TOTAL_JOB_COUNT: (state, action) => ({
      ...state,
      count: {
        ...state.count,
        totalJobCount: action.payload
      }
    }),
    SET_USER_IN_PROGRESS_JOBS_COUNT: (state, action) => ({
      ...state,
      count: {
        ...state.count,
        inProgressJobs: action.payload
      }
    }),
    CLEAR_FRESHERS_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_FRESHERS_JOBS_LOADING,
  SET_FRESHERS_JOBS_LIST_LOADING,
  SET_FRESHERS_JOBS_DATA,
  SET_USER_TOTAL_JOB_COUNT,
  SET_USER_IN_PROGRESS_JOBS_COUNT,
  CLEAR_FRESHERS_JOBS,
} = freshersJobsListSlice.actions;

export const FRESHERS_JOBS_DATA = (state: RootState) =>
  state.homePage.freshersJobsList.freshersJobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
export const USER_JOB_COUNT = (state: RootState) => state.homePage.freshersJobsList.count;
