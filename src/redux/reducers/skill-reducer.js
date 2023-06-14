import {
  SKILL_LIST_REQUEST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAIL,
  SKILL_DETAILS_REQUEST,
  SKILL_DETAILS_SUCCESS,
  SKILL_DETAILS_FAIL,
  SKILL_DETAILS_RESET,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
} from "../../constants/skill-constants";

const initialState = {
  skillsData: [],
  loading: null,
};

export const skillReducer = (state = initialState, action) => {
  switch (action.type) {
    case SKILL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SKILL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        skillsData: action.payload,
        success: true,
      };
    case SKILL_LIST_FAIL:
      return {
        ...state,
        loading: false,
        skillsData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const skillDetailsReducer = (state = { skillDetails: {} }, action) => {
  switch (action.type) {
    case SKILL_DETAILS_REQUEST:
      return { loading: true };
    case SKILL_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        skillDetails: action.payload,
      };
    case SKILL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SKILL_DETAILS_RESET:
      return { skillDetails: {} };
    default:
      return state;
  }
};

export const skillDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SKILL_REQUEST:
      return { loading: true };

    case DELETE_SKILL_SUCCESS:
      return { loading: false, success: true };

    case DELETE_SKILL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
