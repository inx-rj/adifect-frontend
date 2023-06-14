import {
  ALL_WORKFLOW_LIST_REQUEST,
  ALL_WORKFLOW_LIST_SUCCESS,
  ALL_WORKFLOW_LIST_FAIL,
  ALL_COMPANY_LIST_REQUEST,
  ALL_COMPANY_LIST_SUCCESS,
  ALL_COMPANY_LIST_FAIL,
  ALL_JOB_LIST_REQUEST,
  ALL_JOB_LIST_SUCCESS,
  ALL_JOB_LIST_FAIL,
  ALL_INVITE_LIST_REQUEST,
  ALL_INVITE_LIST_SUCCESS,
  ALL_INVITE_LIST_FAIL,
  BLOCK_JOB_REQUEST,
  BLOCK_JOB_SUCCESS,
  BLOCK_JOB_FAIL,
  INPROGRESS_JOB_LIST_REQUEST,
  INPROGRESS_JOB_LIST_SUCCESS,
  INPROGRESS_JOB_LIST_FAIL,
  BLOCK_COMPANY_REQUEST,
  BLOCK_COMPANY_SUCCESS,
  BLOCK_COMPANY_FAIL,
  BLOCK_WORKFLOW_REQUEST,
  BLOCK_WORKFLOW_SUCCESS,
  BLOCK_WORKFLOW_FAIL,
  BLOCK_INVITE_MEMEBER_REQUEST,
  BLOCK_INVITE_MEMEBER_SUCCESS,
  BLOCK_INVITE_MEMEBER_FAIL,
} from "../../constants/Agency-data-constants";

export const allworkflowReducer = (state = { workflowuser: [] }, action) => {
  switch (action.type) {
    case ALL_WORKFLOW_LIST_REQUEST:
      return { loading: true };
    case ALL_WORKFLOW_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        workflowuser: action.payload,
      };
    case ALL_WORKFLOW_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 2 number company******
export const allcompanyReducer = (state = { companyuser: [] }, action) => {
  switch (action.type) {
    case ALL_COMPANY_LIST_REQUEST:
      return { loading: true };
    case ALL_COMPANY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        companyuser: action.payload,
      };
    case ALL_COMPANY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const alljobReducer = (state = { jobuser: [] }, action) => {
  switch (action.type) {
    case ALL_JOB_LIST_REQUEST:
      return { loading: true };
    case ALL_JOB_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        jobuser: action.payload.results.data,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        In_progress_jobs: action.payload.results.In_progress_jobs,
        Total_Job_count: action.payload.results.Total_Job_count,
      };
    case ALL_JOB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// 4 number invite member List
export const allInvitesReducer = (state = { inviteuser: [] }, action) => {
  switch (action.type) {
    case ALL_INVITE_LIST_REQUEST:
      return { loading: true };
    case ALL_INVITE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        inviteuser: action.payload,
      };
    case ALL_INVITE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// blockuser*******

export const blockJobsReducer = (state = { blockjob: [] }, action) => {
  switch (action.type) {
    case BLOCK_JOB_REQUEST:
      return { loading: true };
    case BLOCK_JOB_SUCCESS:
      return {
        loading: false,
        success: true,
        blockjob: action.payload,
      };
    case BLOCK_JOB_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// blockuser*******

export const StatusjobReducer = (state = { statusjobs: [] }, action) => {
  switch (action.type) {
    case INPROGRESS_JOB_LIST_REQUEST:
      return { loading: true };
    case INPROGRESS_JOB_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        statusjobs: action.payload,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
      };
    case INPROGRESS_JOB_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// block Comapany*******

export const CompanyBlockReducer = (state = { blockCompany: [] }, action) => {
  switch (action.type) {
    case BLOCK_COMPANY_REQUEST:
      return { loading: true };
    case BLOCK_COMPANY_SUCCESS:
      return {
        loading: false,
        success: true,
        blockCompany: action.payload,
      };
    case BLOCK_COMPANY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// block Comapany*******

// block WORKFLOW*******
export const WorkflowBlockReducer = (state = { blockworkflow: [] }, action) => {
  switch (action.type) {
    case BLOCK_WORKFLOW_REQUEST:
      return { loading: true };
    case BLOCK_WORKFLOW_SUCCESS:
      return {
        loading: false,
        success: true,
        blockworkflow: action.payload,
      };
    case BLOCK_WORKFLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// block WORKFLOW*******

// block invite Member*******
export const MemeberInviteBlockReducer = (state = { blockinviteMember: [] }, action) => {
  switch (action.type) {
    case BLOCK_INVITE_MEMEBER_REQUEST:
      return { loading: true };
    case BLOCK_INVITE_MEMEBER_SUCCESS:
      return {
        loading: false,
        success: true,
        blockinviteMember: action.payload,
      };
    case BLOCK_INVITE_MEMEBER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// block invite Member*******

