import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobProposalsList: {
    loading: false,
    data: null,
    success: "",
  },
  JobProposalAccepted: "",
  JobProposalRejected: "",
  update: "",
};

export const jobsProposalsSlice = createSlice({
  name: "jobsProposals",
  initialState,
  reducers: {
    SET_JOBS_PROPOSALS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_PROPOSALS_LIST_LOADING: (state, action) => ({
      ...state,
      JobProposalsList: {
        ...state.JobProposalsList,
        loading: action.payload,
      },
    }),

    SET_JOBS_PROPOSALS_LIST_DATA: (state, action) => ({
      ...state,
      JobProposalsList: {
        ...state.JobProposalsList,
        data: action.payload,
      },
    }),

    SET_JOBS_PROPOSALS_UPDATED: (state, action) => ({
      ...state,
      update: action.payload,
    }),

    SET_JOBS_PROPOSALS_ACCEPTED: (state, action) => ({
      ...state,
      JobProposalAccepted: action.payload,
    }),

    SET_JOBS_PROPOSALS_REJECTED: (state, action) => ({
      ...state,
      JobProposalRejected: action.payload,
    }),

    CLEAR_JOBS_PROPOSALS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_PROPOSALS_LOADING,
  SET_JOBS_PROPOSALS_LIST_LOADING,
  SET_JOBS_PROPOSALS_LIST_DATA,
  SET_JOBS_PROPOSALS_UPDATED,
  SET_JOBS_PROPOSALS_ACCEPTED,
  SET_JOBS_PROPOSALS_REJECTED,
  CLEAR_JOBS_PROPOSALS,
} = jobsProposalsSlice.actions;

export const GET_JOBS_PROPOSALS_DETAILS = (state: RootState) =>
  state.homePage.jobsProposals.JobProposalsList;

export const GET_JOBS_PROPOSALS_UPDATED = (state: RootState) =>
  state.homePage.jobsProposals.update;

export const GET_JOBS_PROPOSALS_ACCEPTED = (state: RootState) =>
  state.homePage.jobsProposals.JobProposalAccepted;

export const GET_JOBS_PROPOSALS_REJECTED = (state: RootState) =>
  state.homePage.jobsProposals.JobProposalRejected;
