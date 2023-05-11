import { message } from "./../../../helper/validations/index";
import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";

import HomePageApiClient from "services/homePage/HomePageApiClient";
import {
  SET_JOBS_DATA,
  SET_JOBS_DETAILS,
  SET_JOBS_SUCCESS_MESSAGE,
} from "redux/reducers/homePage/jobsList.slice";
import { SET_IN_REVIEW_JOBS_DATA } from "redux/reducers/homePage/inReviewJobsList.slice";
import { SET_FRESHERS_JOBS_DATA } from "redux/reducers/homePage/fresherJobsList.slice";
import { SET_MEMBERS_APPROVAL_JOBS_DATA } from "redux/reducers/homePage/membersApprovalJobsList.slice";
import { SET_MEMBERS_ADMIN_JOBS_DATA } from "redux/reducers/homePage/membersJobListInReview.slice";
import JobsApiClient from "services/jobs/JobsApiClient";
import { SET_CREATOR_JOBS_DATA } from "redux/reducers/homePage/creatorJobsList.slice";
import swal from "sweetalert";
import { Images } from "helper/images";

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

// Fetch Members Jobs List
const GET_MEMEBERS_FRESHERS_JOBLIST = () => async (dispatch: AppDispatch) => {
  await HomePageApiClient.fetchMembersJobListList().then((response) => {
    console.log("response", response);
    dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
  });
};

// Fetch Members latest Jobs List
const GET_MEMEBERS_FRESHERS_LATEST_JOBLIST =
  () => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersLatestJobListList().then((response) => {
      console.log("response", response);
      dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
    });
  };

// Fetch Creator Approval Jobs List
const GET_CREATORS_JOBLIST = (filter) => async (dispatch: AppDispatch) => {
  await HomePageApiClient.fetchCreatorJobsList(filter).then((response) => {
    console.log("response", response);
    dispatch(SET_CREATOR_JOBS_DATA(response?.data));
  });
};

// Fetch Members Approval Jobs List
const GET_MEMEBERS_APPROVAL_JOBLIST =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersApprovalJobsList(currentPage).then(
      (response) => {
        console.log("response", response);
        dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
      }
    );
  };

// Fetch Duplicate Member Jobs List for In Review
const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(
      currentPage
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_MEMBERS_ADMIN_JOBS_DATA(response?.data));
    });
  };

// Fetch Duplicate Member Jobs List for In Progress
const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_PROGRESS =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(
      currentPage
    ).then((response) => {
      console.log("response", response);
      dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
    });
  };

// Fetch Job Details based on Id
const GET_DETAIL_JOB_DATA = (id) => async (dispatch: AppDispatch) => {
  await JobsApiClient.fetchJobsDetails(id).then((response) => {
    console.log("first response", response);
    dispatch(SET_JOBS_DETAILS(response?.data));
  });
};

// Apply For Job (Creator Role)
const APPLY_FOR_JOB = (formData) => async (dispatch: AppDispatch) => {
  await JobsApiClient.jobApply(formData);
};

// Create Job (Admin Role)
const CREATE_JOB = (formData) => async (dispatch: AppDispatch) => {
  await JobsApiClient.createApply(formData);
};

// List All Jobs
const LIST_ALL_JOBS = (formData) => async (dispatch: AppDispatch) => {
  console.log("formData", formData);

  let page = formData.get("currentPage");
  let companyId = formData.get("headerCompany");
  let filter = formData.get("filter");
  let search = formData.get("search");

  if (filter === "In Progress") {
    filter = `progress=True`;
  } else if (filter === "Expired") {
    filter = `expire=True`;
  } else if (filter === "Completed") {
    filter = `completed=True`;
  } else {
    filter = "";
  }

  await JobsApiClient.fetchAllJobsList(formData);
};

//Delete Job based on id
const DELETE_JOB = (id) => async (dispatch: AppDispatch) => {
  await JobsApiClient.deleteJob(id)
    .then((response) => {
      if (response?.data?.status === 204) {
        dispatch(SET_JOBS_SUCCESS_MESSAGE(response?.data?.message));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",

          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
      }
    })
    .catch((error) => {
      // console.log("error", error);
      swal({
        title: "Error",
        text: error?.data?.message,
        className: "successAlert",

        icon: Images.Logo,
        buttons: {
          OK: false,
        },
        timer: 1500,
      });
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
  GET_DETAIL_JOB_DATA,
  GET_CREATORS_JOBLIST,
  APPLY_FOR_JOB,
  LIST_ALL_JOBS,
  DELETE_JOB,
  CREATE_JOB,
};
