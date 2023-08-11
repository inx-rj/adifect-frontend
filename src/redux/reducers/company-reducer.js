import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  CREATOR_COMPANY_FILTER_REQUEST,
  CREATOR_COMPANY_FILTER_SUCCESS,
  CREATOR_COMPANY_FILTER_FAIL,
  COMPANY_ADMIN_LIST_REQUEST,
  COMPANY_ADMIN_LIST_SUCCESS,
  COMPANY_ADMIN_LIST_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  COMPANY_DETAILS_RESET,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  DELETE_ADMIN_COMPANY_REQUEST,
  DELETE_ADMIN_COMPANY_SUCCESS,
  DELETE_ADMIN_COMPANY_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  UPDATE_COMPANY_RESET,

  NEW_COMPANY_LIST_REQUEST,
  NEW_COMPANY_LIST_SUCCESS,
  NEW_COMPANY_LIST_FAIL,
} from "../../constants/company-constants";

export const companyReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_LIST_REQUEST:
      return { loading: true };
    case COMPANY_LIST_SUCCESS:
      return { loading: false, success: true, companiesData: action.payload };
    case COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_ADMIN_LIST_REQUEST:
      return { loading: true };
    case COMPANY_ADMIN_LIST_SUCCESS:
      return { loading: false, success: true, companiesData: action.payload };
    case COMPANY_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const companydecpReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_COMPANY_LIST_REQUEST:
      return { loading: true };
    case NEW_COMPANY_LIST_SUCCESS:
      return { loading: false, success: true, companiesDec: action.payload };
    case NEW_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};





export const companyDetailsReducer = (
  state = { companyDetails: {} },
  action
) => {
  switch (action.type) {
    case COMPANY_DETAILS_REQUEST:
      return { loading: true };
    case COMPANY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        companyDetails: action.payload,
      };
    case COMPANY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case COMPANY_DETAILS_RESET:
      return { companyDetails: {} };
    default:
      return state;
  }
};

export const companyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMPANY_REQUEST:
      return { loading: true };
    case DELETE_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyAdminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMIN_COMPANY_REQUEST:
      return { loading: true };
    case DELETE_ADMIN_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ADMIN_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyUpdateReducer = (state = { companyData: {} }, action) => {
  switch (action.type) {
    case UPDATE_COMPANY_REQUEST:
      return { loading: true };
    case UPDATE_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_COMPANY_RESET:
      return { companyData: {} };
    default:
      return state;
  }
};

export const creatorCompanyFilterReducer = (
  state = { creatorCompaniesFilterData: [] },
  action
) => {
  switch (action.type) {
    case CREATOR_COMPANY_FILTER_REQUEST:
      return { loading: true };
    case CREATOR_COMPANY_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        creatorCompaniesFilterData: action.payload.data,
      };
    case CREATOR_COMPANY_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
