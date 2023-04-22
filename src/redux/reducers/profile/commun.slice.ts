import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";


const initialState = {
  communList: {
    loading: false,
    data: {
      
    },
  },
  portfolioList: {
    loading: false,
    data: {
      count: 0,
      next: "",
      previous: "",
      results: []
    },
  },
};

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    SET_PROFILE_COMMUN_LOADING: (state, action) => ({
      ...state,
      communList: {
        ...state.communList,
        loading: action.payload,
      },
    }),
    SET_PROFILE_COMMUN_DATA: (state, action) => ({
      ...state,
      communList: {
        ...state.communList,
        data: action.payload,
      },
    }),
    SET_PROFILE_PORTFOLIO_LOADING: (state, action) => ({
      ...state,
      portfolioList: {
        ...state.portfolioList,
        loading: action.payload,
      },
    }),
    SET_PROFILE_PORTFOLIO_DATA: (state, action) => ({
      ...state,
      portfolioList: {
        ...state.portfolioList,
        data: action.payload,
      },
    }),
  },
});

export const { 
  SET_PROFILE_COMMUN_LOADING, 
  SET_PROFILE_COMMUN_DATA,
  SET_PROFILE_PORTFOLIO_LOADING,
  SET_PROFILE_PORTFOLIO_DATA
} = communicationSlice.actions;

export const GET_PROFILE_COMMUN = (state: RootState) => state.profile.commun.communList;
export const GET_PROFILE_PORTFOLIO = (state: RootState) => state.profile.commun.portfolioList;