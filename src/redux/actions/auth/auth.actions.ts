import { Images } from "helper/images";
import {
  SET_USER_DATA,
  SET_USER_DATA_LOADING,
  SET_USER_PROFILE_DATA,
  SET_USER_PROFILE_LOADING,
} from "../../reducers/auth/auth.slice";
import { AppDispatch } from "../../store";
import { EmailPWDType, EmailType } from "helper/types";
import AuthApiClient from "services/auth/AuthApiClient";
import swal from "sweetalert";
import { TRIGGER_PERSIST_MODE } from "../config/app/app.actions";

// Perform User Registration
const REGISTER_USER = (data: any) => async (dispatch: AppDispatch) => {
  return await AuthApiClient.register(data);
};

// Perform Login
const TRIGGER_LOGIN = (data: EmailPWDType) => async (dispatch: AppDispatch) => {
  dispatch(SET_USER_DATA_LOADING(true));
  return await AuthApiClient.login(data)
    .then((response) => {
      if (response.status === 200) {
        dispatch(TRIGGER_PERSIST_MODE(true)).then((r) => r);
        dispatch(SET_USER_DATA(response?.data));
        const { refresh, token } = response?.data || {
          refresh: "",
          token: "",
        };
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("access_token", token);

        localStorage.setItem("userData", JSON.stringify(response?.data));
      }
    })
    .catch((error) => {
      if (error?.response.status === 400) {
        swal({
          title: "Error",
          text: error?.response?.data?.message,
          className: "errorAlert-login",
          // icon: "/img/logonew-red.svg",
          icon: Images.Logo,
          // buttons: false,
          timer: 1500,
        });
      }
    })
    .finally(() => {
      dispatch(SET_USER_DATA_LOADING(false));
    });
};

// get user details
const GET_USER_DETAILS = () => async (dispatch: AppDispatch) => {
  dispatch(SET_USER_PROFILE_LOADING(true));
  return await AuthApiClient.editProfile()
    .then((response) => {
      if (response.status === 200) {
        dispatch(SET_USER_PROFILE_DATA(response?.data));
      }
    })
    .catch((error) => {
      if (error?.response.status === 400) {
        swal({
          title: "Error",
          text: error?.response?.data?.message,
          className: "errorAlert-login",
          // icon: "/img/logonew-red.svg",
          icon: Images.Logo,
          // buttons: false,
          timer: 1500,
        });
      }
    })
    .finally(() => {
      dispatch(SET_USER_PROFILE_LOADING(false));
    });
};

// Forgot Password
const TRIGGER_FORGOT_PASSWORD = (data: EmailType) => async () => {
  return await AuthApiClient.forgotPassword(data);
};

// Reset Password
const TRIGGER_RESET_PASSWORD = (data: any) => async () => {
  return await AuthApiClient.resetPassword(data);
};

// Common auth Config
export {
  REGISTER_USER,
  TRIGGER_LOGIN,
  GET_USER_DETAILS,
  TRIGGER_FORGOT_PASSWORD,
  TRIGGER_RESET_PASSWORD,
};
