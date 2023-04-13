import axiosPrivate from "api/axios";
import { API_URL } from "helper/env";

class ProfileApiClient {

  // Get User profile communication list 
  fetchUserProfileCommunList = () =>
    axiosPrivate.get(
      `${API_URL.PROFILE.USER_COMMUNICATION}?ordering=created`
    );

}

export default new ProfileApiClient();