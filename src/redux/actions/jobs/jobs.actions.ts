import { AppDispatch, useAppSelector } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/tableType";

import HomePageApiClient from "services/homePage/HomePageApiClient";
import {
  SET_JOBS_DATA,
  SET_JOBS_DETAILS,
  SET_JOBS_SUCCESS_MESSAGE,
} from "redux/reducers/jobs/jobsList.slice";
import { SET_IN_REVIEW_JOBS_DATA } from "redux/reducers/jobs/inReviewJobsList.slice";
import {
  SET_FRESHERS_JOBS_DATA,
  SET_USER_IN_PROGRESS_JOBS_COUNT,
  SET_USER_TOTAL_JOB_COUNT,
} from "redux/reducers/jobs/fresherJobsList.slice";
import { SET_MEMBERS_APPROVAL_JOBS_DATA } from "redux/reducers/jobs/membersApprovalJobsList.slice";
import { SET_MEMBERS_ADMIN_JOBS_DATA } from "redux/reducers/jobs/membersJobListInReview.slice";
import JobsApiClient from "services/jobs/JobsApiClient";
import {
  SET_CREATOR_JOBS_DATA_IN_PROGRESS,
  SET_CREATOR_JOBS_DATA_IN_REVIEW,
  SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING,
  SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING,
} from "redux/reducers/jobs/creatorJobsList.slice";
import swal from "sweetalert";
import { Images } from "helper/images";
import {
  SET_JOBS_COMPLETED_USERS_LIST_DATA,
  SET_JOBS_COMPLETED_USERS_LIST_LOADING,
  SET_JOBS_COMPLETED_USERS_SUCCESS,
} from "redux/reducers/jobs/jobsCompletedUsers.slice";
import {
  SET_JOBS_SUBMIT_STATUS_LIST_DATA,
  SET_JOBS_SUBMIT_STATUS_LIST_LOADING,
} from "redux/reducers/jobs/jobsSubmitStatus.slice";
import {
  SET_JOBS_MEMEBER_DETAILS_LIST_DATA,
  SET_JOBS_MEMEBER_DETAILS_LIST_LOADING,
} from "redux/reducers/jobs/jobsMemeberDetails.slice";

