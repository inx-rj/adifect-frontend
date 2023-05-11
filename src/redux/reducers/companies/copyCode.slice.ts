import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { CopyCodeInitialType } from "helper/types/companies/copyCodeType";

const initialState: CopyCodeInitialType = {
  loading: false,
  copyCodeList: {
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

export const copyCodeSlice = createSlice({
  name: "copyCode",
  initialState,
  reducers: {
    SET_COPY_CODE_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COPY_CODE_DATA_LOADING: (state, action) => ({
      ...state,
      copyCodeList: {
        ...state.copyCodeList,
        loading: action.payload,
      },
    }),

    SET_COPY_CODE_DATA: (state, action) => ({
      ...state,
      copyCodeList: {
        ...state.copyCodeList,
        data: action.payload,
      },
    }),

    SET_CREATE_COPY_CODE: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_COPY_CODE_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_COPY_CODE: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_COPY_CODE: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_COPY_CODE_LOADING,
  SET_COPY_CODE_DATA_LOADING,
  SET_COPY_CODE_DATA,
  CLEAR_COPY_CODE,
  SET_COPY_CODE_EDIT_DATA,
  SET_CREATE_COPY_CODE,
  SET_DELETE_COPY_CODE,
} = copyCodeSlice.actions;

export const COPY_CODE_DATA = (state: RootState) =>
  state.companies.copyCode.copyCodeList;

export const COPY_CODE = (state: RootState) => state.companies.copyCode;

export const COPY_CODE_RESPONSE = (state: RootState) =>
  state.companies.copyCode.response;
