import {
  CREATOR_ACTIVITY_REQUEST,
  CREATOR_ACTIVITY_SUCCESS,
  CREATOR_ACTIVITY_FAIL,
  AGENCY_ACTIVITY_REQUEST,
  AGENCY_ACTIVITY_SUCCESS,
  AGENCY_ACTIVITY_FAIL,
  MEMBER_ACTIVITY_REQUEST,
  MEMBER_ACTIVITY_SUCCESS,
  MEMBER_ACTIVITY_FAIL,
  ADMIN_ACTIVITY_REQUEST,
  ADMIN_ACTIVITY_SUCCESS,
  ADMIN_ACTIVITY_FAIL,
  POST_ACTIVITY_CHAT_REQUEST,
  POST_ACTIVITY_CHAT_SUCCESS,
  POST_ACTIVITY_CHAT_FAIL,
  CREATOR_ACTIVITY_JOBSUBMIT_REQUEST,
  CREATOR_ACTIVITY_JOBSUBMIT_SUCCESS,
  CREATOR_ACTIVITY_JOBSUBMIT_FAIL,
  CREATOR_APPLIED_JOBID_REQUEST,
  CREATOR_APPLIED_JOBID_SUCCESS,
  CREATOR_APPLIED_JOBID_FAIL,
  JOB_SUBMIT_STATUS_REQUEST,
  JOB_SUBMIT_STATUS_SUCCESS,
  JOB_SUBMIT_STATUS_FAIL,
  IS_APPROVAL_REJECTED_STATUS_REQUEST,
  IS_APPROVAL_REJECTED_STATUS_SUCCESS,
  IS_APPROVAL_REJECTED_STATUS_FAIL,
  INVITED_USERS_LIST_REQUEST,
  INVITED_USERS_LIST_SUCCESS,
  INVITED_USERS_LIST_FAIL,
  GET_JOB_COMPLETED_USERS_REQUEST,
  GET_JOB_COMPLETED_USERS_SUCCESS,
  GET_JOB_COMPLETED_USERS_FAIL,
  COMPLETE_JOB_ACTIVITY_REQUEST,
  COMPLETE_JOB_ACTIVITY_SUCCESS,
  COMPLETE_JOB_ACTIVITY_FAIL,
  COMPLETED_JOB_LIST_REQUEST,
  COMPLETED_JOB_LIST_SUCCESS,
  COMPLETED_JOB_LIST_FAIL,
  AGENCY_ACTIVITY_RATING_FAILURE,
  AGENCY_ACTIVITY_RATING_REQUEST,
  AGENCY_ACTIVITY_RATING_SUCCESS,
  CREATOR_ACTIVITY_GET_RATING_FAILURE,
  CREATOR_ACTIVITY_GET_RATING_REQUEST,
  CREATOR_ACTIVITY_GET_RATING_SUCCESS,
  CREATOR_ACTIVITY_RATING_FAILURE,
  CREATOR_ACTIVITY_RATING_REQUEST,
  CREATOR_ACTIVITY_RATING_SUCCESS,
} from "../../constants/activity-constants";

import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const getCreatorActivityDetails =
  (jobId, order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATOR_ACTIVITY_REQUEST,
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
        `${BACKEND_API_URL}creator/job-activity?job=${jobId}&ordering=${order}`,
        config
      );
      dispatch({
        type: CREATOR_ACTIVITY_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: CREATOR_ACTIVITY_FAIL,
          payload:
            error.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error.response.data,
        });
      }
    }
  };

export const getAgencyActivityDetails =
  (jobId, order, user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_ACTIVITY_REQUEST,
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

      let data = [];
      if (user) {
        data = await api.get(
          `${BACKEND_API_URL}job-activity/?job=${jobId}&ordering=${order}&user=${user}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}job-activity/?job=${jobId}&ordering=${order}`,
          config
        );
      }
      dispatch({
        type: AGENCY_ACTIVITY_SUCCESS,
        payload: data.data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_ACTIVITY_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  };

export const getMemberActivityDetails =
  (jobId, order, user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ACTIVITY_REQUEST,
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

      let data = [];
      if (user) {
        data = await api.get(
          `${BACKEND_API_URL}agency/job-activity-member?job=${jobId}&ordering=${order}&user=${user}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}agency/job-activity-member?job=${jobId}&ordering=${order}`,
          config
        );
      }
      dispatch({
        type: MEMBER_ACTIVITY_SUCCESS,
        payload: data.data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ACTIVITY_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  };

export const getAdminActivityDetails =
  (agencyId, jobId, order, user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_ACTIVITY_REQUEST,
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

      let data = [];
      if (user) {
        data = await api.get(
          `${BACKEND_API_URL}admin-job-activity/?job__user=${agencyId}&job=${jobId}&ordering=${order}&user=${user}`,
          config
        );
      } else {
        data = await api.get(
          `${BACKEND_API_URL}admin-job-activity/?job__user=${agencyId}&job=${jobId}&ordering=${order}`,
          config
        );
      }
      dispatch({
        type: ADMIN_ACTIVITY_SUCCESS,
        payload: data.data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_ACTIVITY_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  };

export const postActivityChat = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_ACTIVITY_CHAT_REQUEST,
    });

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await api.post(
      `${BACKEND_API_URL}job-activity/`,
      params,
      config
    );
    dispatch({
      type: POST_ACTIVITY_CHAT_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: POST_ACTIVITY_CHAT_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  }
};

export const creatorAppliedJobIdAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATOR_APPLIED_JOBID_REQUEST,
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
      `${BACKEND_API_URL}creator/job-applied/?job=${id}`,
      config
    );

    dispatch({
      type: CREATOR_APPLIED_JOBID_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: CREATOR_APPLIED_JOBID_FAIL,
      payload:
        error.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error.message,
    });
  }
};

export const creatorActivityJobSubmitAction =
  (passData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATOR_ACTIVITY_JOBSUBMIT_REQUEST,
      });

      const {
        authReducer: { userData },
      } = getState();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const ifPutMethod = passData.get("put");
      const putId = passData.get("putId");

      let data = [];
      if (ifPutMethod) {
        data = await api.put(
          `${BACKEND_API_URL}submit-job-work/${putId}/`,
          passData,
          config
        );
      } else {
        data = await api.post(`${BACKEND_API_URL}submit-job-work/`, passData, config);
      }

      dispatch({
        type: CREATOR_ACTIVITY_JOBSUBMIT_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: CREATOR_ACTIVITY_JOBSUBMIT_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.message,
      });
    }
  };

