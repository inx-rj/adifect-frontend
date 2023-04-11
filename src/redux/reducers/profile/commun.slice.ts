import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";


const initialState = {
  communList: {
    loading: false,
    data: {
      
    },
  },
};

export const communicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    SET_PROFILE_COOMUN_LOADING: (state, action) => ({
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
  },
});

export const { SET_PROFILE_COOMUN_LOADING, SET_PROFILE_COMMUN_DATA } = communicationSlice.actions;

export const GET_PROFILE_COMMUN = (state: RootState) => state.profile.commun;