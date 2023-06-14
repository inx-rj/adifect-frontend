import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_RESET,
  AVAILABLE_JOB_LIST_REQUEST,
  AVAILABLE_JOB_LIST_SUCCESS,
  AVAILABLE_JOB_LIST_FAIL,
  AVAILABLE_JOB_LIST_RESET,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_DETAILS_RESET,
  PUBLIC_JOB_DETAILS_REQUEST,
  PUBLIC_JOB_DETAILS_SUCCESS,
  PUBLIC_JOB_DETAILS_FAIL,
  PUBLIC_JOB_DETAILS_RESET,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  AGENCY_JOB_LIST_REQUEST,
  AGENCY_JOB_LIST_SUCCESS,
  AGENCY_JOB_LIST_FAIL,
  AGENCY_JOB_LIST_RESET,
  LATEST_JOB_DETAILS_REQUEST,
  LATEST_JOB_DETAILS_SUCCESS,
  LATEST_JOB_DETAILS_FAIL,
  RELATED_JOBS_REQUEST,
  RELATED_JOBS_SUCCESS,
  RELATED_JOBS_FAIL,
  DRAFT_JOB_lIST_REQUEST,
  DRAFT_JOB_lIST_SUCCESS,
  DRAFT_JOB_lIST_FAIL,
  DRAFT_JOB_lIST_RESET,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  UPDATE_JOB_RESET,
  UPDATE_JOB_STATUS_REQUEST,
  UPDATE_JOB_STATUS_SUCCESS,
  UPDATE_JOB_STATUS_FAIL,
  SHARE_REQUEST,
  SHARE_SUCCESS,
  SHARE_FAIL,
  SHARE_RESET,
  JOB_APPLIED_DETAILS_REQUEST,
  JOB_APPLIED_DETAILS_SUCCESS,
  JOB_APPLIED_DETAILS_FAIL,
  JOB_APPLIED_DETAILS_RESET,
  JOB_DETAILS_CREATOR_REQUEST,
  JOB_DETAILS_CREATOR_SUCCESS,
  JOB_DETAILS_CREATOR_FAIL,
  JOB_DETAILS_CREATOR_RESET,
  JOB_DETAILS_MEMBER_REQUEST,
  JOB_DETAILS_MEMBER_SUCCESS,
  JOB_DETAILS_MEMBER_FAIL,
  JOB_DETAILS_MEMBER_RESET,
  JOB_DETAILS_AGENCY_REQUEST,
  JOB_DETAILS_AGENCY_SUCCESS,
  JOB_DETAILS_AGENCY_FAIL,
  JOB_DETAILS_AGENCY_RESET,
  INDUSTRY_GET_DATA_REQUEST,
  INDUSTRY_GET_DATA_SUCCESS,
  INDUSTRY_GET_DATA_FAIL,
  AGENCY_INHOUSE_USERS_LIST_REQUEST,
  AGENCY_INHOUSE_USERS_LIST_SUCCESS,
  AGENCY_INHOUSE_USERS_LIST_FAIL,
  AGENCY_INHOUSE_USERS_LIST_RESET,
  JOB_DETAILS_ADMIN_REQUEST,
  JOB_DETAILS_ADMIN_SUCCESS,
  JOB_DETAILS_ADMIN_FAIL,
  JOB_ADMIN_REQUEST,
  JOB_ADMIN_SUCCESS,
  JOB_ADMIN_FAIL,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_FAIL,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_REQUEST,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_RESET,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_SUCCESS,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_FAIL,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_REQUEST,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_RESET,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_SUCCESS,
  ADMIN_INHOUSE_USER_LIST_FAIL,
  ADMIN_INHOUSE_USER_LIST_REQUEST,
  ADMIN_INHOUSE_USER_LIST_RESET,
  ADMIN_INHOUSE_USER_LIST_SUCCESS,
  ADMIN_RELATED_JOBS_FAIL,
  ADMIN_RELATED_JOBS_REQUEST,
  ADMIN_RELATED_JOBS_SUCCESS,
  JOB_DETAILS_ADMIN_NEW_PAGE_FAIL,
  JOB_DETAILS_ADMIN_NEW_PAGE_REQUEST,
  JOB_DETAILS_ADMIN_NEW_PAGE_SUCCESS,
} from "../../constants/job-constants";

export const jobReducer = (state = { jobData: [] }, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case JOB_LIST_SUCCESS:
      return {
        // ...state,
        loading: false,
        jobData: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };
    case JOB_LIST_FAIL:
      return {
        // ...state,
        loading: false,
        // jobData: null,
        error: action.payload,
      };
    case JOB_LIST_RESET:
      return { jobData: [] };

    default:
      return state;
  }
};

