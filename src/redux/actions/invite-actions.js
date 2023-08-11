import {
  INVITE_LIST_REQUEST,
  INVITE_LIST_SUCCESS,
  INVITE_LIST_FAIL,
  INVITE_ACCEPT_REJECT_REQUEST,
  INVITE_ACCEPT_REJECT_SUCCESS,
  INVITE_ACCEPT_REJECT_FAIL,
  INVITE_DELETE_REQUEST,
  INVITE_DELETE_SUCCESS,
  INVITE_DELETE_FAIL,
  INVITE_UPDATE_REQUEST,
  INVITE_UPDATE_SUCCESS,
  INVITE_UPDATE_FAIL,
  INVITE_DETAILS_REQUEST,
  INVITE_DETAILS_SUCCESS,
  INVITE_DETAILS_FAIL,
  INVITE_DETAILS_RESET,
  COMPANY_INVITE_PROFILE_POST_REQUEST,
  COMPANY_INVITE_PROFILE_POST_SUCCESS,
  COMPANY_INVITE_PROFILE_POST_FAILURE,
  COMPANY_INVITE_PROFILE_POST_RESET,
  INVITED_ADMIN_MEMBERS_LIST_REQUEST,
  INVITED_ADMIN_MEMBERS_LIST_SUCCESS,
  INVITED_ADMIN_MEMBERS_LIST_FAIL,
} from "../../constants/invite-constants";

import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const CompanyInviteProflePostAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: COMPANY_INVITE_PROFILE_POST_REQUEST,
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
        `${BACKEND_API_URL}agency/invite-member/`,
        params,
        config
      );
      dispatch({
        type: COMPANY_INVITE_PROFILE_POST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: COMPANY_INVITE_PROFILE_POST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const AllInvite = () => async (dispatch) => {
  try {
    dispatch({
      type: INVITE_LIST_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}agency/invite-member/`);

    dispatch({
      type: INVITE_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: INVITE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteInvite = (id) => async (dispatch) => {
  try {
    dispatch({
      type: INVITE_DELETE_REQUEST,
    });

    const { data } = await api.delete(
      `${BACKEND_API_URL}agency/invite-member/${id}`
    );

    dispatch({
      type: INVITE_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: INVITE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateInvite = (id, params) => async (dispatch) => {
  try {
    dispatch({
      type: INVITE_UPDATE_REQUEST,
    });

    const { data } = await api.put(
      `${BACKEND_API_URL}agency/invite-member/${id}/`,
      params
    );

    dispatch({
      type: INVITE_UPDATE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: INVITE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getinviteDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVITE_DETAILS_REQUEST,
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
      `${BACKEND_API_URL}agency/invite-member/${id}`
    );
    // const { data } = await api.get(`company/${id}/`, config);

    dispatch({
      type: INVITE_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: INVITE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const inviteAcceptReject =
  (decodeId, accept_invite_encode, exclusive_decode) => async (dispatch) => {
    try {
      dispatch({
        type: INVITE_ACCEPT_REJECT_REQUEST,
      });

      const { data } = await axios.get(
        `${BACKEND_API_URL}agency/update-invite-member/${decodeId}/${accept_invite_encode}/${exclusive_decode}`
      );

      dispatch({
        type: INVITE_ACCEPT_REJECT_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: INVITE_ACCEPT_REJECT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const invitedAdminMembersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVITED_ADMIN_MEMBERS_LIST_REQUEST,
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
      `${BACKEND_API_URL}agency/admin-members-list`,
      config
    );

    dispatch({
      type: INVITED_ADMIN_MEMBERS_LIST_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: INVITED_ADMIN_MEMBERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
