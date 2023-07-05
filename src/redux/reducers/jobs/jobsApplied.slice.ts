import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  jobApplied: {
    loading: false,
    data: null,
    success: "",
  },
  creatorJobApplied: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobAppliedSlice = createSlice({
  name: "jobApplied",
  initialState,
  reducers: {
    SET_JOB_APPLIED_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOB_APPLIED_LIST_LOADING: (state, action) => ({
      ...state,
      jobApplied: {
        ...state.jobApplied,
        loading: action.payload,
      },
    }),

    SET_JOB_APPLIED_DATA: (state, action) => ({
      ...state,
      jobApplied: {
        ...state.jobApplied,
        data: action.payload,
      },
    }),

    SET_JOB_APPLIED_SUCCESS: (state, action) => ({
      ...state,
      jobApplied: {
        ...state.jobApplied,
        success: action.payload,
      },
    }),

    SET_CREATOR_JOB_APPLIED_LIST_LOADING: (state, action) => ({
      ...state,
      creatorJobApplied: {
        ...state.creatorJobApplied,
        loading: action.payload,
      },
    }),

    SET_CREATOR_JOB_APPLIED_DATA: (state, action) => ({
      ...state,
      creatorJobApplied: {
        ...state.creatorJobApplied,
        data: action.payload,
      },
    }),

    SET_CREATOR_JOB_APPLIED_SUCCESS: (state, action) => ({
      ...state,
      creatorJobApplied: {
        ...state.creatorJobApplied,
        success: action.payload,
      },
    }),

    CLEAR_JOB_APPLIED: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOB_APPLIED_LOADING,
  SET_JOB_APPLIED_LIST_LOADING,
  SET_JOB_APPLIED_DATA,
  SET_CREATOR_JOB_APPLIED_LIST_LOADING,
  SET_CREATOR_JOB_APPLIED_DATA,
  SET_CREATOR_JOB_APPLIED_SUCCESS,
  CLEAR_JOB_APPLIED,
} = jobAppliedSlice.actions;

export const JOB_APPLIED_DATA = (state: RootState) =>
  state.homePage.jobApplied.jobApplied;

export const CREATOR_JOB_APPLIED_DATA = (state: RootState) =>
  state.homePage.jobApplied.creatorJobApplied;

// export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
//   state.homePage.JobsListsFilters;
