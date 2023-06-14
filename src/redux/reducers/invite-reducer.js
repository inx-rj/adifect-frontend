import {
  INVITE_LIST_REQUEST,
  INVITE_LIST_SUCCESS,
  INVITE_LIST_FAIL,
  INVITE_ACCEPT_REJECT_REQUEST,
  INVITE_ACCEPT_REJECT_SUCCESS,
  INVITE_ACCEPT_REJECT_FAIL,
  INVITE_DELETE_REQUEST,
  INVITE_DELETE_SUCCESS,
  INVITE_DELETE_FAIL,
  INVITE_UPDATE_REQUEST,
  INVITE_UPDATE_SUCCESS,
  INVITE_UPDATE_FAIL,
  INVITE_DETAILS_REQUEST,
  INVITE_DETAILS_SUCCESS,
  INVITE_DETAILS_FAIL,
  INVITE_DETAILS_RESET,
  COMPANY_INVITE_PROFILE_POST_REQUEST,
  COMPANY_INVITE_PROFILE_POST_SUCCESS,
  COMPANY_INVITE_PROFILE_POST_FAILURE,
  COMPANY_INVITE_PROFILE_POST_RESET,
  INVITED_ADMIN_MEMBERS_LIST_REQUEST,
  INVITED_ADMIN_MEMBERS_LIST_SUCCESS,
  INVITED_ADMIN_MEMBERS_LIST_FAIL,
  INVITED_ADMIN_MEMBERS_LIST_RESET,
} from "../../constants/invite-constants";

const initialState = {
  inviteData: [],
  loading: null,
};

export const CompanyInviteProflePostReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPANY_INVITE_PROFILE_POST_REQUEST:
      return { loading: true };

    case COMPANY_INVITE_PROFILE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        inviteMsg: action.payload.message,
      };

    case COMPANY_INVITE_PROFILE_POST_FAILURE:
      return { loading: false, error: action.payload };

    case COMPANY_INVITE_PROFILE_POST_RESET:
      return {};

    default:
      return state;
  }
};

export const AllInviteReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVITE_LIST_REQUEST:
      return {
        loading: true,
      };
    case INVITE_LIST_SUCCESS:
      return {
        loading: false,
        inviteData: action.payload,
        success: true,
      };
    case INVITE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const InviteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_DELETE_REQUEST:
      return { loading: true };

    case INVITE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case INVITE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const InviteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_UPDATE_REQUEST:
      return { loading: true };

    case INVITE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case INVITE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const inviteDetailsReducer = (state = { inviteDetails: {} }, action) => {
  switch (action.type) {
    case INVITE_DETAILS_REQUEST:
      return { loading: true };
    case INVITE_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        inviteDetails: action.payload,
      };
    case INVITE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case INVITE_DETAILS_RESET:
      return { inviteDetails: {} };
    default:
      return state;
  }
};

export const inviteAcceptRejectReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_ACCEPT_REJECT_REQUEST:
      return { ...state, loading: true };
    case INVITE_ACCEPT_REJECT_SUCCESS:
      return {
        loading: false,
        success: true,
        inviteMessage: action.payload.message,
      };
    case INVITE_ACCEPT_REJECT_FAIL:
      return { loading: false, error: action.payload };
    // case INVITE_ACCEPT_RESET:
    //   return { inviteAccept: {} };
    default:
      return state;
  }
};

export const invitedAdminMembersListReducer = (
  state = { listInvitedAdminMembers: [] },
  action
) => {
  switch (action.type) {
    case INVITED_ADMIN_MEMBERS_LIST_REQUEST:
      return { loading: true };
    case INVITED_ADMIN_MEMBERS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        listInvitedAdminMembers: action.payload,
      };
    case INVITED_ADMIN_MEMBERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case INVITED_ADMIN_MEMBERS_LIST_RESET:
      return { listInvitedAdminMembers: [] };
    default:
      return state;
  }
};
