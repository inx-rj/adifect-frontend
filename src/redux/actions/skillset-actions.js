import {
  SKILL_SET_POST_REQUEST,
  SKILL_SET_POST_SUCCESS,
  SKILL_SET_POST_FAIL,
  SKILL_SET_EDIT_REQUEST,
  SKILL_SET_EDIT_SUCCESS,
  SKILL_SET_EDIT_FAIL,
  SKILL_SET_DETAILS_REQUEST,
  SKILL_SET_DETAILS_SUCCESS,
  SKILL_SET_DETAILS_FAIL,
  USER_SKILLSET_DETAILS_REQUEST,
  USER_SKILLSET_DETAILS_SUCCESS,
  USER_SKILLSET_DETAILS_FAIL,
  SKILL_SET_DETAILS_RESET,
  DELETE_SET_SKILL_REQUEST,
  DELETE_SET_SKILL_SUCCESS,
  DELETE_SET_SKILL_FAIL,
} from "../../constants/skillset-constants";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

export const deleteSkillset = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_SET_SKILL_REQUEST,
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
      `${BACKEND_API_URL}user-skills/${id}`,
      config
    );

    dispatch({
      type: DELETE_SET_SKILL_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_SET_SKILL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserSkillsetDetails =
  (userId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_SKILLSET_DETAILS_REQUEST,
      });

      const { data } = await api.get(
        `${BACKEND_API_URL}user-skills?user=${userId}`
      );

      dispatch({
        type: USER_SKILLSET_DETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: USER_SKILLSET_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const getSkillsetDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILL_SET_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}user-skills/${id}`);

    dispatch({
      type: SKILL_SET_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: SKILL_SET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const skillsetAdd = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SKILL_SET_POST_REQUEST,
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
      `${BACKEND_API_URL}user-skills/`,
      params,
      config
    );

    dispatch({
      type: SKILL_SET_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: SKILL_SET_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const skillsetEditAction =
  (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SKILL_SET_EDIT_REQUEST,
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
        `${BACKEND_API_URL}user-skills/${id}/`,
        params,
        config
      );

      dispatch({
        type: SKILL_SET_EDIT_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: SKILL_SET_EDIT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
