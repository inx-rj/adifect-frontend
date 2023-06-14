import {
  WORKFLOW_STAGES_stage_LIST_REQUEST,
  WORKFLOW_STAGES_stage_LIST_SUCCESS,
  WORKFLOW_STAGES_stage_LIST_FAIL,
  WORKFLOW_STAGES_DETAILS_REQUEST,
  WORKFLOW_STAGES_DETAILS_SUCCESS,
  WORKFLOW_STAGES_DETAILS_FAIL,
  WORKFLOW_STAGES_DETAILS_RESET,
  WORKFLOW_STAGES_DELETE_stage_REQUEST,
  WORKFLOW_STAGES_DELETE_stage_SUCCESS,
  WORKFLOW_STAGES_DELETE_stage_FAIL,
} from "../../constants/workflowstages-constant";

const initialState = {
  stagesData: [],
  loading: null,
};

export const workflowstagestageReducer = (state = initialState, action) => {
  switch (action.type) {
    case WORKFLOW_STAGES_stage_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WORKFLOW_STAGES_stage_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        stagesData: action.payload,
        success: true,
      };
    case WORKFLOW_STAGES_stage_LIST_FAIL:
      return {
        ...state,
        loading: false,
        stagesData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const workflowstagestageDetailsReducer = (
  state = { stageDetails: {} },
  action
) => {
  switch (action.type) {
    case WORKFLOW_STAGES_DETAILS_REQUEST:
      return { loading: true };
    case WORKFLOW_STAGES_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        stageDetails: action.payload,
      };
    case WORKFLOW_STAGES_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WORKFLOW_STAGES_DETAILS_RESET:
      return { stageDetails: {} };
    default:
      return state;
  }
};

export const workflowstagestageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKFLOW_STAGES_DELETE_stage_REQUEST:
      return { loading: true };

    case WORKFLOW_STAGES_DELETE_stage_SUCCESS:
      return { loading: false, success: true };

    case WORKFLOW_STAGES_DELETE_stage_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
