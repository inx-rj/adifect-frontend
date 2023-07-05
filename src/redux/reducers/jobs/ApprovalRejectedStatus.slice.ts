import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  approvalRejectedStatus: {
    loading: false,
    data: null,
    success: "",
  },
};

export const approvalRejectedStatusSlice = createSlice({
  name: "approvalRejectedStatus",
  initialState,
  reducers: {
    SET_APPROVAL_REJECTED_STATUS_LIST_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING: (state, action) => ({
      ...state,
      approvalRejectedStatus: {
        ...state.approvalRejectedStatus,
        loading: action.payload,
      },
    }),

    SET_APPROVAL_REJECTED_STATUS_LIST_DATA: (state, action) => ({
      ...state,
      approvalRejectedStatus: {
        ...state.approvalRejectedStatus,
        data: action.payload,
      },
    }),

    SET_APPROVAL_REJECTED_STATUS_LIST_SUCCESS: (state, action) => ({
      ...state,
      approvalRejectedStatus: {
        ...state.approvalRejectedStatus,
        success: action.payload,
      },
    }),

    CLEAR_APPROVAL_REJECTED_STATUS_LIST: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_APPROVAL_REJECTED_STATUS_LIST_LOADING,
  SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING,
  SET_APPROVAL_REJECTED_STATUS_LIST_DATA,
  SET_APPROVAL_REJECTED_STATUS_LIST_SUCCESS,
  CLEAR_APPROVAL_REJECTED_STATUS_LIST,
} = approvalRejectedStatusSlice.actions;

export const APPROVAL_REJECTED_STATUS_LIST_DATA = (state: RootState) =>
  state.homePage.approvalRejectedStatus.approvalRejectedStatus;