export const getJobSubmitStatus = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_SUBMIT_STATUS_REQUEST,
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

    const { data } = await api.post(
      `${BACKEND_API_URL}job-work-status/`,
      params,
      config
    );
    dispatch({
      type: JOB_SUBMIT_STATUS_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    if (error?.response?.data) {
      dispatch({
        type: JOB_SUBMIT_STATUS_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  }
};

export const isApprovalRejectedStatus =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: IS_APPROVAL_REJECTED_STATUS_REQUEST,
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
      const { data } = await api.post(
        `${BACKEND_API_URL}creator/get-resubmit-work/`,
        params,
        config
      );
      dispatch({
        type: IS_APPROVAL_REJECTED_STATUS_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: IS_APPROVAL_REJECTED_STATUS_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  };

export const getInvitedUsersList = (jobId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVITED_USERS_LIST_REQUEST,
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
      `${BACKEND_API_URL}job-activity-users/${jobId}/`,
      config
    );
    dispatch({
      type: INVITED_USERS_LIST_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: INVITED_USERS_LIST_FAIL,
      payload:
        error.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error.response.data,
    });
  }
};

export const getJobCompletedUsers = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_JOB_COMPLETED_USERS_REQUEST,
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
    const { data } = await api.post(
      `${BACKEND_API_URL}job-completed-status/`,
      params,
      config
    );
    dispatch({
      type: GET_JOB_COMPLETED_USERS_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: GET_JOB_COMPLETED_USERS_FAIL,
      payload:
        error.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error.response.data,
    });
  }
};

export const completeJobActivity =
  (job_applied_id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPLETE_JOB_ACTIVITY_REQUEST,
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
        `${BACKEND_API_URL}completed-job/${job_applied_id}/`,
        params,
        config
      );
      dispatch({
        type: COMPLETE_JOB_ACTIVITY_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: COMPLETE_JOB_ACTIVITY_FAIL,
        payload:
          error.response && error?.response?.data?.message
            ? error?.response?.data?.message
            : error.response.data,
      });
    }
  };

export const getCompletedTaskList = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPLETED_JOB_LIST_REQUEST,
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
    const { data } = await api.post(
      `${BACKEND_API_URL}creator/get-task-list/`,
      params,
      config
    );
    dispatch({
      type: COMPLETED_JOB_LIST_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: COMPLETED_JOB_LIST_FAIL,
      payload:
        error.response && error?.response?.data?.message
          ? error?.response?.data?.message
          : error.response.data,
    });
  }
};

export const AgencyActivityRatingAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_ACTIVITY_RATING_REQUEST,
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

      const { data } = await api.post(
        `${BACKEND_API_URL}agency/job-feedback/`,
        params,
        config
      );
      dispatch({
        type: AGENCY_ACTIVITY_RATING_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: AGENCY_ACTIVITY_RATING_FAILURE,
          payload:
            error.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error.response.data,
        });
      }
    }
  };

export const CreatorActivityGetRatingAction =
  (AppliedjobId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATOR_ACTIVITY_GET_RATING_REQUEST,
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
        `${BACKEND_API_URL}creator/job-feedback/?job=${AppliedjobId}&sender_user=${userData?.user?.user_id}`,
        config
      );
      dispatch({
        type: CREATOR_ACTIVITY_GET_RATING_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: CREATOR_ACTIVITY_GET_RATING_FAILURE,
          payload:
            error.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error.response.data,
        });
      }
    }
  };

export const CreatorActivityRatingAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATOR_ACTIVITY_RATING_REQUEST,
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

      const { data } = await api.post(
        `${BACKEND_API_URL}creator/job-feedback/`,
        params,
        config
      );
      dispatch({
        type: CREATOR_ACTIVITY_RATING_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: CREATOR_ACTIVITY_RATING_FAILURE,
          payload:
            error.response && error?.response?.data?.message
              ? error?.response?.data?.message
              : error.response.data,
        });
      }
    }
  };
