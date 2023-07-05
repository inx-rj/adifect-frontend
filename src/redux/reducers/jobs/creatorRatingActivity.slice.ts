import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../rootReducer";

const initialState = {
  loading: false,
  creatorRatingActivity: {
    loading: false,
    data: null,
    success: "",
  },
  creatorRatingActivityPost: {
    loading: false,
    data: null,
    success: "",
  },
};

export const creatorRatingActivitySlice = createSlice({
  name: "creatorRatingActivity",
  initialState,
  reducers: {
    SET_CREATOR_RATING_ACTIVITY_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_CREATOR_RATING_ACTIVITY_LIST_LOADING: (state, action) => ({
      ...state,
      creatorRatingActivity: {
        ...state.creatorRatingActivity,
        loading: action.payload,
      },
    }),

    SET_CREATOR_RATING_ACTIVITY_DATA: (state, action) => ({
      ...state,
      creatorRatingActivity: {
        ...state.creatorRatingActivity,
        data: action.payload,
      },
    }),

    SET_CREATOR_RATING_ACTIVITY_SUCCESS: (state, action) => ({
      ...state,
      creatorRatingActivity: {
        ...state.creatorRatingActivity,
        success: action.payload,
      },
    }),

    SET_CREATOR_RATING_ACTIVITY_POST_LOADING: (state, action) => ({
      ...state,
      creatorRatingActivityPost: {
        ...state.creatorRatingActivityPost,
        loading: action.payload,
      },
    }),

    SET_CREATOR_RATING_ACTIVITY_POST_DATA: (state, action) => ({
      ...state,
      creatorRatingActivityPost: {
        ...state.creatorRatingActivityPost,
        data: action.payload,
      },
    }),

    SET_CREATOR_RATING_ACTIVITY_POST_SUCCESS: (state, action) => ({
      ...state,
      creatorRatingActivityPost: {
        ...state.creatorRatingActivityPost,
        success: action.payload,
      },
    }),
    CLEAR_CREATOR_RATING_ACTIVITY: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_CREATOR_RATING_ACTIVITY_LOADING,
  SET_CREATOR_RATING_ACTIVITY_LIST_LOADING,
  SET_CREATOR_RATING_ACTIVITY_DATA,
  SET_CREATOR_RATING_ACTIVITY_SUCCESS,
  SET_CREATOR_RATING_ACTIVITY_POST_LOADING,
  SET_CREATOR_RATING_ACTIVITY_POST_DATA,
  SET_CREATOR_RATING_ACTIVITY_POST_SUCCESS,
  CLEAR_CREATOR_RATING_ACTIVITY,
} = creatorRatingActivitySlice.actions;

export const CREATOR_RATING_ACTIVITY_DATA = (state: RootState) =>
  state.homePage.creatorRatingActivity.creatorRatingActivity;

export const CREATOR_RATING_ACTIVITY_DATA_POST = (state: RootState) =>
  state.homePage.creatorRatingActivity.creatorRatingActivityPost;
