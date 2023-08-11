import {
  SKILL_LIST_REQUEST,
  SKILL_LIST_SUCCESS,
  SKILL_LIST_FAIL,
  DELETE_SKILL_REQUEST,
  DELETE_SKILL_SUCCESS,
  DELETE_SKILL_FAIL,
  SKILL_DETAILS_REQUEST,
  SKILL_DETAILS_SUCCESS,
  SKILL_DETAILS_FAIL,
} from "../../constants/skill-constants";

import api from "../../utils/api";
import {BACKEND_API_URL} from '../../environment'

export const listAllSkills = () => async (dispatch) => {
  try {
    dispatch({
      type: SKILL_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}skills/`);

    dispatch({
      type: SKILL_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: SKILL_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteSkill = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_SKILL_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}skills/${id}`);

    dispatch({
      type: DELETE_SKILL_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_SKILL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSkillDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SKILL_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}skills/${id}/`);

    dispatch({
      type: SKILL_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: SKILL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
