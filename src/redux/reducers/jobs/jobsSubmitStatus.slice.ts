import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobSubmitStatus: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobsSubmitStatus = createSlice({
  name: "JobSubmitStatus",
  initialState,
  reducers: {
    SET_JOBS_SUBMIT_STATUS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_SUBMIT_STATUS_LIST_LOADING: (state, action) => ({
      ...state,
      JobSubmitStatus: {
        ...state.JobSubmitStatus,
        loading: action.payload,
      },
    }),

    SET_JOBS_SUBMIT_STATUS_LIST_DATA: (state, action) => ({
      ...state,
      JobSubmitStatus: {
        ...state.JobSubmitStatus,
        data: action.payload,
      },
    }),

    SET_JOBS_SUBMIT_STATUS_SUCCESS: (state, action) => ({
      ...state,
      JobSubmitStatus: {
        ...state.JobSubmitStatus,
        success: action.payload,
      },
    }),

    CLEAR_JOBS_SUBMIT_STATUS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_SUBMIT_STATUS_LOADING,
  SET_JOBS_SUBMIT_STATUS_LIST_LOADING,
  SET_JOBS_SUBMIT_STATUS_LIST_DATA,
  CLEAR_JOBS_SUBMIT_STATUS,
  SET_JOBS_SUBMIT_STATUS_SUCCESS,
} = jobsSubmitStatus.actions;

export const GET_JOBS_SUBMIT_STATUS_DETAILS = (state: RootState) =>
  state.homePage.jobsSubmitStatus.JobSubmitStatus;
