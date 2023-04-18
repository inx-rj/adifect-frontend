import WorkFlowTabApiClient from "../../../services/workFlow/workFlowApiClient";
import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { initialTableConfigInterface } from "helper/types/common/table";
import { singleCompanyPayloadData } from "helper/types/companyTab/comapniesType";
import { Images } from "helper/images";
import { API_URL } from "helper/env";
import {
  SET_WORKFLOW_LIST_DATA,
  SET_WORKFLOW_LIST_LOADING,
} from "redux/reducers/workFlow/workFlow.slice";

// Fetch workflow list
const GET_WORKFLOW_LIST =
  (
    tableConfig: initialTableConfigInterface,
    endpoint: string = `${API_URL.WORKFLOW.WORKFLOW_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_WORKFLOW_LIST_LOADING(true));
    await WorkFlowTabApiClient.fetchWorkFlowList(tableConfig, endpoint)
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 201 || response.status === 200) {
          const dummyData = {
            count: 2,
            next: null,
            prev: null,
            results: [],
          };
          dummyData.results = response?.data
          console.log(response.data, "res data");

          dispatch(SET_WORKFLOW_LIST_DATA(dummyData));
          dispatch(SET_WORKFLOW_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
        swal({
          title: "Error",
          text: error?.response?.data?.message,
          className: "errorAlert-login",
          icon: Images.Logo,
          timer: 5000,
        });
      });
  };

// Add new workflow to the workflow list
const POST_SINGLE_WORKFLOW =
  (
    formPayload: singleCompanyPayloadData,
    endpoint: string = `${API_URL.WORKFLOW.WORKFLOW_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_WORKFLOW_LIST_LOADING(true));
    console.log("formPayload", formPayload);
    await WorkFlowTabApiClient.addSingleWorkFlow(formPayload, endpoint)
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
          GET_WORKFLOW_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
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

// Add new workflow admin workflow list
const POST_ADMIN_WORKFLOW =
  (
    formPayload: singleCompanyPayloadData,
    endpoint: string = `${API_URL.COMPANY.COMPANY_LIST}`
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_WORKFLOW_LIST_LOADING(true));
    await WorkFlowTabApiClient.addSingleWorkFlow(formPayload, endpoint)
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
          GET_WORKFLOW_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            `${API_URL.WORKFLOW.ADMIN}`
          )
        );
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
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

// Update an entry from the workflow list
const PUT_SINGLE_WORKFLOW =
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
    dispatch(SET_WORKFLOW_LIST_LOADING(true));
    await WorkFlowTabApiClient.updateSingleWorkFlow(id, payloadObj, endpoint)
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
          GET_WORKFLOW_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
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

// Delete an entry from the workflow list
const DELETE_SINGLE_WORKFLOW =
  (itemId: number, endpoint: string = `${API_URL.WORKFLOW.WORKFLOW_LIST}`) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_WORKFLOW_LIST_LOADING(true));
    await WorkFlowTabApiClient.deleteSingleWorkFlow(itemId, endpoint)
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
          GET_WORKFLOW_LIST(
            {
              page: 1,
              rowsPerPage: 10,
            },
            endpoint
          )
        );
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
      })
      .catch((error) => {
        dispatch(SET_WORKFLOW_LIST_LOADING(false));
        let errMsg = "";
        if (error?.response?.data?.non_field_errors?.length > 0) {
          errMsg = error?.response?.data?.non_field_errors?.[0];
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
  GET_WORKFLOW_LIST,
  POST_SINGLE_WORKFLOW,
  POST_ADMIN_WORKFLOW,
  PUT_SINGLE_WORKFLOW,
  DELETE_SINGLE_WORKFLOW,
};
