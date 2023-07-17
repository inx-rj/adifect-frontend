import {
  USER_ADMIN_LIST_REQUEST,
  USER_ADMIN_LIST_SUCCESS,
  USER_ADMIN_LIST_FAIL,
  USERADMIN_DETAILS_REQUEST,
  USERADMIN_DETAILS_SUCCESS,
  USERADMIN_DETAILS_FAIL,
  USERADMIN_DETAILS_RESET,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
} from "../../constants/user-constants";
import axios from "axios";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const listAllUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_LIST_REQUEST,
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

    const { data } = await api.get(`${BACKEND_API_URL}users-list/`, config);

    dispatch({
      type: USER_ADMIN_LIST_SUCCESS,
      payload: data?.data?.results,
    });

    return true;
  } catch (error) {
    dispatch({
      type: USER_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USERADMIN_DETAILS_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}users-list/${id}/`);

    dispatch({
      type: USERADMIN_DETAILS_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: USERADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminUpdateUserAction =
  (id, params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_USER_REQUEST,
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
        `${BACKEND_API_URL}users-list/${id}/`,
        params,
        config
      );

      dispatch({
        type: ADMIN_UPDATE_USER_SUCCESS,
        payload: data,
      });
      return true;
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATE_USER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.response.data
              ? error.response.data.message
              : error.message,
      });
    }
  };
