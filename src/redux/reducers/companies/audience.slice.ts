import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { AudienceInitialType } from "helper/types/companies/audienceType";

const initialState: AudienceInitialType = {
  loading: false,
  audienceList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
  communityAudienceList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
  response: {
    add: null,
    update: null,
    delete: null,
  },
};

export const audienceSlice = createSlice({
  name: "audience",
  initialState,
  reducers: {
    SET_AUDIENCE_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_AUDIENCE_DATA_LOADING: (state, action) => ({
      ...state,
      audienceList: {
        ...state.audienceList,
        loading: action.payload,
      },
    }),

    SET_AUDIENCE_DATA: (state, action) => ({
      ...state,
      audienceList: {
        ...state.audienceList,
        data: action.payload,
      },
    }),

    SET_COMMUNITY_AUDIENCE_DATA_LOADING: (state, action) => ({
      ...state,
      communityAudienceList: {
        ...state.communityAudienceList,
        loading: action.payload,
      },
    }),

    SET_COMMUNITY_AUDIENCE_DATA: (state, action) => ({
      ...state,
      communityAudienceList: {
        ...state.communityAudienceList,
        data: action.payload,
      },
    }),

    SET_CREATE_AUDIENCE: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_AUDIENCE_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_AUDIENCE: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_AUDIENCE: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_AUDIENCE_LOADING,
  SET_AUDIENCE_DATA_LOADING,
  SET_AUDIENCE_DATA,
  SET_COMMUNITY_AUDIENCE_DATA_LOADING,
  SET_COMMUNITY_AUDIENCE_DATA,
  CLEAR_AUDIENCE,
  SET_AUDIENCE_EDIT_DATA,
  SET_CREATE_AUDIENCE,
  SET_DELETE_AUDIENCE,
} = audienceSlice.actions;

export const AUDIENCE_DATA = (state: RootState) =>
  state.companies.audience.audienceList;

export const AUDIENCE = (state: RootState) => state.companies.audience;

export const AUDIENCE_RESPONSE = (state: RootState) =>
  state.companies.audience.response;

export const COMMUNITY_AUDIENCE_DATA = (state: RootState) =>
  state.companies.audience.communityAudienceList;
