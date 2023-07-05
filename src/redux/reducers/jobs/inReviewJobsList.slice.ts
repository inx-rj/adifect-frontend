import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  inReviewJobsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const inReviewJobsListSlice = createSlice({
  name: "inReviewJobsList",
  initialState,
  reducers: {
    SET_IN_REVIEW_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_IN_REVIEW_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      inReviewJobsList: {
        ...state.inReviewJobsList,
        loading: action.payload,
      },
    }),

    SET_IN_REVIEW_JOBS_DATA: (state, action) => ({
      ...state,
      inReviewJobsList: {
        ...state.inReviewJobsList,
        data: action.payload,
      },
    }),

    CLEAR_IN_REVIEW_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_IN_REVIEW_JOBS_LOADING,
  SET_IN_REVIEW_JOBS_LIST_LOADING,
  SET_IN_REVIEW_JOBS_DATA,
  CLEAR_IN_REVIEW_JOBS,
} = inReviewJobsListSlice.actions;

export const IN_REVIEW_JOBS_DATA = (state: RootState) =>
  state.homePage.inReviewJobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
