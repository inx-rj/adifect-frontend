import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";
import CopyCodeApiClient from "services/companies/CopyCodeApiClient";
import {
  SET_COPY_CODE_DATA,
  SET_COPY_CODE_DATA_LOADING,
  SET_COPY_CODE_LOADING,
  SET_DELETE_COPY_CODE,
} from "redux/reducers/companies/copyCode.slice";
import swal from "sweetalert";
import { Images } from "helper/images";

// Get Copy Code List
const GET_COPY_CODE_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_COPY_CODE_DATA_LOADING(true));
    await CopyCodeApiClient.fetchCopyCodeList(tableConfig).then((response) => {
      dispatch(SET_COPY_CODE_DATA(response?.data?.data));
      dispatch(SET_COPY_CODE_DATA_LOADING(false));
    });
  };

// Create Copy Code List
const CREATE_COPY_CODE_LIST = (formData) => async (dispatch: AppDispatch) => {
  await dispatch(SET_COPY_CODE_LOADING(true));
  return await CopyCodeApiClient.createCopyCodeData(formData);
};

// Update Copy Code List
const UPDATE_COPY_CODE_LIST =
  (id: number, formData) => async (dispatch: AppDispatch) => {
    await dispatch(SET_COPY_CODE_LOADING(true));
    return await CopyCodeApiClient.updateCopyCodeData(id, formData);
  };

// Delete Copy Code List
const DELETE_COPY_CODE_LIST = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_COPY_CODE_LOADING(true));
  await CopyCodeApiClient.deleteCopyCodeData(id)
    .then((res) => {
      swal({
        title: "Successfully Complete",
        text: "Successfully Deleted!",
        className: "successAlert-login",
        icon: Images.Logo,
        buttons: {
          OK: false,
        },
        timer: 1500,
      });
      dispatch(SET_DELETE_COPY_CODE(res?.data?.message));
      dispatch(SET_COPY_CODE_LOADING(false));
    })
    .catch((err) => {
      swal({
        title: "Error",
        text: err.response.data.message.length
          ? err.response.data.message
          : err.response.data.message,
        className: "errorAlert",
        icon: Images.ErrorLogo,
        buttons: {
          OK: false,
        },
        timer: 5000,
      });
      dispatch(SET_COPY_CODE_LOADING(false));
    });
};

// Common auth Config
export {
  GET_COPY_CODE_LIST,
  CREATE_COPY_CODE_LIST,
  UPDATE_COPY_CODE_LIST,
  DELETE_COPY_CODE_LIST,
};
