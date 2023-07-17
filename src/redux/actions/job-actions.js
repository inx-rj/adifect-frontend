import {
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_LIST_FAIL,
  AVAILABLE_JOB_LIST_REQUEST,
  AVAILABLE_JOB_LIST_SUCCESS,
  AVAILABLE_JOB_LIST_FAIL,
  DELETE_JOB_REQUEST,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_FAIL,
  PUBLIC_JOB_DETAILS_REQUEST,
  PUBLIC_JOB_DETAILS_SUCCESS,
  PUBLIC_JOB_DETAILS_FAIL,
  AGENCY_JOB_LIST_REQUEST,
  AGENCY_JOB_LIST_SUCCESS,
  AGENCY_JOB_LIST_FAIL,
  LATEST_JOB_DETAILS_REQUEST,
  LATEST_JOB_DETAILS_SUCCESS,
  LATEST_JOB_DETAILS_FAIL,
  RELATED_JOBS_REQUEST,
  RELATED_JOBS_SUCCESS,
  RELATED_JOBS_FAIL,
  DRAFT_JOB_lIST_REQUEST,
  DRAFT_JOB_lIST_SUCCESS,
  DRAFT_JOB_lIST_FAIL,
  UPDATE_JOB_REQUEST,
  UPDATE_JOB_SUCCESS,
  UPDATE_JOB_FAIL,
  UPDATE_JOB_STATUS_REQUEST,
  UPDATE_JOB_STATUS_SUCCESS,
  UPDATE_JOB_STATUS_FAIL,
  SHARE_REQUEST,
  SHARE_SUCCESS,
  SHARE_FAIL,
  JOB_APPLIED_DETAILS_REQUEST,
  JOB_APPLIED_DETAILS_SUCCESS,
  JOB_APPLIED_DETAILS_FAIL,
  JOB_DETAILS_CREATOR_REQUEST,
  JOB_DETAILS_CREATOR_SUCCESS,
  JOB_DETAILS_CREATOR_FAIL,
  JOB_DETAILS_AGENCY_REQUEST,
  JOB_DETAILS_AGENCY_SUCCESS,
  JOB_DETAILS_AGENCY_FAIL,
  JOB_DETAILS_MEMBER_REQUEST,
  JOB_DETAILS_MEMBER_SUCCESS,
  JOB_DETAILS_MEMBER_FAIL,
  INDUSTRY_GET_DATA_REQUEST,
  INDUSTRY_GET_DATA_SUCCESS,
  INDUSTRY_GET_DATA_FAIL,
  AGENCY_INHOUSE_USERS_LIST_REQUEST,
  AGENCY_INHOUSE_USERS_LIST_SUCCESS,
  AGENCY_INHOUSE_USERS_LIST_FAIL,
  JOB_DETAILS_ADMIN_REQUEST,
  JOB_DETAILS_ADMIN_SUCCESS,
  JOB_DETAILS_ADMIN_FAIL,
  JOB_ADMIN_REQUEST,
  JOB_ADMIN_SUCCESS,
  JOB_ADMIN_FAIL,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_FAIL,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_REQUEST,
  ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_SUCCESS,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_FAIL,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_REQUEST,
  ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_SUCCESS,
  ADMIN_INHOUSE_USER_LIST_FAIL,
  ADMIN_INHOUSE_USER_LIST_REQUEST,
  ADMIN_INHOUSE_USER_LIST_SUCCESS,
  ADMIN_RELATED_JOBS_FAIL,
  ADMIN_RELATED_JOBS_REQUEST,
  ADMIN_RELATED_JOBS_SUCCESS,
  JOB_DETAILS_ADMIN_NEW_PAGE_FAIL,
  JOB_DETAILS_ADMIN_NEW_PAGE_REQUEST,
  JOB_DETAILS_ADMIN_NEW_PAGE_SUCCESS,
} from "../../constants/job-constants";

