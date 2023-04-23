import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";

const initialState = {
  loading: false,
  levelsList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
    },
  },
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    SET_LEVELS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_LEVELS_LIST_LOADING: (state, action) => ({
      ...state,
      levelsList: {
        ...state.levelsList,
        loading: action.payload,
      },
    }),

    SET_LEVELS_LIST_DATA: (state, action) => {
      return {
        ...state,
        levelsList: {
          ...state.levelsList,
          hasData: true,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_LEVELS_LOADING,
  SET_LEVELS_LIST_LOADING,
  SET_LEVELS_LIST_DATA,
} = levelsSlice.actions;

export const LEVELS_LIST = (state: RootState) => state.levels;
