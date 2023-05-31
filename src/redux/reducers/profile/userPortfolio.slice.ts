import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";


const initialState = {
  portfolioList: {
    loading: false,
    data: [],
  },
};

export const userPortfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
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
  SET_PROFILE_PORTFOLIO_LOADING,
  SET_PROFILE_PORTFOLIO_DATA
} = userPortfolioSlice.actions;

export const GET_PROFILE_PORTFOLIO = (state: RootState) => state.profile.portfolio.portfolioList;