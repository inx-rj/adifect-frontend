import {
  LEVEL_LIST_REQUEST,
  LEVEL_LIST_SUCCESS,
  LEVEL_LIST_FAIL,
  LEVEL_DETAILS_REQUEST,
  LEVEL_DETAILS_SUCCESS,
  LEVEL_DETAILS_FAIL,
  LEVEL_DETAILS_RESET,
  DELETE_LEVEL_REQUEST,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAIL,
} from "../../constants/level-constants";

const initialState = {
  levelsData: [],
  loading: null,
};

export const levelReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEVEL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LEVEL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        levelsData: action.payload,
        success: true,
      };
    case LEVEL_LIST_FAIL:
      return {
        ...state,
        loading: false,
        levelsData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const levelDetailsReducer = (state = { levelDetails: {} }, action) => {
  switch (action.type) {
    case LEVEL_DETAILS_REQUEST:
      return { loading: true };
    case LEVEL_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        levelDetails: action.payload,
      };
    case LEVEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case LEVEL_DETAILS_RESET:
      return { levelDetails: {} };
    default:
      return state;
  }
};

export const levelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_LEVEL_REQUEST:
      return { loading: true };

    case DELETE_LEVEL_SUCCESS:
      return { loading: false, success: true };

    case DELETE_LEVEL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
