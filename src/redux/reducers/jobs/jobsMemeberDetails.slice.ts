import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobMemberDetails: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobsMemberDetails = createSlice({
  name: "JobMemberDetails",
  initialState,
  reducers: {
    SET_JOBS_MEMEBER_DETAILS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_MEMEBER_DETAILS_LIST_LOADING: (state, action) => ({
      ...state,
      JobMemberDetails: {
        ...state.JobMemberDetails,
        loading: action.payload,
      },
    }),

    SET_JOBS_MEMEBER_DETAILS_LIST_DATA: (state, action) => ({
      ...state,
      JobMemberDetails: {
        ...state.JobMemberDetails,
        data: action.payload,
      },
    }),

    SET_JOBS_MEMEBER_DETAILS_SUCCESS: (state, action) => ({
      ...state,
      JobMemberDetails: {
        ...state.JobMemberDetails,
        success: action.payload,
      },
    }),

    CLEAR_JOBS_MEMEBER_DETAILS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_MEMEBER_DETAILS_LOADING,
  SET_JOBS_MEMEBER_DETAILS_LIST_LOADING,
  SET_JOBS_MEMEBER_DETAILS_LIST_DATA,
  CLEAR_JOBS_MEMEBER_DETAILS,
  SET_JOBS_MEMEBER_DETAILS_SUCCESS,
} = jobsMemberDetails.actions;

export const GET_JOBS_MEMEBER_DETAILS_DETAILS = (state: RootState) =>
  state.homePage.jobsMemberDetails.JobMemberDetails;
