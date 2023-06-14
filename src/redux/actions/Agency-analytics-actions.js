import {
  AGENCY_TOP_ADS_LIST_REQUEST,
  AGENCY_TOP_ADS_LIST_SUCCESS,
  AGENCY_TOP_ADS_LIST_FAIL,
  AGENCY_ADS_CHART_REQUEST,
  AGENCY_ADS_CHART_SUCCESS,
  AGENCY_ADS_CHART_FAIL,
} from "../../constants/Agency-analytics-constants";

import { BACKEND_API_URL } from "../../environment";
import api from "../../utils/api";

// Agency top ads list***********
export const agencyTopAdsListAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_TOP_ADS_LIST_REQUEST,
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

    // const { data } = await api.get(`${BACKEND_API_URL}agency-topads-list/`, config);
    const data = [
      {
        id: 1,
        title: "Marketing Campaign  Job 1",
        reach: 13500,
        color: "pink",
      },
      {
        id: 2,
        title: "Marketing Campaign  Job 2",
        reach: 13500,
        color: "blue",
      },
      {
        id: 3,
        title: "Marketing Campaign  Job 3",
        reach: 13500,
        color: "yellow",
      },
    ];

    dispatch({
      type: AGENCY_TOP_ADS_LIST_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_TOP_ADS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// Agency top ads list***********

// Agency ads performance chart***********
export const agencyAdsChartAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGENCY_ADS_CHART_REQUEST,
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

    // const { data } = await api.get(`${BACKEND_API_URL}agency-topads-list/`, config);
    const data = [
      {
        data: [65, 59, 80, 81, 26, 55, 40],
        fill: false,
        borderWidth: 5.82,
        tension: 0.8,
        borderColor: "#C315FF",
      },
      {
        data: [0, 9, 0, 8, 2, 55, 10],
        fill: false,
        borderWidth: 5.82,
        tension: 0.8,
        borderColor: "#2472FC",
      },
      {
        data: [0, 55, 80, 88, 21, 55, 44],
        fill: false,
        borderWidth: 5.82,
        tension: 0.8,
        borderColor: "#D99836",
      },
    ];

    dispatch({
      type: AGENCY_ADS_CHART_SUCCESS,
      payload: data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AGENCY_ADS_CHART_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// Agency ads performance chart***********
