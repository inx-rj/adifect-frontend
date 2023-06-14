import {
  MEMBER_COMPANY_LIST_REQUEST,
  MEMBER_COMPANY_LIST_SUCCESS,
  MEMBER_COMPANY_LIST_FAIL,
  MEMBER_COMPANY_ADMIN_LIST_REQUEST,
  MEMBER_COMPANY_ADMIN_LIST_SUCCESS,
  MEMBER_COMPANY_ADMIN_LIST_FAIL,
  MEMBER_CREATOR_COMPANY_FILTER_REQUEST,
  MEMBER_CREATOR_COMPANY_FILTER_SUCCESS,
  MEMBER_CREATOR_COMPANY_FILTER_FAIL,
  MEMBER_DELETE_COMPANY_REQUEST,
  MEMBER_DELETE_COMPANY_SUCCESS,
  MEMBER_DELETE_COMPANY_FAIL,
  MEMBER_DELETE_ADMIN_COMPANY_REQUEST,
  MEMBER_DELETE_ADMIN_COMPANY_SUCCESS,
  MEMBER_DELETE_ADMIN_COMPANY_FAIL,
  MEMBER_COMPANY_DETAILS_REQUEST,
  MEMBER_COMPANY_DETAILS_SUCCESS,
  MEMBER_COMPANY_DETAILS_FAIL,
  MEMBER_UPDATE_COMPANY_REQUEST,
  MEMBER_UPDATE_COMPANY_SUCCESS,
  MEMBER_UPDATE_COMPANY_FAIL,
  MEMBER_UPDATE_COMPANY_RESET,
  MEMBER_NEW_COMPANY_LIST_REQUEST,
  MEMBER_NEW_COMPANY_LIST_SUCCESS,
  MEMBER_NEW_COMPANY_LIST_FAIL,
  ADD_COMPANY_MEMBER_REQUEST,
  ADD_COMPANY_MEMBER_SUCCESS,
  ADD_COMPANY_MEMBER_FAIL,
  MEMBER_EDIT_COMPANY_REQUEST,
  MEMBER_EDIT_COMPANY_SUCCESS,
  MEMBER_EDIT_COMPANY_FAIL,
} from "../../constants/Member-CompanyConstants";

export const companyMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_COMPANY_LIST_REQUEST:
      return { loading: true };
    case MEMBER_COMPANY_LIST_SUCCESS:
      return { loading: false, success: true, companiesData: action.payload };
    case MEMBER_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyAdminMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_COMPANY_ADMIN_LIST_REQUEST:
      return { loading: true };
    case MEMBER_COMPANY_ADMIN_LIST_SUCCESS:
      return { loading: false, success: true, companiesData: action.payload };
    case MEMBER_COMPANY_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companydecpMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_NEW_COMPANY_LIST_REQUEST:
      return { loading: true };
    case MEMBER_NEW_COMPANY_LIST_SUCCESS:
      return { loading: false, success: true, companiesDec: action.payload };
    case MEMBER_NEW_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyDetailsMemberReducer = (
  state = { companyDetails: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_COMPANY_DETAILS_REQUEST:
      return { loading: true };
    case MEMBER_COMPANY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        companyDetails: action.payload,
      };
    case MEMBER_COMPANY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MEMBER_COMPANY_DETAILS_REQUEST:
      return { companyDetails: {} };
    default:
      return state;
  }
};

export const companyDeleteMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DELETE_COMPANY_REQUEST:
      return { loading: true };
    case MEMBER_DELETE_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_DELETE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyAdminDeleteMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DELETE_ADMIN_COMPANY_REQUEST:
      return { loading: true };
    case MEMBER_DELETE_ADMIN_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_DELETE_ADMIN_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const companyUpdateMemberReducer = (
  state = { companyData: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_UPDATE_COMPANY_REQUEST:
      return { loading: true };
    case MEMBER_UPDATE_COMPANY_SUCCESS:
      return { loading: false, success: true };
    case MEMBER_UPDATE_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    case MEMBER_UPDATE_COMPANY_RESET:
      return { companyData: {} };
    default:
      return state;
  }
};

export const creatorCompanyFilterMemberReducer = (
  state = { creatorCompaniesFilterData: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_CREATOR_COMPANY_FILTER_REQUEST:
      return { loading: true };
    case MEMBER_CREATOR_COMPANY_FILTER_SUCCESS:
      return {
        loading: false,
        success: true,
        creatorCompaniesFilterData: action.payload.data,
      };
    case MEMBER_CREATOR_COMPANY_FILTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AddMemberCompanyReducer = (
  state = { AddMemberCompanyData: [] },
  action
) => {
  switch (action.type) {
    case ADD_COMPANY_MEMBER_REQUEST:
      return { loading: true };
    case ADD_COMPANY_MEMBER_SUCCESS:
      return {
        loading: false,
        success: true,
        AddMemberCompanyData: action.payload.data,
      };
    case ADD_COMPANY_MEMBER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const EditMemberCompanyReducer = (
  state = { AddMemberCompanyData: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_EDIT_COMPANY_REQUEST:
      return { loading: true };
    case MEMBER_EDIT_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        AddMemberCompanyData: action.payload.data,
      };
    case MEMBER_EDIT_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
