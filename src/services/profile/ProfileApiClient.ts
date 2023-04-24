import axiosPrivate from "api/axios";
import { API_URL } from "helper/env";

class ProfileApiClient {

  // Get User profile communication list 
  fetchUserProfileCommunList = () =>
    axiosPrivate.get(
      `${API_URL.USER_PROFILE.USER_COMMUNICATION}?ordering=created`
    );

    // Get User profile portfolio list 
  fetchUserProfilePortfolioList = (userId: number, page: number) =>
  axiosPrivate.get(
    `${API_URL.USER_PROFILE.USER_PORTFOLIO}?user=${userId}&page=${page}`
  );

}

export default new ProfileApiClient();