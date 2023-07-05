import { AppDispatch } from "../../store";
import JobsApiClient from "services/jobs/JobsApiClient";
import {
  SET_JOBS_PROPOSALS_ACCEPTED,
  SET_JOBS_PROPOSALS_LIST_DATA,
  SET_JOBS_PROPOSALS_LIST_LOADING,
  SET_JOBS_PROPOSALS_LOADING,
  SET_JOBS_PROPOSALS_REJECTED,
  SET_JOBS_PROPOSALS_UPDATED,
} from "redux/reducers/jobs/jobsProposals.slice";

// Fetch Job Proposals Details based on Id
const GET_JOBS_PROPOSALS_DETAIL_DATA =
  (id) => async (dispatch: AppDispatch) => {
    dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(true));
    await JobsApiClient.fetchJobsProposalDetails(id)
      .then((response) => {
        dispatch(SET_JOBS_PROPOSALS_LIST_DATA(response?.data?.data));
        dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(false));
      })
      .catch((error) => {
        console.log("error in jobs Files");
        dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(false));
      });
  };

//Proposals Details Seen  based on Id
const GET_JOBS_PROPOSALS_SEEN = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(true));
  await JobsApiClient.jobsProposalsSeen(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_PROPOSALS_LIST_DATA(response?.data));
      dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_PROPOSALS_LIST_LOADING(false));
    });
};

//Update Jobs Proposals
const UPDATE_JOB_PROPOSALS = (id, data) => async (dispatch: AppDispatch) => {
  console.log("id, data", id, data);
  dispatch(SET_JOBS_PROPOSALS_LOADING(true));
  await JobsApiClient.updateJobsProposals(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_PROPOSALS_UPDATED(response?.data));
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    });
};

//Accept Jobs Proposals
const ACCEPT_JOB_PROPOSALS = (id, data) => async (dispatch: AppDispatch) => {
  console.log("id, data", id, data);
  dispatch(SET_JOBS_PROPOSALS_LOADING(true));
  await JobsApiClient.acceptRejectJobsProposals(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_PROPOSALS_ACCEPTED(response?.data));
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    });
};

//Reject Jobs Proposals
const REJECT_JOB_PROPOSALS = (id, data) => async (dispatch: AppDispatch) => {
  console.log("id, data", id, data);
  dispatch(SET_JOBS_PROPOSALS_LOADING(true));
  await JobsApiClient.acceptRejectJobsProposals(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_PROPOSALS_REJECTED(response?.data));
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_PROPOSALS_LOADING(false));
    });
};

// Common auth Config
export {
  GET_JOBS_PROPOSALS_DETAIL_DATA,
  UPDATE_JOB_PROPOSALS,
  ACCEPT_JOB_PROPOSALS,
  REJECT_JOB_PROPOSALS,
  GET_JOBS_PROPOSALS_SEEN,
};
