import {
  MEMBER_ADMIN_WORKFLOW_LIST_REQUEST,
  MEMBER_ADMIN_WORKFLOW_LIST_FAILURE,
  MEMBER_ADMIN_WORKFLOW_LIST_SUCCESS,
  MEMBER_ADMIN_WORKFLOW_DATA_DELETE_FAILURE,
  MEMBER_ADMIN_WORKFLOW_DATA_DELETE_REQUEST,
  MEMBER_ADMIN_WORKFLOW_DATA_DELETE_SUCCESS,
  MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_FAILURE,
  MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_REQUEST,
  MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_SUCCESS,
  MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_FAILURE,
  MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_REQUEST,
  MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_SUCCESS,
} from "../../constants/Member-Admin-workflow-constants";


export const memberAdminWorkflowReducer = (
  state = { memberAdmWorkf: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_WORKFLOW_LIST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_WORKFLOW_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberAdmWorkf: action.payload,
      };

    case MEMBER_ADMIN_WORKFLOW_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const memberAdminWorkflowDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_ADMIN_WORKFLOW_DATA_DELETE_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_WORKFLOW_DATA_DELETE_SUCCESS:
      return { loading: false, success: true };

    case MEMBER_ADMIN_WORKFLOW_DATA_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const memberAdminWorkflowApproverListReducer = (
  state = { memberAdmWorkfApr: [] },
  action
) => {
  switch (action.type) {
    case MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_REQUEST:
      return { loading: true };

    case MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        memberAdmWorkfApr: action.payload,
      };

    case  MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

  export const MemberAdminWorkflowApproverStagesDetailsReduce = (
    state = { MemberworkflowDetails: {} },
    action
  ) => {
    switch (action.type) {
      case MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_REQUEST:
        return { loading: true };
      case MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_SUCCESS:
        return {
          loading: false,
          success: true,
          MemberworkflowDetails: action.payload,
        };
      case MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_FAILURE:
        return { loading: false, error: action.payload };
      // case WORKFLOW_DETAILS_RESET:
      //   return { workflowDetails: {} };
      default:
        return state;
    }
  };