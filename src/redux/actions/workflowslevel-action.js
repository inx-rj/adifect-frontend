import {
    WORKFLOW_level_LIST_REQUEST,
    WORKFLOW_level_LIST_SUCCESS,
    WORKFLOW_level_LIST_FAIL,
    WORKFLOW_DELETE_level_REQUEST,
    WORKFLOW_DELETE_level_SUCCESS,
    WORKFLOW_DELETE_level_FAIL,
    WORKFLOW_level_DETAILS_REQUEST,
    WORKFLOW_level_DETAILS_SUCCESS,
    WORKFLOW_level_DETAILS_FAIL,
  } from "../../constants/workflowslevel-constants";
import { BACKEND_API_URL } from "../../environment";
  
  import api from "../../utils/api";
  
  export const workflowlistAlllevels = () => async (dispatch) => {
    try {
      dispatch({
        type: WORKFLOW_level_LIST_REQUEST,
      });
  
      const { data } = await api.get(`${BACKEND_API_URL}agency/levels`);
  
      dispatch({
        type: WORKFLOW_level_LIST_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: WORKFLOW_level_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const workflowdeletelevel = (id) => async (dispatch) => {
    try {
      dispatch({
        type: WORKFLOW_DELETE_level_REQUEST,
      });
  
      const { data } = await api.delete(`${BACKEND_API_URL}agency/levels/${id}`);
  
      dispatch({
        type: WORKFLOW_DELETE_level_SUCCESS,
        payload: data,
      });
  
      return true;
    } catch (error) {
      dispatch({
        type: WORKFLOW_DELETE_level_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const workflowgetlevelDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: WORKFLOW_level_DETAILS_REQUEST,
      });
  
      const { data } = await api.get(`${BACKEND_API_URL}agency/levels/${id}/`);
  
      dispatch({
        type: WORKFLOW_level_DETAILS_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type:  WORKFLOW_level_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  