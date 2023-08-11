import {
  MEMBER_JOB_DETAILS_FILES_REQUEST,
  MEMBER_JOB_DETAILS_FILES_SUCCESS,
  MEMBER_JOB_DETAILS_FILES_FAIL,
  CREATOR_JOB_DETAILS_FILES_REQUEST,
  CREATOR_JOB_DETAILS_FILES_SUCCESS,
  CREATOR_JOB_DETAILS_FILES_FAIL,
  GET_JOB_DETAILS_FILES_REQUEST,
  GET_JOB_DETAILS_FILES_SUCCESS,
  GET_JOB_DETAILS_FILES_FAIL,
  GET_JOB_DETAILS_FILES_ADMIN_REQUEST,
  GET_JOB_DETAILS_FILES_ADMIN_SUCCESS,
  GET_JOB_DETAILS_FILES_ADMIN_FAIL,
} from "../../constants/file-constants";

import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const getMemberActivityFilesList =
  (jobIdFiles, userid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_JOB_DETAILS_FILES_REQUEST,
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
        `${BACKEND_API_URL}members/job-attachments?job=${jobIdFiles}&user=${userid}`,
        config
      );
      dispatch({
        type: MEMBER_JOB_DETAILS_FILES_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_JOB_DETAILS_FILES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const getCreatorActivityFilesList =
  (jobIdFiles) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATOR_JOB_DETAILS_FILES_REQUEST,
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
        `${BACKEND_API_URL}creator/job-attachments?job=${jobIdFiles}`,
        config
      );
      dispatch({
        type: CREATOR_JOB_DETAILS_FILES_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: CREATOR_JOB_DETAILS_FILES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const getActivityFilesList =
  (jobIdFiles) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_JOB_DETAILS_FILES_REQUEST,
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
        `${BACKEND_API_URL}agency/job-attachments?job=${jobIdFiles}`,
        config
      );
      dispatch({
        type: GET_JOB_DETAILS_FILES_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: GET_JOB_DETAILS_FILES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const getActivityFilesListAdmin =
  (jobIdFiles) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_JOB_DETAILS_FILES_ADMIN_REQUEST,
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
        `${BACKEND_API_URL}admin-job-attachments/?job=${jobIdFiles}`,
        config
      );
      dispatch({
        type: GET_JOB_DETAILS_FILES_ADMIN_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: GET_JOB_DETAILS_FILES_ADMIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
