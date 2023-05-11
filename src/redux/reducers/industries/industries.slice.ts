import { createSlice } from '@reduxjs/toolkit';
import { IndustriesInitialsType } from 'helper/types/industries/industriesType';
import { RootState } from 'redux/rootReducer';

const initialState: IndustriesInitialsType = {
  loading: false,
  industriesList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
};

export const industriesSlice = createSlice({
  name: "industries",
  initialState,
  reducers: {
    SET_INDUSTRY_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_INDUSTRY_LIST_LOADING: (state, action) => ({
      ...state,
      industriesList: {
        ...state.industriesList,
        loading: action.payload,
      },
    }),

    SET_INDUSTRY_LIST_DATA: (state, action) => {
      return {
        ...state,
        industriesList: {
          ...state.industriesList,
          hasData: true,
          data: action.payload,
        },
      }
    }
  },
});

export const {
  SET_INDUSTRY_LOADING, SET_INDUSTRY_LIST_LOADING, SET_INDUSTRY_LIST_DATA } = industriesSlice.actions;

export const INDUSTRY_LIST = (state: RootState) => state.industries;
