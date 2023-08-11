import {
  USER_ADMIN_LIST_REQUEST,
  USER_ADMIN_LIST_SUCCESS,
  USER_ADMIN_LIST_FAIL,
  USER_ADMIN_LIST_RESET,
  USERADMIN_DETAILS_REQUEST,
  USERADMIN_DETAILS_SUCCESS,
  USERADMIN_DETAILS_FAIL,
  USERADMIN_DETAILS_RESET,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
} from "../../constants/user-constants";

export const usersAdminReducer = (state = { useradminData: [] }, action) => {
  switch (action.type) {
    case USER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case USER_ADMIN_LIST_SUCCESS:
      return { loading: false, success: true, useradminData: action.payload };
    case USER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_LIST_RESET:
      return { useradminData: [] };
    default:
      return state;
  }
};

export const UserAdminDetailsReducer = (
  state = { useradminDetails: {} },
  action
) => {
  switch (action.type) {
    case USERADMIN_DETAILS_REQUEST:
      return { loading: true };
    case USERADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        useradminDetails: action.payload,
      };
    case USERADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USERADMIN_DETAILS_RESET:
      return { useradminDetails: {} };
    default:
      return state;
  }
};

export const adminUpdateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        adminUpdateUser: action.payload,
      };
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_USER_RESET:
      return {};
    default:
      return state;
  }
};