// Get Admin In Progress Jobs List
const GET_ADMIN_DASHBOARD_IN_PROGRESS_JOBLIST =
  (endpoint, tableConfig: initialTableConfigInterface, filter?: any) =>
  async (dispatch: AppDispatch) => {
    if (filter === "In Progress") {
      filter = `progress=True`;
    } else if (filter === "Expired") {
      filter = `expire=True`;
    } else if (filter === "Completed") {
      filter = `completed=True`;
    } else {
      filter = "";
    }
    await HomePageApiClient.fetchAdminDashboardInProgressJobsList(
      endpoint,
      tableConfig,
      filter
    )
      .then((response) => {
        dispatch(SET_JOBS_DATA(response?.data?.data ?? response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

const GET_ADMIN_DASHBOARD_IN_REVIEW_JOBLIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchSuperAdminJobListInReviewList(tableConfig)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_IN_REVIEW_JOBS_DATA(response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Fetch Members Jobs List
const GET_MEMEBERS_FRESHERS_JOBLIST = () => async (dispatch: AppDispatch) => {
  await HomePageApiClient.fetchMembersJobListList()
    .then((response) => {
      console.log("response", response);
      dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// Fetch Members latest Jobs List
const GET_MEMEBERS_FRESHERS_LATEST_JOBLIST =
  (endpoint) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersLatestJobListList(endpoint)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_FRESHERS_JOBS_DATA(response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Fetch Creator Approval Jobs List
const GET_CREATORS_JOBLIST = (filter) => async (dispatch: AppDispatch) => {
  dispatch(SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING(true));
  await HomePageApiClient.fetchCreatorJobsList(filter)
    .then((response) => {
      console.log("response", response);
      dispatch(SET_CREATOR_JOBS_DATA_IN_PROGRESS(response?.data));
      dispatch(SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING(false));
    })
    .catch((error) => {
      console.log("error", error);
      dispatch(SET_CREATOR_JOBS_LIST_IN_PROGRESS_LOADING(false));
    });
};

// Fetch Creator Jobs List in Review
const GET_CREATORS_JOBLIST_IN_REVIEW =
  (filter) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING(true));
    await HomePageApiClient.fetchCreatorJobsList(filter)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_CREATOR_JOBS_DATA_IN_REVIEW(response?.data));
        dispatch(SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(SET_CREATOR_JOBS_LIST_IN_REVIEW_LOADING(false));
      });
  };

// Fetch Members Approval Jobs List
const GET_MEMEBERS_APPROVAL_JOBLIST =
  (currentPage) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchMembersApprovalJobsList(currentPage)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Fetch Duplicate Member Jobs List for In Review
const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_REVIEW =
  (data) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(data)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_MEMBERS_ADMIN_JOBS_DATA(response?.data));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

// Fetch Duplicate Member Jobs List for In Progress
const GET_DUPLICATE_MEMBER_ADMIN_JOB_LIST_IN_PROGRESS =
  (data) => async (dispatch: AppDispatch) => {
    await HomePageApiClient.fetchDuplicateMemberAdminJobListInReview(data)
      .then((response) => {
        console.log("response", response);
        dispatch(SET_MEMBERS_APPROVAL_JOBS_DATA(response?.data));
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

// Fetch Job Applied Details based on Id
const GET_JOB_APPLIED_DETAIL_DATA = (id) => async (dispatch: AppDispatch) => {
  await JobsApiClient.getJobAppliedDetails(id)
    .then((response) => {
      console.log("first response", response);
      // dispatch(SET_JOBS_DETAILS(response?.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

// Fetch Job Details based on Id
const GET_DETAIL_JOB_DATA =
  (id, endpoint?: string) => async (dispatch: AppDispatch) => {
    await JobsApiClient.fetchJobsDetails(id, endpoint)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_JOBS_DETAILS(response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Fetch Creator Available Job Details based on Id
const GET_CREATOR_AVAILABLE_DETAIL_JOB_DATA =
  (id) => async (dispatch: AppDispatch) => {
    await JobsApiClient.fetchCreatorAvailableJobsDetails(id)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_JOBS_DETAILS(response?.data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

// Fetch Member Job Details based on Id
const GET_JOB_MEMEBER_DETAIL_DATA = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_MEMEBER_DETAILS_LIST_LOADING(true));
  await JobsApiClient.getJobDetailsMember(id)
    .then((response) => {
      dispatch(SET_JOBS_MEMEBER_DETAILS_LIST_DATA(response?.data));
      dispatch(SET_JOBS_MEMEBER_DETAILS_LIST_LOADING(false));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

//Fetch Job Work Submit Status
const GET_JOB_SUBMIT_STATUS = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_SUBMIT_STATUS_LIST_LOADING(true));
  await JobsApiClient.fetchJobsSubmitStatus(id)
    .then((response) => {
      dispatch(SET_JOBS_SUBMIT_STATUS_LIST_DATA(response?.data));
      dispatch(SET_JOBS_SUBMIT_STATUS_LIST_LOADING(false));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

//Fetch Job Completed User Status
const GET_JOB_COMPLETED_USER = (data) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_COMPLETED_USERS_LIST_LOADING(true));
  await JobsApiClient.getJobCompletedUsers(data)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_COMPLETED_USERS_LIST_DATA(response?.data?.Data));
      dispatch(
        SET_JOBS_COMPLETED_USERS_SUCCESS(
          "Jobs Completed User Status Fetched Successfully"
        )
      );
      dispatch(SET_JOBS_COMPLETED_USERS_LIST_LOADING(false));
    })
    .catch((error) => {
      console.log("error", error);
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

  // let page = formData.get("currentPage");
  // let companyId = formData.get("headerCompany");
  let filter = formData.get("filter");
  // let search = formData.get("search");

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

// Update Job based on id
const UPDATE_JOB = (id, formData) => async (dispatch: AppDispatch) => {
  await JobsApiClient.updateJob(id, formData);
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

// For user job count
const TRIGGER_USER_COUNT = (userLevel) => async (dispatch) => {
  if (userLevel === 1 || userLevel === 2) {
    await JobsApiClient.fetchAgencyJobCount()
      .then((res) => {
        console.log("AGENCY COUNT", res?.data?.results);
        dispatch(SET_USER_TOTAL_JOB_COUNT(res?.data?.results?.Total_Job_count));
        dispatch(
          SET_USER_IN_PROGRESS_JOBS_COUNT(res?.data?.results?.In_progress_jobs)
        );
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  if (userLevel === 3) {
    await JobsApiClient.fetcMemberJobCount()
      .then((res) => {
        console.log("MEMBER COUNT", res?.data);
        dispatch(SET_USER_TOTAL_JOB_COUNT(res?.data?.Total_Job_count));
        dispatch(SET_USER_IN_PROGRESS_JOBS_COUNT(res?.data?.In_progress_jobs));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  if (userLevel === 4) {
    await JobsApiClient.fetchCreatorJobCount()
      .then((res) => {
        console.log("CREATOR COUNT", res?.data);
        dispatch(SET_USER_TOTAL_JOB_COUNT(res?.data?.Total_Job_count));
        dispatch(SET_USER_IN_PROGRESS_JOBS_COUNT(res?.data?.In_progress_jobs));
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
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
  UPDATE_JOB,
  CREATE_JOB,
  TRIGGER_USER_COUNT,
  GET_CREATOR_AVAILABLE_DETAIL_JOB_DATA,
  GET_JOB_SUBMIT_STATUS,
  GET_JOB_COMPLETED_USER,
  GET_JOB_MEMEBER_DETAIL_DATA,
  GET_JOB_APPLIED_DETAIL_DATA,
  GET_CREATORS_JOBLIST_IN_REVIEW,
};
