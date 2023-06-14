import {
  WORKFLOW_LIST_REQUEST,
  WORKFLOW_LIST_SUCCESS,
  WORKFLOW_LIST_FAIL,
  WORKFLOW_ADMIN_ADD_REQUEST,
  WORKFLOW_ADMIN_ADD_SUCCESS,
  WORKFLOW_ADMIN_ADD_FAIL,
  WORKFLOW_ADMIN_ADD_RESET,
  WORKFLOW_ADMIN_EDIT_REQUEST,
  WORKFLOW_ADMIN_EDIT_SUCCESS,
  WORKFLOW_ADMIN_EDIT_FAIL,
  ADMIN_WORKFLOW_LIST_REQUEST,
  ADMIN_WORKFLOW_LIST_SUCCESS,
  ADMIN_WORKFLOW_LIST_FAIL,
  ADMIN_WORKFLOW_LIST_RESET,
  WORKFLOW_DETAILS_REQUEST,
  WORKFLOW_DETAILS_SUCCESS,
  WORKFLOW_DETAILS_FAIL,
  WORKFLOW_MAIN_DETAILS_REQUEST,
  WORKFLOW_MAIN_DETAILS_SUCCESS,
  WORKFLOW_MAIN_DETAILS_FAIL,
  WORKFLOW_DETAILS_RESET,
  WORKFLOW_DELETE_REQUEST,
  WORKFLOW_DELETE_SUCCESS,
  WORKFLOW_DELETE_FAIL,
  WORKFLOW_MEMBER_LIST_REQUEST,
  WORKFLOW_MEMBER_LIST_SUCCESS,
  WORKFLOW_MEMBER_LIST_FAIL,
  WORKFLOW_MEMBER_LIST_APPROVERS_REQUEST,
  WORKFLOW_MEMBER_LIST_APPROVERS_SUCCESS,
  WORKFLOW_MEMBER_LIST_APPROVERS_FAIL,
  WORKFLOW_STAGE_DELETE_REQUEST,
  WORKFLOW_STAGE_DELETE_SUCCESS,
  WORKFLOW_STAGE_DELETE_FAIL,
} from "../../constants/Workflow-constants";

const initialState = {
  workflowData: [],
  workflowMemberData: [],
  loading: null,
};

export const workflowReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKFLOW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WORKFLOW_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        workflowData: action.payload,
        success: true,
      };
    case WORKFLOW_LIST_FAIL:
      return {
        ...state,
        loading: false,
        workflowData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const workflowAdminReducer = (state = { workflowData: [] }, action) => {
  switch (action.type) {
    case ADMIN_WORKFLOW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_WORKFLOW_LIST_SUCCESS:
      return {
        loading: false,
        workflowData: action.payload,
        success: true,
      };
    case ADMIN_WORKFLOW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ADMIN_WORKFLOW_LIST_RESET:
      return {
        workflowData: [],
      };
    default:
      return state;
  }
};

export const workflowMemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKFLOW_MEMBER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WORKFLOW_MEMBER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        workflowMemberData: action.payload,
        success: true,
      };
    case WORKFLOW_MEMBER_LIST_FAIL:
      return {
        ...state,
        loading: false,
        workflowMemberData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const workflowMemberApproversReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case WORKFLOW_MEMBER_LIST_APPROVERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WORKFLOW_MEMBER_LIST_APPROVERS_SUCCESS:
      return {
        ...state,
        loading: false,
        workflowMemberApproversData: action.payload,
        success: true,
      };
    case WORKFLOW_MEMBER_LIST_APPROVERS_FAIL:
      return {
        ...state,
        loading: false,
        workflowMemberApproversData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const workflowDetailsReducer = (
  state = { workflowDetails: {} },
  action
) => {
  switch (action.type) {
    case WORKFLOW_DETAILS_REQUEST:
      return { loading: true };
    case WORKFLOW_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        workflowDetails: action.payload,
      };
    case WORKFLOW_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WORKFLOW_DETAILS_RESET:
      return { workflowDetails: {} };
    default:
      return state;
  }
};

export const adminWorkflowAddReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKFLOW_ADMIN_ADD_REQUEST:
      return { loading: true };

    case WORKFLOW_ADMIN_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        workflowAdd: action.payload,
        message: action.payload.message,
      };

    case WORKFLOW_ADMIN_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
        message: action.payload.message,
      };
    case WORKFLOW_ADMIN_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const adminWorkflowEditReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKFLOW_ADMIN_EDIT_REQUEST:
      return { loading: true };

    case WORKFLOW_ADMIN_EDIT_SUCCESS:
      return {
        loading: false,
        workflowEdit: action.payload,
      };

    case WORKFLOW_ADMIN_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workflowMainDetailsReducer = (
  state = { workflowMainDetails: {} },
  action
) => {
  switch (action.type) {
    case WORKFLOW_MAIN_DETAILS_REQUEST:
      return { loading: true };
    case WORKFLOW_MAIN_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        workflowMainDetails: action.payload,
      };
    case WORKFLOW_MAIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workflowDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKFLOW_DELETE_REQUEST:
      return { loading: true };

    case WORKFLOW_DELETE_SUCCESS:
      return { loading: false, success: true };

    case WORKFLOW_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const workflowStageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKFLOW_STAGE_DELETE_REQUEST:
      return { loading: true };

    case WORKFLOW_STAGE_DELETE_SUCCESS:
      return { loading: false, successDeleteStage: true };

    case WORKFLOW_STAGE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
