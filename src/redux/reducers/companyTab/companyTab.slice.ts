import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { CompanyListInitialsType } from "helper/types/companyTab/companiesType";

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
  singleCompany: {
    loading: false,
    data: {},
  },
  memberAdminCompanyList: {
    loading: false,
    data: null,
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
          // hasData: true,
          data: action.payload,
        },
      };
    },

    SET_SINGLE_COMPANY_LIST_LOADING: (state, action) => ({
      ...state,
      singleCompany: {
        ...state.singleCompany,
        loading: action.payload,
      },
    }),

    SET_SINGLE_COMPANY_LIST_DATA: (state, action) => {
      return {
        ...state,
        singleCompany: {
          ...state.singleCompany,
          hasData: true,
          data: action.payload,
        },
      };
    },

    SET_MEMBER_ADMIN_COMPANY_LIST_LOADING: (state, action) => ({
      ...state,
      memberAdminCompanyList: {
        ...state.memberAdminCompanyList,
        loading: action.payload,
      },
    }),

    SET_MEMBER_ADMIN_COMPANY_LIST_DATA: (state, action) => {
      return {
        ...state,
        memberAdminCompanyList: {
          ...state.memberAdminCompanyList,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_COMPANY_LOADING,
  SET_COMPANY_LIST_LOADING,
  SET_COMPANY_LIST_DATA,
  SET_SINGLE_COMPANY_LIST_LOADING,
  SET_SINGLE_COMPANY_LIST_DATA,
  SET_MEMBER_ADMIN_COMPANY_LIST_LOADING,
  SET_MEMBER_ADMIN_COMPANY_LIST_DATA,
} = companyTabSlice.actions;

export const COMPANY_LIST = (state: RootState) => state.companyTab;
export const COMPANY_DETAILS = (state: RootState) =>
  state.companyTab.singleCompany;

export const MEMBER_ADMIN_COMPANY_DATA = (state: RootState) =>
  state.companyTab.memberAdminCompanyList;
