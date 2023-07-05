import swal from "sweetalert";
import { AppDispatch } from "../../store";
import {
  SET_COMPANY_LIST_DATA,
  SET_COMPANY_LIST_LOADING,
  SET_MEMBER_ADMIN_COMPANY_LIST_DATA,
  SET_MEMBER_ADMIN_COMPANY_LIST_LOADING,
  SET_SINGLE_COMPANY_LIST_DATA,
  SET_SINGLE_COMPANY_LIST_LOADING,
} from "redux/reducers/companyTab/companyTab.slice";
import CompanyTabApiClient from "services/companyTab/CompanyTabApiClient";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { singleCompanyPayloadData } from "helper/types/companyTab/companiesType";
import { Images } from "helper/images";
import { API_URL } from "helper/env";
import { hasResultsKey } from "helper/utility/customFunctions";

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
          // to set response of with and without 'results' key
          const customizedResponse = hasResultsKey(response)
            ? response?.data?.data || response?.data
            : {
                count: 0,
                prev: null,
                next: null,
                results: response?.data?.data || response?.data,
              };

          // console.log(response.data, { customizedResponse }, "response.data");

          dispatch(SET_COMPANY_LIST_DATA(customizedResponse));
          dispatch(SET_COMPANY_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
          timer: 5000,
        });
      });
  };

// Fetch companies list
const GET_SINGLE_COMPANY_DATA =
  (headerCompany, endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_SINGLE_COMPANY_LIST_LOADING(true));
    await CompanyTabApiClient.fetchSingleCompany(headerCompany, endpoint)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(
            SET_SINGLE_COMPANY_LIST_DATA(response?.data?.data || response?.data)
          );
          dispatch(SET_SINGLE_COMPANY_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_SINGLE_COMPANY_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
          timer: 5000,
        });
      });
  };

// Add new company to the company list
const POST_SINGLE_COMPANY =
  (
    formPayload: singleCompanyPayloadData,
    endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
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
          GET_COMPANY_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
          timer: 5000,
        });
      });
  };

// Add new company admin company list
const POST_ADMIN_COMPANY =
  (
    formPayload: singleCompanyPayloadData,
    endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
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
          GET_COMPANY_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            `${API_URL.COMPANY.ADMIN}`
          )
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
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
          GET_COMPANY_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }

        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
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
          GET_COMPANY_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_COMPANY_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_COMPANY_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
        } else {
          errMsg =
            error?.response?.data?.message ?? error?.response?.data?.detail;
        }
        swal({
          title: "Error",
          text: errMsg,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
          timer: 5000,
        });
      });
  };

// Fetch Member Admin companies list
const GET_MEMBER_ADMIN_COMPANY_LIST =
  (endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_MEMBER_ADMIN_COMPANY_LIST_LOADING(true));
    await CompanyTabApiClient.fetchMemberAdminCompanyList(endpoint)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(
            SET_MEMBER_ADMIN_COMPANY_LIST_DATA(
              response?.data?.data || response?.data
            )
          );
          dispatch(SET_MEMBER_ADMIN_COMPANY_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_MEMBER_ADMIN_COMPANY_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message ?? error?.response?.data?.detail,
          className: "errorAlert-login",
          icon: Images.ErrorLogo,
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
  GET_SINGLE_COMPANY_DATA,
  GET_MEMBER_ADMIN_COMPANY_LIST,
};
