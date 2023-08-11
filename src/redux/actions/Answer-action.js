import {
  Answer_LIST_REQUEST,
  Answer_LIST_SUCCESS,
  Answer_LIST_FAIL,
  Answer_DETAILS_REQUEST,
  Answer_DETAILS_SUCCESS,
  Answer_DETAILS_FAIL,
  Answer_DETAILS_RESET,
  Answer_DELETE_REQUEST,
  Answer_DELETE_SUCCESS,
  Answer_DELETE_FAIL,
  Answer_LIST_POST_REQUEST,
  Answer_LIST_POST_SUCCESS,
  Answer_LIST_POST_FAIL,
} from "../../constants/Answer-constant";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

export const listAllAnswer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: Answer_LIST_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}answer/`, config);

    dispatch({
      type: Answer_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Answer_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteAnswer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Answer_DELETE_REQUEST,
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

    const { data } = await api.delete(`${BACKEND_API_URL}answer/${id}`, config);

    dispatch({
      type: Answer_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Answer_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAnswerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Answer_DETAILS_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}answer/${id}/`, config);

    dispatch({
      type: Answer_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: Answer_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllAnswersPost = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Answer_LIST_POST_REQUEST,
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
      `${BACKEND_API_URL}answer/`,
      params,
      config
    );

    dispatch({
      type: Answer_LIST_POST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Answer_LIST_POST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
