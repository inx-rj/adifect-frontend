import {
  INDUSTRY_LIST_REQUEST,
  INDUSTRY_LIST_SUCCESS,
  INDUSTRY_LIST_FAIL,
  INDUSTRY_DETAILS_REQUEST,
  INDUSTRY_DETAILS_SUCCESS,
  INDUSTRY_DETAILS_FAIL,
  INDUSTRY_DETAILS_RESET,
  DELETE_INDUSTRY_REQUEST,
  DELETE_INDUSTRY_SUCCESS,
  DELETE_INDUSTRY_FAIL,
  AGENCYINDUSTRY_LIST_REQUEST,
  AGENCYINDUSTRY_LIST_SUCCESS,
  AGENCYINDUSTRY_LIST_FAIL,
  AGENCYINDUSTRY_DETAILS_REQUEST,
  AGENCYINDUSTRY_DETAILS_SUCCESS,
  AGENCYINDUSTRY_DETAILS_FAIL,
  AGENCYDELETE_INDUSTRY_REQUEST,
  AGENCYDELETE_INDUSTRY_SUCCESS,
  AGENCYDELETE_INDUSTRY_FAIL,
  AGENCYINDUSTRY_DETAILS_RESET,
  AGENCYINDUSTRY_ADD_REQUEST,
  AGENCYINDUSTRY_ADD_SUCCESS,
  AGENCYINDUSTRY_ADD_FAIL,
} from "../../constants/industry-constants";

// const initialState = {
//   industriesData: [],
//   loading: null,
// };

export const industryReducer = (state = { industriesData: [] }, action) => {
  switch (action.type) {
    case INDUSTRY_LIST_REQUEST:
      return {
        loading: true,
      };
    case INDUSTRY_LIST_SUCCESS:
      return {
        loading: false,
        industriesData: action.payload,
        success: true,
      };
    case INDUSTRY_LIST_FAIL:
      return {
        loading: false,
        industriesData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const industryDetailsReducer = (
  state = { industryDetails: {} },
  action
) => {
  switch (action.type) {
    case INDUSTRY_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case INDUSTRY_DETAILS_SUCCESS:
      return {
        loading: false,
        industryDetails: action.payload,
        success: true,
      };
    case INDUSTRY_DETAILS_FAIL:
      return {
        loading: false,
        industryDetails: null,
        error: action.payload,
      };
    case INDUSTRY_DETAILS_RESET:
      return { industryDetails: {} };
    default:
      return state;
  }
};

export const industryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INDUSTRY_REQUEST:
      return { loading: true };

    case DELETE_INDUSTRY_SUCCESS:
      return { loading: false, success: true };

    case DELETE_INDUSTRY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AgencyindustryReducer = (
  state = { industriesData: [] },
  action
) => {
  switch (action.type) {
    case AGENCYINDUSTRY_LIST_REQUEST:
      return {
        loading: true,
      };
    case AGENCYINDUSTRY_LIST_SUCCESS:
      return {
        loading: false,
        industriesData: action.payload,
        success: true,
      };
    case AGENCYINDUSTRY_LIST_FAIL:
      return {
        loading: false,
        industriesData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AgencyindustryDetailsReducer = (
  state = { industryDetails: {} },
  action
) => {
  switch (action.type) {
    case AGENCYINDUSTRY_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case AGENCYINDUSTRY_DETAILS_SUCCESS:
      return {
        loading: false,
        industryDetails: action.payload,
        success: true,
      };
    case AGENCYINDUSTRY_DETAILS_FAIL:
      return {
        loading: false,
        industryDetails: null,
        error: action.payload,
      };
    case AGENCYINDUSTRY_DETAILS_RESET:
      return { industryDetails: {} };
    default:
      return state;
  }
};

export const AgencyindustryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCYDELETE_INDUSTRY_REQUEST:
      return { loading: true };

    case AGENCYDELETE_INDUSTRY_SUCCESS:
      return { loading: false, success: true };

    case AGENCYDELETE_INDUSTRY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AgencyindustryAddReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCYINDUSTRY_ADD_REQUEST:
      return { loading: true };

    case AGENCYINDUSTRY_ADD_SUCCESS:
      return { loading: false, success: true, industryAddData: action.payload };

    case AGENCYINDUSTRY_ADD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
