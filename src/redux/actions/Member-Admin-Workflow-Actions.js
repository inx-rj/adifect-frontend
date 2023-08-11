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
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const memberAdminWorkflowAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_LIST_REQUEST,
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

    // const { data } = await api.get(`${BACKEND_API_URL}members/workflow/
    //     `);

    const { data } = await api.get(
      `${BACKEND_API_URL}members/workflow/?company=${id}`
    );

    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_LIST_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_LIST_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const memberAdminWorkflowDeleteAction = (id) => async (dispatch,getState) => {
  try {
    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_DATA_DELETE_REQUEST,
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
      `${BACKEND_API_URL}members/workflow/${id}`,config
      );

    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_DATA_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    if(error && error.response){
    dispatch({
      type: MEMBER_ADMIN_WORKFLOW_DATA_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  }
};

export const memberAdminWorkflowApproverListAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_REQUEST,
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

      // const { data } = await api.get(`${BACKEND_API_URL}members/workflow/
      //     `);

      const { data } = await api.get(
        `${BACKEND_API_URL}members/members-invite-member-list/?company=${id}`
      );

      dispatch({
        type: MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_W0RKFLOW_APPROVER_LIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberAdminWorkflowApproverStagesDetailsAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_REQUEST,
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
        `${BACKEND_API_URL}members/admin-workflow-stages/?workflow=${id}`,
        config
      );

      dispatch({
        type: MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_WORKFLOW_APPROVER_STAGES_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
