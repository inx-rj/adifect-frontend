import {
  MEMBER_PROJECT_APPLIED_FAILURE,
  MEMBER_PROJECT_APPLIED_REQUEST,
  MEMBER_PROJECT_APPLIED_SUCCESS,
  MEMBER_INHOUSE_PROJECT_APPLIED_FAIL,
  MEMBER_INHOUSE_PROJECT_APPLIED_REQUEST,
  MEMBER_INHOUSE_PROJECT_APPLIED_RESET,
  MEMBER_INHOUSE_PROJECT_APPLIED_SUCCESS,
} from "../../constants/Member-Project-Constants";
import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const MemberProjectsByFilterAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_PROJECT_APPLIED_REQUEST,
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
        `${BACKEND_API_URL}members/admin-my-project/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}&job___is_active=${params.is_active}&search=${params.search ?? ""}`
      );

      dispatch({
        type: MEMBER_PROJECT_APPLIED_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_PROJECT_APPLIED_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const MemberInhouseProjectsByFilterAction =
  (params) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_INHOUSE_PROJECT_APPLIED_REQUEST,
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
        `${BACKEND_API_URL}members/inhouse-my-project/?page=${params.page}&status=${params.status}&job__company=${params.company}&ordering=${params.ordering}&search=${params.search}`
      );

      dispatch({
        type: MEMBER_INHOUSE_PROJECT_APPLIED_SUCCESS,
        payload: data,
      });

      // return true;
    } catch (error) {
      dispatch({
        type: MEMBER_INHOUSE_PROJECT_APPLIED_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
