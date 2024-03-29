import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";
import { CommunitySettingsInitialType } from "helper/types/companies/communitySettingsType";

const initialState: CommunitySettingsInitialType = {
  loading: false,
  communitySettingsList: {
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

export const communitySettingsSlice = createSlice({
  name: "communitySettings",
  initialState,
  reducers: {
    SET_COMMUNITY_SETTINGS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_COMMUNITY_SETTINGS_DATA_LOADING: (state, action) => ({
      ...state,
      communitySettingsList: {
        ...state.communitySettingsList,
        loading: action.payload,
      },
    }),

    SET_COMMUNITY_SETTINGS_DATA: (state, action) => ({
      ...state,
      communitySettingsList: {
        ...state.communitySettingsList,
        data: action.payload,
      },
    }),

    SET_CREATE_COMMUNITY_SETTINGS: (state, action) => ({
      ...state,
      response: { ...state.response, add: action.payload },
    }),

    SET_COMMUNITY_SETTINGS_EDIT_DATA: (state, action) => ({
      ...state,
      response: { ...state.response, update: action.payload },
    }),

    SET_DELETE_COMMUNITY_SETTINGS: (state, action) => ({
      ...state,
      response: { ...state.response, delete: action.payload },
    }),

    CLEAR_COMMUNITY_SETTINGS: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_COMMUNITY_SETTINGS_LOADING,
  SET_COMMUNITY_SETTINGS_DATA_LOADING,
  SET_COMMUNITY_SETTINGS_DATA,
  CLEAR_COMMUNITY_SETTINGS,
  SET_CREATE_COMMUNITY_SETTINGS,
  SET_COMMUNITY_SETTINGS_EDIT_DATA,
  SET_DELETE_COMMUNITY_SETTINGS,
} = communitySettingsSlice.actions;

export const COMMUNITY_SETTINGS_DATA = (state: RootState) =>
  state.companies.communitySettings.communitySettingsList;

export const COMMUNITY_SETTINGS = (state: RootState) =>
  state.companies.communitySettings;

export const COMMUNITY_SETTINGS_RESPONSE = (state: RootState) =>
  state.companies.communitySettings.response;
