import {
  AGENCY_ADMIN_LIST_REQUEST,
  AGENCY_ADMIN_LIST_SUCCESS,
  AGENCY_ADMIN_LIST_FAIL,
} from "../../constants/agency-constants";
import axios from "axios";
import api from "../../utils/api";

export const listAllAgency = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_ADMIN_LIST_REQUEST,
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

    const { data } = await api.get("agency-list/", config);

    dispatch({
      type: AGENCY_ADMIN_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
