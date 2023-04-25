import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";
import { WorkFlowInitialsType } from "helper/types/workFlow/workFlowTypes";

const initialState = {
  loading: false,
  inHouseUserList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: [],
    },
  },
};

export const inHouseUserSlice = createSlice({
  name: "inHouseUser",
  initialState,
  reducers: {
    SET_IN_HOUSE_USER_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_IN_HOUSE_USER_LIST_LOADING: (state, action) => ({
      ...state,
      inHouseUserList: {
        ...state.inHouseUserList,
        loading: action.payload,
      },
    }),

    SET_IN_HOUSE_USER_LIST_DATA: (state, action) => {
      return {
        ...state,
        inHouseUserList: {
          ...state.inHouseUserList,
          hasData: true,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_IN_HOUSE_USER_LOADING,
  SET_IN_HOUSE_USER_LIST_LOADING,
  SET_IN_HOUSE_USER_LIST_DATA,
} = inHouseUserSlice.actions;

export const IN_HOUSE_USER_LIST = (state: RootState) => state.inHouseUser;
