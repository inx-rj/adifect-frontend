import {
  AGENCY_Company_LIST_REQUEST,
  AGENCY_Company_LIST_SUCCESS,
  AGENCY_Company_LIST_FAIL,
  AGENCY_Company_DETAILS_REQUEST,
  AGENCY_Company_DETAILS_SUCCESS,
  AGENCY_Company_DETAILS_FAIL,
  AGENCY_Company_DETAILS_RESET,
  AGENCY_DELETE_Company_REQUEST,
  AGENCY_DELETE_Company_SUCCESS,
  AGENCY_DELETE_Company_FAIL,
  AGENCY_COMPANY_EDIT_UPDATE_FAIL,
  AGENCY_COMPANY_EDIT_UPDATE_REQUEST,
  AGENCY_COMPANY_EDIT_UPDATE_SUCCESS,
  MEMBER_DELETE_Company_REQUEST,
  MEMBER_DELETE_Company_SUCCESS,
  MEMBER_DELETE_Company_FAIL,
} from "../../constants/AgencyCompany-constant";

import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllCompanies = () => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_Company_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/company/`);

    dispatch({
      type: AGENCY_Company_LIST_SUCCESS,
      payload: data?.data?.results || data?.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_Company_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_DELETE_Company_REQUEST,
    });

    const { data } = await api.delete(`${BACKEND_API_URL}agency/company/${id}`);

    dispatch({
      type: AGENCY_DELETE_Company_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_DELETE_Company_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const MemberdeleteCompany = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEMBER_DELETE_Company_REQUEST,
    });

    const { data } = await api.delete(
      `${BACKEND_API_URL}members/company/${id}`
    );

    dispatch({
      type: MEMBER_DELETE_Company_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DELETE_Company_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const companyDetailsdata = (id) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_Company_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/company/${id}`);

    dispatch({
      type: AGENCY_Company_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCY_Company_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const agencyCompanyUpdateEditAction =
  (jobId, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: AGENCY_COMPANY_EDIT_UPDATE_REQUEST,
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
        `${BACKEND_API_URL}agency/company/${jobId}/`,
        params,
        config
      );

      dispatch({
        type: AGENCY_COMPANY_EDIT_UPDATE_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: AGENCY_COMPANY_EDIT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
