import axiosPrivate from "api/axios";
import { API_URL } from "helper/env";

class ProfileApiClientCls {

  // Get User profile communication list 
  fetchUserProfileCommunList = () =>
    axiosPrivate.get(
      `${API_URL.USER_PROFILE.USER_COMMUNICATION}?ordering=created`
    );

  // Update User profile communication list 
  submitUserProfileCommunList = (formData) =>
  axiosPrivate.post(
    `${API_URL.USER_PROFILE.USER_COMMUNICATION}`, formData
  );

  // Update User profile communication list 
  updateUserProfileCommunList = (id, formData) =>
  axiosPrivate.put(
    `${API_URL.USER_PROFILE.USER_COMMUNICATION}${id}/`, formData
  );

  // Delete User profile communication list 
  deleteUserProfileCommunList = (id) =>
  axiosPrivate.delete(
    `${API_URL.USER_PROFILE.USER_COMMUNICATION}${id}/`
  );

    // Get User profile portfolio list 
  fetchUserProfilePortfolioList = (userId: number, page: number) =>
  axiosPrivate.get(
    `${API_URL.USER_PROFILE.USER_PORTFOLIO}?user=${userId}&page=${page}`
  );

  // Change user email address
  changeUserEmail = (
    formData: { [key: string]: any }
  ) =>
    axiosPrivate.post(`${API_URL.USER_PROFILE.USER_EMAIL_CHANGE}`, formData);

  // Change user password address
  changeUserPassword = (
    formData: { [key: string]: any }
  ) =>
    axiosPrivate.post(`${API_URL.USER_PROFILE.USER_PASSWORD_CHANGE}`, formData);

  // Change user password address
  closeUserAccount = (
    formData: { [key: string]: any }
  ) =>
    axiosPrivate.post(`${API_URL.USER_PROFILE.USER_CLOSE_ACCOUNT}`, formData);
}



const ProfileApiClient = new ProfileApiClientCls()
export default ProfileApiClient;