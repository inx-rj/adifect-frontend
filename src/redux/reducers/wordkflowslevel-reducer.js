import {
    WORKFLOW_level_LIST_REQUEST,
    WORKFLOW_level_LIST_SUCCESS,
    WORKFLOW_level_LIST_FAIL,
    WORKFLOW_level_DETAILS_REQUEST,
    WORKFLOW_level_DETAILS_SUCCESS,
    WORKFLOW_level_DETAILS_FAIL,
    WORKFLOW_level_DETAILS_RESET,
    WORKFLOW_DELETE_level_REQUEST,
    WORKFLOW_DELETE_level_SUCCESS,
    WORKFLOW_DELETE_level_FAIL,
  } from "../../constants/workflowslevel-constants";
  
  const initialState = {
    levelData: [],
    loading: null,
  };
  
  export const workflowlevelReducer = (state = initialState, action) => {
    switch (action.type) {
      case WORKFLOW_level_LIST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case WORKFLOW_level_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          levelData: action.payload,
          success: true,
        };
      case   WORKFLOW_level_LIST_FAIL:
        return {
          ...state,
          loading: false,
          levelData: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const workflowlevelDetailsReducer = (state = { levelDetails: {} }, action) => {
    switch (action.type) {
      case WORKFLOW_level_DETAILS_REQUEST:
        return { loading: true };
      case WORKFLOW_level_DETAILS_SUCCESS:
        return {
          loading: false,
          success: true,
          levelDetails: action.payload,
        };
      case WORKFLOW_level_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case WORKFLOW_level_DETAILS_RESET:
        return { levelDetails: {} };
      default:
        return state;
    }
  };
  
  export const workflowlevelDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case WORKFLOW_DELETE_level_REQUEST:
        return { loading: true };
  
      case WORKFLOW_DELETE_level_SUCCESS:
        return { loading: false, success: true };
  
      case WORKFLOW_DELETE_level_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  