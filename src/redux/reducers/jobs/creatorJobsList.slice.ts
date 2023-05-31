import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  creatorJobsList: {
    loading: false,
    data: [],
    freshJobMessage: ""
  },
};

export const creatorJobsListSlice = createSlice({
  name: "creatorJobsList",
  initialState,
  reducers: {
    SET_CREATOR_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_CREATOR_JOBS_LIST_LOADING: (state, action) => ({
      ...state,
      creatorJobsList: {
        ...state.creatorJobsList,
        loading: action.payload,
      },
    }),

    SET_CREATOR_JOBS_DATA: (state, action) => ({
      ...state,
      creatorJobsList: {
        ...state.creatorJobsList,
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
  SET_CREATOR_JOBS_LIST_LOADING,
  SET_CREATOR_JOBS_DATA,
  CLEAR_CREATOR_JOBS,
} = creatorJobsListSlice.actions;

export const CREATOR_JOBS_DATA = (state: RootState) =>
  state.homePage.creatorJobsList.creatorJobsList;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.homePage;
