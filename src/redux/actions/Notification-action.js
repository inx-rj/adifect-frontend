import {
  Notification_LIST_REQUEST,
  Notification_LIST_SUCCESS,
  Notification_LIST_FAIL,
  GET_AGENCY_NOTIFICATION_REQUEST,
  GET_AGENCY_NOTIFICATION_SUCCESS,
  GET_AGENCY_NOTIFICATION_FAIL,
  UPDATE_AGENCY_NOTIFICATION_REQUEST,
  UPDATE_AGENCY_NOTIFICATION_SUCCESS,
  UPDATE_AGENCY_NOTIFICATION_FAIL,
  DELETE_AGENCY_NOTIFICATION_REQUEST,
  DELETE_AGENCY_NOTIFICATION_SUCCESS,
  DELETE_AGENCY_NOTIFICATION_FAIL,
  DELETE_ALL_USER_NOTIFICATION_FAILURE,
  DELETE_ALL_USER_NOTIFICATION_REQUEST,
  DELETE_ALL_USER_NOTIFICATION_SUCCESS,
} from "../../constants/Notification-constant";

import { BACKEND_API_URL } from "../../environment";

import api from "../../utils/api";

export const listAllcount = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: Notification_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/agency-notification&ordering=-created`,
      config
    );

    dispatch({
      type: Notification_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Notification_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllAgencycount =
  (id, offsetid, companyId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_AGENCY_NOTIFICATION_REQUEST,
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

      if (userData?.user?.role === 3) {
        if (companyId && companyId !== null && companyId !== "null") {
          data = await api.get(
            `${BACKEND_API_URL}members/member-notification/?user=${id}&company=${companyId}&ordering=-created&offset=${offsetid}`,
            config
          );
        } else {
          data = await api.get(
            `${BACKEND_API_URL}members/member-notification/?user=${id}&ordering=-created&offset=${offsetid}`,
            config
          );
        }
      } else {
        if (companyId && companyId !== null && companyId !== "null") {
          data = await api.get(
            `${BACKEND_API_URL}agency/agency-notification/?user=${id}&company=${companyId}&ordering=-created&offset=${offsetid}`,
            config
          );
        } else {
          data = await api.get(
            `${BACKEND_API_URL}agency/agency-notification/?user=${id}&ordering=-created&offset=${offsetid}`,
            config
          );
        }

      }

      // const { data } = await api.get(
      //   `${BACKEND_API_URL}agency/agency-notification/?user=${id}&ordering=-created&offset=${offsetid}`,
      //   config
      // );

      dispatch({
        type: GET_AGENCY_NOTIFICATION_SUCCESS,
        payload: data.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: GET_AGENCY_NOTIFICATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const updateAllAgencycount = (id, params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_AGENCY_NOTIFICATION_REQUEST,
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

    if (userData?.user?.role === 3) {
      data = await api.put(
        `${BACKEND_API_URL}members/member-notification/${id}/`,
        params,
        config
      );
    } else {
      data = await api.put(
        `${BACKEND_API_URL}agency/agency-notification/${id}/`,
        params,
        config
      );
    }

    dispatch({
      type: UPDATE_AGENCY_NOTIFICATION_SUCCESS,
      payload: data.data
    });

    return true;
  } catch (error) {
    dispatch({
      type: UPDATE_AGENCY_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const Deletenotification =
  (id, userid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_AGENCY_NOTIFICATION_REQUEST,
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

      if (userData?.user?.role === 3) {
        data = await api.delete(
          `${BACKEND_API_URL}members/member-notification/?id=${id}`,
          config
        );
      } else {
        data = await api.delete(
          `${BACKEND_API_URL}agency/agency-notification/?id=${id}`,
          config
        );
      }

      dispatch({
        type: DELETE_AGENCY_NOTIFICATION_SUCCESS,
        payload: data.data
      });

      return true;
    } catch (error) {
      dispatch({
        type: DELETE_AGENCY_NOTIFICATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const DeletenotificationAll =
  (id, userid) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_ALL_USER_NOTIFICATION_REQUEST,
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

      if (userData?.user?.role === 3) {
        data = await api.delete(
          `${BACKEND_API_URL}members/member-notification/?user_id=${id}`,
          config
        );
      } else {
        data = await api.delete(
          `${BACKEND_API_URL}agency/agency-notification/?user_id=${id}`,
          config
        );
      }

      dispatch({
        type: DELETE_ALL_USER_NOTIFICATION_SUCCESS,
        payload: data.data
      });

      return true;
    } catch (error) {
      dispatch({
        type: DELETE_ALL_USER_NOTIFICATION_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
