import {
  WORKFLOW_STAGES_stage_LIST_REQUEST,
  WORKFLOW_STAGES_stage_LIST_SUCCESS,
  WORKFLOW_STAGES_stage_LIST_FAIL,
  WORKFLOW_STAGES_DELETE_stage_REQUEST,
  WORKFLOW_STAGES_DELETE_stage_SUCCESS,
  WORKFLOW_STAGES_DELETE_stage_FAIL,
  WORKFLOW_STAGES_DETAILS_REQUEST,
  WORKFLOW_STAGES_DETAILS_SUCCESS,
  WORKFLOW_STAGES_DETAILS_FAIL,
  // WORKFLOW_STAGES_DETAILS_RESET,
} from "../../constants/workflowstages-constant";
import { BACKEND_API_URL } from "../../environment";

import api from "../../utils/api";

export const workflowstagelistAllstages = () => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_STAGES_stage_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/stages/`);

    dispatch({
      type: WORKFLOW_STAGES_stage_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_STAGES_stage_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowstagedeletestage = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_STAGES_DELETE_stage_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}agency/stages/${id}`);

    dispatch({
      type: WORKFLOW_STAGES_DELETE_stage_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_STAGES_DELETE_stage_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowstagegetstageDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_STAGES_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/stages/${id}/`);

    dispatch({
      type: WORKFLOW_STAGES_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_STAGES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
