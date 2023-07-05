import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import swal from "sweetalert";
import { Images } from "helper/images";
import {
  SET_DELETE_AUDIENCE,
  SET_AUDIENCE_DATA,
  SET_AUDIENCE_DATA_LOADING,
  SET_AUDIENCE_LOADING,
  SET_COMMUNITY_AUDIENCE_DATA_LOADING,
  SET_COMMUNITY_AUDIENCE_DATA,
} from "redux/reducers/companies/audience.slice";
import AudienceApiClient from "services/companies/AudienceApiClient";

// Get Audience List
const GET_AUDIENCE_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_AUDIENCE_DATA_LOADING(true));
    await AudienceApiClient.fetchAudienceList(tableConfig).then((response) => {
      dispatch(SET_AUDIENCE_DATA(response?.data?.data));
      dispatch(SET_AUDIENCE_DATA_LOADING(false));
    });
  };

// Create Audience List
const CREATE_AUDIENCE_LIST =
  (formData: { [key: string]: any }) => async (dispatch: AppDispatch) => {
    await dispatch(SET_AUDIENCE_LOADING(true));
    return await AudienceApiClient.createAudienceData(formData);
  };

// Update Audience List
const UPDATE_AUDIENCE_LIST =
  (id: number, formData: { [key: string]: any }) =>
  async (dispatch: AppDispatch) => {
    await dispatch(SET_AUDIENCE_LOADING(true));
    return await AudienceApiClient.updateAudienceData(id, formData);
  };

// Delete Audience List
const DELETE_AUDIENCE_LIST = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_AUDIENCE_LOADING(true));
  await AudienceApiClient.deleteAudienceData(id)
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
      dispatch(SET_DELETE_AUDIENCE(res?.data?.message));
      dispatch(SET_AUDIENCE_LOADING(false));
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
      dispatch(SET_AUDIENCE_LOADING(false));
    });
};

// Get Community audience List
const GET_COMMUNITY_AUDIENCE_LIST =
  (storyId: string) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMMUNITY_AUDIENCE_DATA_LOADING(true));
    await AudienceApiClient.fetchCommunityAudienceList(storyId).then(
      (response) => {
        dispatch(SET_COMMUNITY_AUDIENCE_DATA(response?.data?.data));
        dispatch(SET_COMMUNITY_AUDIENCE_DATA_LOADING(false));
      }
    );
  };

// Common auth Config
export {
  GET_AUDIENCE_LIST,
  CREATE_AUDIENCE_LIST,
  UPDATE_AUDIENCE_LIST,
  DELETE_AUDIENCE_LIST,
  GET_COMMUNITY_AUDIENCE_LIST,
};
