import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { CompanyListInitialsType } from "helper/types/companyTab/comapniesType";

const initialState = {
  loading: false,
  workFlowList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
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
  },
});

export const {
  SET_WORKFLOW_LOADING,
  SET_WORKFLOW_LIST_LOADING,
  SET_WORKFLOW_LIST_DATA,
} = workFlowTabSlice.actions;

export const WORKFLOW_LIST = (state: RootState) => state.workFlowTab;
