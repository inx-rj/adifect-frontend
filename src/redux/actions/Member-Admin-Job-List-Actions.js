import {
  MEMBER_ADMIN_JOB_LIST_REQUEST,
  MEMBER_ADMIN_JOB_LIST_FAILURE,
  MEMBER_ADMIN_JOB_LIST_SUCCESS,
  MEMBER_ADMIN_JOB_LIST_DELETE_FAILURE,
  MEMBER_ADMIN_JOB_LIST_DELETE_REQUEST,
  MEMBER_ADMIN_JOB_LIST_DELETE_SUCCESS,
  MEMBER_ADMIN_GET_JOB_DETAILS_FAILURE,
  MEMBER_ADMIN_GET_JOB_DETAILS_REQUEST,
  MEMBER_ADMIN_GET_JOB_DETAILS_SUCCESS,
  MEMBER_ADMIN_GET_DRAFT_JOB_FAILURE,
  MEMBER_ADMIN_GET_DRAFT_JOB_REQUEST,
  MEMBER_ADMIN_GET_DRAFT_JOB_SUCCESS,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_FAILURE,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_REQUEST,
  MEMBER_ADMIN_DRAFT_JOB_DELETE_SUCCESS,
  MEMBER_INHOUSE_JOB_LIST_REQUEST,
  MEMBER_INHOUSE_JOB_LIST_SUCCESS,
  MEMBER_INHOUSE_JOB_LIST_FAILURE,
  MEMBER_INHOUSE_GET_JOB_DETAILS_REQUEST,
  MEMBER_INHOUSE_GET_JOB_DETAILS_SUCCESS,
  MEMBER_INHOUSE_GET_JOB_DETAILS_FAILURE,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_SUCCESS,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_REQUEST,
  MEMBER_INPROGRESS_INHOUSE_JOB_LIST_FAILURE,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_FAIL,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_REQUEST,
  MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_SUCCESS,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_FAIL,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_REQUEST,
  DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_SUCCESS,
} from "../../constants/Member-Admin-job-list-constants";
import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";
import axios from "axios";
import { id } from "date-fns/locale";

export const MemberAdminGetJobListAction =
  (id, page, search) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/member-job-list/?company=${id}&page=${page}&search=${search}&ordering=-created`,
        config
      );
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: MEMBER_ADMIN_JOB_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };

export const MemberAdminGetJobListDeleteAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_DELETE_REQUEST,
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
        `${BACKEND_API_URL}members/member-jobs/${id}/`,
        config
      );

      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_DELETE_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_DELETE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberAdminGetJobDetailsAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_GET_JOB_DETAILS_REQUEST,
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
        `${BACKEND_API_URL}members/member-jobs/${id}/`
      );

      dispatch({
        type: MEMBER_ADMIN_GET_JOB_DETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_GET_JOB_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberAdminDraftJoblistAction =
  (companyId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_GET_DRAFT_JOB_REQUEST,
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
        `${BACKEND_API_URL}members/members-draft-jobs/?company=${companyId}`
      );

      dispatch({
        type: MEMBER_ADMIN_GET_DRAFT_JOB_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_GET_DRAFT_JOB_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberAdminDraftJobDeleteAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_DRAFT_JOB_DELETE_REQUEST,
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
        `${BACKEND_API_URL}members/members-draft-jobs/${id}/`,
        config
      );

      dispatch({
        type: MEMBER_ADMIN_DRAFT_JOB_DELETE_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_DRAFT_JOB_DELETE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberInHouseGetJobListAction =
  (company, page, search, ordering) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_INHOUSE_JOB_LIST_REQUEST,
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
      // let data = [];
      // if (status) {
      //   data = await api.get(
      //     `${BACKEND_API_URL}members/job-house-member/?job_applied__status=${status}&company=${company}&page=${page}&ordering=${ordering} `,
      //     config
      //   );
      // }
      //  else {
      const { data } = await api.get(
        `${BACKEND_API_URL}members/job-house-member/?company=${company}&page=${page}&search=${search}`,
        config
      );
      // }

      dispatch({
        type: MEMBER_INHOUSE_JOB_LIST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: MEMBER_INHOUSE_JOB_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };

export const MemberInProgressInHouseGetJobListAction =
  ({ company, page, status, ordering }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_INPROGRESS_INHOUSE_JOB_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/job-house-member/?job_applied__status=${status}&company=${company}&page=${page}&ordering=${ordering}`,
        config
      );

      dispatch({
        type: MEMBER_INPROGRESS_INHOUSE_JOB_LIST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: MEMBER_INPROGRESS_INHOUSE_JOB_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };

export const MemberInHouseGetJobDetailsAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_INHOUSE_GET_JOB_DETAILS_REQUEST,
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
        `${BACKEND_API_URL}members/job-house-member/${id}/`
      );

      dispatch({
        type: MEMBER_INHOUSE_GET_JOB_DETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_INHOUSE_GET_JOB_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const MemberAdminJobListInProgressAction =
  ({ id, status, page, ordering }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_REQUEST,
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
        `${BACKEND_API_URL}members/member-job-list/?company=${id}&job_applied__status=${status}&ordering=${ordering}&page=${page}`,
        config
      );
      dispatch({
        type: MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_SUCCESS,
        payload: data,
      });
      // return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: MEMBER_ADMIN_JOB_LIST_IN_PROGRESS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };

export const DuplicateMemberAdminJobListInReviewAction =
  ({ id, status, page, ordering }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_REQUEST,
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
        `${BACKEND_API_URL}members/member-job-list/?company=${id}&job_applied__status=${status}&ordering=${ordering}&page=${page}`,
        config
      );
      dispatch({
        type: DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_SUCCESS,
        payload: data,
      });
      // return true;
    } catch (error) {
      if (error?.response?.data) {
        dispatch({
          type: DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };
