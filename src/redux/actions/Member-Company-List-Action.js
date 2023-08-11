import {
  MEMBER_ADMIN_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_GET_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_GET_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_GET_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_FAILURE,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_REQUEST,
  MEMBER_ADMIN_EDIT_COMPANY_LIST_SUCCESS,
  MEMBER_ADMIN_COMPANY_DETAILS_FAILURE,
  MEMBER_ADMIN_COMPANY_DETAILS_REQUEST,
  MEMBER_ADMIN_COMPANY_DETAILS_SUCCESS,
  MEMBER_ADMIN_ADD_COMPANY_FAIL,
  MEMBER_ADMIN_ADD_COMPANY_REQUEST,
  MEMBER_ADMIN_ADD_COMPANY_SUCCESS,

} from "../../constants/Member-Company-list-constants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const memberAdminCompanyListAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_COMPANY_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/invited-user-company-list/`
      );

      dispatch({
        type: MEMBER_ADMIN_COMPANY_LIST_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_COMPANY_LIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const memberAdminGetCompanyListAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_GET_COMPANY_LIST_REQUEST,
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

      const { data } = await api.get(`${BACKEND_API_URL}members/company/`);

      dispatch({
        type: MEMBER_ADMIN_GET_COMPANY_LIST_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_GET_COMPANY_LIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const memberAdminGetDetailsCompanyListAction = (id) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_COMPANY_DETAILS_REQUEST,
      });
  
      const { data } = await api.get(`${BACKEND_API_URL}members/company/${id}`);
  
      dispatch({
        type: MEMBER_ADMIN_COMPANY_DETAILS_SUCCESS,
        payload: data,
      }); 
  
      // return true;
    } catch (error) {
      dispatch({
        type:  MEMBER_ADMIN_COMPANY_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const memberAdminEditCompanyListAction =
  (params, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_EDIT_COMPANY_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/company/${id}/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_ADMIN_EDIT_COMPANY_LIST_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_EDIT_COMPANY_LIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  export const memberAdminAddCompanyAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_ADD_COMPANY_REQUEST,
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
        `${BACKEND_API_URL}members/company/`,
        params,
        config
      );

      dispatch({
        type: MEMBER_ADMIN_ADD_COMPANY_SUCCESS,
        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_ADD_COMPANY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  // export const listAllCompaniesdesc = (id) => async (dispatch, getState) => {
  //   try {
  //     dispatch({
  //       type: NEW_COMPANY_LIST_REQUEST,
  //     });
  
  //     const {
  //       authReducer: { userData },
  //     } = getState();
  
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${userData.token}`,
  //       },
  //     };
  
  //     const { data } = await api.get(`${BACKEND_API_URL}company/${id}`, config);
  
  //     dispatch({
  //       type: NEW_COMPANY_LIST_SUCCESS,
  
  //       payload: data,
  //     });
  
  //     return true;
  //   } catch (error) {
  //     dispatch({
  //       type: NEW_COMPANY_LIST_FAIL,
  //       payload:
  //         error.response && error.response.data.detail
  //           ? error.response.data.detail
  //           : error.message,
  //     });
  //   }
  // };
