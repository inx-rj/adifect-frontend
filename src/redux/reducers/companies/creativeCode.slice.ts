import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { CreativeCodeInitialType } from "helper/types/companies/creativeCodeType";

const initialState: CreativeCodeInitialType = {
  loading: false,
  creativeCodeList: {
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

export const creativeCodeSlice = createSlice({
  name: "creativeCode",
  initialState,
  reducers: {
    SET_CREATIVE_CODE_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_CREATIVE_CODE_DATA_LOADING: (state, action) => ({
      ...state,
      creativeCodeList: {
        ...state.creativeCodeList,
        loading: action.payload,
      },
    }),

    SET_CREATIVE_CODE_DATA: (state, action) => ({
      ...state,
      creativeCodeList: {
        ...state.creativeCodeList,
        data: action.payload,
      },
    }),

    SET_CREATE_CREATIVE_CODE: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_CREATIVE_CODE_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_CREATIVE_CODE: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_CREATIVE_CODE: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_CREATIVE_CODE_LOADING,
  SET_CREATIVE_CODE_DATA_LOADING,
  SET_CREATIVE_CODE_DATA,
  CLEAR_CREATIVE_CODE,
  SET_CREATIVE_CODE_EDIT_DATA,
  SET_CREATE_CREATIVE_CODE,
  SET_DELETE_CREATIVE_CODE,
} = creativeCodeSlice.actions;

export const CREATIVE_CODE_DATA = (state: RootState) =>
  state.companies.creativeCode.creativeCodeList;

export const CREATIVE_CODE = (state: RootState) => state.companies.creativeCode;

export const CREATIVE_CODE_RESPONSE = (state: RootState) =>
  state.companies.creativeCode.response;
