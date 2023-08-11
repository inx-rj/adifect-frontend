import {
  CREATOR_ACTIVITY_REQUEST,
  CREATOR_ACTIVITY_SUCCESS,
  CREATOR_ACTIVITY_FAIL,
  CREATOR_ACTIVITY_RESET,
  AGENCY_ACTIVITY_REQUEST,
  AGENCY_ACTIVITY_SUCCESS,
  AGENCY_ACTIVITY_FAIL,
  AGENCY_ACTIVITY_RESET,
  ADMIN_ACTIVITY_REQUEST,
  ADMIN_ACTIVITY_SUCCESS,
  ADMIN_ACTIVITY_FAIL,
  ADMIN_ACTIVITY_RESET,
  MEMBER_ACTIVITY_REQUEST,
  MEMBER_ACTIVITY_SUCCESS,
  MEMBER_ACTIVITY_FAIL,
  MEMBER_ACTIVITY_RESET,
  POST_ACTIVITY_CHAT_REQUEST,
  POST_ACTIVITY_CHAT_SUCCESS,
  POST_ACTIVITY_CHAT_FAIL,
  POST_ACTIVITY_CHAT_RESET,
  CREATOR_ACTIVITY_JOBSUBMIT_FAIL,
  CREATOR_ACTIVITY_JOBSUBMIT_REQUEST,
  CREATOR_ACTIVITY_JOBSUBMIT_SUCCESS,
  CREATOR_ACTIVITY_JOBSUBMIT_RESET,
  CREATOR_APPLIED_JOBID_REQUEST,
  CREATOR_APPLIED_JOBID_SUCCESS,
  CREATOR_APPLIED_JOBID_FAIL,
  CREATOR_APPLIED_JOBID_RESET,
  JOB_SUBMIT_STATUS_REQUEST,
  JOB_SUBMIT_STATUS_SUCCESS,
  JOB_SUBMIT_STATUS_FAIL,
  IS_APPROVAL_REJECTED_STATUS_REQUEST,
  IS_APPROVAL_REJECTED_STATUS_SUCCESS,
  IS_APPROVAL_REJECTED_STATUS_FAIL,
  IS_APPROVAL_REJECTED_STATUS_RESET,
  INVITED_USERS_LIST_REQUEST,
  INVITED_USERS_LIST_SUCCESS,
  INVITED_USERS_LIST_FAIL,
  INVITED_USERS_LIST_RESET,
  GET_JOB_COMPLETED_USERS_REQUEST,
  GET_JOB_COMPLETED_USERS_SUCCESS,
  GET_JOB_COMPLETED_USERS_FAIL,
  GET_JOB_COMPLETED_USERS_RESET,
  COMPLETE_JOB_ACTIVITY_REQUEST,
  COMPLETE_JOB_ACTIVITY_SUCCESS,
  COMPLETE_JOB_ACTIVITY_FAIL,
  COMPLETE_JOB_ACTIVITY_RESET,
  COMPLETED_JOB_LIST_REQUEST,
  COMPLETED_JOB_LIST_SUCCESS,
  COMPLETED_JOB_LIST_FAIL,
  COMPLETED_JOB_LIST_RESET,
  AGENCY_ACTIVITY_RATING_FAILURE,
  AGENCY_ACTIVITY_RATING_REQUEST,
  AGENCY_ACTIVITY_RATING_SUCCESS,
  CREATOR_ACTIVITY_GET_RATING_FAILURE,
  CREATOR_ACTIVITY_GET_RATING_REQUEST,
  CREATOR_ACTIVITY_GET_RATING_SUCCESS,
  CREATOR_ACTIVITY_RATING_REQUEST,
  CREATOR_ACTIVITY_RATING_FAILURE,
  CREATOR_ACTIVITY_RATING_SUCCESS,
} from "../../constants/activity-constants";

export const creatorActivityReducer = (
  state = { creatorActivityDetails: [] },
  action
) => {
  switch (action.type) {
    case CREATOR_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATOR_ACTIVITY_SUCCESS:
      return {
        loading: false,
        creatorActivityDetails: action.payload,
        success: true,
      };
    case CREATOR_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATOR_ACTIVITY_RESET:
      return {
        creatorActivityDetails: [],
      };
    default:
      return state;
  }
};

export const agencyActivityReducer = (
  state = { agencyActivityDetails: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AGENCY_ACTIVITY_SUCCESS:
      return {
        loading: false,
        agencyActivityDetails: action.payload,
        success: true,
      };
    case AGENCY_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AGENCY_ACTIVITY_RESET:
      return { agencyActivityDetails: [] };
    default:
      return state;
  }
};

export const memberActivityReducer = (
  state = { memberActivityDetails: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MEMBER_ACTIVITY_SUCCESS:
      return {
        loading: false,
        memberActivityDetails: action.payload,
        success: true,
      };
    case MEMBER_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case MEMBER_ACTIVITY_RESET:
      return { memberActivityDetails: [] };
    default:
      return state;
  }
};

export const adminActivityReducer = (
  state = { adminActivityDetails: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ACTIVITY_SUCCESS:
      return {
        loading: false,
        adminActivityDetails: action.payload,
        success: true,
      };
    case ADMIN_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_ACTIVITY_RESET:
      return { adminActivityDetails: [] };
    default:
      return state;
  }
};

