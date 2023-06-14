import {
  Question_LIST_REQUEST,
  Question_LIST_SUCCESS,
  Question_LIST_FAIL,
  Question_DETAILS_REQUEST,
  Question_DETAILS_SUCCESS,
  Question_DETAILS_FAIL,
  Question_DETAILS_RESET,
  Question_DELETE_REQUEST,
  Question_DELETE_SUCCESS,
  Question_DELETE_FAIL,
  Question_LIST_SEARCH,
  Question_LIST_SUCCESS_SEARCH,
  Question_LIST_FAIL_SEARCH,
  Question_LIST_SEARCH_ADMIN_REQUEST,
  Question_LIST_SEARCH_ADMIN_SUCCESS,
  Question_LIST_SEARCH_ADMIN_FAIL,
  QUESTION_ADD_REQUEST,
  QUESTION_ADD_SUCCESS,
  QUESTION_ADD_FAIL,
} from "../../constants/Question-constant";

import { BACKEND_API_URL } from "../../environment";

import api from "../../utils/api";

export const listAllQuestion = (p_data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Question_LIST_REQUEST,
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
      `${BACKEND_API_URL}question/${p_data}`,
      config
    );

    dispatch({
      type: Question_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Question_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllSearch = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Question_LIST_SEARCH,
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

    const { data } = await api.post(`question-filter/`, params, config);

    dispatch({
      type: Question_LIST_SUCCESS_SEARCH,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Question_LIST_FAIL_SEARCH,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllSearchAdmin = (params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Question_LIST_SEARCH_ADMIN_REQUEST,
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
      `${BACKEND_API_URL}admin-question-filter/`,
      params,
      config
    );

    dispatch({
      type: Question_LIST_SEARCH_ADMIN_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Question_LIST_SEARCH_ADMIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletequestion = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Question_DELETE_REQUEST,
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

    const { data } = await api.delete(`question/${id}`, config);

    dispatch({
      type: Question_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: Question_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getQuestionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: Question_DETAILS_REQUEST,
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

    const { data } = await api.get(`question/${id}/`, config);

    dispatch({
      type: Question_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: Question_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const postNewQuestion = (p_data) => async (dispatch) => {
  try {
    dispatch({
      type: QUESTION_ADD_REQUEST,
    });

    const { data } = await api.post(`${BACKEND_API_URL}question/`, p_data);

    dispatch({
      type: QUESTION_ADD_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: QUESTION_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
