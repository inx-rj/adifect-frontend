import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { CompaniesTagsInitialsType } from "helper/types/companies/comapniesTagsType";

const initialState: CompaniesTagsInitialsType = {
  loading: false,
  companyProjectsTagsList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const companiesTagsSlice = createSlice({
  name: "companiesTags",
  initialState,
  reducers: {
    SET_COMPANIES_TAGS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COMPANIES_PROJECTS_TAGS_LOADING: (state, action) => ({
      ...state,
      companyProjectsTagsList: {
        ...state.companyProjectsTagsList,
        loading: action.payload,
      },
    }),

    SET_COMPANIES_PROJECTS_TAGS_DATA: (state, action) => ({
      ...state,
      companyProjectsTagsList: {
        ...state.companyProjectsTagsList,
        data: action.payload,
      },
    }),
  },
});

export const {
  SET_COMPANIES_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_DATA,
} = companiesTagsSlice.actions;

export const COMPANY_PROJECTS_TAGS_DATA = (state: RootState) =>
  state.companies.companiesTags.companyProjectsTagsList;

export const COMPANY_PROJECTS_TAGS = (state: RootState) =>
  state.companies.companiesTags;
