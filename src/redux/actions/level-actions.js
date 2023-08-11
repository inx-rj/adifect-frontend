import {
  LEVEL_LIST_REQUEST,
  LEVEL_LIST_SUCCESS,
  LEVEL_LIST_FAIL,
  DELETE_LEVEL_REQUEST,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAIL,
  LEVEL_DETAILS_REQUEST,
  LEVEL_DETAILS_SUCCESS,
  LEVEL_DETAILS_FAIL,
} from "../../constants/level-constants";

import api from "../../utils/api";
import {BACKEND_API_URL} from '../../environment'

export const listAllLevels = () => async (dispatch) => {
  try {
    dispatch({
      type: LEVEL_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}levels/`);

    dispatch({
      type: LEVEL_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: LEVEL_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteLevel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LEVEL_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}levels/${id}`);

    dispatch({
      type: DELETE_LEVEL_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_LEVEL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getLevelDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LEVEL_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}levels/${id}/`);

    dispatch({
      type: LEVEL_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: LEVEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
