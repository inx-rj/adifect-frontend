import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../rootReducer';
import { UsersListInitialStateType } from 'helper/types/users/usersListType';

const initialState: UsersListInitialStateType = {
  loading: true,
  usersList: {
    count: 0,
    prev: null,
    next: null,
    results: []
  }
};

export const usersListSlice = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    SET_USERS_LIST_LOADING: (state, action) => ({
      ...state,
      loading: action.payload
    }),

    SET_USERS_LIST_DATA: (state, action) => ({
      ...state,
      usersList: action.payload
    })
  }
});

export const { SET_USERS_LIST_LOADING, SET_USERS_LIST_DATA } = usersListSlice.actions;

export const USER_LIST_DATA = (state: RootState) => state.users;
