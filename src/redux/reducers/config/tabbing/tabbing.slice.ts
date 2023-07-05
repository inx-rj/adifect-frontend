import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../rootReducer";
import {
  companyProfileTabTitle,
  JobDetailsTabTitle,
  profileTabTitle,
  TabbingInitialType,
} from "helper/config/tabbing";

const initialState: TabbingInitialType = {
  tabbing: {
    user_profile: {
      active: profileTabTitle.ABOUT,
    },
    company_profile: {
      active: companyProfileTabTitle.COMPANY_INFO,
    },
    job_details: {
      active: JobDetailsTabTitle.JOB_DETAILS,
    },
  },
};

export const configTabSlice = createSlice({
  name: "tabbing",
  initialState,
  reducers: {
    SET_TAB_NAVIGATION_CONFIG: (state, action) => {
      switch (action.payload.type) {
        case "user": {
          return Object.assign({}, state, {
            ...state,
            tabbing: {
              ...state.tabbing,
              user_profile: {
                ...state.tabbing.user_profile,
                active: action.payload.active,
              },
            },
          });
        }
        case "company": {
          return Object.assign({}, state, {
            ...state,
            tabbing: {
              ...state.tabbing,
              company_profile: {
                ...state.tabbing.company_profile,
                active: action.payload.active,
              },
            },
          });
        }
        case "jobs": {
          return Object.assign({}, state, {
            ...state,
            tabbing: {
              ...state.tabbing,
              job_details: {
                ...state.tabbing.job_details,
                active: action.payload.active,
              },
            },
          });
        }
        default:
          return state;
      }
    },
    //Reset the layout navigation
    RESET_TAB_NAVIGATION_CONFIG: (state) => ({
      ...state,
      tabbing: initialState.tabbing,
    }),
  },
});

export const { SET_TAB_NAVIGATION_CONFIG, RESET_TAB_NAVIGATION_CONFIG } =
  configTabSlice.actions;

export const TAB_NAVIGATION_CONFIG = (state: RootState) =>
  state.config.tab.tabbing;
