import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { CompanyListInitialsType } from "helper/types/companyTab/comapniesType";

const initialState: CompanyListInitialsType = {
  loading: false,
  companyList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const companyTabSlice = createSlice({
  name: "companyTab",
  initialState,
  reducers: {
    SET_COMPANY_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COMPANY_LIST_LOADING: (state, action) => ({
      ...state,
      companyList: {
        ...state.companyList,
        loading: action.payload,
      },
    }),

    SET_COMPANY_LIST_DATA: (state, action) => {
      return {
        ...state,
        companyList: {
          ...state.companyList,
          hasData: true,
          data: action.payload,
        },
      }
    }
  },
});

export const {
  SET_COMPANY_LOADING, SET_COMPANY_LIST_LOADING, SET_COMPANY_LIST_DATA } = companyTabSlice.actions;

export const COMPANY_LIST = (state: RootState) => state.companyTab;
