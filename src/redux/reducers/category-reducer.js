import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_DETAILS_RESET,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "../../constants/category-constants";

const initialState = {
  categoryData: [],
  loading: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categoryData: action.payload,
        success: true,
      };
    case CATEGORY_LIST_FAIL:
      return {
        ...state,
        loading: false,
        categoryData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { categoryDetails: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        categoryDetails: action.payload,
      };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_DETAILS_RESET:
      return { categoryDetails: {} };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true };

    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true };

    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
