import { Images } from "helper/images";
import {
  SET_DELETE_DRAFT_JOBS,
  SET_DRAFT_JOBS_DATA,
  SET_DRAFT_JOBS_DATA_LOADING,
  SET_DRAFT_JOBS_LOADING,
} from "redux/reducers/draftJobs/draftJobs.slice";
import { AppDispatch } from "redux/store";
import DraftJobsApiClient from "services/draftJobs/DraftJobsApiClient";
import swal from "sweetalert";

// Get Draft Jobs List
const GET_DRAFT_JOBS_LIST = (filter, id: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_DRAFT_JOBS_DATA_LOADING(true));
  await DraftJobsApiClient.fetchDraftJobsList(filter, id).then((response) => {
    dispatch(SET_DRAFT_JOBS_DATA(response?.data?.data));
    dispatch(SET_DRAFT_JOBS_DATA_LOADING(false));
  });
};

// Update Draft Jobs List
const UPDATE_DRAFT_JOBS_LIST =
  (id: string, formData: FormData) =>
  async (dispatch: AppDispatch) => {
    await dispatch(SET_DRAFT_JOBS_LOADING(true));
    return await DraftJobsApiClient.updateDraftJobsData(id, formData);
  };

// Delete Draft Jobs List
const DELETE_DRAFT_JOBS_LIST =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(SET_DRAFT_JOBS_LOADING(true));
    await DraftJobsApiClient.deleteDraftJobsData(id)
      .then((res) => {
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 1500,
        });
        dispatch(SET_DELETE_DRAFT_JOBS(res?.data?.message));
        dispatch(SET_DRAFT_JOBS_LOADING(false));
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message.length
            ? err.response.data.message
            : err.response.data.message,
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: {
            OK: false,
          },
          timer: 5000,
        });
        dispatch(SET_DRAFT_JOBS_LOADING(false));
      });
  };

// Common auth Config
export { GET_DRAFT_JOBS_LIST, UPDATE_DRAFT_JOBS_LIST, DELETE_DRAFT_JOBS_LIST };
