import {
  TEMPLATE_LIST_REQUEST,
  TEMPLATE_LIST_SUCCESS,
  TEMPLATE_LIST_FAIL,
  TEMPLATE_LIST_RESET,
  TEMPLATE_DETAILS_REQUEST,
  TEMPLATE_DETAILS_SUCCESS,
  TEMPLATE_DETAILS_FAIL,
  TEMPLATE_DETAILS_RESET,
  TEMPLATE_UPDATE_REQUEST,
  TEMPLATE_UPDATE_SUCCESS,
  TEMPLATE_UPDATE_FAIL,
  TEMPLATE_UPDATE_RESET,
  TEMPLATE_DELETE_REQUEST,
  TEMPLATE_DELETE_SUCCESS,
  TEMPLATE_DELETE_FAIL,
} from "../../constants/jobTemplate-constants";

export const templateListReducer = (state = { templateList: [] }, action) => {
  switch (action.type) {
    case TEMPLATE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEMPLATE_LIST_SUCCESS:
      return {
        loading: false,
        templateList: action.payload,
        success: true,
      };
    case TEMPLATE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEMPLATE_LIST_RESET:
      return { templateList: [] };

    default:
      return state;
  }
};

export const templateDetailsReducer = (
  state = { templateDetails: {} },
  action
) => {
  switch (action.type) {
    case TEMPLATE_DETAILS_REQUEST:
      return { ...state, loading: true };

    case TEMPLATE_DETAILS_SUCCESS:
      return { loading: false, templateDetails: action.payload, success: true };

    case TEMPLATE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case TEMPLATE_DETAILS_RESET:
      return { templateDetails: {} };

    default:
      return state;
  }
};

export const templateUpdateReducer = (state = { template: {} }, action) => {
  switch (action.type) {
    case TEMPLATE_UPDATE_REQUEST:
      return { loading: true };

    case TEMPLATE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case TEMPLATE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case TEMPLATE_UPDATE_RESET:
      return { template: {} };

    default:
      return state;
  }
};

export const templateDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TEMPLATE_DELETE_REQUEST:
      return { loading: true };

    case TEMPLATE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case TEMPLATE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
