import swal from "sweetalert";
import { AppDispatch } from "../../store";
import {
    SET_HELP_LIST_LIST_LOADING,
    SET_HELP_LIST_LIST_DATA,
    ADD_HELP,
    SET_PARTICULAR_HELP_DATA,
    SET_PARTICULAR_HELP_LOADING,
    SET_CHAT_RESPONSE
} from "redux/reducers/help/help.slice";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { Images } from "helper/images";
import { API_URL } from "helper/env";
import { hasResultsKey } from "helper/utility/customFunctions";
import HelpApiClient from "services/help/HelpApiClient";

// Fetch help list
const GET_HELP_LIST =
  (
    tableConfig: initialTableConfigInterface,
    endpoint: string = `${API_URL.HELP.HELP_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_HELP_LIST_LIST_LOADING(true));
    await HelpApiClient.fetchHelpList(tableConfig, endpoint)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          // to set response of with and without 'results' key
          const customizedResponse = hasResultsKey(response)
            ? response?.data?.data || response?.data
            : {
                count: 0,
                prev: null,
                next: null,
                results: response?.data?.data || response?.data,
              };

          console.log(response.data, { customizedResponse }, "response.data");

          dispatch(SET_HELP_LIST_LIST_DATA(customizedResponse));
          dispatch(SET_HELP_LIST_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_HELP_LIST_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
          timer: 5000,
        });
      });
  };

// Add help
const ADD_HELP_USER =
(
  data,
  endpoint: string = `${API_URL.HELP.HELP_LIST}`,
  navigate
) =>
async (dispatch: AppDispatch) => {
  dispatch(SET_HELP_LIST_LIST_LOADING(true));
  await HelpApiClient.addHelp(data, endpoint)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(ADD_HELP(response));
        dispatch(SET_HELP_LIST_LIST_LOADING(false));
        navigate('/help')
        swal({
          title: "Successfully Complete",
          text: "Form Submitted Successfully",
          className: "successAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      dispatch(SET_HELP_LIST_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message ?? error?.response?.data?.detail,
        className: "errorAlert-login",
        icon: Images.ErrorLogo,
        timer: 5000,
      });
    });
};

//Get Help Details
const GET_HELP_DETAILS =
(
  id:string,
  endpoint: string = `${API_URL.HELP.HELP_LIST}`,
) =>
async (dispatch: AppDispatch) => {
  dispatch(SET_PARTICULAR_HELP_LOADING(true));
  await HelpApiClient.getParticularHelpDetails(id, endpoint)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(SET_PARTICULAR_HELP_DATA(response.data));
        dispatch(SET_PARTICULAR_HELP_LOADING(false));
      }
    })
    .catch((error) => {
      dispatch(SET_PARTICULAR_HELP_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message ?? error?.response?.data?.detail,
        className: "errorAlert-login",
        icon: Images.ErrorLogo,
        timer: 5000,
      });
    });
};
//chat 
const ADD_CHAT_IN_HELP =
(
  data,
  endpoint: string = `${API_URL.HELP.HELP_LIST}`
) =>
async (dispatch: AppDispatch) => {
  dispatch(SET_PARTICULAR_HELP_LOADING(true));
  await HelpApiClient.addChat(data, endpoint)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
         dispatch(SET_CHAT_RESPONSE(response.data));
        dispatch(SET_PARTICULAR_HELP_LOADING(false));
        swal({
          title: "Successfully Complete",
          text: "Form Submitted Successfully",
          className: "successAlert-login",
          icon: Images.Logo,
          buttons: {
            OK: false,
          },
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      dispatch(SET_PARTICULAR_HELP_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message ?? error?.response?.data?.detail,
        className: "errorAlert-login",
        icon: Images.ErrorLogo,
        timer: 5000,
      });
    });
};
export {
    GET_HELP_LIST,
    ADD_HELP_USER,
    GET_HELP_DETAILS,
    ADD_CHAT_IN_HELP
};
