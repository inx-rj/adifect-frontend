import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  draftJobsList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
  response: {
    add: null,
    update: null,
    delete: null,
  },
};

export const draftJobsSlice = createSlice({
  name: "draftJobs",
  initialState,
  reducers: {
    SET_DRAFT_JOBS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_DRAFT_JOBS_DATA_LOADING: (state, action) => ({
      ...state,
      draftJobsList: {
        ...state.draftJobsList,
        loading: action.payload,
      },
    }),

    SET_DRAFT_JOBS_DATA: (state, action) => ({
      ...state,
      draftJobsList: {
        ...state.draftJobsList,
        data: action.payload,
      },
    }),

    SET_CREATE_DRAFT_JOBS: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_DRAFT_JOBS_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_DRAFT_JOBS: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_DRAFT_JOBS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_DRAFT_JOBS_LOADING,
  SET_DRAFT_JOBS_DATA_LOADING,
  SET_DRAFT_JOBS_DATA,
  CLEAR_DRAFT_JOBS,
  SET_DRAFT_JOBS_EDIT_DATA,
  SET_CREATE_DRAFT_JOBS,
  SET_DELETE_DRAFT_JOBS,
} = draftJobsSlice.actions;

export const DRAFT_JOBS_DATA = (state: RootState) =>
  state.draftJobs.draftJobsList;

export const DRAFT_JOBS = (state: RootState) => state.draftJobs;

export const DRAFT_JOBS_RESPONSE = (state: RootState) =>
  state.draftJobs.response;
