import {
  MEMBER_ADMIN_JOB_LIST_REQUEST,
  MEMBER_ADMIN_JOB_LIST_FAILURE,
  MEMBER_ADMIN_JOB_LIST_SUCCESS,
  MEMBER_ADMIN_JOB_LIST_DELETE_FAILURE,
  MEMBER_ADMIN_JOB_LIST_DELETE_REQUEST,
  MEMBER_ADMIN_JOB_LIST_DELETE_SUCCESS,
  MEMBER_ADMIN_GET_JOB_DETAILS_FAILURE,
  MEMBER_ADMIN_GET_JOB_DETAILS_REQUEST,
  MEMBER_ADMIN_GET_JOB_DETAILS_SUCCESS,
  MEMBER_ADMIN_GET_JOB_DETAILS_RESET,
  MEMBER_ADMIN_GET_DRAFT_JOB_FAILURE,
  MEMBER_ADMIN_GET_DRAFT_JOB_REQUEST,
  MEMBER_ADMIN_GET_DRAFT_JOB_RESET,
  MEMBER_ADMIN_GET_DRAFT_JOB_SUCCESS,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_FAILURE,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_REQUEST,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_SUCCESS,
  MEMBER_INHOUSE_JOB_LIST_REQUEST,
  MEMBER_INHOUSE_JOB_LIST_SUCCESS,
  MEMBER_INHOUSE_JOB_LIST_FAILURE,
  MEMBER_INHOUSE_JOB_LIST_RESET,
  MEMBER_INHOUSE_GET_JOB_DETAILS_REQUEST,
  MEMBER_INHOUSE_GET_JOB_DETAILS_SUCCESS,
  MEMBER_INHOUSE_GET_JOB_DETAILS_FAILURE,
  MEMBER_INHOUSE_GET_JOB_DETAILS_RESET,
  MEMBER_ADMIN_JOB_LIST_RESET,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_SUCCESS,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_REQUEST,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_FAILURE,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_RESET,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_FAIL,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_REQUEST,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_RESET,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_SUCCESS,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_FAIL,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_REQUEST,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_RESET,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_SUCCESS,
} from "../../constants/Member-Admin-job-list-constants";

export const MemberAdminGetJobListReducer = (
  state = { memberAdminJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_JOB_LIST_REQUEST:
      return { ...state, loading: true };

    case MEMBER_ADMIN_JOB_LIST_SUCCESS:
      return {
        loading: false,
        memberAdminJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_ADMIN_JOB_LIST_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_ADMIN_JOB_LIST_RESET:
      return { memberAdminJobList: [] };

    default:
      return state;
  }
};

export const MemberAdminJobListDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_JOB_LIST_DELETE_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_JOB_LIST_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MEMBER_ADMIN_JOB_LIST_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const MemberAdminGetJobDetailsReducer = (
  state = { memberAdminJobDetails: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_GET_JOB_DETAILS_REQUEST:
      return { ...state, loading: true };

    case MEMBER_ADMIN_GET_JOB_DETAILS_SUCCESS:
      return {
        loading: false,
        memberAdminJobDetails: action.payload,
        success: true,
      };

    case MEMBER_ADMIN_GET_JOB_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_ADMIN_GET_JOB_DETAILS_RESET:
      return { memberAdminJobDetails: {} };

    default:
      return state;
  }
};

export const MemberAdminDraftJoblistReducer = (
  state = { MemberAdminDraftJobs: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_GET_DRAFT_JOB_REQUEST:
      return { ...state, loading: true };

    case MEMBER_ADMIN_GET_DRAFT_JOB_SUCCESS:
      return {
        loading: false,
        success: true,
        MemberAdminDraftJobs: action.payload,
      };
    // return { loading: false, success: true };
    case MEMBER_ADMIN_GET_DRAFT_JOB_FAILURE:
      return { loading: false, error: action.payload };
    case MEMBER_ADMIN_GET_DRAFT_JOB_RESET:
      return { MemberAdminDraftJobs: [] };
    default:
      return state;
  }
};

export const MemberAdminDraftJobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_DRAFT_JOB_DELETE_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_DRAFT_JOB_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MEMBER_ADMIN_DRAFT_JOB_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const MemberInHouseGetJobListReducer = (
  state = { memberInHouseJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_INHOUSE_JOB_LIST_REQUEST:
      return { ...state, loading: true };

    case MEMBER_INHOUSE_JOB_LIST_SUCCESS:
      return {
        loading: false,
        memberInHouseJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_INHOUSE_JOB_LIST_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_INHOUSE_JOB_LIST_RESET:
      return { memberInHouseJobList: [] };

    default:
      return state;
  }
};

export const MemberInProgressInHouseGetJobListReducer = (
  state = { memberInProgressInHouseJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_INPROGRESS_INHOUSE_JOB_LIST_REQUEST:
      return { ...state, loading: true };

    case MEMBER_INPROGRESS_INHOUSE_JOB_LIST_SUCCESS:
      return {
        loading: false,
        memberInProgressInHouseJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_INPROGRESS_INHOUSE_JOB_LIST_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_INPROGRESS_INHOUSE_JOB_LIST_RESET:
      return { memberInProgressInHouseJobList: [] };

    default:
      return state;
  }
};

export const MemberInHouseGetJobDetailsReducer = (
  state = { memberInHouseJobDetails: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_INHOUSE_GET_JOB_DETAILS_REQUEST:
      return { ...state, loading: true };

    case MEMBER_INHOUSE_GET_JOB_DETAILS_SUCCESS:
      return {
        loading: false,
        memberInHouseJobDetails: action.payload,
        success: true,
      };

    case MEMBER_INHOUSE_GET_JOB_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_INHOUSE_GET_JOB_DETAILS_RESET:
      return { memberInHouseJobDetails: {} };

    default:
      return state;
  }
};

export const MemberAdminGetJobInProgressListReducer = (
  state = { memberAdminJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_REQUEST:
      return { ...state, loading: true };

    case MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_SUCCESS:
      return {
        loading: false,
        memberAdminJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_FAIL:
      return { loading: false, error: action.payload };

    case MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_RESET:
      return { memberAdminJobList: [] };

    default:
      return state;
  }
};

export const MemberAdminGetJobInReviewListReducer = (
  state = { duplicateMemberAdminJobList: [] },
  action
) => {
  switch (action.type) {
    case DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_REQUEST:
      return { ...state, loading: true };

    case DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_SUCCESS:
      return {
        loading: false,
        duplicateMemberAdminJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_FAIL:
      return { loading: false, error: action.payload };

    case DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_RESET:
      return { duplicateMemberAdminJobList: [] };

    default:
      return state;
  }
};
