import { createSlice } from "@reduxjs/toolkit";
import {
  AuthInitialType,
  UserProfileDetailsType,
} from "../../../helper/types/auth/authType";
import { RootState } from "../../rootReducer";

export const userProfileDetails: UserProfileDetailsType = {
  id: null,
  email: "",
  first_name: "",
  last_name: "",
  profile_title: null,
  profile_description: null,
  role: null,
  video: null,
  profile_img: null,
  profile_status: "",
  preferred_communication_mode: "",
  preferred_communication_id: null,
  availability: null,
  Portfolio_user: [],
  user_level: null,
  sub_title: null,
  Language: null,
  website: null,
  portfolio: [],
};

// get userData from localStorage
const userDataFromStorage = () =>
  localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

const initialState: AuthInitialType = {
  loading: false,
  user: {
    loading: false,
    hasData: false,
    data: userDataFromStorage(),
    // data: {
    //   message: "",
    //   refresh: "",
    //   token: "",
    //   user: {
    //     user_id: 0,
    //     name: "",
    //     email: "",
    //     first_name: "",
    //     last_name: "",
    //     role: 0,
    //     user_level: 0,
    //   },
    // },
  },
  userProfile: {
    loading: false,
    hasData: userProfileDetails,
    data: userProfileDetails,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    // Store login user data
    SET_USER_DATA_LOADING: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        loading: action.payload,
      },
    }),
    SET_USER_DATA: (state, action) => ({
      ...state,
      user: {
        ...state.user,
        hasData: true,
        data: action.payload,
      },
    }),

    // Store user profile data
    SET_USER_PROFILE_LOADING: (state, action) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        loading: action.payload,
      },
    }),
    SET_USER_PROFILE_DATA: (state, action) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        hasData: action.payload,
        data: action.payload,
      },
    }),
    CLEAR_AUTH: () => ({
      ...initialState,
    }),
  },
});

export const {
  SET_AUTH_LOADING,
  SET_USER_DATA_LOADING,
  SET_USER_DATA,
  SET_USER_PROFILE_LOADING,
  SET_USER_PROFILE_DATA,
  CLEAR_AUTH,
} = authSlice.actions;

export const GET_USER_DATA = (state: RootState) => state.auth.user;
export const GET_USER_PROFILE_DATA = (state: RootState) =>
  state.auth.userProfile;
export const USER_DATA_LOADER = (state: RootState) => state.auth.user.loading;
