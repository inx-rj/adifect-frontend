import axiosPrivate from "../../api/axios";
import { API_URL, env } from "../../helper/env";
import { EmailPWDType, EmailType } from "../../helper/types";

class AuthApiClient {
  // User Registration
  register = (data: any) =>
    axiosPrivate.post(`${API_URL.AUTH.REGISTER}`, data, {
      headers: {
        Authorization: "",
      },
    });

  // User Login
  login = (data: EmailPWDType) =>
    axiosPrivate.post(`${API_URL.AUTH.LOGIN}`, data, {
      headers: {
        Authorization: "",
      },
    });

  // Forgot Password
  forgotPassword = (data: EmailType) =>
    axiosPrivate.post(`${API_URL.AUTH.FORGOT_PASSWORD}`, data, {
      headers: {
        Authorization: "",
      },
    });

  // Reset Password
  resetPassword = (data: any, ResetpasswordId: string, userId: string) =>
    axiosPrivate.put(`${API_URL.AUTH.RESET_PASSWORD}${ResetpasswordId}/${userId}/`, data, {
      headers: {
        Authorization: "",
      },
    });

  getResetPassword = (ResetpasswordId: string, userId: string) =>
    axiosPrivate.get(`${API_URL.AUTH.RESET_PASSWORD}${ResetpasswordId}/${userId}/`, {
      headers: {
        Authorization: "",
      },
    });

  // Edit profile
  editProfile = () => axiosPrivate.get(`${API_URL.AUTH.EDIT_PROFILE}`);
}

export default new AuthApiClient();
