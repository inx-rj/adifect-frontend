import swal from "sweetalert";
import {
  INVITE_USER_LIST_LOADING, INVITE_USER_LIST_DATA, COMPANIES_LIST_LOADING, COMPANIES_LIST_DATA
} from "../../reducers/inviteUser/inviteUser.slice";
import { AppDispatch } from "../../store";
import InviteUserApiClient from "services/inviteUser/InviteUserApiClient";
import { inviteUserPayloadData, paginationData } from "helper/types/profileDropdown/inviteUserType";
import { Images } from "helper/images";


// Perform User Registration
const FETCH_INVITE_USERS = (paginationData: paginationData) => async (dispatch: AppDispatch) => {
  dispatch(INVITE_USER_LIST_LOADING(true));
  await InviteUserApiClient.getInviteUsers(paginationData)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(INVITE_USER_LIST_DATA(response?.data?.data));
        dispatch(INVITE_USER_LIST_LOADING(false));
      }
    }).catch((error) => {
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 1500,
      });
    });
};

const FETCH_COMPANIES_LIST = () => async (dispatch: AppDispatch) => {
  dispatch(COMPANIES_LIST_LOADING(true));
  await InviteUserApiClient.getCompaniesList()
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(COMPANIES_LIST_DATA(response?.data?.results));
        dispatch(COMPANIES_LIST_LOADING(false));
      }
    }).catch((error) => {
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 1500,
      });
    });
};

const POST_INVITE_USER = (formPayload: inviteUserPayloadData) => async (dispatch: AppDispatch) => {
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
      dispatch(FETCH_INVITE_USERS({
        page: 1,
        rowsPerPage: 10,
      }));
    }).catch((error) => {
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 1500,
      });
    })
};

const DELETE_INVITE_USER = (userId: number) => async (dispatch: AppDispatch) => {
  await InviteUserApiClient.deleteInviteUser(userId)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        swal({
          title: "Successfully Complete",
          text: response?.data?.message,
          icon: Images.Logo,
          timer: 5000,
        });
      }
      dispatch(FETCH_INVITE_USERS({
        page: 1,
        rowsPerPage: 10,
      }));
    }).catch((error) => {
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 1500,
      });
    })
};

// Common auth Config
export {
  FETCH_INVITE_USERS,
  FETCH_COMPANIES_LIST,
  POST_INVITE_USER,
  DELETE_INVITE_USER
};
