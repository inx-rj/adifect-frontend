import {
  AGENCY_PROFILE_EMAIL_CHANGE_FAIL,
  AGENCY_PROFILE_EMAIL_CHANGE_REQUEST,
  AGENCY_PROFILE_EMAIL_CHANGE_SUCCESS,
  AGENCY_PROFILE_PASSWORD_CHANGE_REQUEST,
  AGENCY_PROFILE_PASSWORD_CHANGE_FAIL,
  AGENCY_PROFILE_PASSWORD_CHANGE_SUCCESS,
  AGENCY_PROFILE_COMMUNICATION_REQUEST,
  AGENCY_PROFILE_COMMUNICATION_FAIL,
  AGENCY_PROFILE_COMMUNICATION_SUCCESS,
  AGENCY_PROFILE_COMMUNICATION_RESET,
  GET_AGENCY_PROFILE_COMMUNICATION_FAIL,
  GET_AGENCY_PROFILE_COMMUNICATION_REQUEST,
  GET_AGENCY_PROFILE_COMMUNICATION_SUCCESS,
  AGENCY_PROFILE_COMM_DELETE_FAIL,
  AGENCY_PROFILE_COMM_DELETE_REQUEST,
  AGENCY_PROFILE_COMM_DELETE_SUCCESS,
  AGENCY_PROFILE_COMM_EDITDATA_REQUEST,
  AGENCY_PROFILE_COMM_EDITDATA_FAIL,
  AGENCY_PROFILE_COMM_EDITDATA_SUCCESS,
  AGENCY_PROFILE_JOBS_PROGRESS_FAILURE,
  AGENCY_PROFILE_JOBS_PROGRESS_REQUEST,
  AGENCY_PROFILE_JOBS_PROGRESS_SUCCESS,
} from "../../constants/Agency_profile_account_setting";

export const agencyProfileEmailChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_EMAIL_CHANGE_REQUEST:
      return { loading: true };
    case AGENCY_PROFILE_EMAIL_CHANGE_SUCCESS:
      return { loading: false, success: true, AnswerPostData: action.payload };
    case AGENCY_PROFILE_EMAIL_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const agencyProfilePasswordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case AGENCY_PROFILE_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, success: true, AnswerPostData: action.payload };
    case AGENCY_PROFILE_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const agencyProfileCommunicationReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_COMMUNICATION_REQUEST:
      return { loading: true };
    case AGENCY_PROFILE_COMMUNICATION_SUCCESS:
      return { loading: false, success: true, AnswerPostData: action.payload };
    case AGENCY_PROFILE_COMMUNICATION_FAIL:
      return { loading: false, error: action.payload };
    case AGENCY_PROFILE_COMMUNICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const getAgencyProfileCommunicationReducer = (
  state = { getcommunication: [] },
  action
) => {
  switch (action.type) {
    case GET_AGENCY_PROFILE_COMMUNICATION_REQUEST:
      return { loading: true };
    case GET_AGENCY_PROFILE_COMMUNICATION_SUCCESS:
      return {
        loading: false,
        success: true,
        getcommunication: action.payload,
      };
    case GET_AGENCY_PROFILE_COMMUNICATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const agencyProfileCommDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_COMM_DELETE_REQUEST:
      return { loading: true };

    case AGENCY_PROFILE_COMM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case AGENCY_PROFILE_COMM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const agencyProfileCommEditDataReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_PROFILE_COMM_EDITDATA_REQUEST:
      return { loading: true };

    case AGENCY_PROFILE_COMM_EDITDATA_SUCCESS:
      return { loading: false, success: true };

    case AGENCY_PROFILE_COMM_EDITDATA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getAgencyProfileJobsInProgressReducer = (
  state = { getProfileJobs: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_PROFILE_JOBS_PROGRESS_REQUEST:
      return { loading: true };
    case AGENCY_PROFILE_JOBS_PROGRESS_SUCCESS:
      return {
        loading: false,
        success: true,
        getProfileJobs: action.payload,
      };
    case AGENCY_PROFILE_JOBS_PROGRESS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
