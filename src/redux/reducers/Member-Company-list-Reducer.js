import {
  MEMBER_ADMIN_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_GET_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_GET_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_GET_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_COMPANY_DETAILS_FAILURE,
  MEMBER_ADMIN_COMPANY_DETAILS_REQUEST,
  MEMBER_ADMIN_COMPANY_DETAILS_RESET,
  MEMBER_ADMIN_COMPANY_DETAILS_SUCCESS,
  MEMBER_ADMIN_ADD_COMPANY_FAIL,
  MEMBER_ADMIN_ADD_COMPANY_REQUEST,
  MEMBER_ADMIN_ADD_COMPANY_SUCCESS,
} from "../../constants/Member-Company-list-constants";

export const memberAdminCompanyListReducer = (
  state = { memberCompanyAdmin: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_COMPANY_LIST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberCompanyAdmin: action.payload,
        agecyIdCompany: action.payload[0].agency,
        agecyNameCompany: action.payload[0].company__name,
      };

    case MEMBER_ADMIN_COMPANY_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const memberAdminGetCompanyListReducer = (
  state = { memberAdminCompanyData: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_GET_COMPANY_LIST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_GET_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberAdminCompanyData: action.payload,
      };

    case MEMBER_ADMIN_GET_COMPANY_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const memberAdminGetDetailsCompanyListReducer = (
  state = { AdminCompanyDetails: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_COMPANY_DETAILS_REQUEST:
      return { loading: true };
    case MEMBER_ADMIN_COMPANY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        AdminCompanyDetails: action.payload,
      };
    case MEMBER_ADMIN_COMPANY_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    case MEMBER_ADMIN_COMPANY_DETAILS_RESET:
      return { AdminCompanyDetails: {} };
    default:
      return state;
  }
};

export const memberAdminEditCompanyListReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_EDIT_COMPANY_LIST_REQUEST:
      return { loading: true };
    case MEMBER_ADMIN_EDIT_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        editCopmanyData: action.payload,
      };
    case MEMBER_ADMIN_EDIT_COMPANY_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const memberAdminAddCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_ADD_COMPANY_REQUEST:
      return { loading: true };
    case MEMBER_ADMIN_ADD_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        addCopmanyData: action.payload,
      };
    case MEMBER_ADMIN_ADD_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