export const postActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ACTIVITY_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_ACTIVITY_CHAT_SUCCESS:
      return {
        loading: false,
        postActivity: action.payload,
        success: true,
      };
    case POST_ACTIVITY_CHAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case POST_ACTIVITY_CHAT_RESET:
      return {};
    default:
      return state;
  }
};

export const creatorAppliedJobIdReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATOR_APPLIED_JOBID_REQUEST:
      return { loading: true };
    case CREATOR_APPLIED_JOBID_SUCCESS:
      return {
        loading: false,
        success: true,
        creatorAppliedId: action.payload,
      };
    case CREATOR_APPLIED_JOBID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const creatorActivityJobSubmitReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATOR_ACTIVITY_JOBSUBMIT_REQUEST:
      return { loading: true };
    case CREATOR_ACTIVITY_JOBSUBMIT_SUCCESS:
      return {
        loading: false,
        success: true,
        creatorActivityJob: action.payload.message,
      };
    case CREATOR_ACTIVITY_JOBSUBMIT_FAIL:
      return { loading: false, error: action.payload };
    case CREATOR_ACTIVITY_JOBSUBMIT_RESET:
      return {};
    default:
      return state;
  }
};

export const jobSubmitStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_SUBMIT_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOB_SUBMIT_STATUS_SUCCESS:
      return {
        loading: false,
        jobSubmitStatus: action.payload.Disable,
        success: true,
      };
    case JOB_SUBMIT_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    // case JOB_SUBMIT_STATUS_RESET:
    //   return {};
    default:
      return state;
  }
};

export const isApprovalRejectedStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case IS_APPROVAL_REJECTED_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case IS_APPROVAL_REJECTED_STATUS_SUCCESS:
      return {
        loading: false,
        isApprovalRejectedData: action.payload.data,
        success: true,
      };
    case IS_APPROVAL_REJECTED_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case IS_APPROVAL_REJECTED_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const getInvitedUsersListReducer = (
  state = { invitedUsers: [] },
  action
) => {
  switch (action.type) {
    case INVITED_USERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INVITED_USERS_LIST_SUCCESS:
      return {
        loading: false,
        invitedUsers: action.payload.data,
        success: true,
      };
    case INVITED_USERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case INVITED_USERS_LIST_RESET:
      return { invitedUsers: [] };
    default:
      return state;
  }
};

export const getJobCompletedUsersReducer = (
  state = { jobCompletedUsers: [] },
  action
) => {
  switch (action.type) {
    case GET_JOB_COMPLETED_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_JOB_COMPLETED_USERS_SUCCESS:
      return {
        loading: false,
        jobCompletedUsers: action.payload.Data,
        success: true,
      };
    case GET_JOB_COMPLETED_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_JOB_COMPLETED_USERS_RESET:
      return { jobCompletedUsers: [] };
    default:
      return state;
  }
};

export const completeJobActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPLETE_JOB_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMPLETE_JOB_ACTIVITY_SUCCESS:
      return {
        loading: false,
        completeJobData: action.payload,
        success: true,
      };
    case COMPLETE_JOB_ACTIVITY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPLETE_JOB_ACTIVITY_RESET:
      return {};
    default:
      return state;
  }
};

export const getCompletedTaskListReducer = (
  state = { completedTaskList: [] },
  action
) => {
  switch (action.type) {
    case COMPLETED_JOB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMPLETED_JOB_LIST_SUCCESS:
      return {
        loading: false,
        completedTaskList: action.payload.Data,
        success: true,
      };
    case COMPLETED_JOB_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMPLETED_JOB_LIST_RESET:
      return { completedTaskList: [] };
    default:
      return state;
  }
};

export const AgencyActivityRatingReducer = (state = {}, action) => {
  switch (action.type) {
    case AGENCY_ACTIVITY_RATING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AGENCY_ACTIVITY_RATING_SUCCESS:
      return {
        loading: false,
        agencyRatingActivity: action.payload,
        success: true,
      };
    case AGENCY_ACTIVITY_RATING_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    // case POST_ACTIVITY_CHAT_RESET:
    //   return {};
    default:
      return state;
  }
};

export const CreatorActivityGetRatingReducer = (
  state = { creatorActivityGetRatingDetails: [] },
  action
) => {
  switch (action.type) {
    case CREATOR_ACTIVITY_GET_RATING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATOR_ACTIVITY_GET_RATING_SUCCESS:
      return {
        loading: false,
        creatorActivityGetRatingDetails: action.payload,
        success: true,
      };
    case CREATOR_ACTIVITY_GET_RATING_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    // case AGENCY_ACTIVITY_RESET:
    //   return { creatorActivityRatingDetails: [] };
    default:
      return state;
  }
};

export const CreatorActivityRatingReducers = (state = {}, action) => {
  switch (action.type) {
    case CREATOR_ACTIVITY_RATING_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case CREATOR_ACTIVITY_RATING_SUCCESS:
      return {
        loading: false,
        CreatorRatingActivity: action.payload,
        success: true,
      };
    case CREATOR_ACTIVITY_RATING_REQUEST:
      return {
        loading: false,
        error: action.payload,
      };
    // case POST_ACTIVITY_CHAT_RESET:
    //   return {};
    default:
      return state;
  }
};
