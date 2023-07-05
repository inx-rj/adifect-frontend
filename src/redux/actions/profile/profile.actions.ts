import { AppDispatch } from "redux/store";
import ProfileApiClient from "services/profile/ProfileApiClient";
import {
  SET_PROFILE_COMMUN_DATA,
  SET_PROFILE_COMMUN_LOADING,
} from "redux/reducers/profile/commun.slice";
import { SET_PROFILE_PORTFOLIO_DATA, SET_PROFILE_PORTFOLIO_LOADING } from "redux/reducers/profile/userPortfolio.slice";
import swal from "sweetalert";
import { Images } from "helper/images";

// Get User Profile communication List
const TRIGGER_PROFILE_COMMUN_LIST =
  () =>
    async (dispatch: AppDispatch) => {
      await ProfileApiClient.fetchUserProfileCommunList().then(
        (response) => {
          dispatch(SET_PROFILE_COMMUN_LOADING(true));
          dispatch(SET_PROFILE_COMMUN_DATA(response?.data));
        }
      )
        .catch((error) => {
          console.log("Error", error)
        })
        .finally(() => {
          dispatch(SET_PROFILE_COMMUN_LOADING(false))
        })
    };

// Submit User Profile communication List
const SUBMIT_PROFILE_COMMUN_LIST =
  (formData) =>
    async (dispatch: AppDispatch) => {
      await ProfileApiClient.submitUserProfileCommunList(formData)
        .then(
          (response) => {
            console.log("Add communication success", response?.data)
            dispatch(SET_PROFILE_COMMUN_LOADING(true));
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: Images.Logo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            dispatch(TRIGGER_PROFILE_COMMUN_LIST());
          }
        )
        .catch((err) => {
          console.log("Add communication Error", err)
          swal({
            title: "Error",
            text: err.response.data.message.length
              ? err.response.data.message
              : JSON.stringify(err.response.data.message),
            className: "errorAlert",
            icon: Images.ErrorLogo,
            buttons: {
              OK: false,
            },
            timer: 5000,
          });
        })
        .finally(() => {
          dispatch(SET_PROFILE_COMMUN_LOADING(false))
        })
    };

// Get User Profile communication List
const UPDATE_PROFILE_COMMUN_LIST =
  (communID, formData) =>
    async (dispatch: AppDispatch) => {
      await ProfileApiClient.updateUserProfileCommunList(communID,formData)
        .then(
          (response) => {
            console.log("Update communication success", response?.data)
            dispatch(SET_PROFILE_COMMUN_LOADING(true));
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved!",
              className: "successAlert-login",
              icon: Images.Logo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            dispatch(TRIGGER_PROFILE_COMMUN_LIST());
          }
        )
        .catch((err) => {
          console.log("Update communication Error", err)
          swal({
            title: "Error",
            text: err.response.data.message.length
              ? err.response.data.message
              : JSON.stringify(err.response.data.message),
            className: "errorAlert",
            icon: Images.ErrorLogo,
            buttons: {
              OK: false,
            },
            timer: 5000,
          });
        })
        .finally(() => {
          dispatch(SET_PROFILE_COMMUN_LOADING(false))
        })
    };

// Delete USer profile communication list 
const DELETE_PROFILE_COMMUN_LIST =
  (communID) =>
    async (dispatch: AppDispatch) => {
      swal({
        title: "Warninng",
        text: "Are you sure you want to Remove this communication method?",
        className: "errorAlert",
        icon: Images.ErrorLogo,
        buttons: {
          Cancel: true,
          OK: true,
        },
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete === "OK") {
          ProfileApiClient.deleteUserProfileCommunList(communID)
            .then(
              (response) => {
                dispatch(SET_PROFILE_COMMUN_LOADING(true));
                dispatch(TRIGGER_PROFILE_COMMUN_LIST());
              }
            )
            .catch((error) => {
              console.log("Error", error)
            })
            .finally(() => {
              dispatch(SET_PROFILE_COMMUN_LOADING(false))
            })
        }
      });
    }

// Get User Profile communication List
const TRIGGER_PROFILE_PORTFOLIO_LIST =
  (userId, page) =>
    async (dispatch: AppDispatch) => {
      await ProfileApiClient.fetchUserProfilePortfolioList(userId, page).then(
        (response) => {
          dispatch(SET_PROFILE_PORTFOLIO_LOADING(true));
          dispatch(SET_PROFILE_PORTFOLIO_DATA(response?.data));
        }
      )
        .catch((error) => {
          console.log("Error", error)
        })
        .finally(() => {
          dispatch(SET_PROFILE_PORTFOLIO_LOADING(false))
        })
    };

// Change user email address
const CHANGE_USER_EMAIL =
  (formData: { [key: string]: any }) =>
    async () => {
      return await ProfileApiClient.changeUserEmail(formData);
    };

// Change user password address
const CHANGE_USER_PASSWORD =
  (formData: { [key: string]: any }) =>
    async () => {
      return await ProfileApiClient.changeUserPassword(formData);
    };

// Change user password address
const CLOSE_USER_ACCOUNT =
  (formData: { [key: string]: any }) =>
    async () => {
      return await ProfileApiClient.closeUserAccount(formData);
    };


// Common auth Config
export {
  TRIGGER_PROFILE_COMMUN_LIST,
  SUBMIT_PROFILE_COMMUN_LIST,
  UPDATE_PROFILE_COMMUN_LIST,
  DELETE_PROFILE_COMMUN_LIST,
  TRIGGER_PROFILE_PORTFOLIO_LIST,
  CHANGE_USER_EMAIL,
  CHANGE_USER_PASSWORD,
  CLOSE_USER_ACCOUNT
};
