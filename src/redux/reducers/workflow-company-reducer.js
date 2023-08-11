import {
  AGENCY_Company_LIST_REQUEST,
  AGENCY_Company_LIST_SUCCESS,
  AGENCY_Company_LIST_FAIL,
  AGENCY_Company_DETAILS_REQUEST,
  AGENCY_Company_DETAILS_SUCCESS,
  AGENCY_Company_DETAILS_FAIL,
  AGENCY_Company_DETAILS_RESET,
  AGENCY_DELETE_Company_REQUEST,
  AGENCY_DELETE_Company_SUCCESS,
  AGENCY_DELETE_Company_FAIL,
  AGENCY_DELETE_Company_RESET,
} from "../../constants/AgencyCompany-constant";

const initialState = {
  companyData: [],
  loading: null,
};

export const agencyCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGENCY_Company_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AGENCY_Company_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        companyData: action.payload,
        success: true,
      };
    case AGENCY_Company_LIST_FAIL:
      return {
        ...state,
        loading: false,
        companyData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const agencyCompanyDetailsReducer = (
  state = { companyDetails: {} },
  action
) => {
  switch (action.type) {
    case AGENCY_Company_DETAILS_REQUEST:
      return { loading: true };
    case AGENCY_Company_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        companyDetails: action.payload,
      };
    case AGENCY_Company_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_Company_DETAILS_RESET:
      return { companyDetails: {} };
    default:
      return state;
  }
};

export const agencyCompanyDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_DELETE_Company_REQUEST:
      return { loading: true };

    case AGENCY_DELETE_Company_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
        status: action.payload.status,
      };

    case AGENCY_DELETE_Company_FAIL:
      return { loading: false, error: action.payload };

    case AGENCY_DELETE_Company_RESET:
      return {};

    default:
      return state;
  }
};
