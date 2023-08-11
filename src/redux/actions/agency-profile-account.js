import {
  AGENCY_PROFILE_EMAIL_CHANGE_FAIL,
  AGENCY_PROFILE_EMAIL_CHANGE_REQUEST,
  AGENCY_PROFILE_EMAIL_CHANGE_SUCCESS,
  AGENCY_PROFILE_PASSWORD_CHANGE_FAIL,
  AGENCY_PROFILE_PASSWORD_CHANGE_REQUEST,
  AGENCY_PROFILE_PASSWORD_CHANGE_SUCCESS,
  AGENCY_PROFILE_COMMUNICATION_REQUEST,
  AGENCY_PROFILE_COMMUNICATION_FAIL,
  AGENCY_PROFILE_COMMUNICATION_SUCCESS,
  GET_AGENCY_PROFILE_COMMUNICATION_FAIL,
  GET_AGENCY_PROFILE_COMMUNICATION_REQUEST,
  GET_AGENCY_PROFILE_COMMUNICATION_SUCCESS,
  AGENCY_PROFILE_COMM_DELETE_FAIL,
  AGENCY_PROFILE_COMM_DELETE_REQUEST,
  AGENCY_PROFILE_COMM_DELETE_SUCCESS,
  AGENCY_PROFILE_COMM_EDITDATA_REQUEST,
  AGENCY_PROFILE_COMM_EDITDATA_SUCCESS,
  AGENCY_PROFILE_COMM_EDITDATA_FAIL,
  AGENCY_PROFILE_JOBS_PROGRESS_FAILURE,
  AGENCY_PROFILE_JOBS_PROGRESS_REQUEST,
  AGENCY_PROFILE_JOBS_PROGRESS_SUCCESS,
} from "../../constants/Agency_profile_account_setting";
import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

export const agencyProfileEmailChange =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_PROFILE_EMAIL_CHANGE_REQUEST,
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
        `${BACKEND_API_URL}email-change/`,
        params,
        config
      );

      dispatch({
        type: AGENCY_PROFILE_EMAIL_CHANGE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_PROFILE_EMAIL_CHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const agencyProfilePasswordChange =
  (passData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_PROFILE_PASSWORD_CHANGE_REQUEST,
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
        `${BACKEND_API_URL}profile-password-change/`,
        passData,
        config
      );

      dispatch({
        type: AGENCY_PROFILE_PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_PROFILE_PASSWORD_CHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const agencyProfileCommunication =
  (passData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_PROFILE_COMMUNICATION_REQUEST,
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
        `${BACKEND_API_URL}user-communication/`,
        passData,
        config
      );

      dispatch({
        type: AGENCY_PROFILE_COMMUNICATION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_PROFILE_COMMUNICATION_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response && error.response.data.non_field_errors[0]
            ? error.response.data.non_field_errors[0]
            : error.message,
      });
    }
  };

export const getAgencyProfileCommunication =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_AGENCY_PROFILE_COMMUNICATION_REQUEST,
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
        `${BACKEND_API_URL}user-communication/?ordering=created`,
        config
      );

      dispatch({
        type: GET_AGENCY_PROFILE_COMMUNICATION_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: GET_AGENCY_PROFILE_COMMUNICATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const agencyProfileCommDelete = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_PROFILE_COMM_DELETE_REQUEST,
    });

    const { data } = await api.delete(
      `${BACKEND_API_URL}user-communication/${id}`
    );

    dispatch({
      type: AGENCY_PROFILE_COMM_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_PROFILE_COMM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const agencyProfileCommEditDataAction =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_PROFILE_COMM_EDITDATA_REQUEST,
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
        `${BACKEND_API_URL}user-communication/${id}/`,
        params,
        config
      );

      dispatch({
        type: AGENCY_PROFILE_COMM_EDITDATA_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_PROFILE_COMM_EDITDATA_FAIL,
        payload:
          error.response && error.response.data.message.non_field_errors
            ? error.response.data.message.non_field_errors[0]
            : error.response.data.message.mode_value
            ? error.response.data.message.mode_value[0]
            : error.message,
      });
    }
  };

export const getAgencyProfileJobsInProgressAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_PROFILE_JOBS_PROGRESS_REQUEST,
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
        `${BACKEND_API_URL}agency/agency-jobs/`,
        config
      );

      dispatch({
        type: AGENCY_PROFILE_JOBS_PROGRESS_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_PROFILE_JOBS_PROGRESS_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
