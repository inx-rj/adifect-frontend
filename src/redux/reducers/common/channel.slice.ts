import { createSlice } from "@reduxjs/toolkit";
import { ChannelInitialType } from "helper/types/common/commonType";
import { RootState } from "redux/rootReducer";

const initialState: ChannelInitialType = {
  channelList: {
    loading: false,
    data: {
      count: 0,
      prev: null,
      next: null,
      results: [],
    },
  }
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    SET_CHANNEL_LOADING: (state, action) => ({
      ...state,
      channelList: {
        ...state.channelList,
        loading: action.payload,
      },
    }),

    SET_CHANNEL_DATA: (state, action) => ({
      ...state,
      channelList: {
        ...state.channelList,
        data: action.payload,
      },
    }),
  },
});

export const { SET_CHANNEL_LOADING, SET_CHANNEL_DATA } = channelSlice.actions;

export const GET_CHANNEL_DATA = (state: RootState) => state.common.channel.channelList;