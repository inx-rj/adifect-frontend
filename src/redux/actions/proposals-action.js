import {
  PROPOSALS_LIST_REQUEST,
  PROPOSALS_LIST_SUCCESS,
  PROPOSALS_LIST_FAIL,
  REJECT_PROPOSAL_REQUEST,
  REJECT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_FAIL,
  ACCEPT_PROPOSAL_REQUEST,
  ACCEPT_PROPOSAL_SUCCESS,
  ACCEPT_PROPOSAL_FAIL,
  PROPOSALS_SEEN_REQUEST,
  PROPOSALS_SEEN_SUCCESS,
  PROPOSALS_SEEN_FAIL,
  PROPOSALS_SEEN_COUNT_REQUEST,
  PROPOSALS_SEEN_COUNT_SUCCESS,
  PROPOSALS_SEEN_COUNT_FAIL,
} from "../../constants/proposal-constants";

import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllProposals = (jobId) => async (dispatch) => {
  try {
    dispatch({
      type: PROPOSALS_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}job-proposal/${jobId}/`);

    dispatch({
      type: PROPOSALS_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: PROPOSALS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const proposalsSeen = (jobId) => async (dispatch) => {
  try {
    dispatch({
      type: PROPOSALS_SEEN_REQUEST,
    });

    const { data } = await api.put(`${BACKEND_API_URL}job-proposal/${jobId}/`);

    dispatch({
      type: PROPOSALS_SEEN_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: PROPOSALS_SEEN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const proposalsSeenCount = (jobId) => async (dispatch) => {
  try {
    dispatch({
      type: PROPOSALS_SEEN_COUNT_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}proposal-unseen-count/${jobId}/`
    );

    dispatch({
      type: PROPOSALS_SEEN_COUNT_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: PROPOSALS_SEEN_COUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const rejectJobPropsosal = (appliedId, params) => async (dispatch) => {
  try {
    dispatch({
      type: REJECT_PROPOSAL_REQUEST,
    });

    const { data } = await api.post(
      `${BACKEND_API_URL}job-proposal/${appliedId}/`,
      params
    );

    dispatch({
      type: REJECT_PROPOSAL_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: REJECT_PROPOSAL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const acceptJobProposal = (appliedId, params) => async (dispatch) => {
  try {
    dispatch({
      type: ACCEPT_PROPOSAL_REQUEST,
    });

    const { data } = await api.post(
      `${BACKEND_API_URL}job-proposal/${appliedId}/`,
      params
    );

    dispatch({
      type: ACCEPT_PROPOSAL_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: ACCEPT_PROPOSAL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
