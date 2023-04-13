import swal from "sweetalert";
import {
  SET_INVITE_USER_LIST_LOADING, SET_INVITE_USER_LIST_DATA,
} from "../../reducers/inviteUser/inviteUser.slice";
import { AppDispatch } from "../../store";
import InviteUserApiClient from "services/inviteUser/InviteUserApiClient";
import { inviteUserPayloadData } from "helper/types/profileDropdown/inviteUserType";
import { Images } from "helper/images";
import { initialTableConfigInterface } from "helper/types/common/table";


// Fetch the invite users list
const GET_INVITE_USERS = (tableConfig: initialTableConfigInterface) => async (dispatch: AppDispatch) => {
  dispatch(SET_INVITE_USER_LIST_LOADING(true));
  await InviteUserApiClient.fetchInviteUsers(tableConfig)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(SET_INVITE_USER_LIST_DATA(response?.data?.data));
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
      }
    }).catch((error) => {
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    });
};

// Add new invite user to the invite users list
const POST_INVITE_USER = (formPayload: inviteUserPayloadData) => async (dispatch: AppDispatch) => {
  dispatch(SET_INVITE_USER_LIST_LOADING(true));
  await InviteUserApiClient.addInviteUser(formPayload)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        swal({
          title: "Successfully Complete",
          text: response?.data?.message,
          icon: Images.Logo,
          timer: 5000,
        });
      }
      dispatch(GET_INVITE_USERS({
        page: 1,
        rowsPerPage: 10,
      }));
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
    }).catch((error) => {
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
};

// Update an entry from the invite users list
const PUT_INVITE_USER = (id: number, payloadObj: { levels: number | "" }) => async (dispatch: AppDispatch) => {
  dispatch(SET_INVITE_USER_LIST_LOADING(true));
  await InviteUserApiClient.updateInviteUser(id, payloadObj)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        swal({
          title: "Successfully Complete",
          text: response?.data?.message,
          icon: Images.Logo,
          timer: 5000,
        });
      }
      dispatch(GET_INVITE_USERS({
        page: 1,
        rowsPerPage: 10,
      }));
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
    }).catch((error) => {
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
};

// Delete an entry from the invite users list
const DELETE_INVITE_USER = (itemId: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_INVITE_USER_LIST_LOADING(true));
  await InviteUserApiClient.deleteInviteUser(itemId)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        swal({
          title: "Successfully Complete",
          text: response?.data?.message,
          icon: Images.Logo,
          timer: 5000,
        });
      }
      dispatch(GET_INVITE_USERS({
        page: 1,
        rowsPerPage: 10,
      }));
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
    }).catch((error) => {
      dispatch(SET_INVITE_USER_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
};

// Common auth Config
export {
  GET_INVITE_USERS,
  POST_INVITE_USER,
  PUT_INVITE_USER,
  DELETE_INVITE_USER
};
