import {
  MEMBER_JOBLIST_FAILURE,
  MEMBER_JOBLIST_SUCCESS,
  MEMBER_JOBLIST_REQUEST,
  MEMBER_APPROVAL_JOBLIST_FAILURE,
  MEMBER_APPROVAL_JOBLIST_SUCCESS,
  MEMBER_APPROVAL_JOBLIST_REQUEST,
  MEMBER_APPROVAL_JOBLIST_RESET,
  MEMEBER_JOBDETAILS_FAILURE,
  MEMEBER_JOBDETAILS_REQUEST,
  MEMEBER_JOBDETAILS_SUCCESS,
  MEMEBER_JOBDETAILS_RESET,
  MEMBER_VIEWAPPROVE_FAILURE,
  MEMBER_VIEWAPPROVE_REQUEST,
  MEMBER_VIEWAPPROVE_SUCCESS,
} from "../../constants/activity-constants";

export const getMemberJobListReducer = (
  state = { memberJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_JOBLIST_REQUEST:
      return { ...state, loading: true };

    case MEMBER_JOBLIST_SUCCESS:
      return {
        loading: false,
        memberJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_JOBLIST_FAILURE:
      return { loading: false, error: action.payload };

    // case MEMBER_JOBLIST_RESET:
    //   return { memberJobList: [] };

    default:
      return state;
  }
};

export const getMemberApprovalJobListReducer = (
  state = { memberApprovalJobList: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_APPROVAL_JOBLIST_REQUEST:
      return { ...state, loading: true };

    case MEMBER_APPROVAL_JOBLIST_SUCCESS:
      return {
        loading: false,
        memberApprovalJobList: action.payload.results,
        next: action.payload.next,
        previous: action.payload.previous,
        count: action.payload.count,
        success: true,
      };

    case MEMBER_APPROVAL_JOBLIST_FAILURE:
      return { loading: false, error: action.payload };

    case MEMBER_APPROVAL_JOBLIST_RESET:
      return { memberApprovalJobList: [] };

    default:
      return state;
  }
};

export const getMemberJobDetailsReducer = (
  state = { memberJobDetails: [] },
  action
) => {
  switch (action.type) {
    case MEMEBER_JOBDETAILS_REQUEST:
      return { ...state, loading: true };

    case MEMEBER_JOBDETAILS_SUCCESS:
      return {
        loading: false,
        memberJobDetails: action.payload,
        success: true,
      };

    case MEMEBER_JOBDETAILS_FAILURE:
      return { loading: false, error: action.payload };

    case MEMEBER_JOBDETAILS_RESET:
      return { memberJobDetails: [] };

    default:
      return state;
  }
};

export const MemberViewApproveReducer = (
  state = { memberApprove: {} },
  action
) => {
  switch (action.type) {
    case MEMBER_VIEWAPPROVE_REQUEST:
      return { loading: true };

    case MEMBER_VIEWAPPROVE_SUCCESS:
      return { loading: false, success: true, memberApprove: action.payload };

    case MEMBER_VIEWAPPROVE_FAILURE:
      return { loading: false, error: action.payload };

    // case UPDATE_JOB_RESET:
    //   return {};

    default:
      return state;
  }
};
