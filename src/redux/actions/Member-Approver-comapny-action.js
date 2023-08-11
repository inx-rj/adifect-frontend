import {
  MEMBER_APPROVER_COMPANY_REQUEST,
  MEMBER_APPROVER_COMPANY_SUCCESS,
  MEMBER_APPROVER_COMPANY_FAILURE,
  MEMBER_APPROVER_COMPANY_DATA_FAILURE,
  MEMBER_APPROVER_COMPANY_DATA_REQUEST,
  MEMBER_APPROVER_COMPANY_DATA_SUCCESS,
} from "../../constants/Member-approver-company-constants";
import axios from "axios";
// import api from "../../utils/api";
import api from "../../utils/api";
// import { BACKEND_API_URL } from "../../environment";
import { BACKEND_API_URL } from "../../environment";

export const memberApproverCompanyAction = () => async (dispatch) => {
  try {
    dispatch({
      type: MEMBER_APPROVER_COMPANY_REQUEST,
    });

    const { data } = await api.get(`${BACKEND_API_URL}members/company/`);

    dispatch({
      type: MEMBER_APPROVER_COMPANY_SUCCESS,
      payload: data,
    });
    //  console.log("action check",data);
    // return true;
  } catch (error) {
    dispatch({
      type: MEMBER_APPROVER_COMPANY_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const memberApproverCompanyDataAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MEMBER_APPROVER_COMPANY_DATA_REQUEST,
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
        `${BACKEND_API_URL}members/company/${id}`,
        config
      );

      dispatch({
        type: MEMBER_APPROVER_COMPANY_DATA_SUCCESS,

        payload: data,
      });

      return true;
    } catch (error) {
      dispatch({
        type: MEMBER_APPROVER_COMPANY_DATA_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
