import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";

import HomePageApiClient from "services/homePage/HomePageApiClient";
import { SET_JOBS_DATA } from "redux/reducers/homePage/jobsList.slice";
import { SET_IN_REVIEW_JOBS_DATA } from "redux/reducers/homePage/inReviewJobsList.slice";

// Get Admin In Progress Jobs List
const GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchAdminDashboardInProgressJobsList(
      tableConfig
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_JOBS_DATA(response?.data));
    });
  };

const GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchSuperAdminJobListInReviewList(
      tableConfig
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_IN_REVIEW_JOBS_DATA(response?.data));
    });
  };

export {
  GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST,
  GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST,
};
