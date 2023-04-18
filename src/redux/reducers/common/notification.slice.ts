import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";

const initialState: any = {
  loading: false, 
  notificationData: {
    loading: false, 
    hasData: true,
    data: {} 
  }
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    SET_NOTIFICATION_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_NOTIFICATION_DATA  : (state, action) => ({
      ...state,
      notificationData: {
        ...state.notificationData,
        loading: action.payload,
      },
    }),
  },
});

export const { SET_NOTIFICATION_LOADING, SET_NOTIFICATION_DATA } = notificationSlice.actions;

export const GET_NOTIFICATION_DATA = (state: RootState) => state.common.notification.notificationData;