import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  damDetails: {
    loading: false,
    data: null,
  },
  response: {
    add: null,
    update: null,
    delete: null,
  },
  success: "",
};

export const damSlice = createSlice({
  name: "dam",
  initialState,
  reducers: {
    SET_DAM_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_DAM_DATA_LOADING: (state, action) => ({
      ...state,
      damDetails: {
        ...state.damDetails,
        loading: action.payload,
      },
    }),

    SET_DAM_DATA: (state, action) => ({
      ...state,
      damDetails: {
        ...state.damDetails,
        data: action.payload,
      },
    }),

    SET_DAM_COLLECTED_DATA_SUCCESS: (state, action) => ({
      ...state,
      success: action.payload,
    }),

    SET_CREATE_DAM: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_DAM_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_DAM: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_DAM: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_DAM_LOADING,
  SET_DAM_DATA_LOADING,
  SET_DAM_DATA,
  CLEAR_DAM,
  SET_DAM_EDIT_DATA,
  SET_CREATE_DAM,
  SET_DELETE_DAM,
  SET_DAM_COLLECTED_DATA_SUCCESS,
} = damSlice.actions;

export const DAM_DATA = (state: RootState) => state.media.dam.damDetails;

export const DAM = (state: RootState) => state.media.dam;

export const DAM_RESPONSE = (state: RootState) => state.media.dam.response;

export const DAM_SUCCESS = (state: RootState) => state.media.dam.success;
