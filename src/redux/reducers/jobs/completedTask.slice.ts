import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  completedTaskList: {
    loading: false,
    data: null,
    success: "",
  },
};

export const completedTaskListSlice = createSlice({
  name: "completedTask",
  initialState,
  reducers: {
    SET_COMPLETED_TASK_LIST_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COMPLETED_TASK_DETAILS_LOADING: (state, action) => ({
      ...state,
      completedTaskList: {
        ...state.completedTaskList,
        loading: action.payload,
      },
    }),

    SET_COMPLETED_TASK_LIST_DATA: (state, action) => ({
      ...state,
      completedTaskList: {
        ...state.completedTaskList,
        data: action.payload,
      },
    }),

    SET_COMPLETED_TASK_LIST_SUCCESS: (state, action) => ({
      ...state,
      completedTaskList: {
        ...state.completedTaskList,
        success: action.payload,
      },
    }),

    CLEAR_COMPLETED_TASK_LIST: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_COMPLETED_TASK_LIST_LOADING,
  SET_COMPLETED_TASK_DETAILS_LOADING,
  SET_COMPLETED_TASK_LIST_DATA,
  SET_COMPLETED_TASK_LIST_SUCCESS,
  CLEAR_COMPLETED_TASK_LIST,
} = completedTaskListSlice.actions;

export const COMPLETED_TASK_LIST_DATA = (state: RootState) =>
  state.homePage.completedTaskList.completedTaskList;
