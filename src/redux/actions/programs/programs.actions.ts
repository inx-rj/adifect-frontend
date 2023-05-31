import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import swal from "sweetalert";
import { Images } from "helper/images";
import {
  SET_DELETE_PROGRAMS,
  SET_PROGRAMS_DATA,
  SET_PROGRAMS_DATA_LOADING,
  SET_PROGRAMS_LOADING,
} from "redux/reducers/companies/programs.slice";
import ProgramsApiClient from "services/companies/ProgramsApiClient";

// Get Programs List
const GET_PROGRAMS_LIST =
  (tableConfig: initialTableConfigInterface) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_PROGRAMS_DATA_LOADING(true));
      await ProgramsApiClient.fetchProgramsList(tableConfig).then((response) => {
        dispatch(SET_PROGRAMS_DATA(response?.data?.data));
        dispatch(SET_PROGRAMS_DATA_LOADING(false));
      });
    };

// Create Programs List
const CREATE_PROGRAMS_LIST =
  (formData: { [key: string]: string }) => async (dispatch: AppDispatch) => {
    await dispatch(SET_PROGRAMS_LOADING(true));
    return await ProgramsApiClient.createProgramsData(formData);
  };

// Update Programs List
const UPDATE_PROGRAMS_LIST =
  (id: number, formData: { [key: string]: string }) =>
    async (dispatch: AppDispatch) => {
      await dispatch(SET_PROGRAMS_LOADING(true));
      return await ProgramsApiClient.updateProgramsData(id, formData);
    };

// Delete Programs List
const DELETE_PROGRAMS_LIST = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_PROGRAMS_LOADING(true));
  await ProgramsApiClient.deleteProgramsData(id)
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
      dispatch(SET_DELETE_PROGRAMS(res?.data?.message));
      dispatch(SET_PROGRAMS_LOADING(false));
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
      dispatch(SET_PROGRAMS_LOADING(false));
    });
};

// Common auth Config
export {
  GET_PROGRAMS_LIST,
  CREATE_PROGRAMS_LIST,
  UPDATE_PROGRAMS_LIST,
  DELETE_PROGRAMS_LIST,
};