export const listAgencyInHouseUsersReducer = (
  state = { agencyInHouseUsers: [] },
  action
) => {
  switch (action.type) {
    case AGENCY_INHOUSE_USERS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AGENCY_INHOUSE_USERS_LIST_SUCCESS:
      return {
        loading: false,
        agencyInHouseUsers: action.payload,
        success: true,
      };
    case AGENCY_INHOUSE_USERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AGENCY_INHOUSE_USERS_LIST_RESET:
      return { agencyInHouseUsers: [] };

    default:
      return state;
  }
};

export const availableJobListReducer = (
  state = { availableJobList: [] },
  action
) => {
  switch (action.type) {
    case AVAILABLE_JOB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AVAILABLE_JOB_LIST_SUCCESS:
      return {
        loading: false,
        availableJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };
    case AVAILABLE_JOB_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case AVAILABLE_JOB_LIST_RESET:
      return { availableJobList: [] };

    default:
      return state;
  }
};

export const agencyJobReducer = (state = { agencyJobData: [] }, action) => {
  switch (action.type) {
    case AGENCY_JOB_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AGENCY_JOB_LIST_SUCCESS:
      return {
        loading: false,
        agencyJobData: action.payload.results.data,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };
    case AGENCY_JOB_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case AGENCY_JOB_LIST_RESET:
      return { agencyJobData: [] };

    default:
      return state;
  }
};

export const detailsSharereducer = (state = {}, action) => {
  switch (action.type) {
    case SHARE_REQUEST:
      return { loading: true };

    case SHARE_SUCCESS:
      return { loading: false, success: true };

    case SHARE_FAIL:
      return { loading: false, error: action.payload };

    case SHARE_RESET:
      return {};

    default:
      return state;
  }
};

export const publicJobDetailsReducer = (
  state = { publicJobDetails: {} },
  action
) => {
  switch (action.type) {
    case PUBLIC_JOB_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PUBLIC_JOB_DETAILS_SUCCESS:
      return {
        loading: false,
        publicJobDetails: action.payload,
        success: true,
      };

    case PUBLIC_JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case PUBLIC_JOB_DETAILS_RESET:
      return { publicJobDetails: {} };

    default:
      return state;
  }
};

export const jobDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_JOB_REQUEST:
      return { loading: true };

    case DELETE_JOB_SUCCESS:
      return { loading: false, success: true };

    case DELETE_JOB_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const jobDetailsReducer = (state = { jobDetails: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_REQUEST:
      return { ...state, loading: true };

    case JOB_DETAILS_SUCCESS:
      return { loading: false, jobDetails: action.payload, success: true };

    case JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case JOB_DETAILS_RESET:
      return { jobDetails: {} };

    default:
      return state;
  }
};

export const jobDetailsCreatorReducer = (
  state = { jobDetails: {} },
  action
) => {
  switch (action.type) {
    case JOB_DETAILS_CREATOR_REQUEST:
      return { ...state, loading: true };

    case JOB_DETAILS_CREATOR_SUCCESS:
      return { loading: false, jobDetails: action.payload, success: true };

    case JOB_DETAILS_CREATOR_FAIL:
      return { loading: false, error: action.payload };

    case JOB_DETAILS_CREATOR_RESET:
      return { jobDetails: {} };

    default:
      return state;
  }
};

export const jobDetailsAgencyReducer = (state = { jobDetails: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_AGENCY_REQUEST:
      return { ...state, loading: true };

    case JOB_DETAILS_AGENCY_SUCCESS:
      return { loading: false, jobDetails: action.payload, success: true };

    case JOB_DETAILS_AGENCY_FAIL:
      return { loading: false, error: action.payload };

    case JOB_DETAILS_AGENCY_RESET:
      return { jobDetails: {} };

    default:
      return state;
  }
};

export const jobDetailsMemberReducer = (state = { jobDetails: {} }, action) => {
  switch (action.type) {
    case JOB_DETAILS_MEMBER_REQUEST:
      return { ...state, loading: true };

    case JOB_DETAILS_MEMBER_SUCCESS:
      return { loading: false, jobDetails: action.payload, success: true };

    case JOB_DETAILS_MEMBER_FAIL:
      return { loading: false, error: action.payload };

    case JOB_DETAILS_MEMBER_RESET:
      return { jobDetails: {} };

    default:
      return state;
  }
};

