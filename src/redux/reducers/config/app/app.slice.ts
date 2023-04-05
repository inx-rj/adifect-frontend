import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../rootReducer";
import { appInitialType } from "helper/types/auth/authType";

const initialState: appInitialType = {
  isMiniSidebar: false,
  persist: false,
};

export const configAppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_SIDEBAR: (state, action) => {
      state.isMiniSidebar = action.payload;
    },
    SET_PERSIST: (state, action) => {
      state.persist = action.payload
    }
  },
});

export const {
  SET_PERSIST,
  SET_SIDEBAR
} = configAppSlice.actions;

export const IS_SIDEBAR_COLLAPSED = (state: RootState) =>
  state.config.app.isMiniSidebar;
export const IS_PERSISTED = (state: RootState) => state.config.app.persist;

