import swal from "sweetalert";
import { AppDispatch } from "../../store";
import InviteUserApiClient from "services/inviteUser/InviteUserApiClient";
import { Images } from "helper/images";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import JobsApiClient from "services/jobs/JobsApiClient";
import {
  SET_COMPLETED_JOBS_ACTIVITY_LIST_DATA,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING,
  SET_COMPLETED_JOBS_ACTIVITY_LIST_SUCCESS,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_DATA,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING,
  SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_SUCCESS,
  SET_JOBS_ACTIVITY_DETAILS,
  SET_JOBS_ACTIVITY_INVITE_USER_LIST_SUCCESS,
  SET_JOBS_ACTIVITY_LIST_DATA,
  SET_JOBS_ACTIVITY_LIST_LOADING,
  SET_POST_JOBS_ACTIVITY_CHAT_LOADING,
  SET_POST_JOBS_ACTIVITY_CHAT_SUCCESS,
} from "redux/reducers/jobs/jobsActivity.slice";
import {
  SET_CREATOR_RATING_ACTIVITY_DATA,
  SET_CREATOR_RATING_ACTIVITY_LIST_LOADING,
  SET_CREATOR_RATING_ACTIVITY_POST_DATA,
  SET_CREATOR_RATING_ACTIVITY_POST_LOADING,
  SET_CREATOR_RATING_ACTIVITY_POST_SUCCESS,
} from "redux/reducers/jobs/creatorRatingActivity.slice";
import {
  SET_CREATOR_ACTIVITY_DATA,
  SET_CREATOR_ACTIVITY_DETAILS_LOADING,
  SET_CREATOR_ACTIVITY_SUCCESS,
  SET_SUBMIT_JOB_WORK_DATA,
  SET_SUBMIT_JOB_WORK_ERROR,
  SET_SUBMIT_JOB_WORK_LOADING,
  SET_SUBMIT_JOB_WORK_SUCCESS,
} from "redux/reducers/jobs/creatorActivity.slice";
import {
  SET_COMPLETED_TASK_DETAILS_LOADING,
  SET_COMPLETED_TASK_LIST_DATA,
  SET_COMPLETED_TASK_LIST_SUCCESS,
} from "redux/reducers/jobs/completedTask.slice";
import {
  SET_CREATOR_JOB_APPLIED_DATA,
  SET_CREATOR_JOB_APPLIED_LIST_LOADING,
} from "redux/reducers/jobs/jobsApplied.slice";
import {
  SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING,
  SET_APPROVAL_REJECTED_STATUS_LIST_DATA,
  SET_APPROVAL_REJECTED_STATUS_LIST_SUCCESS,
} from "redux/reducers/jobs/ApprovalRejectedStatus.slice";
import {
  SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_DATA,
  SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING,
  SET_JOBS_WORK_APPROVAL_LIST_DATA,
  SET_JOBS_WORK_APPROVAL_LIST_LOADING,
} from "redux/reducers/jobs/workApproval.slice";
import { hasResultsKey } from "helper/utility/customFunctions";

// Fetch Job Activity Details based on Id
const GET_JOBS_ACTIVITY_DETAILS =
  (endpoint: string, id, order, user?: any) =>
  async (dispatch: AppDispatch) => {
    await JobsApiClient.fetchJobsActivityDetails(
      endpoint,
      id,
      order,
      user
    ).then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_ACTIVITY_DETAILS(response?.data));
    });
  };

