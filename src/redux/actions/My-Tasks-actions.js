import {
  AGENCY_MY_TASKS_LIST_FILTER_REQUEST,
  AGENCY_MY_TASKS_LIST_FILTER_SUCCESS,
  AGENCY_MY_TASKS_LIST_FILTER_FAIL,
  MY_TASKS_DETAILS_AGENCY_REQUEST,
  MY_TASKS_DETAILS_AGENCY_SUCCESS,
  MY_TASKS_DETAILS_AGENCY_FAIL,
} from "../../constants/MyTasks-constants";

import api from "../../utils/api";
import { BACKEND_API_URL } from "../../environment";

export const agencyMyTasksByFilter = (params) => async (dispatch) => {
  try {
    dispatch({
      type: AGENCY_MY_TASKS_LIST_FILTER_REQUEST,
    });
    let data = [];

    data = await api.get(
      `${BACKEND_API_URL}intake-forms/form-task/`, { params }
    );

    dispatch({
      type: AGENCY_MY_TASKS_LIST_FILTER_SUCCESS,
      payload: data?.data?.data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: AGENCY_MY_TASKS_LIST_FILTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getMyTasksDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_TASKS_DETAILS_AGENCY_REQUEST,
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
      `${BACKEND_API_URL}intake-forms/form-task/${id}/`
    );

    dispatch({
      type: MY_TASKS_DETAILS_AGENCY_SUCCESS,
      payload: data,
    });

    // return true;
  } catch (error) {
    dispatch({
      type: MY_TASKS_DETAILS_AGENCY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

