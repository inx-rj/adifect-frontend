import { combineReducers } from '@reduxjs/toolkit';
import { communicationSlice } from 'redux/reducers/profile/commun.slice';
import { userPortfolioSlice } from 'redux/reducers/profile/userPortfolio.slice';

export const profileReducer = combineReducers({
  commun: communicationSlice.reducer,
  portfolio: userPortfolioSlice.reducer,
});
