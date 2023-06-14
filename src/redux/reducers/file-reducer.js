import {
  MEMBER_JOB_DETAILS_FILES_REQUEST,
  MEMBER_JOB_DETAILS_FILES_SUCCESS,
  MEMBER_JOB_DETAILS_FILES_FAIL,
  CREATOR_JOB_DETAILS_FILES_REQUEST,
  CREATOR_JOB_DETAILS_FILES_SUCCESS,
  CREATOR_JOB_DETAILS_FILES_FAIL,
  GET_JOB_DETAILS_FILES_REQUEST,
  GET_JOB_DETAILS_FILES_SUCCESS,
  GET_JOB_DETAILS_FILES_FAIL,
  GET_JOB_DETAILS_FILES_ADMIN_REQUEST,
  GET_JOB_DETAILS_FILES_ADMIN_SUCCESS,
  GET_JOB_DETAILS_FILES_ADMIN_FAIL,
} from "../../constants/file-constants";

export const getMemberActivityFilesListReducer = (
  state = { MemberFilesList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_JOB_DETAILS_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_JOB_DETAILS_FILES_SUCCESS:
      return {
        loading: false,
        MemberFilesList: action.payload,
        success: true,
      };
    case MEMBER_JOB_DETAILS_FILES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCreatorActivityFilesListReducer = (
  state = { CreatorFilesList: [] },
  action
) => {
  switch (action.type) {
    case CREATOR_JOB_DETAILS_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATOR_JOB_DETAILS_FILES_SUCCESS:
      return {
        loading: false,
        CreatorFilesList: action.payload,
        success: true,
      };
    case CREATOR_JOB_DETAILS_FILES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getActivityFilesListReducer = (
  state = { ActivityFilesList: [] },
  action
) => {
  switch (action.type) {
    case GET_JOB_DETAILS_FILES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOB_DETAILS_FILES_SUCCESS:
      return {
        loading: false,
        ActivityFilesList: action.payload,
        success: true,
      };
    case GET_JOB_DETAILS_FILES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getActivityFilesListAdminReducer = (
  state = { ActivityFilesList: [] },
  action
) => {
  switch (action.type) {
    case GET_JOB_DETAILS_FILES_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOB_DETAILS_FILES_ADMIN_SUCCESS:
      return {
        loading: false,
        ActivityFilesList: action.payload,
        success: true,
      };
    case GET_JOB_DETAILS_FILES_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
