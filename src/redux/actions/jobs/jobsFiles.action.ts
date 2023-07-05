import { AppDispatch } from "../../store";
import JobsApiClient from "services/jobs/JobsApiClient";
import {
  SET_JOBS_FILES_LIST_DATA,
  SET_JOBS_FILES_LIST_LOADING,
} from "redux/reducers/jobs/jobsFiles.slice";

// Fetch Job Files Details based on Id
const GET_JOBS_FILES_DETAIL_DATA =
  (endpoint: string, id, user?: any) => async (dispatch: AppDispatch) => {
    dispatch(SET_JOBS_FILES_LIST_LOADING(true));
    await JobsApiClient.fetchJobsFilesDetails(endpoint, id, user)
      .then((response) => {
        console.log("first response", response);
        dispatch(SET_JOBS_FILES_LIST_DATA(response?.data));
        dispatch(SET_JOBS_FILES_LIST_LOADING(false));
      })
      .catch((error) => {
        console.log("error in jobs Files");
        dispatch(SET_JOBS_FILES_LIST_LOADING(false));
      });
  };

// Common auth Config
export { GET_JOBS_FILES_DETAIL_DATA };
