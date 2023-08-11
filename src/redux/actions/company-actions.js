import {
  COMPANY_LIST_REQUEST,
  COMPANY_LIST_SUCCESS,
  COMPANY_LIST_FAIL,
  COMPANY_ADMIN_LIST_REQUEST,
  COMPANY_ADMIN_LIST_SUCCESS,
  COMPANY_ADMIN_LIST_FAIL,
  CREATOR_COMPANY_FILTER_REQUEST,
  CREATOR_COMPANY_FILTER_SUCCESS,
  CREATOR_COMPANY_FILTER_FAIL,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAIL,
  DELETE_ADMIN_COMPANY_REQUEST,
  DELETE_ADMIN_COMPANY_SUCCESS,
  DELETE_ADMIN_COMPANY_FAIL,
  COMPANY_DETAILS_REQUEST,
  COMPANY_DETAILS_SUCCESS,
  COMPANY_DETAILS_FAIL,
  UPDATE_COMPANY_REQUEST,
  UPDATE_COMPANY_SUCCESS,
  UPDATE_COMPANY_FAIL,
  NEW_COMPANY_LIST_REQUEST,
  NEW_COMPANY_LIST_SUCCESS,
  NEW_COMPANY_LIST_FAIL,
} from "../../constants/company-constants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/company/?is_active=1`,
      config
    );

    dispatch({
      type: COMPANY_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllAdminCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_ADMIN_LIST_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}company/`, config);

    dispatch({
      type: COMPANY_ADMIN_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: COMPANY_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllCompaniesdesc = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NEW_COMPANY_LIST_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}company/${id}`, config);

    dispatch({
      type: NEW_COMPANY_LIST_SUCCESS,

      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: NEW_COMPANY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteCompany = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COMPANY_REQUEST,
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
      `${BACKEND_API_URL}agency/company/${id}`,
      config
    );

    dispatch({
      type: DELETE_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteAdminCompany = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_ADMIN_COMPANY_REQUEST,
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
      `${BACKEND_API_URL}company/${id}`,
      config
    );

    dispatch({
      type: DELETE_ADMIN_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCompanyDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMPANY_DETAILS_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}company/${id}/`, config);

    dispatch({
      type: COMPANY_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: COMPANY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateCompanyDetails =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: UPDATE_COMPANY_REQUEST,
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
        `${BACKEND_API_URL}company/${id}/`,
        params,
        config
      );

      dispatch({
        type: UPDATE_COMPANY_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      // console.log("update error - ", error.response.data.non_field_errors[0]);
      dispatch({
        type: UPDATE_COMPANY_FAIL,
        payload:
          error.response && error.response.data.non_field_errors
            ? error.response.data.non_field_errors[0]
            : error.message,
      });
    }
  };

export const creatorCompaniesFilter = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATOR_COMPANY_FILTER_REQUEST,
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
      `${BACKEND_API_URL}creator/creator-company-list`,
      config
    );

    dispatch({
      type: CREATOR_COMPANY_FILTER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: CREATOR_COMPANY_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
