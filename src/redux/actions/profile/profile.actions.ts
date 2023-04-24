import { AppDispatch } from "redux/store";
import ProfileApiClient from "services/profile/ProfileApiClient";
import { 
  SET_PROFILE_COMMUN_DATA, 
  SET_PROFILE_COMMUN_LOADING, 
} from "redux/reducers/profile/commun.slice";
import { SET_PROFILE_PORTFOLIO_DATA, SET_PROFILE_PORTFOLIO_LOADING } from "redux/reducers/profile/userPortfolio.slice";

// Get User Profile communication List
const TRIGGER_PROFILE_COMMUN_LIST =
  () =>
  async (dispatch: AppDispatch) => {
    await ProfileApiClient.fetchUserProfileCommunList().then(
      (response) => {
        console.log("Commnication result", response);
        dispatch(SET_PROFILE_COMMUN_LOADING(true));
        dispatch(SET_PROFILE_COMMUN_DATA(response?.data));
      }
    )
    .catch((error)=>{
      console.log("Error", error)
    })
    .finally(() => {
      dispatch(SET_PROFILE_COMMUN_LOADING(false))
    })
  };

  // Get User Profile communication List
const TRIGGER_PROFILE_PORTFOLIO_LIST =
(userId, page) =>
async (dispatch: AppDispatch) => {
  await ProfileApiClient.fetchUserProfilePortfolioList(userId, page).then(
    (response) => {
      console.log("Commnication result", response);
      dispatch(SET_PROFILE_PORTFOLIO_LOADING(true));
      dispatch(SET_PROFILE_PORTFOLIO_DATA(response?.data));
    }
  )
  .catch((error)=>{
    console.log("Error", error)
  })
  .finally(() => {
    dispatch(SET_PROFILE_PORTFOLIO_LOADING(false))
  })
};


// Common auth Config
export { TRIGGER_PROFILE_COMMUN_LIST, TRIGGER_PROFILE_PORTFOLIO_LIST };
