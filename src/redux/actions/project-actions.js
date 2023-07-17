import {
  AGENCY_PROJECTS_LIST_FILTER_REQUEST,
  AGENCY_PROJECTS_LIST_FILTER_SUCCESS,
  AGENCY_PROJECTS_LIST_FILTER_FAIL,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
  AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
  PROJECTS_LIST_FILTER_REQUEST,
  PROJECTS_LIST_FILTER_SUCCESS,
  PROJECTS_LIST_FILTER_FAIL,
  PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
  PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
  PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
} from "../../constants/project-constants";

import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const agencyProjectsByFilter = (params) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_REQUEST,
    });
    let data = [];
    if (params.company) {
      data = await api.get(
        `${BACKEND_API_URL}agency/my-project/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}&job___is_active=${params.is_active}&search=${params.search ?? ""}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}agency/my-project/?page=${params.page}&status=${params.status}&ordering=${params.ordering}&job___is_active=${params.is_active}&search=${params.search ?? ""}`
      );
    }

    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_SUCCESS,
      payload: data.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//for dashboard
export const agencyProjectsByFilterDuplicate = (params) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
    });

    let data = [];
    if (params.company) {
      data = await api.get(
        `${BACKEND_API_URL}agency/my-project/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}agency/my-project/?page=${params.page}&status=${params.status}&ordering=${params.ordering}`
      );
    }

    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
      payload: data.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCY_PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//for creator role
export const projectsByFilter = (params) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECTS_LIST_FILTER_REQUEST,
    });

    let data = [];
    if (params.company) {
      data = await api.get(
        `${BACKEND_API_URL}creator/my-jobs/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}creator/my-jobs/?page=${params.page}&status=${params.status}&ordering=${params.ordering}`
      );
    }

    dispatch({
      type: PROJECTS_LIST_FILTER_SUCCESS,
      payload: data.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: PROJECTS_LIST_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//for creator and member dashboard in review 
export const projectsByFilterDuplicate = (params) => async (dispatch) => {
  try {
    dispatch({
      type: PROJECTS_LIST_FILTER_DUPLICATE_REQUEST,
    });

    let data = [];
    if (params.company) {
      data = await api.get(
        `${BACKEND_API_URL}creator/my-jobs/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}`
      );
    } else {
      data = await api.get(
        `${BACKEND_API_URL}creator/my-jobs/?page=${params.page}&status=${params.status}&ordering=${params.ordering}`
      );
    }

    dispatch({
      type: PROJECTS_LIST_FILTER_DUPLICATE_SUCCESS,
      payload: data.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: PROJECTS_LIST_FILTER_DUPLICATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
