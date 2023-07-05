import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobQueList: {
    loading: false,
    data: null,
    success: "",
  },
  JobAnsList: {
    loading: false,
    data: null,
    success: "",
  },
  jobAnsPost: {
    loading: false,
    details: null,
    success: "",
  },
  JobQueSearchList: {
    loading: false,
    data: null,
    success: "",
  },
  DeleteJobQue: "",
  DeleteJobAns: "",
};

export const jobsQueAnsSlice = createSlice({
  name: "jobsQueAns",
  initialState,
  reducers: {
    SET_JOBS_QUE_N_ANSWER_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_QUE_LIST_LOADING: (state, action) => ({
      ...state,
      JobQueList: {
        ...state.JobQueList,
        loading: action.payload,
      },
    }),

    SET_JOBS_QUE_LIST_DATA: (state, action) => ({
      ...state,
      JobQueList: {
        ...state.JobQueList,
        data: action.payload,
      },
    }),

    SET_JOBS_ANS_LIST_LOADING: (state, action) => ({
      ...state,
      JobAnsList: {
        ...state.JobAnsList,
        loading: action.payload,
      },
    }),

    SET_JOBS_ANS_LIST_DATA: (state, action) => ({
      ...state,
      JobAnsList: {
        ...state.JobAnsList,
        data: action.payload,
      },
    }),

    SET_JOBS_QUE_N_ANS_SEARCH_LOADING: (state, action) => ({
      ...state,
      JobQueSearchList: {
        ...state.JobQueSearchList,
        loading: action.payload,
      },
    }),

    SET_JOBS_QUE_N_ANS_SEARCH_DATA: (state, action) => ({
      ...state,
      JobQueSearchList: {
        ...state.JobQueSearchList,
        data: action.payload,
      },
    }),

    SET_JOBS_ANS_POST_LOADING: (state, action) => ({
      ...state,
      jobAnsPost: {
        ...state.jobAnsPost,
        loading: action.payload,
      },
    }),

    SET_JOBS_ANS_POST_DETAILS: (state, action) => ({
      ...state,
      jobAnsPost: {
        ...state.jobAnsPost,
        details: action.payload,
      },
    }),

    SET_JOBS_ANS_POST_SUCCESS: (state, action) => ({
      ...state,
      jobAnsPost: {
        ...state.jobAnsPost,
        success: action.payload,
      },
    }),

    SET_JOBS_DELETE_QUE_DATA: (state, action) => ({
      ...state,
      DeleteJobQue: action.payload,
    }),

    SET_JOBS_DELETE_ANS_DATA: (state, action) => ({
      ...state,
      DeleteJobAns: action.payload,
    }),

    CLEAR_JOBS_QUE_N_ANSWER: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_QUE_N_ANSWER_LOADING,
  SET_JOBS_QUE_LIST_LOADING,
  SET_JOBS_QUE_LIST_DATA,
  SET_JOBS_ANS_LIST_LOADING,
  SET_JOBS_ANS_LIST_DATA,
  SET_JOBS_DELETE_QUE_DATA,
  SET_JOBS_DELETE_ANS_DATA,
  SET_JOBS_ANS_POST_LOADING,
  SET_JOBS_ANS_POST_DETAILS,
  SET_JOBS_ANS_POST_SUCCESS,
  SET_JOBS_QUE_N_ANS_SEARCH_LOADING,
  SET_JOBS_QUE_N_ANS_SEARCH_DATA,
  CLEAR_JOBS_QUE_N_ANSWER,
} = jobsQueAnsSlice.actions;

export const GET_JOBS_QUE_DETAILS = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.JobQueList;

export const GET_JOBS_ANSWER_DETAILS = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.JobAnsList;

export const DELETE_JOBS_QUE_DETAILS = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.DeleteJobQue;

export const DELETE_JOBS_ANSWER_DETAILS = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.DeleteJobAns;

export const ANSWER_POST_SUCCESS = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.jobAnsPost;

export const GET_QUE_N_ANS_SEARCH = (state: RootState) =>
  state.homePage.jobsQuestionAnswer.JobQueSearchList;
