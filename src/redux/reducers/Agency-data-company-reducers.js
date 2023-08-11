import {
  ALL_WORKFLOW_COMPANY_LIST_REQUEST,
  ALL_WORKFLOW_COMPANY_LIST_SUCCESS,
  ALL_WORKFLOW_COMPANY_LIST_FAIL,
  ALL_COMPANY_LIST_COMPANY_REQUEST,
  ALL_COMPANY_LIST_COMPANY_SUCCESS,
  ALL_COMPANY_LIST_COMPANY_FAIL,
  ALL_JOB_COMPANY_LIST_REQUEST,
  ALL_JOB_COMPANY_LIST_SUCCESS,
  ALL_JOB_COMPANY_LIST_FAIL,
  ALL_INVITE_COMPANY_LIST_REQUEST,
  ALL_INVITE_COMPANY_LIST_SUCCESS,
  ALL_INVITE_COMPANY_LIST_FAIL,
  DELETE_INVITE_LIST_REQUEST,
  DELETE_INVITE_LIST_SUCCESS,
  DELETE_INVITE_LIST_FAIL,
  BLOCK_AGENCY_MEMEBER_REQUEST,
  BLOCK_AGENCY_MEMEBER_SUCCESS,
  BLOCK_AGENCY_MEMEBER_FAIL,
} from "../../constants/Agency-data-company-constants";

export const allworkflowcompanyReducer = (
  state = { workflowcompanyuser: [] },
  action
) => {
  switch (action.type) {
    case ALL_WORKFLOW_COMPANY_LIST_REQUEST:
      return { loading: true };
    case ALL_WORKFLOW_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        workflowcompanyuser: action.payload,
      };
    case ALL_WORKFLOW_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 2 number company******
export const allcompanyconpanyReducer = (
  state = { companyuserlist: [] },
  action
) => {
  switch (action.type) {
    case ALL_COMPANY_LIST_COMPANY_REQUEST:
      return { loading: true };
    case ALL_COMPANY_LIST_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        companyuserlist: action.payload,
      };
    case ALL_COMPANY_LIST_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 3number job List
// export const alljobReducer = (state = { jobuser: [] }, action) => {
//   switch (action.type) {
//     case ALL_JOB_LIST_REQUEST:
//       return { loading: false,
//         success: true,
//          jobuser: action.payload.results,
//          next: action.payload.next,
//          previous: action.payload.previous,
//         };
//     case ALL_JOB_LIST_SUCCESS:
//       return { loading: false, success: true, jobuser: action.payload };
//     case ALL_JOB_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const alljobcompanyReducer = (state = { jobuseragency: [] }, action) => {
  switch (action.type) {
    case ALL_JOB_COMPANY_LIST_REQUEST:
      return { loading: true };
    case ALL_JOB_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        jobuseragency: action.payload.results.data,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        In_progress_jobs: action.payload.results.In_progress_jobs,
        Total_Job_count: action.payload.results.Total_Job_count,
      };
    case ALL_JOB_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 4 number invite member List
export const allInvitescompanyReducer = (
  state = { inviteuserlist: [] },
  action
) => {
  switch (action.type) {
    case ALL_INVITE_COMPANY_LIST_REQUEST:
      return { loading: true };
    case ALL_INVITE_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        inviteuserlist: action.payload,
      };
    case ALL_INVITE_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const memeberDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INVITE_LIST_REQUEST:
      return { loading: true };
    case DELETE_INVITE_LIST_SUCCESS:
      return { loading: false, success: true };
    case DELETE_INVITE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AgencyMemeberBlockReducer = (
  state = { blockAgencyMember: [] },
  action
) => {
  switch (action.type) {
    case BLOCK_AGENCY_MEMEBER_REQUEST:
      return { loading: true };
    case BLOCK_AGENCY_MEMEBER_SUCCESS:
      return {
        loading: false,
        success: true,
        blockAgencyMember: action.payload,
      };
    case BLOCK_AGENCY_MEMEBER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
