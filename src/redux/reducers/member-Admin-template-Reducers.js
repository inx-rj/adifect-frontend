import {
  MEMBER_ADMIN_GET_JOB_TEMPLATE_FAILURE,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_REQUEST,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_SUCCESS,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_RESET,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_FAILURE,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_REQUEST,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_SUCCESS,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_REQUEST,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_SUCCESS,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_FAIL,
} from "../../constants/member-Admin-template-constamts";

//TEMPLATE ABHISHEK

export const MemberAdminTemplateUpdateReducer = (
  state = { memberTemplateListUpdate: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_SUCCESS:
      return {
        loading: false,
        memberTemplateListUpdate: action.payload,
        success: true,
      };
    case MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
  
    default:
      return state;
  }
};

//TEMPLATE ABHISHEK

export const MemberAdminTemplateReducers = (
  state = { memberTemplateList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_SUCCESS:
      return {
        loading: false,
        memberTemplateList: action.payload,
        success: true,
      };
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_RESET:
      return { memberTemplateList: [] };

    default:
      return state;
  }
};

export const MemberAdminTemplateDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
