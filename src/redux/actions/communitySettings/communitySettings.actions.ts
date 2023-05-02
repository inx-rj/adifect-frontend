import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";
import {
  SET_COMMUNITY_SETTINGS_DATA,
  SET_COMMUNITY_SETTINGS_LOADING,
  SET_DELETE_COMMUNITY_SETTINGS,
} from "redux/reducers/companies/communitySettings.slice";
import CommunitySettingsApiClient from "services/companies/CommunitySettingsApiClient";
import { Images } from "helper/images";
import swal from "sweetalert";

// Get Community Settings List
const GET_COMMUNITY_SETTINGS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await CommunitySettingsApiClient.fetchCommunitySettingsList(
      tableConfig
    ).then((response) => {
      dispatch(SET_COMMUNITY_SETTINGS_DATA(response?.data?.data));
    });
  };

// Create Community Settings List
const CREATE_COMMUNITY_SETTINGS_LIST =
  (formData) => async (dispatch: AppDispatch) => {
    await dispatch(SET_COMMUNITY_SETTINGS_LOADING(true));
    return await CommunitySettingsApiClient.createCommunitySettingsData(
      formData
    );
  };

// Update Community Settings List
const UPDATE_COMMUNITY_SETTINGS_LIST =
  (id: number, formData) => async (dispatch: AppDispatch) => {
    await dispatch(SET_COMMUNITY_SETTINGS_LOADING(true));
    return await CommunitySettingsApiClient.updateCommunitySettingsData(
      id,
      formData
    );
  };

// Delete Community Settings List
const DELETE_COMMUNITY_SETTINGS_LIST =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMMUNITY_SETTINGS_LOADING(true));
    await CommunitySettingsApiClient.deleteCommunitySettingsData(id)
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
        dispatch(SET_DELETE_COMMUNITY_SETTINGS(res?.data?.message));
        dispatch(SET_COMMUNITY_SETTINGS_LOADING(false));
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
        dispatch(SET_COMMUNITY_SETTINGS_LOADING(false));
      });
  };

// Common auth Config
export {
  GET_COMMUNITY_SETTINGS_LIST,
  CREATE_COMMUNITY_SETTINGS_LIST,
  UPDATE_COMMUNITY_SETTINGS_LIST,
  DELETE_COMMUNITY_SETTINGS_LIST,
};
