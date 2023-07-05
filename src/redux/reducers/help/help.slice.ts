import { createSlice } from "@reduxjs/toolkit";
import { initialStateTypes } from "helper/types/help/helpTypes";
import { RootState } from "redux/rootReducer";

const initialState:initialStateTypes = {
  helpList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  },
  particularHelpDetails: {
    data: null,
    loading: false,
  },
  response: {
    add: null,
    update: null,
    delete: null,
  },
  chatResponse: {
    update: null,
  },
};

export const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    SET_HELP_LIST_LIST_LOADING: (state, action) => ({
      ...state,
      helpList: {
        ...state.helpList,
        loading: action.payload,
      },
    }),

    SET_HELP_LIST_LIST_DATA: (state, action) => {
      return {
        ...state,
        helpList: {
          ...state.helpList,
          data: action.payload,
        },
      };
    },

    ADD_HELP: (state, action) => {
      return {
        ...state,
        response: {
          ...state.response,
          add: action.payload,
        },
      };
    },

    SET_PARTICULAR_HELP_DATA: (state, action) => {
      return {
        ...state,
        particularHelpDetails: {
          data: action.payload,
          loading: false,
        },
      };
    },

    SET_PARTICULAR_HELP_LOADING: (state, action) => {
      return {
        ...state,
        particularHelpDetails: {
          ...state.particularHelpDetails,
          loading: action.payload,
        },
      };
    },

    SET_CHAT_RESPONSE: (state, action) => {
      return {
        ...state,
        chatResponse: {
          update: action.payload,
        },
      };
    },
  },
});

export const {
  SET_HELP_LIST_LIST_LOADING,
  SET_HELP_LIST_LIST_DATA,
  ADD_HELP,
  SET_PARTICULAR_HELP_DATA,
  SET_PARTICULAR_HELP_LOADING,
  SET_CHAT_RESPONSE
} = helpSlice.actions;

export const HELP_LIST = (state: RootState) => state.help;

export const HELP_RESPONSE = (state: RootState) => state.help.response;

export const PARTICULAR_HELP = (state: RootState) =>
  state.help.particularHelpDetails;

export const CHAT_RESPONSE = (state: RootState) =>
  state.help.chatResponse;
