// 12 Oct 2022 workflow List
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

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";
import axios from "axios";

// 1number workflow List*******

export const allworkflowlistconpany = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_WORKFLOW_COMPANY_LIST_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/works-flow/?company=${id}`,
      config
    );

    dispatch({
      type: ALL_WORKFLOW_COMPANY_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_WORKFLOW_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// 2number company List*****

export const listAllCompaniesdata = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_COMPANY_LIST_COMPANY_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/agency-jobs/?company=${id}`,
      config
    );

    dispatch({
      type: ALL_COMPANY_LIST_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_COMPANY_LIST_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// 3number job List

export const listcompanyAllJobs = (id, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_JOB_COMPANY_LIST_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/agency-jobs/?company=${id}&page=${page}`,
      config
    );

    dispatch({
      type: ALL_JOB_COMPANY_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_JOB_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// 4number inviteuser List

export const AllIcompanynvite = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_INVITE_COMPANY_LIST_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/invite-member/?company=${id}`,
      config
    );

    dispatch({
      type: ALL_INVITE_COMPANY_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_INVITE_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteMedmberlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_INVITE_LIST_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.delete(
      `${BACKEND_API_URL}agency/invite-member/${id}`,
      config
    );

    dispatch({
      type: DELETE_INVITE_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_INVITE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const blockMemberAction = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_AGENCY_MEMEBER_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.put(
      `${BACKEND_API_URL}agency/invite-member/update_blocked/${id}/`,
      params,
      config
    );

    dispatch({
      type: BLOCK_AGENCY_MEMEBER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: BLOCK_AGENCY_MEMEBER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
