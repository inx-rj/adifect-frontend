import {
  TEMPLATE_LIST_REQUEST,
  TEMPLATE_LIST_SUCCESS,
  TEMPLATE_LIST_FAIL,
  TEMPLATE_DETAILS_REQUEST,
  TEMPLATE_DETAILS_SUCCESS,
  TEMPLATE_DETAILS_FAIL,
  TEMPLATE_DETAILS_RESET,
  TEMPLATE_UPDATE_REQUEST,
  TEMPLATE_UPDATE_SUCCESS,
  TEMPLATE_UPDATE_FAIL,
  TEMPLATE_DELETE_REQUEST,
  TEMPLATE_DELETE_SUCCESS,
  TEMPLATE_DELETE_FAIL,
} from "../../constants/jobTemplate-constants";

import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllTemplates = (companyId) => async (dispatch) => {
  try {
    dispatch({
      type: TEMPLATE_LIST_REQUEST,
    });

    let data = [];

    if (companyId) {
      data = await api.get(
        `${BACKEND_API_URL}job-template/?company=${companyId}`
      );
    } else {
      data = await api.get(`${BACKEND_API_URL}job-template/`);
    }

    dispatch({
      type: TEMPLATE_LIST_SUCCESS,
      payload: data?.data?.data?.results || data?.data?.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: TEMPLATE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getTemplateDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEMPLATE_DETAILS_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}job-template/${id}/`);

    dispatch({
      type: TEMPLATE_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: TEMPLATE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteTemplate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEMPLATE_DELETE_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}job-template/${id}`);

    dispatch({
      type: TEMPLATE_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: TEMPLATE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const UpdateTemplate = (id, template) => async (dispatch) => {
  try {
    dispatch({
      type: TEMPLATE_UPDATE_REQUEST,
    });

    const { data } = await api.put(
      `${BACKEND_API_URL}job-template/${id}`,
      template
    );

    dispatch({
      type: TEMPLATE_UPDATE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: TEMPLATE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
