// 12 Oct 2022 workflow List
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

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";
import axios from "axios";

// 1number workflow List*******

export const allworkflowlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_WORKFLOW_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency-workflow-list/?company=${id}`,
      config
    );

    dispatch({
      type: ALL_WORKFLOW_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_WORKFLOW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// 2number company List*****

export const listAllCompanies = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_COMPANY_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency-company-list/?agency=${id}`,
      config
    );

    dispatch({
      type: ALL_COMPANY_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// 3number job List

export const listAllJobs =
  (id, agencyId, page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ALL_JOB_LIST_REQUEST,
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
        `${BACKEND_API_URL}agency-job-list/?user=${agencyId}&company=${id}&page=${page}`,
        config
      );

      dispatch({
        type: ALL_JOB_LIST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: ALL_JOB_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// 4number inviteuser List

export const AllInvite = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_INVITE_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency-invited-list/?company=${id}`,
      config
    );

    dispatch({
      type: ALL_INVITE_LIST_SUCCESS,
      payload: data?.data?.results,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ALL_INVITE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// BLockjobs***********

export const Blockjobs = (job_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_JOB_REQUEST,
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

    const { data } = await axios.post(
      `${BACKEND_API_URL}job-block/`,
      job_id,
      config
    );

    dispatch({
      type: BLOCK_JOB_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: BLOCK_JOB_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// BLockjobs***********

export const listAllStatus =
  (agencyId, id, status, page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INPROGRESS_JOB_LIST_REQUEST,
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
        // `${BACKEND_API_URL}agency-job-details/?status=${status}&job__company=${agencyId}&job__user=${id}&page=${page}`,
        `${BACKEND_API_URL}agency-job-details/?status=${status}&job__company=${agencyId}&job__user=${id}&ordering=-modified&page=${page}`,

        config
      );
      dispatch({
        type: INPROGRESS_JOB_LIST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: INPROGRESS_JOB_LIST_FAIL,

        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// BLock Company***********

export const blockCompanyAction =
  (company_id, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOCK_COMPANY_REQUEST,
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

      const { data } = await axios.post(
        `${BACKEND_API_URL}admin-company-block/`,
        company_id, status,
        config
      );

      dispatch({
        type: BLOCK_COMPANY_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: BLOCK_COMPANY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// BLock Company***********

// BLock workFlow***********

export const blockWorkflowAction = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_WORKFLOW_REQUEST,
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
      `${BACKEND_API_URL}workflows/update_blocked/${id}/`,
      params,
      config
    );

    dispatch({
      type: BLOCK_WORKFLOW_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: BLOCK_WORKFLOW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// BLock workFlow***********

// BLock workFlow***********
export const blockMemberAction = (params, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOCK_INVITE_MEMEBER_REQUEST,
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
      `${BACKEND_API_URL}agency-invited-list/${id}/`,
      params,
      config
    );

    dispatch({
      type: BLOCK_INVITE_MEMEBER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: BLOCK_INVITE_MEMEBER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// BLock workFlow***********



