import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import swal from "sweetalert";
import { Images } from "helper/images";
import {
  SET_CREATIVE_CODE_DATA,
  SET_CREATIVE_CODE_DATA_LOADING,
  SET_CREATIVE_CODE_LOADING,
  SET_DELETE_CREATIVE_CODE,
} from "redux/reducers/companies/creativeCode.slice";
import CreativeCodeApiClient from "services/companies/CreativeCodeApiClient";

// Get Creative Code List
const GET_CREATIVE_CODE_LIST =
  (tableConfig: initialTableConfigInterface) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_CREATIVE_CODE_DATA_LOADING(true));
      await CreativeCodeApiClient.fetchCreativeCodeList(tableConfig).then(
        (response) => {
          dispatch(SET_CREATIVE_CODE_DATA(response?.data?.data));
          dispatch(SET_CREATIVE_CODE_DATA_LOADING(false));
        }
      );
    };

// Create Creative Code List
const CREATE_CREATIVE_CODE_LIST =
  (formData: { [key: string]: string }) => async (dispatch: AppDispatch) => {
    await dispatch(SET_CREATIVE_CODE_LOADING(true));
    return await CreativeCodeApiClient.createCreativeCodeData(formData);
  };

// Update Creative Code List
const UPDATE_CREATIVE_CODE_LIST =
  (id: number, formData: { [key: string]: string }) =>
    async (dispatch: AppDispatch) => {
      await dispatch(SET_CREATIVE_CODE_LOADING(true));
      return await CreativeCodeApiClient.updateCreativeCodeData(id, formData);
    };

// Delete Creative Code List
const DELETE_CREATIVE_CODE_LIST =
  (id: number) => async (dispatch: AppDispatch) => {
    dispatch(SET_CREATIVE_CODE_LOADING(true));
    await CreativeCodeApiClient.deleteCreativeCodeData(id)
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
        dispatch(SET_DELETE_CREATIVE_CODE(res?.data?.message));
        dispatch(SET_CREATIVE_CODE_LOADING(false));
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
        dispatch(SET_CREATIVE_CODE_LOADING(false));
      });
  };

// Common auth Config
export {
  GET_CREATIVE_CODE_LIST,
  CREATE_CREATIVE_CODE_LIST,
  UPDATE_CREATIVE_CODE_LIST,
  DELETE_CREATIVE_CODE_LIST,
};
