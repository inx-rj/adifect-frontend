import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";

export interface CommunDataType {
  communication_mode : number;
  created?: string;
  id?: number | string;
  is_preferred: boolean;
  is_trashed? : boolean;
  mode_value : string;
  modified? : string;
  user : number;
  editField?: boolean;
}

export interface CommunInitialStateType {
  communList: {
    loading: boolean;
    data: CommunDataType[];
  },
}

export const communDefaultData = {
  communication_mode : null,
  is_preferred : false,
  mode_value : "",
  user : 0,
  editField: false
}
const initialState = {
  communList: {
    loading: false,
    data: [],
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
  },
});

export const { 
  SET_PROFILE_COMMUN_LOADING, 
  SET_PROFILE_COMMUN_DATA,
} = communicationSlice.actions;

export const GET_PROFILE_COMMUN = (state: RootState) => state.profile.commun.communList;