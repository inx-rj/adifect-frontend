import {
  SKILL_SET_POST_REQUEST,
  SKILL_SET_POST_SUCCESS,
  SKILL_SET_POST_FAIL,
  SKILL_SET_EDIT_REQUEST,
  SKILL_SET_EDIT_SUCCESS,
  SKILL_SET_EDIT_FAIL,
  SKILL_SET_DETAILS_REQUEST,
  SKILL_SET_DETAILS_SUCCESS,
  SKILL_SET_DETAILS_FAIL,
  SKILL_SET_DETAILS_RESET,
  USER_SKILLSET_DETAILS_REQUEST,
  USER_SKILLSET_DETAILS_SUCCESS,
  USER_SKILLSET_DETAILS_FAIL,
  USER_SKILLSET_DETAILS_RESET,
  DELETE_SET_SKILL_REQUEST,
  DELETE_SET_SKILL_SUCCESS,
  DELETE_SET_SKILL_FAIL,
} from "../../constants/skillset-constants";

export const skillsetAddReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILL_SET_POST_REQUEST:
      return { loading: true };
    case SKILL_SET_POST_SUCCESS:
      return { loading: false, success: true, skillsetAdd: action.payload };
    case SKILL_SET_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const skillsetDetailsReducer = (
  state = { skillsetDetails: [] },
  action
) => {
  switch (action.type) {
    case SKILL_SET_DETAILS_REQUEST:
      return { loading: true };
    case SKILL_SET_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        skillsetDetails: action.payload,
      };
    case SKILL_SET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_SET_DETAILS_RESET:
      return { skillsetDetails: [] };
    default:
      return state;
  }
};

export const userskillsetDetailsReducer = (
  state = { userskillsetDetails: [] },
  action
) => {
  switch (action.type) {
    case USER_SKILLSET_DETAILS_REQUEST:
      return { loading: true };
    case USER_SKILLSET_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        userskillsetDetails: action.payload,
      };
    case USER_SKILLSET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_SKILLSET_DETAILS_RESET:
      return { userskillsetDetails: [] };
    default:
      return state;
  }
};

export const skillsetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SET_SKILL_REQUEST:
      return { loading: true };
    case DELETE_SET_SKILL_SUCCESS:
      return { loading: false, success: true };
    case DELETE_SET_SKILL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const skillsetEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SKILL_SET_EDIT_REQUEST:
      return { loading: true };
    case SKILL_SET_EDIT_SUCCESS:
      return { loading: false, success: true };
    case SKILL_SET_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
