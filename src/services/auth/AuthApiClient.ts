import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
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

  // get profile
  editProfile = () => axiosPrivate.get(`${API_URL.AUTH.EDIT_PROFILE}`);

  // Edit and update profile
  updateUserProfileData = (userUpdateData) =>
    axiosPrivate.put(
      `${API_URL.AUTH.EDIT_PROFILE}`, userUpdateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
}

export default new AuthApiClient();
