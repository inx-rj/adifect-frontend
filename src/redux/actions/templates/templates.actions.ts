import { Images } from "helper/images";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import {
  SET_DELETE_TEMPLATES,
  SET_TEMPLATES_DATA,
  SET_TEMPLATES_DATA_LOADING,
  SET_TEMPLATES_DETAILS,
  SET_TEMPLATES_DETAILS_LOADING,
  SET_TEMPLATES_LOADING,
} from "redux/reducers/templates/templates.slice";
import { AppDispatch } from "redux/store";
import TemplatesApiClient from "services/templates/templatesApiClient";
import swal from "sweetalert";

// Get Templates List
const GET_TEMPLATES_LIST =
  (filter: initialTableConfigInterface, id: number) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_TEMPLATES_DATA_LOADING(true));
    await TemplatesApiClient.fetchTemplatesList(filter, id).then((response) => {
      dispatch(SET_TEMPLATES_DATA(response?.data?.data));
      dispatch(SET_TEMPLATES_DATA_LOADING(false));
    });
  };

// Get Templates List
const GET_TEMPLATES_DETAILS = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(SET_TEMPLATES_DETAILS_LOADING(true));
  await TemplatesApiClient.fetchTemplatesdetails(id).then((response) => {
    dispatch(SET_TEMPLATES_DETAILS(response?.data));
    dispatch(SET_TEMPLATES_DETAILS_LOADING(false));
  });
};

// Update Templates List
const UPDATE_TEMPLATES_LIST =
  (id: string, formData: FormData) => async (dispatch: AppDispatch) => {
    await dispatch(SET_TEMPLATES_LOADING(true));
    return await TemplatesApiClient.updateTemplatesData(id, formData);
  };

// Delete Templates List
const DELETE_TEMPLATES_LIST = (id: number) => async (dispatch: AppDispatch) => {
  dispatch(SET_TEMPLATES_LOADING(true));
  await TemplatesApiClient.deleteTemplatesData(id)
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
      dispatch(SET_DELETE_TEMPLATES(res?.data?.message));
      dispatch(SET_TEMPLATES_LOADING(false));
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
      dispatch(SET_TEMPLATES_LOADING(false));
    });
};

// Common auth Config
export {
  GET_TEMPLATES_LIST,
  GET_TEMPLATES_DETAILS,
  UPDATE_TEMPLATES_LIST,
  DELETE_TEMPLATES_LIST,
};