// get job activity invite user list
const GET_JOB_ACTIVITY_INVITE_USERS_LIST =
  (id: number | string) => async (dispatch: AppDispatch) => {
    dispatch(SET_JOBS_ACTIVITY_LIST_LOADING(true));
    await InviteUserApiClient.fetchJobActivityInviteUsers(id)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          const customizedResponse = hasResultsKey(response)
            ? response?.data?.data || response?.data
            : {
                count: 0,
                prev: null,
                next: null,
                results: response?.data?.data || response?.data,
              };
          dispatch(SET_JOBS_ACTIVITY_LIST_DATA(customizedResponse));
          dispatch(
            SET_JOBS_ACTIVITY_INVITE_USER_LIST_SUCCESS("Fetched Successfully")
          );
          dispatch(SET_JOBS_ACTIVITY_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_JOBS_ACTIVITY_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// fetch completed jobs User List
const GET_COMPLETED_JOB_ACTIVITY_USER_LIST =
  (id: number | string) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING(true));
    await JobsApiClient.fetchCompletedJobsActivity(id)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(
            SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_DATA(response?.data?.data)
          );
          dispatch(
            SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_SUCCESS(
              "Fetched Successfully"
            )
          );
          dispatch(SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_COMPLETED_JOBS_ACTIVITY_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

const GET_COMPLETED_JOB_ACTIVITY_LIST =
  (id: number | string, status) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING(true));
    const params = {
      status: status,
    };
    await JobsApiClient.fetchCompletedJobsList(id, params)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_COMPLETED_JOBS_ACTIVITY_LIST_DATA(response?.data?.data));
          dispatch(
            SET_COMPLETED_JOBS_ACTIVITY_LIST_SUCCESS("Fetched Successfully")
          );
          dispatch(SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_COMPLETED_JOBS_ACTIVITY_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

//post activity chat
const POST_ACTIVITY_CHAT = (formData) => async (dispatch: AppDispatch) => {
  dispatch(SET_POST_JOBS_ACTIVITY_CHAT_LOADING(true));
  await JobsApiClient.postActivityChat(formData)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_POST_JOBS_ACTIVITY_CHAT_SUCCESS("Successs"));
      dispatch(SET_POST_JOBS_ACTIVITY_CHAT_LOADING(false));
    })
    .catch((error) => {
      console.log("error");
    });
};

const MEMBER_VIEW_WORK_APPROVAL_DETAILS =
  (jobId, userId) => async (dispatch: AppDispatch) => {
    dispatch(SET_JOBS_WORK_APPROVAL_LIST_LOADING(true));
    await JobsApiClient.memberworkApproval(jobId, userId)
      .then((response) => {
        console.log("first response", response);
        dispatch(
          SET_JOBS_WORK_APPROVAL_LIST_DATA(
            response?.data?.data ?? response?.data
          )
        );
        dispatch(SET_JOBS_WORK_APPROVAL_LIST_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

const MEMBER_VIEW_APPROVAL_ACTION =
  (jobId, data) => async (dispatch: AppDispatch) => {
    dispatch(SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING(true));
    await JobsApiClient.MemberViewApproveAction(jobId, data)
      .then((response) => {
        dispatch(
          SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_DATA(
            response?.data?.data ?? response?.data
          )
        );
        dispatch(SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(SET_JOBS_MEMBER_VIEW_WORK_APPROVAL_LOADING(false));
      });
  };

const CREATOR_JOB_ACTIVITY_DETAILS =
  (jobId, order) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATOR_ACTIVITY_DETAILS_LOADING(true));
    await JobsApiClient.fetchCreatorJObActivityDetails(jobId, order)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_CREATOR_ACTIVITY_DATA(response?.data));
        dispatch(
          SET_CREATOR_ACTIVITY_SUCCESS("Activity Details Fetched successfully")
        );
        dispatch(SET_CREATOR_ACTIVITY_DETAILS_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(SET_CREATOR_ACTIVITY_DETAILS_LOADING(false));
      });
  };

const IS_APPROVAL_REJECTED_STATUS = (data) => async (dispatch: AppDispatch) => {
  dispatch(SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING(true));
  await JobsApiClient.isApprovalRejectedStatus(data)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_APPROVAL_REJECTED_STATUS_LIST_DATA(response?.data));
      dispatch(
        SET_APPROVAL_REJECTED_STATUS_LIST_SUCCESS(
          " Approval Rejected Status Fetched Successfully"
        )
      );
      dispatch(SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING(false));
    })
    .catch((error) => {
      console.log("error");
      dispatch(SET_APPROVAL_REJECTED_STATUS_DETAILS_LOADING(false));
    });
};

