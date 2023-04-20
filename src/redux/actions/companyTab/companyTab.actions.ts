import swal from "sweetalert";
import { AppDispatch } from "../../store";
import {
  SET_COMPANY_LIST_DATA,
  SET_COMPANY_LIST_LOADING,
} from "redux/reducers/companyTab/companyTab.slice";
import CompanyTabApiClient from "services/companyTab/CompanyTabApiClient";
import { initialTableConfigInterface } from "helper/types/common/table";
import { singleCompanyPayloadData } from "helper/types/companyTab/comapniesType";
import { Images } from "helper/images";
import { API_URL } from "helper/env";

// Fetch companies list
const GET_COMPANY_LIST =
  (
    tableConfig: initialTableConfigInterface,
    endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`
  ) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_COMPANY_LIST_LOADING(true));
      await CompanyTabApiClient.fetchCompanyList(tableConfig, endpoint)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            dispatch(SET_COMPANY_LIST_DATA(response?.data?.data ? response?.data?.data : response?.data));
            dispatch(SET_COMPANY_LIST_LOADING(false));
          }
        })
        .catch((error) => {
          dispatch(SET_COMPANY_LIST_LOADING(false));
          swal({
            title: "Error",
            text: error?.response?.data?.message,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Add new company to the company list
const POST_SINGLE_COMPANY =
  (formPayload: singleCompanyPayloadData, endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANY_LIST_LOADING(true));
    console.log("formPayload", formPayload);
    await CompanyTabApiClient.addSingleCompany(formPayload, endpoint)
      .then((response) => {
        console.log("POST_SINGLE_COMPANY", response);
        if (response.status === 201 || response.status === 200) {
          swal({
            title: "Successfully Complete",
            text: response?.data?.message,
            icon: Images.Logo,
            timer: 5000,
          });
        }
        dispatch(
          GET_COMPANY_LIST({
            page: 1,
            rowsPerPage: 10,
          }, endpoint)
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = ""
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0]
        } else {
          errMsg = error?.response?.data?.message;
        }
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };


// Add new company admin company list
const POST_ADMIN_COMPANY =
  (formPayload: singleCompanyPayloadData, endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`) => async (dispatch: AppDispatch) => {
    dispatch(SET_COMPANY_LIST_LOADING(true));
    await CompanyTabApiClient.addSingleCompany(formPayload, endpoint)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          swal({
            title: "Successfully Complete",
            text: response?.data?.message,
            icon: Images.Logo,
            timer: 5000,
          });
        }
        dispatch(
          GET_COMPANY_LIST({
            page: 1,
            rowsPerPage: 10,
          }, `${API_URL.COMPANY.ADMIN}`)
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = ""
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0]
        } else {
          errMsg = error?.response?.data?.message;
        }
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Update an entry from the company list
const PUT_SINGLE_COMPANY =
  (
    id: number,
    payloadObj: {
      name?: string;
      description?: string;
      is_active?: boolean;
    },
    endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`
  ) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_COMPANY_LIST_LOADING(true));
      await CompanyTabApiClient.updateSingleCompany(id, payloadObj, endpoint)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            swal({
              title: "Successfully Complete",
              text: response?.data?.message,
              icon: Images.Logo,
              timer: 5000,
            });
          }
          dispatch(
            GET_COMPANY_LIST({
              page: 1,
              rowsPerPage: 10,
            }, endpoint)
          );
          dispatch(SET_COMPANY_LIST_LOADING(false));
        })
        .catch((error) => {
          dispatch(SET_COMPANY_LIST_LOADING(false));
          let errMsg = ""
          if (error?.response?.data?.non_field_errors?.length > 0) {
            errMsg = error?.response?.data?.non_field_errors?.[0]
          } else {
            errMsg = error?.response?.data?.message;
          }

          swal({
            title: "Error",
            text: errMsg,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Delete an entry from the company list
const DELETE_SINGLE_COMPANY =
  (itemId: number, endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_COMPANY_LIST_LOADING(true));
      await CompanyTabApiClient.deleteSingleCompany(itemId, endpoint)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            swal({
              title: "Successfully Complete",
              text: response?.data?.message,
              icon: Images.Logo,
              timer: 5000,
            });
          }
          dispatch(
            GET_COMPANY_LIST({
              page: 1,
              rowsPerPage: 10,
            }, endpoint)
          );
          dispatch(SET_COMPANY_LIST_LOADING(false));
        })
        .catch((error) => {
          dispatch(SET_COMPANY_LIST_LOADING(false));
          let errMsg = ""
          if (error?.response?.data?.non_field_errors?.length > 0) {
            errMsg = error?.response?.data?.non_field_errors?.[0]
          } else {
            errMsg = error?.response?.data?.message;
          }
          swal({
            title: "Error",
            text: errMsg,
            className: "errorAlert-login",
            icon: Images.Logo,
            timer: 5000,
          });
        });
    };

// Common auth Config
export {
  GET_COMPANY_LIST,
  POST_SINGLE_COMPANY,
  POST_ADMIN_COMPANY,
  PUT_SINGLE_COMPANY,
  DELETE_SINGLE_COMPANY,
};
