import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { WorkFlowInitialsType } from "helper/types/workFlow/workFlowTypes";

const initialState: WorkFlowInitialsType = {
  loading: false,
  workFlowList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
  workFlowMainDetails: {
    loading: false,
    details: {
      id: 0,
      assigned_job: false,
      company_name: "",
      created: "",
      modified: "",
      is_trashed: false,
      name: "",
      is_active: false,
      is_blocked: false,
      agency: 0,
      company: 0,
    },
  },
  workFlowStageDetails: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
};

export const workFlowTabSlice = createSlice({
  name: "workFlowTab",
  initialState,
  reducers: {
    SET_WORKFLOW_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_WORKFLOW_LIST_LOADING: (state, action) => ({
      ...state,
      workFlowList: {
        ...state.workFlowList,
        loading: action.payload,
      },
    }),

    SET_WORKFLOW_LIST_DATA: (state, action) => {
      return {
        ...state,
        workFlowList: {
          ...state.workFlowList,
          hasData: true,
          data: action.payload,
        },
      };
    },

    SET_WORKFLOW_MAIN_DETAILS: (state, action) => {
      return {
        ...state,
        workFlowMainDetails: {
          ...state.workFlowMainDetails,
          hasData: true,
          details: action.payload,
        },
      };
    },

    SET_WORKFLOW_STAGE_DETAILS: (state, action) => {
      return {
        ...state,
        workFlowStageDetails: {
          ...state.workFlowStageDetails,
          hasData: true,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_WORKFLOW_LOADING,
  SET_WORKFLOW_LIST_LOADING,
  SET_WORKFLOW_LIST_DATA,
  SET_WORKFLOW_MAIN_DETAILS,
  SET_WORKFLOW_STAGE_DETAILS,
} = workFlowTabSlice.actions;

export const WORKFLOW_LIST = (state: RootState) => state.workFlowTab;

export const WORKFLOW_MAIN_DETAILS = (state: RootState) =>
  state.workFlowTab.workFlowMainDetails.details;

export const WORKFLOW_STAGE_DETAILS = (state: RootState) =>
  state.workFlowTab.workFlowStageDetails;
