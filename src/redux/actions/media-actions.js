import {
  MEDIA_CREATE_REQUEST,
  MEDIA_CREATE_SUCCESS,
  MEDIA_CREATE_FAIL,
  MEDIA_LIST_REQUEST,
  MEDIA_LIST_SUCCESS,
  MEDIA_LIST_FAIL,
  DELETE_MEDIA_REQUEST,
  DELETE_MEDIA_SUCCESS,
  DELETE_MEDIA_FAIL,
  MEDIA_DETAILS_REQUEST,
  MEDIA_DETAILS_SUCCESS,
  MEDIA_DETAILS_FAIL,
} from "../../constants/media-constants";

import api from "../../utils/api";
import {BACKEND_API_URL} from '../../environment'

export const createMedia = (params) => async (dispatch) => {
  try {
    dispatch({
      type: MEDIA_CREATE_REQUEST,
    });

    const { data } = await api.post(`${BACKEND_API_URL}agency/dam/`, params);

    dispatch({
      type: MEDIA_CREATE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEDIA_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllMedia = () => async (dispatch) => {
  try {
    dispatch({
      type: MEDIA_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}medias/`);

    dispatch({
      type: MEDIA_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEDIA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteMedia = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MEDIA_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}medias/${id}`);

    dispatch({
      type: DELETE_MEDIA_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_MEDIA_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getMediaDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEDIA_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}Medias/${id}/`);

    dispatch({
      type: MEDIA_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEDIA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
