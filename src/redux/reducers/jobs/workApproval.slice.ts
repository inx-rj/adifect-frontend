import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobWorkApproval: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobsWorkApprovalSlice = createSlice({
  name: "jobsWorkApproval",
  initialState,
  reducers: {
    SET_JOBS_WORK_APPROVAL_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_WORK_APPROVAL_LIST_LOADING: (state, action) => ({
      ...state,
      JobWorkApproval: {
        ...state.JobWorkApproval,
        loading: action.payload,
      },
    }),

    SET_JOBS_WORK_APPROVAL_LIST_DATA: (state, action) => ({
      ...state,
      JobWorkApproval: {
        ...state.JobWorkApproval,
        data: action.payload,
      },
    }),

    SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING: (state, action) => ({
      ...state,
      JobWorkApproval: {
        ...state.JobWorkApproval,
        loading: action.payload,
      },
    }),

    SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_DATA: (state, action) => ({
      ...state,
      JobWorkApproval: {
        ...state.JobWorkApproval,
        data: action.payload,
      },
    }),

    CLEAR_JOBS_WORK_APPROVAL: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_WORK_APPROVAL_LOADING,
  SET_JOBS_WORK_APPROVAL_LIST_LOADING,
  SET_JOBS_WORK_APPROVAL_LIST_DATA,
  SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING,
  SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_DATA,
  CLEAR_JOBS_WORK_APPROVAL,
} = jobsWorkApprovalSlice.actions;

export const GET_JOBS_WORK_APPROVAL_DETAILS = (state: RootState) =>
  state.homePage.jobsWorkApproval.JobWorkApproval;
