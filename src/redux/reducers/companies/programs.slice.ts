import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { ProgramsInitialType } from "helper/types/companies/programsType";

const initialState: ProgramsInitialType = {
  loading: false,
  programsList: {
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
    delete: null,
  },
};

export const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    SET_PROGRAMS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_PROGRAMS_DATA_LOADING: (state, action) => ({
      ...state,
      programsList: {
        ...state.programsList,
        loading: action.payload,
      },
    }),

    SET_PROGRAMS_DATA: (state, action) => ({
      ...state,
      programsList: {
        ...state.programsList,
        data: action.payload,
      },
    }),

    SET_CREATE_PROGRAMS: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_PROGRAMS_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_PROGRAMS: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_PROGRAMS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_PROGRAMS_LOADING,
  SET_PROGRAMS_DATA_LOADING,
  SET_PROGRAMS_DATA,
  CLEAR_PROGRAMS,
  SET_PROGRAMS_EDIT_DATA,
  SET_CREATE_PROGRAMS,
  SET_DELETE_PROGRAMS,
} = programsSlice.actions;

export const PROGRAMS_DATA = (state: RootState) =>
  state.companies.programs.programsList;

export const PROGRAMS = (state: RootState) => state.companies.programs;

export const PROGRAMS_RESPONSE = (state: RootState) =>
  state.companies.programs.response;
