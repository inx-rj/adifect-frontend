import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  JobsListsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const jobsListSlice = createSlice({
  name: "jobsList",
  initialState,
  reducers: {
    SET_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      JobsListsList: {
        ...state.JobsListsList,
        loading: action.payload,
      },
    }),

    SET_JOBS_DATA: (state, action) => ({
      ...state,
      JobsListsList: {
        ...state.JobsListsList,
        data: action.payload,
      },
    }),

    CLEAR_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_LOADING,
  SET_JOBS_LIST_LOADING,
  SET_JOBS_DATA,
  CLEAR_JOBS,
} = jobsListSlice.actions;

export const JOBS_DATA = (state: RootState) => state.homePage.jobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
