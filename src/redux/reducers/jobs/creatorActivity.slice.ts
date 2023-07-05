import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  creatorActivity: {
    loading: false,
    data: null,
    success: "",
  },
  submitJobWork: {
    loading: false,
    data: null,
    success: "",
    error: "",
  },
  openSubmitJobWorkModal: {
    loading: false,
    openModal: false,
  },
};

export const creatorActivitySlice = createSlice({
  name: "creatorActivity",
  initialState,
  reducers: {
    SET_CREATOR_ACTIVITY_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_CREATOR_ACTIVITY_DETAILS_LOADING: (state, action) => ({
      ...state,
      creatorActivity: {
        ...state.creatorActivity,
        loading: action.payload,
      },
    }),

    SET_CREATOR_ACTIVITY_DATA: (state, action) => ({
      ...state,
      creatorActivity: {
        ...state.creatorActivity,
        data: action.payload,
      },
    }),

    SET_CREATOR_ACTIVITY_SUCCESS: (state, action) => ({
      ...state,
      creatorActivity: {
        ...state.creatorActivity,
        success: action.payload,
      },
    }),

    SET_SUBMIT_JOB_WORK_LOADING: (state, action) => ({
      ...state,
      submitJobWork: {
        ...state.submitJobWork,
        loading: action.payload,
      },
    }),

    SET_SUBMIT_JOB_WORK_DATA: (state, action) => ({
      ...state,
      submitJobWork: {
        ...state.submitJobWork,
        data: action.payload,
      },
    }),

    SET_SUBMIT_JOB_WORK_SUCCESS: (state, action) => ({
      ...state,
      submitJobWork: {
        ...state.submitJobWork,
        success: action.payload,
      },
    }),

    SET_SUBMIT_JOB_WORK_ERROR: (state, action) => ({
      ...state,
      submitJobWork: {
        ...state.submitJobWork,
        error: action.payload,
      },
    }),

    SET_OPEN_SUBMIT_JOB_WORK_MODAL_LOADING: (state, action) => ({
      ...state,
      openSubmitJobWorkModal: {
        ...state.openSubmitJobWorkModal,
        loading: action.payload,
      },
    }),

    SET_OPEN_SUBMIT_JOB_WORK_MODAL: (state, action) => ({
      ...state,
      openSubmitJobWorkModal: {
        ...state.openSubmitJobWorkModal,
        openModal: action.payload,
      },
    }),

    CLEAR_CREATOR_ACTIVITY: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_CREATOR_ACTIVITY_LOADING,
  SET_CREATOR_ACTIVITY_DETAILS_LOADING,
  SET_CREATOR_ACTIVITY_DATA,
  SET_CREATOR_ACTIVITY_SUCCESS,
  SET_SUBMIT_JOB_WORK_LOADING,
  SET_SUBMIT_JOB_WORK_DATA,
  SET_SUBMIT_JOB_WORK_SUCCESS,
  SET_SUBMIT_JOB_WORK_ERROR,
  SET_OPEN_SUBMIT_JOB_WORK_MODAL_LOADING,
  SET_OPEN_SUBMIT_JOB_WORK_MODAL,
  CLEAR_CREATOR_ACTIVITY,
} = creatorActivitySlice.actions;

export const CREATOR_ACTIVITY_DATA = (state: RootState) =>
  state.homePage.creatorActivity.creatorActivity;

export const SUBMIT_JOB_WORK = (state: RootState) =>
  state.homePage.creatorActivity.submitJobWork;

export const SUBMIT_JOB_WORK_MODAL = (state: RootState) =>
  state.homePage.creatorActivity.openSubmitJobWorkModal;
