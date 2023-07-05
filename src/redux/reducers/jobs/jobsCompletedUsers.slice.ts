import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState: any = {
  loading: false,
  JobCompletedUsers: {
    loading: false,
    data: null,
    success: "",
  },
};

export const jobsCompletedUsers = createSlice({
  name: "JobCompletedUsers",
  initialState,
  reducers: {
    SET_JOBS_COMPLETED_USERS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_JOBS_COMPLETED_USERS_LIST_LOADING: (state, action) => ({
      ...state,
      JobCompletedUsers: {
        ...state.JobCompletedUsers,
        loading: action.payload,
      },
    }),

    SET_JOBS_COMPLETED_USERS_LIST_DATA: (state, action) => ({
      ...state,
      JobCompletedUsers: {
        ...state.JobCompletedUsers,
        data: action.payload,
      },
    }),

    SET_JOBS_COMPLETED_USERS_SUCCESS: (state, action) => ({
      ...state,
      JobCompletedUsers: {
        ...state.JobCompletedUsers,
        success: action.payload,
      },
    }),

    CLEAR_JOBS_COMPLETED_USERS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_JOBS_COMPLETED_USERS_LOADING,
  SET_JOBS_COMPLETED_USERS_LIST_LOADING,
  SET_JOBS_COMPLETED_USERS_LIST_DATA,
  CLEAR_JOBS_COMPLETED_USERS,
  SET_JOBS_COMPLETED_USERS_SUCCESS,
} = jobsCompletedUsers.actions;

export const GET_JOBS_COMPLETED_USERS_DETAILS = (state: RootState) =>
  state.homePage.jobsCompletedUsers.JobCompletedUsers;
