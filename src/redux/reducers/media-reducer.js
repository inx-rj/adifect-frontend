import {
  MEDIA_CREATE_REQUEST,
  MEDIA_CREATE_SUCCESS,
  MEDIA_CREATE_FAIL,
  MEDIA_LIST_REQUEST,
  MEDIA_LIST_SUCCESS,
  MEDIA_LIST_FAIL,
  MEDIA_DETAILS_REQUEST,
  MEDIA_DETAILS_SUCCESS,
  MEDIA_DETAILS_FAIL,
  MEDIA_DETAILS_RESET,
  DELETE_MEDIA_REQUEST,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAIL,
} from "../../constants/media-constants";
const initialState = {
  mediasData: [],
  loading: null,
};
export const mediaReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEDIA_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEDIA_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        mediasData: action.payload,
        success: true,
      };
    case MEDIA_LIST_FAIL:
      return {
        ...state,
        loading: false,
        mediasData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const mediaDetailsReducer = (state = { mediaDetails: {} }, action) => {
  switch (action.type) {
    case MEDIA_DETAILS_REQUEST:
      return { loading: true };
    case MEDIA_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        mediaDetails: action.payload,
      };
    case MEDIA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MEDIA_DETAILS_RESET:
      return { mediaDetails: {} };
    default:
      return state;
  }
};

export const mediaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MEDIA_REQUEST:
      return { loading: true };

    case DELETE_MEDIA_SUCCESS:
      return { loading: false, success: true };

    case DELETE_MEDIA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const mediaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDIA_CREATE_REQUEST:
      return { loading: true };

    case MEDIA_CREATE_SUCCESS:
      return { loading: false, mediaCreate: action.payload.message };

    case MEDIA_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
