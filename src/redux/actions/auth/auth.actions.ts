import { Images } from "helper/images";
import { message } from "./../../../helper/validations/index";
import {
  SET_AUTH_LOADING,
  USER_PROFILE_DATA,
  USER_PROFILE_LOADING,
} from "../../reducers/auth/auth.slice";
import { AppDispatch } from "../../store";
import { EmailPWDType, EmailType } from "../../../helper/types";
import AuthApiClient from "../../../services/auth/AuthApiClient";
import swal from "sweetalert";

// Perform User Registration
const REGISTER_USER = (data: any) => async (dispatch: AppDispatch) => {
  return await AuthApiClient.register(data);
};

// Perform Login
const TRIGGER_LOGIN = (data: EmailPWDType) => async (dispatch: AppDispatch) => {
  dispatch(USER_PROFILE_LOADING(true));
  return await AuthApiClient.login(data)
    .then((response) => {
      if (response.status === 200) {
        dispatch(USER_PROFILE_DATA(response?.data));
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
      dispatch(USER_PROFILE_LOADING(false));
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
  TRIGGER_FORGOT_PASSWORD,
  TRIGGER_RESET_PASSWORD,
};
