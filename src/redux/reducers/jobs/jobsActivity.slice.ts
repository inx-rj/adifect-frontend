import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  JobsActivityInviteUserList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      // results: [jobsListInitialState],
      results: [],
    },
    success: "",
  },
  CompletedJobsActivityList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      // results: [jobsListInitialState],
      results: [],
    },
    success: "",
  },
  CompletedJobsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      // results: [jobsListInitialState],
      results: [],
    },
    success: "",
    error: "",
  },
  PostJobsActivityChat: {
    loading: false,
    success: "",
    error: "",
  },
  JobsActivityDetails: {
    loading: false,
    details: null,
  },
  successMessage: "",
};

export const jobsActivitySlice = createSlice({
  name: "jobsActivity",
  initialState,
  reducers: {
    SET_JOBS_ACTIVITY_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_ACTIVITY_LIST_LOADING: (state, action) => ({
      ...state,
      JobsActivityInviteUserList: {
        ...state.JobsActivityInviteUserList,
        loading: action.payload,
      },
    }),

    SET_JOBS_ACTIVITY_LIST_DATA: (state, action) => ({
      ...state,
      JobsActivityInviteUserList: {
        ...state.JobsActivityInviteUserList,
        data: action.payload,
      },
    }),

    SET_JOBS_ACTIVITY_INVITE_USER_LIST_SUCCESS: (state, action) => ({
      ...state,
      JobsActivityInviteUserList: {
        ...state.JobsActivityInviteUserList,
        success: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING: (state, action) => ({
      ...state,
      CompletedJobsActivityList: {
        ...state.CompletedJobsActivityList,
        loading: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_DATA: (state, action) => ({
      ...state,
      CompletedJobsActivityList: {
        ...state.CompletedJobsActivityList,
        data: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_SUCCESS: (state, action) => ({
      ...state,
      CompletedJobsActivityList: {
        ...state.CompletedJobsActivityList,
        success: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING: (state, action) => ({
      ...state,
      CompletedJobsList: {
        ...state.CompletedJobsList,
        loading: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_LIST_DATA: (state, action) => ({
      ...state,
      CompletedJobsList: {
        ...state.CompletedJobsList,
        data: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_LIST_SUCCESS: (state, action) => ({
      ...state,
      CompletedJobsList: {
        ...state.CompletedJobsList,
        success: action.payload,
      },
    }),

    SET_COMPLETED_JOBS_ACTIVITY_LIST_ERROR: (state, action) => ({
      ...state,
      CompletedJobsList: {
        ...state.CompletedJobsList,
        error: action.payload,
      },
    }),

    SET_POST_JOBS_ACTIVITY_CHAT_LOADING: (state, action) => ({
      ...state,
      PostJobsActivityChat: {
        ...state.PostJobsActivityChat,
        loading: action.payload,
      },
    }),

    SET_POST_JOBS_ACTIVITY_CHAT_DATA: (state, action) => ({
      ...state,
      PostJobsActivityChat: {
        ...state.PostJobsActivityChat,
        data: action.payload,
      },
    }),

    SET_POST_JOBS_ACTIVITY_CHAT_SUCCESS: (state, action) => ({
      ...state,
      PostJobsActivityChat: {
        ...state.PostJobsActivityChat,
        success: action.payload,
      },
    }),

    SET_JOBS_ACTIVITY_DETAILS: (state, action) => ({
      ...state,
      JobsActivityDetails: {
        ...state.JobsActivityDetails,
        details: action.payload,
      },
    }),

    SET_JOBS_ACTIVITY_SUCCESS_MESSAGE: (state, action) => ({
      ...state,
      successMessage: action.payload,
    }),

    CLEAR_JOBS_ACTIVITY: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_ACTIVITY_LOADING,
  SET_JOBS_ACTIVITY_LIST_LOADING,
  SET_JOBS_ACTIVITY_LIST_DATA,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_DATA,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_SUCCESS,
  SET_JOBS_ACTIVITY_DETAILS,
  SET_JOBS_ACTIVITY_SUCCESS_MESSAGE,
  SET_JOBS_ACTIVITY_INVITE_USER_LIST_SUCCESS,
  SET_POST_JOBS_ACTIVITY_CHAT_SUCCESS,
  SET_POST_JOBS_ACTIVITY_CHAT_DATA,
  SET_POST_JOBS_ACTIVITY_CHAT_LOADING,
  CLEAR_JOBS_ACTIVITY,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_DATA,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_SUCCESS,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_ERROR,
} = jobsActivitySlice.actions;

export const GET_JOBS_ACTIVITY_INVITE_USER_LIST = (state: RootState) =>
  state.homePage.jobsActivity.JobsActivityInviteUserList;

export const GET_COMPLETED_JOBS_ACTIVITY_USER_LIST_DATA = (state: RootState) =>
  state.homePage.jobsActivity.CompletedJobsActivityList;

export const GET_COMPLETED_JOBS_ACTIVITY_LIST_DATA = (state: RootState) =>
  state.homePage.jobsActivity.CompletedJobsList;

export const GET_JOBS_ACTIVITY_DETAIL_DATA = (state: RootState) =>
  state.homePage.jobsActivity.JobsActivityDetails;

export const GET_POST_ACTIVITY_CHAT_DATA = (state: RootState) =>
  state.homePage.jobsActivity.PostJobsActivityChat;

export const JOBS_SUCCESS_MESSAGE = (state: RootState) =>
  state.homePage.jobsActivity.successMessage;
