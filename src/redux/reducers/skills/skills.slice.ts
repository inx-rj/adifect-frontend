import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/rootReducer";

const initialState = {
  loading: false,
  skillsList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
    },
  },
  allSkillsList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
    },
  },
  userSkillSetList: {
    loading: false,
    data: {
      count: 0,
      next: null,
      prev: null,
      results: []
    },
  }
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    SET_SKILLS_LOADING: (state, action) => {
      state.loading = action.payload;
    },

    SET_SKILLS_LIST_LOADING: (state, action) => ({
      ...state,
      skillsList: {
        ...state.skillsList,
        loading: action.payload,
      },
    }),

    SET_SKILLS_LIST_DATA: (state, action) => {
      return {
        ...state,
        skillsList: {
          ...state.skillsList,
          hasData: true,
          data: action.payload,
        },
      };
    },

    SET_ALL_SKILLS_LIST_LOADING: (state, action) => ({
      ...state,
      allSkillsList: {
        ...state.allSkillsList,
        loading: action.payload,
      },
    }),

    SET_ALL_SKILLS_LIST_DATA: (state, action) => {
      return {
        ...state,
        allSkillsList: {
          ...state.allSkillsList,
          hasData: true,
          data: action.payload,
        },
      };
    },

    SET_USER_SKILL_SET_LIST_LOADING: (state, action) => ({
      ...state,
      userSkillSetList: {
        ...state.userSkillSetList,
        loading: action.payload,
      },
    }),

    SET_USER_SKILL_SET_LIST_DATA: (state, action) => {
      return {
        ...state,
        userSkillSetList: {
          ...state.userSkillSetList,
          hasData: true,
          data: action.payload,
        },
      };
    },
  },
});

export const {
  SET_SKILLS_LOADING,
  SET_SKILLS_LIST_LOADING,
  SET_SKILLS_LIST_DATA,
  SET_ALL_SKILLS_LIST_LOADING,
  SET_ALL_SKILLS_LIST_DATA,
  SET_USER_SKILL_SET_LIST_LOADING,
  SET_USER_SKILL_SET_LIST_DATA
} = skillsSlice.actions;

export const SKILLS_LIST = (state: RootState) => state.skillsTab;

export const ALL_SKILLS_LIST = (state: RootState) => state.skillsTab.allSkillsList;

export const USER_SKILL_SET_LIST = (state: RootState) => state.skillsTab.userSkillSetList;
