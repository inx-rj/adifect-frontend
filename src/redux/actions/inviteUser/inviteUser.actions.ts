import swal from "sweetalert";
import {
  SET_INVITE_USER_LIST_LOADING,
  SET_INVITE_USER_LIST_DATA,
  SET_INVITE_MEMBER_LIST_DATA,
  SET_INVITE_USER_LOADING,
  SET_WORKFLOW_INVITE_USER_LIST_DATA,
  SET_WORKFLOW_INVITE_USER_LIST_LOADING,
} from "../../reducers/inviteUser/inviteUser.slice";
import { AppDispatch } from "../../store";
import InviteUserApiClient from "services/inviteUser/InviteUserApiClient";
import { inviteUserPayloadData } from "helper/types/profileDropdown/inviteUserType";
import { Images } from "helper/images";
import { initialTableConfigInterface } from "helper/types/common/tableType";

// Fetch the invite users list
const GET_INVITE_USERS =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_INVITE_USER_LIST_LOADING(true));
    await InviteUserApiClient.fetchInviteUsers(tableConfig)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_INVITE_USER_LIST_DATA(response?.data?.data));
          dispatch(SET_INVITE_USER_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Fetch the workflow invite users list
const GET_WORKFLOW_INVITE_USERS_LIST =
  (id: initialTableConfigInterface) => async (dispatch: AppDispatch) => {
    dispatch(SET_WORKFLOW_INVITE_USER_LIST_LOADING(true));
    await InviteUserApiClient.fetchWorkflowInviteUsers(id)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(
            SET_WORKFLOW_INVITE_USER_LIST_DATA(
              response?.data?.data ?? response?.data
            )
          );
          dispatch(SET_WORKFLOW_INVITE_USER_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Fetch the invite members list
const GET_INVITE_MEMBERS_USERS =
  (tableConfig, level) => async (dispatch: AppDispatch) => {
    const params = {
      level: level,
      company: tableConfig,
    };
    dispatch(SET_INVITE_USER_LIST_LOADING(true));
    await InviteUserApiClient.fetchInviteMembersList(params)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_INVITE_MEMBER_LIST_DATA(response?.data));
          dispatch(SET_INVITE_USER_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Add new invite user to the invite users list
const POST_INVITE_USER =
  (formPayload: inviteUserPayloadData, userRole) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_INVITE_USER_LIST_LOADING(true));
    await InviteUserApiClient.addInviteUser(formPayload, userRole)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          swal({
            title: "Successfully Complete",
            text: response?.data?.message,
            icon: Images.Logo,
            timer: 5000,
          });
        }
        dispatch(
          GET_INVITE_USERS({
            page: 1,
            rowsPerPage: 10,
          })
        );
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Update an entry from the invite users list
const PUT_INVITE_USER =
  (id: number, payloadObj: { levels: number | "" }) =>
  async (dispatch: AppDispatch) => {
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
        dispatch(
          GET_INVITE_USERS({
            page: 1,
            rowsPerPage: 10,
          })
        );
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Delete an entry from the invite users list
const DELETE_INVITE_USER =
  (itemId: number) => async (dispatch: AppDispatch) => {
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
        dispatch(
          GET_INVITE_USERS({
            page: 1,
            rowsPerPage: 10,
          })
        );
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_INVITE_USER_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Perform User Registration
const REGISTER_INVITE_USER =
  (data: any, inviteId: string, exclusive: string) =>
  async (dispatch: AppDispatch) => {
    return await InviteUserApiClient.registerInviteUser(
      data,
      inviteId,
      exclusive
    );
  };

//fetch invitation accept or reject status
const GET_INVITE_STATUS =
  (decodeId: string, inviteCode: string, exclusive: string) =>
  async (dispatch: AppDispatch) => {
    return new Promise<string>((resolve, reject) => {
      dispatch(SET_INVITE_USER_LOADING(true));
      InviteUserApiClient.fetchInviteStatus(decodeId, inviteCode, exclusive)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            dispatch(SET_INVITE_USER_LOADING(false));
            resolve(response?.data?.message);
          }
        })
        .catch((error) => {
          reject(
            error?.response?.data?.message ?? error?.response?.data?.detail
          );
          dispatch(SET_INVITE_USER_LOADING(false));
        });
    });
  };

// Common auth Config
export {
  GET_INVITE_USERS,
  POST_INVITE_USER,
  PUT_INVITE_USER,
  DELETE_INVITE_USER,
  GET_INVITE_MEMBERS_USERS,
  REGISTER_INVITE_USER,
  GET_INVITE_STATUS,
  GET_WORKFLOW_INVITE_USERS_LIST,
};
