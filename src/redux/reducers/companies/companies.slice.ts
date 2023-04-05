import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { CompaniesInitialsType } from "helper/types/companies/comapniesType";

const initialState: CompaniesInitialsType = {
  loading: false,
  companyProjectsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
  companyProjectsFilters: {
    loading: false,
    data: {
      community: [""],
      status: [""],
      tag: [""],
    },
  },
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    SET_COMPANIES_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COMPANIES_PROJECTS_LOADING: (state, action) => ({
      ...state,
      companyProjectsList: {
        ...state.companyProjectsList,
        loading: action.payload,
      },
    }),

    SET_COMPANIES_PROJECTS_DATA: (state, action) => ({
      ...state,
      companyProjectsList: {
        ...state.companyProjectsList,
        data: action.payload,
      },
    }),

    SET_COMPANIES_PROJECTS_FILTERS_LOADING: (state, action) => ({
      ...state,
      companyProjectsFilters: {
        ...state.companyProjectsFilters,
        loading: action.payload,
      },
    }),

    SET_COMPANIES_PROJECTS_FILTERS_DATA: (state, action) => ({
      ...state,
      companyProjectsFilters: {
        ...state.companyProjectsFilters,
        data: action.payload,
      },
    }),

    CLEAR_COMPANIES: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_COMPANIES_LOADING,
  SET_COMPANIES_PROJECTS_LOADING,
  SET_COMPANIES_PROJECTS_DATA,
  SET_COMPANIES_PROJECTS_FILTERS_LOADING,
  SET_COMPANIES_PROJECTS_FILTERS_DATA,
  CLEAR_COMPANIES,
} = companiesSlice.actions;

export const COMPANY_PROJECTS_DATA = (state: RootState) =>
  state.companies.companyProjectsList;

export const COMPANY_PROJECTS_FILTERS_DATA = (state: RootState) =>
  state.companies.companyProjectsFilters;

export const COMPANY_PROJECTS = (state: RootState) => state.companies;
