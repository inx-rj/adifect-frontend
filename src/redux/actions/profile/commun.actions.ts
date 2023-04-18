import { AppDispatch } from "redux/store";
import ProfileApiClient from "services/profile/ProfileApiClient";
import { SET_PROFILE_COMMUN_DATA } from "redux/reducers/profile/commun.slice";

// Get User Profile communication List
const TRIGGER_PROFILE_COMMUN_LIST =
  () =>
  async (dispatch: AppDispatch) => {
    await ProfileApiClient.fetchUserProfileCommunList().then(
      (response) => {
        console.log("Commnication result", response);
        
        dispatch(SET_PROFILE_COMMUN_DATA(response?.data));
      }
    );
  };


// Common auth Config
export { TRIGGER_PROFILE_COMMUN_LIST };
