import { AppDispatch } from "../../store";
import JobsApiClient from "services/jobs/JobsApiClient";

import {
  SET_JOBS_ANS_LIST_DATA,
  SET_JOBS_ANS_LIST_LOADING,
  SET_JOBS_ANS_POST_DETAILS,
  SET_JOBS_ANS_POST_LOADING,
  SET_JOBS_ANS_POST_SUCCESS,
  SET_JOBS_DELETE_ANS_DATA,
  SET_JOBS_DELETE_QUE_DATA,
  SET_JOBS_QUE_LIST_DATA,
  SET_JOBS_QUE_LIST_LOADING,
  SET_JOBS_QUE_N_ANSWER_LOADING,
  SET_JOBS_QUE_N_ANS_SEARCH_DATA,
  SET_JOBS_QUE_N_ANS_SEARCH_LOADING,
} from "redux/reducers/jobs/jobsQuestionAnswer.slice";

// Fetch Job Question Details based on Id
const GET_JOBS_QUESTION_LIST = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_QUE_LIST_LOADING(true));
  await JobsApiClient.listAllQuestion(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_QUE_LIST_DATA(response?.data));
      dispatch(SET_JOBS_QUE_LIST_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Question and answer");
      dispatch(SET_JOBS_QUE_LIST_LOADING(false));
    });
};

// Fetch Job Answer Details based on Id
const GET_JOBS_ANSWER_DATA = () => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_ANS_LIST_LOADING(true));
  await JobsApiClient.listAllAnswer()
    .then((response) => {
      dispatch(SET_JOBS_ANS_LIST_DATA(response?.data));
      dispatch(SET_JOBS_ANS_LIST_LOADING(false));
    })
    .catch((error) => {
      // console.log("error in jobs Question and answer");
      dispatch(SET_JOBS_ANS_LIST_LOADING(false));
    });
};

// Post new Question
const POST_NEW_QUESTION = (data) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_ANS_POST_LOADING(true));
  return await JobsApiClient.postNewQuestion(data)
    .then((response) => {
      console.log("post question", response);
      dispatch(SET_JOBS_ANS_POST_SUCCESS(response?.data?.message));
      dispatch(SET_JOBS_ANS_POST_LOADING(false));
    })
    .catch((error) => {
      // console.log("error in jobs Files");
      dispatch(SET_JOBS_ANS_POST_LOADING(false));
    });
};

//Post Answer
const LIST_ALL_ANSWERS_POST = (data) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_ANS_POST_LOADING(true));
  return await JobsApiClient.listAllAnswerPost(data)
    .then((response) => {
      dispatch(SET_JOBS_ANS_POST_DETAILS(response?.data?.data));
      dispatch(SET_JOBS_ANS_POST_SUCCESS(response?.data?.message));
      dispatch(SET_JOBS_ANS_POST_LOADING(false));
    })
    .catch((error) => {
      // console.log("error in jobs Files");
      dispatch(SET_JOBS_ANS_POST_LOADING(false));
    });
};

//list all search data
const LIST_ALL_SEARCH = (data, endpoint) => async (dispatch: AppDispatch) => {
  // console.log(" data", data);
  dispatch(SET_JOBS_QUE_N_ANS_SEARCH_LOADING(true));
  await JobsApiClient.listAllSearch(data, endpoint)
    .then((response) => {
      // console.log("first response", response);
      dispatch(SET_JOBS_QUE_N_ANS_SEARCH_DATA(response?.data?.data));
      dispatch(SET_JOBS_QUE_N_ANS_SEARCH_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_QUE_N_ANS_SEARCH_LOADING(false));
    });
};

//Delete Job Question
const DELETE_JOB_QUESTION = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(true));
  await JobsApiClient.deleteJobQuestion(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_DELETE_QUE_DATA("Question Deleted successfully"));
      dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(false));
    });
};

//Delete Job Answer
const DELETE_JOB_ANSWER = (id) => async (dispatch: AppDispatch) => {
  dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(true));
  await JobsApiClient.deleteJobAnswer(id)
    .then((response) => {
      console.log("first response", response);
      dispatch(SET_JOBS_DELETE_ANS_DATA("Question Deleted successfully"));
      dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(false));
    })
    .catch((error) => {
      console.log("error in jobs Files");
      dispatch(SET_JOBS_QUE_N_ANSWER_LOADING(false));
    });
};

// Common auth Config
export {
  GET_JOBS_QUESTION_LIST,
  LIST_ALL_ANSWERS_POST,
  LIST_ALL_SEARCH,
  DELETE_JOB_QUESTION,
  DELETE_JOB_ANSWER,
  GET_JOBS_ANSWER_DATA,
  POST_NEW_QUESTION,
};
