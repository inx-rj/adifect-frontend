import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  creatorJobsListInReview: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
  creatorJobsListInProgress: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },

    freshJobMessage: "",
  },
};

export const creatorJobsListSlice = createSlice({
  name: "creatorJobsList",
  initialState,
  reducers: {
    SET_CREATOR_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING: (state, action) => ({
      ...state,
      creatorJobsListInProgress: {
        ...state.creatorJobsListInProgress,
        loading: action.payload,
      },
    }),

    SET_CREATOR_JOBS_DATA_IN_PROGRESS: (state, action) => ({
      ...state,
      creatorJobsListInProgress: {
        ...state.creatorJobsListInProgress,
        data: action.payload,
      },
    }),

    SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING: (state, action) => ({
      ...state,
      creatorJobsListInReview: {
        ...state.creatorJobsListInReview,
        loading: action.payload,
      },
    }),

    SET_CREATOR_JOBS_DATA_IN_REVIEW: (state, action) => ({
      ...state,
      creatorJobsListInReview: {
        ...state.creatorJobsListInReview,
        data: action.payload,
      },
    }),

    CLEAR_CREATOR_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_CREATOR_JOBS_LOADING,
  SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING,
  SET_CREATOR_JOBS_DATA_IN_PROGRESS,
  SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING,
  SET_CREATOR_JOBS_DATA_IN_REVIEW,
  CLEAR_CREATOR_JOBS,
} = creatorJobsListSlice.actions;

export const CREATOR_JOBS_DATA = (state: RootState) =>
  state.homePage.creatorJobsList.creatorJobsListInProgress;

export const CREATOR_JOBS_DATA_IN_REVIEW = (state: RootState) =>
  state.homePage.creatorJobsList.creatorJobsListInReview;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
