import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { EmailPWDType, EmailType } from "../../helper/types";

class AuthApiClient {
  // User Registration
  register = (data: any) =>
    axiosPrivate.post(`${API_URL.AUTH.REGISTER}/`, data, {
      headers: {
        Authorization: "",
      },
    });

  // User Login
  login = (data: EmailPWDType) =>
    axiosPrivate.post(`${API_URL.AUTH.LOGIN}/`, data, {
      headers: {
        Authorization: "",
      },
    });

  // Forgot Password
  forgotPassword = (data: EmailType) =>
    axiosPrivate.post(`${API_URL.AUTH.FORGOT_PASSWORD}/`, data, {
      headers: {
        Authorization: "",
      },
    });

  // Reset Password
  resetPassword = (data: any) =>
    axiosPrivate.post(`${API_URL.AUTH.CHANGE_PASSWORD}/`, data, {
      headers: {
        Authorization: "",
      },
    });
}

export default new AuthApiClient();
