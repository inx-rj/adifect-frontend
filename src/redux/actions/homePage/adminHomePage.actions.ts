import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";

import HomePageApiClient from "services/homePage/HomePageApiClient";
import { SET_JOBS_DATA } from "redux/reducers/homePage/jobsList.slice";
import { SET_IN_REVIEW_JOBS_DATA } from "redux/reducers/homePage/inReviewJobsList.slice";
import { SET_FRESHERS_JOBS_DATA } from "redux/reducers/homePage/fresherJobsList.slice";
import { SET_MEMBERS_APPROVAL_JOBS_DATA } from "redux/reducers/homePage/membersApprovalJobsList.slice";
import { SET_MEMBERS_ADMIN_JOBS_DATA } from "redux/reducers/homePage/membersJobListInReview.slice";

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

const GET_MEMEBERS_FRESHERS_JOBLIST = () => async (dispatch: AppDispatch) => {
  await HomePageApiClient.fetchMembersJobListList().then((response) => {
    console.log("response", response);
    dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
  });
};

const GET_MEMEBERS_FRESHERS_LATEST_JOBLIST =
  () => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersLatestJobListList().then((response) => {
      console.log("response", response);
      dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
    });
  };

const GET_MEMEBERS_APPROVAL_JOBLIST =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersApprovalJobsList(currentPage).then(
      (response) => {
        console.log("response", response);
        dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
      }
    );
  };

const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(
      currentPage
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_MEMBERS_ADMIN_JOBS_DATA(response?.data));
    });
  };

const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_PROGRESS =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(
      currentPage
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
    });
  };

export {
  GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST,
  GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST,
  GET_MEMEBERS_FRESHERS_JOBLIST,
  GET_MEMEBERS_FRESHERS_LATEST_JOBLIST,
  GET_MEMEBERS_APPROVAL_JOBLIST,
  GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW,
  GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_PROGRESS,
};
