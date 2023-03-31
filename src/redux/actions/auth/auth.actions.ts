import {
  SET_AUTH_LOADING,
  USER_PROFILE_LOADING,
} from "../../reducers/auth/auth.slice";
import { AppDispatch } from "../../store";
import { EmailPWDType } from "../../../helper/types";
import AuthApiClient from "../../../services/auth/AuthApiClient";


// Perform User Registration
const REGISTER_USER = (data: any) => async (dispatch: AppDispatch) => {
  await AuthApiClient.register(data)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        console.log(response, 'Reg Log');
      }
    });
};

// Perform Login
const TRIGGER_LOGIN = (data: EmailPWDType) => async (dispatch: AppDispatch) => {
  dispatch(USER_PROFILE_LOADING(true));
  return await AuthApiClient.login(data);
};


// Common auth Config
export {
  REGISTER_USER,
  TRIGGER_LOGIN,
};
