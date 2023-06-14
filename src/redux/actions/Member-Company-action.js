import {
  MEMBER_COMPANY_LIST_REQUEST,
  MEMBER_COMPANY_LIST_SUCCESS,
  MEMBER_COMPANY_LIST_FAIL,
  MEMBER_COMPANY_ADMIN_LIST_REQUEST,
  MEMBER_COMPANY_ADMIN_LIST_SUCCESS,
  MEMBER_COMPANY_ADMIN_LIST_FAIL,
  MEMBER_CREATOR_COMPANY_FILTER_REQUEST,
  MEMBER_CREATOR_COMPANY_FILTER_SUCCESS,
  MEMBER_CREATOR_COMPANY_FILTER_FAIL,
  MEMBER_DELETE_COMPANY_REQUEST,
  MEMBER_DELETE_COMPANY_SUCCESS,
  MEMBER_DELETE_COMPANY_FAIL,
  MEMBER_DELETE_ADMIN_COMPANY_REQUEST,
  MEMBER_DELETE_ADMIN_COMPANY_SUCCESS,
  MEMBER_DELETE_ADMIN_COMPANY_FAIL,
  MEMBER_COMPANY_DETAILS_REQUEST,
  MEMBER_COMPANY_DETAILS_SUCCESS,
  MEMBER_COMPANY_DETAILS_FAIL,
  MEMBER_UPDATE_COMPANY_REQUEST,
  MEMBER_UPDATE_COMPANY_SUCCESS,
  MEMBER_UPDATE_COMPANY_FAIL,
  MEMBER_NEW_COMPANY_LIST_REQUEST,
  MEMBER_NEW_COMPANY_LIST_SUCCESS,
  MEMBER_NEW_COMPANY_LIST_FAIL,
  ADD_COMPANY_MEMBER_REQUEST,
  ADD_COMPANY_MEMBER_SUCCESS,
  ADD_COMPANY_MEMBER_FAIL,
  MEMBER_EDIT_COMPANY_REQUEST,
  MEMBER_EDIT_COMPANY_SUCCESS,
  MEMBER_EDIT_COMPANY_FAIL,
} from "../../constants/Member-CompanyConstants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllCompaniesMemberAdmin =
  (agecyidCompany) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COMPANY_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/company/?is_active=True`,
        // `${BACKEND_API_URL}members/company/?agency=${agecyidCompany}`,
        config
      );

      dispatch({
        type: MEMBER_COMPANY_LIST_SUCCESS,
        payload: data?.data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COMPANY_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllAdminCompanies =
  (agecyidCompany) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COMPANY_ADMIN_LIST_REQUEST,
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
        `${BACKEND_API_URL}company?agency=${agecyidCompany}/`,
        config
      );

      dispatch({
        type: MEMBER_COMPANY_ADMIN_LIST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COMPANY_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listAllCompaniesdesc =
  (agecyidCompany) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_NEW_COMPANY_LIST_REQUEST,
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
        `${BACKEND_API_URL}company/${agecyidCompany}`,
        config
      );
      dispatch({
        type: MEMBER_NEW_COMPANY_LIST_SUCCESS,

        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_NEW_COMPANY_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const deleteCompany = (agecyidCompany) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_DELETE_COMPANY_REQUEST,
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
      `${BACKEND_API_URL}members/company/${agecyidCompany}`,
      config
    );

    dispatch({
      type: MEMBER_DELETE_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DELETE_COMPANY_FAIL,
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
      type: MEMBER_DELETE_ADMIN_COMPANY_REQUEST,
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
      type: MEMBER_DELETE_ADMIN_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_DELETE_ADMIN_COMPANY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCompanyDetails =
  (agecyidCompany) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_COMPANY_DETAILS_REQUEST,
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
        `${BACKEND_API_URL}company/${agecyidCompany}/`,
        config
      );

      dispatch({
        type: MEMBER_COMPANY_DETAILS_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_COMPANY_DETAILS_FAIL,
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
        type: MEMBER_UPDATE_COMPANY_REQUEST,
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
        `${BACKEND_API_URL}company/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_UPDATE_COMPANY_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      // console.log("update error - ", error.response.data.non_field_errors[0]);
      dispatch({
        type: MEMBER_UPDATE_COMPANY_FAIL,
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
      type: MEMBER_CREATOR_COMPANY_FILTER_REQUEST,
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
      type: MEMBER_CREATOR_COMPANY_FILTER_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_CREATOR_COMPANY_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const AddMemberCompany =
  (comanyId, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_COMPANY_MEMBER_REQUEST,
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

      const { data } = await axios.put(
        `${BACKEND_API_URL}members/comany/${comanyId}/`,
        params,
        config
      );

      dispatch({
        type: ADD_COMPANY_MEMBER_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADD_COMPANY_MEMBER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const EditMemberCompany = (comanyId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_EDIT_COMPANY_REQUEST,
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
      `${BACKEND_API_URL}members/comany/${comanyId}/`,
      config
    );

    dispatch({
      type: MEMBER_EDIT_COMPANY_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    // console.log("update error - ", error.response.data.non_field_errors[0]);
    dispatch({
      type: MEMBER_EDIT_COMPANY_FAIL,
      payload:
        error.response && error.response.data.non_field_errors
          ? error.response.data.non_field_errors[0]
          : error.message,
    });
  }
};