import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAgencyInHouseUsers =
  (companyId, params) => async (dispatch) => {
    try {
      dispatch({
        type: AGENCY_INHOUSE_USERS_LIST_REQUEST,
      });

      const { data } = await api.get(
        `${BACKEND_API_URL}agency/inhouse-user-list/?company=${companyId}`,
        params
      );

      dispatch({
        type: AGENCY_INHOUSE_USERS_LIST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_INHOUSE_USERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAllJobs = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: JOB_LIST_REQUEST,
    });
    let data = [];

    let page = formData.get("currentPage");
    let companyId = formData.get("headerCompany");
    let filter = formData.get("filter");
    let search = formData.get("search") ?? "";

    if (filter === "In Progress") {
      filter = `progress=True`;
    } else if (filter === "Expired") {
      filter = `expire=True`;
    } else if (filter === "Completed") {
      filter = `completed=True`;
    } else {
      filter = "";
    }

    if (companyId && companyId !== null && companyId !== "null") {
      data = await api.get(
        `${BACKEND_API_URL}jobs?page=${page}&company=${companyId}&${filter}&search=${search}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}jobs?page=${page}&${filter}&search=${search}`
      );
    }

    dispatch({
      type: JOB_LIST_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAllAvailableJobs = (page) => async (dispatch) => {
  try {
    dispatch({
      type: AVAILABLE_JOB_LIST_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}creator/available-jobs?page=${page}`
    );

    dispatch({
      type: AVAILABLE_JOB_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AVAILABLE_JOB_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPublicJobDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PUBLIC_JOB_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${BACKEND_API_URL}creator/public-job-api/${id}/`
    );

    dispatch({
      type: PUBLIC_JOB_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: PUBLIC_JOB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteJob = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_JOB_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}jobs/${id}`);

    dispatch({
      type: DELETE_JOB_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_JOB_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getJobDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}jobs/${id}/`);

    dispatch({
      type: JOB_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getJobDetailsCreator = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_CREATOR_REQUEST,
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
      `${BACKEND_API_URL}creator/available-jobs/${id}/`
    );

    dispatch({
      type: JOB_DETAILS_CREATOR_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_CREATOR_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getJobDetailsAgency = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_AGENCY_REQUEST,
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
      `${BACKEND_API_URL}agency/agency-jobs/${id}/`
    );

    dispatch({
      type: JOB_DETAILS_AGENCY_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_AGENCY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const getJobDetailsMember = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_MEMBER_REQUEST,
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
      `${BACKEND_API_URL}members/member-job-list/${id}/`
    );

    dispatch({
      type: JOB_DETAILS_MEMBER_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_MEMBER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const listAgencyJobs = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_JOB_LIST_REQUEST,
    });

    let data = [];

    let page = formData.get("currentPage");
    let companyId = formData.get("headerCompany");
    let filter = formData.get("filter");
    let search = formData.get("search") ?? "";

    if (filter === "Completed") {
      filter = `completed=True`;
    } else if (filter === "Expired") {
      filter = `expire=True`;
    } else if (filter === "In Progress") {
      filter = `progress=True`;
    } else {
      filter = "";
    }
    if (
      companyId &&
      companyId !== "null" &&
      companyId !== null &&
      companyId !== "undefined"
    ) {
      data = await api.get(
        `${BACKEND_API_URL}agency/agency-jobs/?page=${page}&${filter}&company=${companyId}&search=${search}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}agency/agency-jobs/?page=${page}&${filter}&search=${search}`
      );
    }

    dispatch({
      type: AGENCY_JOB_LIST_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_JOB_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const FreshJobs = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LATEST_JOB_DETAILS_REQUEST,
    });

    let data = [];

    const {
      authReducer: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (userData?.user?.user_level == 4) {
      data = await api.get(`${BACKEND_API_URL}members/member-latest-job/`);
    } else {
      data = await api.get(`${BACKEND_API_URL}latest-job/`, config);
    }

    dispatch({
      type: LATEST_JOB_DETAILS_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: LATEST_JOB_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getRelatedJobs = (title) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_JOBS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}related-jobs/${title}`);

    dispatch({
      type: RELATED_JOBS_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: RELATED_JOBS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const DraftJoblist = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: DRAFT_JOB_lIST_REQUEST,
    });

    let data = [];

    if (companyId) {
      data = await api.get(
        `${BACKEND_API_URL}agency/draft-jobs/?company=${companyId}`
      );
    } else {
      data = await api.get(`${BACKEND_API_URL}agency/draft-jobs/`);
    }

    dispatch({
      type: DRAFT_JOB_lIST_SUCCESS,
      payload: data?.data?.data?.results || data?.data?.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DRAFT_JOB_lIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateJob = (jobId, params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_JOB_REQUEST,
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

    const { data } = await axios.put(
      `${BACKEND_API_URL}jobs/${jobId}/`,
      params,
      config
    );

    dispatch({
      type: UPDATE_JOB_SUCCESS,
      payload: data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: UPDATE_JOB_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateJobStatus =
  (jobId, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_JOB_STATUS_REQUEST,
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

      const { data } = await axios.get(
        `${BACKEND_API_URL}job-status-update/${jobId}/${status}/`,
        config
      );

      dispatch({
        type: UPDATE_JOB_STATUS_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: UPDATE_JOB_STATUS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getShareDetails = (p_data) => async (dispatch) => {
  try {
    dispatch({
      type: SHARE_REQUEST,
    });

    const { data } = await api.post(`job-share-details/`, p_data);

    dispatch({
      type: SHARE_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: SHARE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getJobAppliedDetails = (jobAppliedId) => async (dispatch) => {
  try {
    dispatch({
      type: JOB_APPLIED_DETAILS_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}job-applied/${jobAppliedId}/`
    );

    dispatch({
      type: JOB_APPLIED_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_APPLIED_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getIndustryDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INDUSTRY_GET_DATA_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}agency/industries`);

    dispatch({
      type: INDUSTRY_GET_DATA_SUCCESS,
      payload: data?.data?.results || data?.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: INDUSTRY_GET_DATA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getJobDetailsAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_DETAILS_ADMIN_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}jobs/${id}/`);

    dispatch({
      type: JOB_DETAILS_ADMIN_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_ADMIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getJobDetailsAdminNewPageAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: JOB_DETAILS_ADMIN_NEW_PAGE_REQUEST,
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

      const { data } = await api.get(`${BACKEND_API_URL}jobs/${id}/`);

      dispatch({
        type: JOB_DETAILS_ADMIN_NEW_PAGE_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: JOB_DETAILS_ADMIN_NEW_PAGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getJobAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: JOB_ADMIN_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}jobs/${id}/`);

    dispatch({
      type: JOB_ADMIN_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: JOB_ADMIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const SuperAdminJobListInProgressAction =
  ({ id, status, ordering }) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_REQUEST,
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
          `${BACKEND_API_URL}jobs/?&company=${id}&job_applied__status=${status}&ordering=${ordering}`,
          config
        );
        dispatch({
          type: ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_SUCCESS,
          payload: data,
        });
        // return true;
      } catch (error) {
        if (error?.response?.data) {
          dispatch({
            type: ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response.data,
          });
        }
      }
    };

export const SuperAdminJobListInReviewAction =
  ({ id, status, ordering }) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_REQUEST,
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
          `${BACKEND_API_URL}jobs/?&company=${id}&job_applied__status=${status}&ordering=${ordering}`,
          config
        );
        dispatch({
          type: ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_SUCCESS,
          payload: data,
        });
        // return true;
      } catch (error) {
        if (error?.response?.data) {
          dispatch({
            type: ADMIN_DASHBOARD_IN_REVIEW_JOBLIST_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.response.data,
          });
        }
      }
    };

export const listAdminInHouseUsers = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_INHOUSE_USER_LIST_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}inhouse-user-list/?company=${companyId}`
    );

    dispatch({
      type: ADMIN_INHOUSE_USER_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_INHOUSE_USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAdminRelatedJobs = (title) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_RELATED_JOBS_REQUEST,
    });
    const { data } = await api.get(
      `${BACKEND_API_URL}admin-related-jobs/${title}/`
    );

    dispatch({
      type: ADMIN_RELATED_JOBS_SUCCESS,
      payload: data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: ADMIN_RELATED_JOBS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
