import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobFilesList: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobsFilesSlice = createSlice({
  name: "jobsFiles",
  initialState,
  reducers: {
    SET_JOBS_FILES_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_FILES_LIST_LOADING: (state, action) => ({
      ...state,
      JobFilesList: {
        ...state.JobFilesList,
        loading: action.payload,
      },
    }),

    SET_JOBS_FILES_LIST_DATA: (state, action) => ({
      ...state,
      JobFilesList: {
        ...state.JobFilesList,
        data: action.payload,
      },
    }),

    CLEAR_JOBS_FILES: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_FILES_LOADING,
  SET_JOBS_FILES_LIST_LOADING,
  SET_JOBS_FILES_LIST_DATA,
  CLEAR_JOBS_FILES,
} = jobsFilesSlice.actions;

export const GET_JOBS_FILES_DETAILS = (state: RootState) =>
  state.homePage.jobsFiles.JobFilesList;
