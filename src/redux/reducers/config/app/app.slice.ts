import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../rootReducer";
import { appInitialType } from "helper/types/auth/authType";

const initialState: appInitialType = {
  isMiniSidebar: true,
  persist: false,
  headerCompany: 0,
  headerCompanyName: "",
};

export const configAppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    SET_SIDEBAR: (state, action) => {
      state.isMiniSidebar = action.payload;
    },
    SET_PERSIST: (state, action) => {
      state.persist = action.payload;
    },
    SET_HEADER_COMPANY: (state, action) => {
      state.headerCompany = action.payload;
    },
    SET_HEADER_COMPANY_NAME: (state, action) => {
      state.headerCompanyName = action.payload;
    },
  },
});

export const {
  SET_PERSIST,
  SET_SIDEBAR,
  SET_HEADER_COMPANY,
  SET_HEADER_COMPANY_NAME,
} = configAppSlice.actions;

export const IS_SIDEBAR_OPEN = (state: RootState) =>
  state.config.app.isMiniSidebar;
export const IS_PERSISTED = (state: RootState) => state.config.app.persist;

export const IS_HEADER_COMPANY = (state: RootState) =>
  state.config.app.headerCompany;

export const HEADER_COMPANY_NAME = (state: RootState) =>
  state.config.app.headerCompanyName;
