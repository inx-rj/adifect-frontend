import {
  MEMBER_JOBLIST_FAILURE,
  MEMBER_JOBLIST_REQUEST,
  MEMBER_JOBLIST_SUCCESS,
  MEMBER_APPROVAL_JOBLIST_FAILURE,
  MEMBER_APPROVAL_JOBLIST_REQUEST,
  MEMBER_APPROVAL_JOBLIST_SUCCESS,
  MEMEBER_JOBDETAILS_FAILURE,
  MEMEBER_JOBDETAILS_REQUEST,
  MEMEBER_JOBDETAILS_SUCCESS,
  MEMBER_VIEWAPPROVE_FAILURE,
  MEMBER_VIEWAPPROVE_REQUEST,
  MEMBER_VIEWAPPROVE_SUCCESS,
} from "../../constants/activity-constants";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const getMemberJobListAction = (page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_JOBLIST_REQUEST,
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
      `${BACKEND_API_URL}agency/member-job-list/?page=${page}`
    );

    dispatch({
      type: MEMBER_JOBLIST_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_JOBLIST_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getMemberApprovalJobList =
  (page) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_APPROVAL_JOBLIST_REQUEST,
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
        `${BACKEND_API_URL}members/member-approval-job-list/?page=${page}`
      );

      dispatch({
        type: MEMBER_APPROVAL_JOBLIST_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_APPROVAL_JOBLIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getMemberJobDetailsAction =
  (id, user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMEBER_JOBDETAILS_REQUEST,
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
        // `${BACKEND_API_URL}member-work-approval?approver=132&status=0&job_work__job_applied__job=${id}`
        `${BACKEND_API_URL}member-work-approval?approver__user__user=${user}&status=0&job_work__job_applied__job=${id}`
      );

      dispatch({
        type: MEMEBER_JOBDETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMEBER_JOBDETAILS_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberViewApproveAction =
  (jobId, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_VIEWAPPROVE_REQUEST,
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
        `${BACKEND_API_URL}member-work-approval/${jobId}/
          `,
        params,
        config
      );

      dispatch({
        type: MEMBER_VIEWAPPROVE_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_VIEWAPPROVE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
