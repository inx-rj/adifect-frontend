import {
  MEMBER_ADMIN_INVITE_LIST_REQUEST,
  MEMBER_ADMIN_INVITE_LIST_FAILURE,
  MEMBER_ADMIN_INVITE_LIST_SUCCESS,
  MEMBER_ADMIN_INVITE_LIST_DELETE_FAILURE,
  MEMBER_ADMIN_INVITE_LIST_DELETE_REQUEST,
  MEMBER_ADMIN_INVITE_LIST_DELETE_SUCCESS,
  MEMBER_ADMIN_INVITE_POST_FAILURE,
  MEMBER_ADMIN_INVITE_POST_REQUEST,
  MEMBER_ADMIN_INVITE_POST_RESET,
  MEMBER_ADMIN_INVITE_POST_SUCCESS,
  MEMBER_ADMIN_INVITE_UPDATE_FAILURE,
  MEMBER_ADMIN_INVITE_UPDATE_REQUEST,
  MEMBER_ADMIN_INVITE_UPDATE_SUCCESS,
} from "../../constants/Member-Admin-Invite-list-Constants";
export const memberAdminInviteListReducer = (
  state = { memberAdmInviteList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_INVITE_LIST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_INVITE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberAdmInviteList: action.payload,
      };

    case MEMBER_ADMIN_INVITE_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const memberAdminInviteListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_INVITE_LIST_DELETE_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_INVITE_LIST_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MEMBER_ADMIN_INVITE_LIST_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const memberAdminInviteListPostReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_INVITE_POST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_INVITE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberAdminPost: action.payload.message,
      };
    case MEMBER_ADMIN_INVITE_POST_FAILURE:
      return { loading: false, error: action.payload };
    case MEMBER_ADMIN_INVITE_POST_RESET:
      return {};
    default:
      return state;
  }
};
export const memberAdminInviteListUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_INVITE_UPDATE_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_INVITE_UPDATE_SUCCESS:
      return { loading: false, success: true };

    case MEMBER_ADMIN_INVITE_UPDATE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

