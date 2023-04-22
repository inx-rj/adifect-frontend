import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { CompanyListInitialsType } from "helper/types/companyTab/comapniesType";

const initialState = {
  loading: false,
  skillsList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
    },
  },
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    SET_SKILLS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_SKILLS_LIST_LOADING: (state, action) => ({
      ...state,
      skillsList: {
        ...state.skillsList,
        loading: action.payload,
      },
    }),

    SET_SKILLS_LIST_DATA: (state, action) => {
      return {
        ...state,
        skillsList: {
          ...state.skillsList,
          hasData: true,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_SKILLS_LOADING,
  SET_SKILLS_LIST_LOADING,
  SET_SKILLS_LIST_DATA,
} = skillsSlice.actions;

export const SKILLS_LIST = (state: RootState) => state.skillsTab;