export const freshJobsListReducer = (state = { freshJob: {} }, action) => {
  switch (action.type) {
    case LATEST_JOB_DETAILS_REQUEST:
      return { ...state, loading: true };

    case LATEST_JOB_DETAILS_SUCCESS:
      return {
        loading: false,
        freshJob: action.payload.data,
        message: action.payload.message,
        success: true,
      };

    case LATEST_JOB_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const relatedJobsReducer = (state = { relatedJobs: {} }, action) => {
  switch (action.type) {
    case RELATED_JOBS_REQUEST:
      return { ...state, loading: true };

    case RELATED_JOBS_SUCCESS:
      return {
        loading: false,
        relatedJobs: action.payload,
        // success: true,
      };

    case RELATED_JOBS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const DraftJoblistReducer = (state = { DraftJobs: [] }, action) => {
  switch (action.type) {
    case DRAFT_JOB_lIST_REQUEST:
      return { ...state, loading: true };

    case DRAFT_JOB_lIST_SUCCESS:
      return {
        loading: false,
        success: true,
        DraftJobs: action.payload,
      };
    // return { loading: false, success: true };
    case DRAFT_JOB_lIST_FAIL:
      return { loading: false, error: action.payload };
    case DRAFT_JOB_lIST_RESET:
      return { DraftJobs: [] };
    default:
      return state;
  }
};

export const updateJobReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_JOB_REQUEST:
      return { loading: true };

    case UPDATE_JOB_SUCCESS:
      return { loading: false, success: true };

    case UPDATE_JOB_FAIL:
      return { loading: false, error: action.payload };

    case UPDATE_JOB_RESET:
      return {};

    default:
      return state;
  }
};

export const updateJobStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_JOB_STATUS_REQUEST:
      return { loading: true };

    case UPDATE_JOB_STATUS_SUCCESS:
      return { loading: false, success: true, message: action.payload };

    case UPDATE_JOB_STATUS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const jobAppliedDetailsReducer = (
  state = { jobAppliedDetails: [] },
  action
) => {
  switch (action.type) {
    case JOB_APPLIED_DETAILS_REQUEST:
      return { loading: true };

    case JOB_APPLIED_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        jobAppliedDetails: action.payload,
      };

    case JOB_APPLIED_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case JOB_APPLIED_DETAILS_RESET:
      return { jobAppliedDetails: [] };

    default:
      return state;
  }
};

export const getIndustryDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case INDUSTRY_GET_DATA_REQUEST:
      return { ...state, loading: true };

    case INDUSTRY_GET_DATA_SUCCESS:
      return { loading: false, industryDetails: action.payload, success: true };

    case INDUSTRY_GET_DATA_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AdminDetailsJobReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_DETAILS_ADMIN_REQUEST:
      return { loading: true };

    case JOB_DETAILS_ADMIN_SUCCESS:
      return { loading: false, success: true, getAdminJob: action.payload };

    case JOB_DETAILS_ADMIN_FAIL:
      return { loading: false, error: action.payload };

    // case JOB_DETAILS_ADMIN_FAIL:
    //   return {};

    default:
      return state;
  }
};


export const AdminDetailsJobNewPageReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_DETAILS_ADMIN_NEW_PAGE_REQUEST:
      return { loading: true };

    case JOB_DETAILS_ADMIN_NEW_PAGE_SUCCESS:
      return { loading: false, success: true, getAdminJobNewPage: action.payload };

    case JOB_DETAILS_ADMIN_NEW_PAGE_FAIL:
      return { loading: false, error: action.payload };

    // case JOB_DETAILS_ADMIN_FAIL:
    //   return {};

    default:
      return state;
  }
};

export const AdminJobReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_ADMIN_REQUEST:
      return { loading: true };

    case JOB_ADMIN_SUCCESS:
      return { loading: false, success: true, getAdminJob: action.payload };

    case JOB_ADMIN_FAIL:
      return { loading: false, error: action.payload };

    // case JOB_DETAILS_ADMIN_FAIL:
    //   return {};

    default:
      return state;
  }
};

export const SuperAdminInProgressListReducer = (
  state = { SuperAdminJobList: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_REQUEST:
      return { ...state, loading: true };

    case ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_SUCCESS:
      return {
        loading: false,
        SuperAdminJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_RESET:
      return { SuperAdminJobList: [] };

    default:
      return state;
  }
};

export const SuperAdminInReviewListReducer = (
  state = { SuperAdminInReview: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_REQUEST:
      return { ...state, loading: true };

    case ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_SUCCESS:
      return {
        loading: false,
        SuperAdminInReview: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_RESET:
      return { SuperAdminInReview: [] };

    default:
      return state;
  }
};

export const listAdminInHouseUsersReducer = (
  state = { adminInHouseUsers: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_INHOUSE_USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_INHOUSE_USER_LIST_SUCCESS:
      return {
        loading: false,
        adminInHouseUsers: action.payload,
        success: true,
      };
    case ADMIN_INHOUSE_USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_INHOUSE_USER_LIST_RESET:
      return { adminInHouseUsers: [] };

    default:
      return state;
  }
};

export const AdminrelatedJobsReducer = (
  state = { adminRelatedJobs: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_RELATED_JOBS_REQUEST:
      return { ...state, loading: true };

    case ADMIN_RELATED_JOBS_SUCCESS:
      return {
        loading: false,
        adminRelatedJobs: action.payload,
        // success: true,
      };

    case ADMIN_RELATED_JOBS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
