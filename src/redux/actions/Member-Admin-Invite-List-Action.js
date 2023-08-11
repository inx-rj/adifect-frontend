import {
  MEMBER_ADMIN_INVITE_LIST_REQUEST,
  MEMBER_ADMIN_INVITE_LIST_FAILURE,
  MEMBER_ADMIN_INVITE_LIST_SUCCESS,
  MEMBER_ADMIN_INVITE_LIST_DELETE_FAILURE,
  MEMBER_ADMIN_INVITE_LIST_DELETE_REQUEST,
  MEMBER_ADMIN_INVITE_LIST_DELETE_SUCCESS,
  MEMBER_ADMIN_INVITE_POST_FAILURE,
  MEMBER_ADMIN_INVITE_POST_REQUEST,
  MEMBER_ADMIN_INVITE_POST_SUCCESS,
  MEMBER_ADMIN_INVITE_UPDATE_FAILURE,
  MEMBER_ADMIN_INVITE_UPDATE_REQUEST,
  MEMBER_ADMIN_INVITE_UPDATE_SUCCESS,
} from "../../constants/Member-Admin-Invite-list-Constants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const memberAdminInviteListAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_INVITE_LIST_REQUEST,
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
        `${BACKEND_API_URL}members/invite-member/?company=${id}`
      );

      dispatch({
        type: MEMBER_ADMIN_INVITE_LIST_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_INVITE_LIST_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const memberAdminInviteLisDeldetetAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MEMBER_ADMIN_INVITE_LIST_DELETE_REQUEST,
    });

    const { data } = await api.delete(
      `${BACKEND_API_URL}members/invite-member/${id}/`
    );

    dispatch({
      type: MEMBER_ADMIN_INVITE_LIST_DELETE_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: MEMBER_ADMIN_INVITE_LIST_DELETE_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const memberAdminInvitePostAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_INVITE_POST_REQUEST,
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
        type: MEMBER_ADMIN_INVITE_POST_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_INVITE_POST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const memberAdminInviteUpdateAction =
  (id, params) => async (dispatch) => {
    try {
      dispatch({
        type: MEMBER_ADMIN_INVITE_UPDATE_REQUEST,
      });

      const { data } = await api.put(
        `${BACKEND_API_URL}agency/invite-member/${id}/`,
        params
      );

      dispatch({
        type: MEMBER_ADMIN_INVITE_UPDATE_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_ADMIN_INVITE_UPDATE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
