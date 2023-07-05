import swal from "sweetalert";
import { AppDispatch } from "../../store";
import {
  SET_INDUSTRY_LIST_DATA,
  SET_INDUSTRY_LIST_LOADING,
} from "redux/reducers/industries/industries.slice";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { Images } from "helper/images";
import { API_URL } from "helper/env";
import IndustryTabApiClient from "services/industries/IndustryTabApiClient";

// Fetch companies list
const GET_INDUSTRY_LIST =
  (
    tableConfig: initialTableConfigInterface,
    endpoint: string = `${API_URL.INDUSTRY.INDUSTRY_LIST}`
  ) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_INDUSTRY_LIST_LOADING(true));
      await IndustryTabApiClient.fetchIndustryList(tableConfig, endpoint)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            dispatch(
              SET_INDUSTRY_LIST_DATA(response?.data?.data || response?.data)
            );
            dispatch(SET_INDUSTRY_LIST_LOADING(false));
          }
        })
        .catch((error) => {
          dispatch(SET_INDUSTRY_LIST_LOADING(false));
          swal({
            title: "Error",
            text: error?.response?.data?.message ?? error?.response?.data?.detail,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Add new industry to the industry list
const POST_SINGLE_INDUSTRY =
  (
    formPayload: { industry_name: string },
    endpoint: string = `${API_URL.INDUSTRY.INDUSTRY_LIST}`
  ) =>
    async (dispatch: AppDispatch) => {
      return new Promise<number>((resolve, reject) => {
        dispatch(SET_INDUSTRY_LIST_LOADING(true));
        IndustryTabApiClient.addSingleIndustry(formPayload, endpoint)
          .then((response) => {
            if (response.status === 201 || response.status === 200) {
              resolve(response?.data?.id)
              swal({
                title: "Successfully Complete",
                text: response?.data?.message,
                icon: Images.Logo,
                timer: 5000,
              });
            }
            dispatch(
              GET_INDUSTRY_LIST(
                {
                  page: 1,
                  rowsPerPage: 10,
                },
                endpoint
              )
            );
            dispatch(SET_INDUSTRY_LIST_LOADING(false));
          })
          .catch((error) => {
            dispatch(SET_INDUSTRY_LIST_LOADING(false));
            let errMsg = "";
            if (error?.response?.data?.industry_name?.length > 0) {
              errMsg = error?.response?.data?.industry_name?.[0];
            } else {
              errMsg = error?.response?.data?.message ?? error?.response?.data?.detail;
            }
            reject(errMsg);
            swal({
              title: "Error",
              text: errMsg,
              className: "errorAlert-login",
              icon: Images.Logo,
              timer: 5000,
            });
          });
      });
    };

// Common auth Config
export {
  GET_INDUSTRY_LIST,
  POST_SINGLE_INDUSTRY,
};
