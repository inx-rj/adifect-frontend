import {
  WORKFLOW_LIST_REQUEST,
  WORKFLOW_LIST_SUCCESS,
  WORKFLOW_LIST_FAIL,
  WORKFLOW_ADMIN_ADD_REQUEST,
  WORKFLOW_ADMIN_ADD_SUCCESS,
  WORKFLOW_ADMIN_ADD_FAIL,
  WORKFLOW_ADMIN_EDIT_REQUEST,
  WORKFLOW_ADMIN_EDIT_SUCCESS,
  WORKFLOW_ADMIN_EDIT_FAIL,
  ADMIN_WORKFLOW_LIST_REQUEST,
  ADMIN_WORKFLOW_LIST_SUCCESS,
  ADMIN_WORKFLOW_LIST_FAIL,
  WORKFLOW_DELETE_REQUEST,
  WORKFLOW_DELETE_SUCCESS,
  WORKFLOW_DELETE_FAIL,
  WORKFLOW_DETAILS_REQUEST,
  WORKFLOW_DETAILS_SUCCESS,
  WORKFLOW_DETAILS_FAIL,
  WORKFLOW_MAIN_DETAILS_REQUEST,
  WORKFLOW_MAIN_DETAILS_SUCCESS,
  WORKFLOW_MAIN_DETAILS_FAIL,
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

import { BACKEND_API_URL } from "../../environment";

import api from "../../utils/api";
import axios from "axios";

export const workflowlistAll = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_LIST_REQUEST,
    });

    let data = [];

    if (companyId) {
      data = await api.get(
        `${BACKEND_API_URL}agency/works-flow/?company=${companyId}`
      );
    } else {
      data = await api.get(`${BACKEND_API_URL}agency/works-flow/`);
    }

    dispatch({
      type: WORKFLOW_LIST_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminWorkflowAdd = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKFLOW_ADMIN_ADD_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.post(
      `${BACKEND_API_URL}workflows/`,
      params,
      config
    );

    dispatch({
      type: WORKFLOW_ADMIN_ADD_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_ADMIN_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminWorkflowEdit = (id, params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKFLOW_ADMIN_EDIT_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.put(
      `${BACKEND_API_URL}workflows/${id}/`,
      params,
      config
    );

    dispatch({
      type: WORKFLOW_ADMIN_EDIT_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_ADMIN_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowAdminlistAll = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_WORKFLOW_LIST_REQUEST,
    });

    let data = [];

    if (companyId) {
      data = await api.get(`${BACKEND_API_URL}workflows/?company=${companyId}`);
    } else {
      data = await api.get(`${BACKEND_API_URL}workflows/`);
    }
    dispatch({
      type: ADMIN_WORKFLOW_LIST_SUCCESS,
      payload: data?.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_WORKFLOW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data,
    });
  }
};

export const workflowinvitememberlist = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_MEMBER_LIST_REQUEST,
    });

    let data;
    if (companyId) {
      data = await api.get(
        `${BACKEND_API_URL}agency/invite-member-list?company=${companyId}`
      );
    } else {
      data = await api.get(`${BACKEND_API_URL}agency/invite-member-list/`);
    }

    dispatch({
      type: WORKFLOW_MEMBER_LIST_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_MEMBER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowinvitememberlistapprovers =
  (companyId) => async (dispatch) => {
    try {
      dispatch({
        type: WORKFLOW_MEMBER_LIST_APPROVERS_REQUEST,
      });

      let data;
      if (companyId) {
        data = await api.get(
          `${BACKEND_API_URL}agency/invite-member-list?level=3&company=${companyId}`
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}agency/invite-member-list?level=3`
        );
      }

      dispatch({
        type: WORKFLOW_MEMBER_LIST_APPROVERS_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: WORKFLOW_MEMBER_LIST_APPROVERS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const workflowdelete = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_DELETE_REQUEST,
    });
    const { data } = await api.delete(
      `${BACKEND_API_URL}agency/works-flow/${id}`
    );

    dispatch({
      type: WORKFLOW_DELETE_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowgetMainDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_MAIN_DETAILS_REQUEST,
    });
    const { data } = await api.get(`${BACKEND_API_URL}agency/works-flow/${id}`);

    dispatch({
      type: WORKFLOW_MAIN_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_MAIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowgetDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_DETAILS_REQUEST,
    });
    const { data } = await api.get(
      `${BACKEND_API_URL}agency/works-flow-stages/?workflow=${id}`
    );

    dispatch({
      type: WORKFLOW_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowStageDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKFLOW_STAGE_DELETE_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const { data } = await axios.delete(
      `${BACKEND_API_URL}agency/works-flow-stages/${id}/`,
      config
    );

    dispatch({
      type: WORKFLOW_STAGE_DELETE_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_STAGE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const workflowdelete1 = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKFLOW_DELETE_REQUEST,
    });

    const { data } = await api.delete(
      `${BACKEND_API_URL}agency/workflow/stage/${id}`
    );

    dispatch({
      type: WORKFLOW_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: WORKFLOW_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
