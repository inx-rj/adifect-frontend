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
  response: {
    add: null,
    update: null,
    remove: null,
    addNew: null,
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

    SET_NEW_COMPANIES_PROJECTS_STORY_TAGS_DATA: (state, action) => ({
      ...state,
      response: {
        ...state.response,
        addNew: action.payload,
      },
    }),

    SET_EXISTING_COMPANIES_PROJECTS_STORY_TAGS_DATA: (state, action) => ({
      ...state,
      response: {
        ...state.response,
        add: action.payload,
      },
    }),

    SET_COMPANIES_PROJECTS_STORY_TAGS_DATA: (state, action) => ({
      ...state,
      response: {
        ...state.response,
        remove: action.payload,
      },
    }),
  },
});

export const {
  SET_COMPANIES_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_LOADING,
  SET_COMPANIES_PROJECTS_TAGS_DATA,
  SET_COMPANIES_PROJECTS_STORY_TAGS_DATA,
  SET_EXISTING_COMPANIES_PROJECTS_STORY_TAGS_DATA,
  SET_NEW_COMPANIES_PROJECTS_STORY_TAGS_DATA,
} = companiesTagsSlice.actions;

export const COMPANY_PROJECTS_TAGS_DATA = (state: RootState) =>
  state.companies.companiesTags.companyProjectsTagsList;

export const COMPANY_PROJECTS_TAGS = (state: RootState) =>
  state.companies.companiesTags;

export const COMPANY_PROJECTS_STORY_TAGS_RESPONSE = (state: RootState) =>
  state.companies.companiesTags.response;
