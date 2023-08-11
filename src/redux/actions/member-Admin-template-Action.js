import {
  MEMBER_ADMIN_GET_JOB_TEMPLATE_SUCCESS,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_FAILURE,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_REQUEST,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_FAILURE,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_REQUEST,
  MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_SUCCESS,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_REQUEST,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_SUCCESS,
  MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_FAIL,
} from "../../constants/member-Admin-template-constamts";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

//TEMPLATE ABHISHEK

export const MemberAdminTemplateUpdate = (MembertemplateId, params) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_REQUEST,
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
      `${BACKEND_API_URL}members/members-job-template/${MembertemplateId}/`,params,config
    );

    dispatch({
      type: MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_ADMIN_UPDATE_JOB_TEMPLATE_FAIL,
      payload:
        error.response && error.message
          ? error.response.data.detail
          : error.message,
    });
  }
};

//TEMPLATE ABHISHEK
export const MemberAdminTemplateAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEMBER_ADMIN_GET_JOB_TEMPLATE_REQUEST,
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
      `${BACKEND_API_URL}members/members-job-template/?company=${id}`
    );

    dispatch({
      type: MEMBER_ADMIN_GET_JOB_TEMPLATE_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_ADMIN_GET_JOB_TEMPLATE_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

  //   const { data } = await api.delete(`${BACKEND_API_URL}job-template/${id}`);
  

  export const MemberAdminTemplateDeleteAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_REQUEST,
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
        `${BACKEND_API_URL}members/members-job-template/${id}`
      );
  
      dispatch({
        type: MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_SUCCESS,
        payload: data,
      });
  
      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_GET_JOB_TEMPLATE_DELETE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
 