const CREATOR_JOB_APPLIED_ID_DETAILS =
  (data) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATOR_JOB_APPLIED_LIST_LOADING(true));
    await JobsApiClient.creatorAppliedJobIdAction(data)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_CREATOR_JOB_APPLIED_DATA(response?.data));
        dispatch(SET_CREATOR_JOB_APPLIED_LIST_LOADING(false));
      })
      .catch((error) => {
        console.log("error");
        dispatch(SET_CREATOR_JOB_APPLIED_LIST_LOADING(false));
      });
  };

const GET_COMPLETED_TASK_LIST = (data) => async (dispatch: AppDispatch) => {
  dispatch(SET_COMPLETED_TASK_DETAILS_LOADING(true));
  await JobsApiClient.getCompletedTaskList(data)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_COMPLETED_TASK_LIST_DATA(response?.data));
      dispatch(
        SET_COMPLETED_TASK_LIST_SUCCESS(
          "Completed Task List fetched successfully"
        )
      );
      dispatch(SET_COMPLETED_TASK_DETAILS_LOADING(false));
    })
    .catch((error) => {
      console.log("error");
      dispatch(SET_COMPLETED_TASK_DETAILS_LOADING(false));
    });
};

const GET_CREATOR_ACTIVITY_RATINGS =
  (data, userId) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATOR_RATING_ACTIVITY_LIST_LOADING(true));
    await JobsApiClient.CreatorActivityGetRatingAction(data, userId)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_CREATOR_RATING_ACTIVITY_DATA(response?.data));
        dispatch(SET_CREATOR_RATING_ACTIVITY_LIST_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(SET_CREATOR_RATING_ACTIVITY_LIST_LOADING(false));
      });
  };

const POST_CREATOR_ACTIVITY_RATINGS =
  (data) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATOR_RATING_ACTIVITY_POST_LOADING(true));
    await JobsApiClient.CreatorActivityPostRatingAction(data)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_CREATOR_RATING_ACTIVITY_POST_DATA(response?.data));
        dispatch(
          SET_CREATOR_RATING_ACTIVITY_POST_SUCCESS("Rating Posted Successfully")
        );
        dispatch(SET_CREATOR_RATING_ACTIVITY_POST_LOADING(false));
      })
      .catch((error) => {
        console.log("error");
        dispatch(SET_CREATOR_RATING_ACTIVITY_POST_LOADING(false));
      });
  };

const CREATOR_ACTIVITY_JOB_SUBMIT_ACTION =
  (data) => async (dispatch: AppDispatch) => {
    dispatch(SET_SUBMIT_JOB_WORK_LOADING(true));
    await JobsApiClient.creatorActivityJobSubmitAction(data)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_SUBMIT_JOB_WORK_DATA(response?.data));
        dispatch(SET_SUBMIT_JOB_WORK_SUCCESS("Submit job work successfully"));
        dispatch(SET_SUBMIT_JOB_WORK_LOADING(false));
      })
      .catch((error) => {
        console.log("error", error);
        dispatch(SET_SUBMIT_JOB_WORK_ERROR("Error occurred"));
      });
  };

// Common auth Config
export {
  GET_JOBS_ACTIVITY_DETAILS,
  GET_JOB_ACTIVITY_INVITE_USERS_LIST,
  GET_COMPLETED_JOB_ACTIVITY_USER_LIST,
  POST_ACTIVITY_CHAT,
  MEMBER_VIEW_WORK_APPROVAL_DETAILS,
  GET_COMPLETED_JOB_ACTIVITY_LIST,
  CREATOR_JOB_ACTIVITY_DETAILS,
  IS_APPROVAL_REJECTED_STATUS,
  CREATOR_JOB_APPLIED_ID_DETAILS,
  GET_COMPLETED_TASK_LIST,
  GET_CREATOR_ACTIVITY_RATINGS,
  CREATOR_ACTIVITY_JOB_SUBMIT_ACTION,
  POST_CREATOR_ACTIVITY_RATINGS,
  MEMBER_VIEW_APPROVAL_ACTION,
};
