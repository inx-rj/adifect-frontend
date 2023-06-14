import {
  INDUSTRY_LIST_REQUEST,
  INDUSTRY_LIST_SUCCESS,
  INDUSTRY_LIST_FAIL,
  DELETE_INDUSTRY_REQUEST,
  DELETE_INDUSTRY_SUCCESS,
  DELETE_INDUSTRY_FAIL,
  INDUSTRY_DETAILS_REQUEST,
  INDUSTRY_DETAILS_SUCCESS,
  INDUSTRY_DETAILS_FAIL,
  AGENCYINDUSTRY_LIST_REQUEST,
  AGENCYINDUSTRY_LIST_SUCCESS,
  AGENCYINDUSTRY_LIST_FAIL,
  AGENCYDELETE_INDUSTRY_REQUEST,
  AGENCYDELETE_INDUSTRY_SUCCESS,
  AGENCYDELETE_INDUSTRY_FAIL,
  AGENCYINDUSTRY_DETAILS_REQUEST,
  AGENCYINDUSTRY_DETAILS_SUCCESS,
  AGENCYINDUSTRY_DETAILS_FAIL,
  AGENCYINDUSTRY_ADD_REQUEST,
  AGENCYINDUSTRY_ADD_SUCCESS,
  AGENCYINDUSTRY_ADD_FAIL,
} from "../../constants/industry-constants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllIndustries = () => async (dispatch) => {
  try {
    dispatch({
      type: INDUSTRY_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/industries/`);
    dispatch({
      type: INDUSTRY_LIST_SUCCESS,
      payload: data?.data?.results || data?.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: INDUSTRY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteIndustry = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_INDUSTRY_REQUEST,
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
      `${BACKEND_API_URL}agency/industries/${id}`,
      config
    );

    dispatch({
      type: DELETE_INDUSTRY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_INDUSTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getIndustryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INDUSTRY_DETAILS_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/industries/${id}/`
    );

    dispatch({
      type: INDUSTRY_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: INDUSTRY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AgencylistAllIndustries = () => async (dispatch) => {
  try {
    dispatch({
      type: AGENCYINDUSTRY_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/industries/`);

    dispatch({
      type: AGENCYINDUSTRY_LIST_SUCCESS,
      payload: data?.data?.results || data?.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCYINDUSTRY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AgencydeleteIndustry = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCYDELETE_INDUSTRY_REQUEST,
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
      `${BACKEND_API_URL}agency/industries/${id}`,
      config
    );

    dispatch({
      type: AGENCYDELETE_INDUSTRY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCYDELETE_INDUSTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AgencygetIndustryDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCYINDUSTRY_DETAILS_REQUEST,
    });

    const { data } = await api.get(
      `${BACKEND_API_URL}agency/industries/${id}/`
    );

    dispatch({
      type: AGENCYINDUSTRY_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCYINDUSTRY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AgencygetIndustryAdd = (params) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCYINDUSTRY_ADD_REQUEST,
    });

    const { data } = await api.post(
      `${BACKEND_API_URL}agency/industries/`,
      params
    );

    dispatch({
      type: AGENCYINDUSTRY_ADD_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCYINDUSTRY_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
