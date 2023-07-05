import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  templatesList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
  templateDetails: {
    loading: false,
    details: null,
  },
  response: {
    add: null,
    update: null,
    delete: null,
  },
};

export const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    SET_TEMPLATES_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_TEMPLATES_DATA_LOADING: (state, action) => ({
      ...state,
      templatesList: {
        ...state.templatesList,
        loading: action.payload,
      },
    }),

    SET_TEMPLATES_DATA: (state, action) => ({
      ...state,
      templatesList: {
        ...state.templatesList,
        data: action.payload,
      },
    }),

    SET_TEMPLATES_DETAILS_LOADING: (state, action) => ({
      ...state,
      templateDetails: {
        ...state.templateDetails,
        loading: action.payload,
      },
    }),

    SET_TEMPLATES_DETAILS: (state, action) => ({
      ...state,
      templateDetails: {
        ...state.templateDetails,
        details: action.payload,
      },
    }),

    SET_CREATE_TEMPLATES: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_TEMPLATES_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_TEMPLATES: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_TEMPLATES: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_TEMPLATES_LOADING,
  SET_TEMPLATES_DATA_LOADING,
  SET_TEMPLATES_DATA,
  CLEAR_TEMPLATES,
  SET_TEMPLATES_EDIT_DATA,
  SET_CREATE_TEMPLATES,
  SET_DELETE_TEMPLATES,
  SET_TEMPLATES_DETAILS_LOADING,
  SET_TEMPLATES_DETAILS,
} = templatesSlice.actions;

export const TEMPLATES_DATA = (state: RootState) =>
  state.templates.templatesList;

export const TEMPLATES_DETAILS = (state: RootState) =>
  state.templates.templateDetails;

export const TEMPLATES = (state: RootState) => state.templates;

export const TEMPLATES_RESPONSE = (state: RootState) =>
  state.templates.response;
