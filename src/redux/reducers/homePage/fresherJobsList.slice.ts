import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  freshersJobsList: {
    loading: false,
    data: null,
    freshJobMessage: ""
  },
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

    CLEAR_FRESHERS_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_FRESHERS_JOBS_LOADING,
  SET_FRESHERS_JOBS_LIST_LOADING,
  SET_FRESHERS_JOBS_DATA,
  CLEAR_FRESHERS_JOBS,
} = freshersJobsListSlice.actions;

export const FRESHERS_JOBS_DATA = (state: RootState) =>
  state.homePage.freshersJobsList.freshersJobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
