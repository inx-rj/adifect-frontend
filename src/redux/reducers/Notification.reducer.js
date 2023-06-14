import {
  Notification_LIST_REQUEST,
  Notification_LIST_SUCCESS,
  Notification_LIST_FAIL,
  GET_AGENCY_NOTIFICATION_REQUEST,
  GET_AGENCY_NOTIFICATION_SUCCESS,
  GET_AGENCY_NOTIFICATION_FAIL,
  UPDATE_AGENCY_NOTIFICATION_REQUEST,
  UPDATE_AGENCY_NOTIFICATION_SUCCESS,
  UPDATE_AGENCY_NOTIFICATION_FAIL,
  DELETE_AGENCY_NOTIFICATION_REQUEST,
  DELETE_AGENCY_NOTIFICATION_SUCCESS,
  DELETE_AGENCY_NOTIFICATION_FAIL,
  DELETE_ALL_USER_NOTIFICATION_FAILURE,
  DELETE_ALL_USER_NOTIFICATION_REQUEST,
  DELETE_ALL_USER_NOTIFICATION_SUCCESS,
} from "../../constants/Notification-constant";

export const CountReducer = (state = {}, action) => {
  switch (action.type) {
    case Notification_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Notification_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        CountData: action.payload.count,
        Countlist: action.payload.data,
        success: true,
      };
    case Notification_LIST_FAIL:
      return {
        ...state,
        loading: false,
        CountData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listAllAgencycountReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_AGENCY_NOTIFICATION_REQUEST:
      return { loading: true };
    case GET_AGENCY_NOTIFICATION_SUCCESS:
      return { loading: false, success: true, agencyCountData: action.payload };
    case GET_AGENCY_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateAllAgencycountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_AGENCY_NOTIFICATION_REQUEST:
      return { loading: true };
    case UPDATE_AGENCY_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
        updateagencyCountData: action.payload,
      };
    case UPDATE_AGENCY_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_AGENCY_NOTIFICATION_REQUEST:
      return { loading: true };
    case DELETE_AGENCY_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
        DeleteData: action.payload,
        message: action.payload.message,
      };
    case DELETE_AGENCY_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AllDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_USER_NOTIFICATION_REQUEST:
      return { loading: true };
    case DELETE_ALL_USER_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true,
        DeleteData: action.payload,
        message: action.payload.message,
      };
    case DELETE_ALL_USER_NOTIFICATION_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
