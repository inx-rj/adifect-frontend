import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { SET_COMPANY_LIST_DATA, SET_COMPANY_LIST_LOADING } from "redux/reducers/companyTab/companyTab.slice";
import CompanyTabApiClient from "services/companyTab/CompanyTabApiClient";
import { Images } from "helper/images";
import { initialTableConfigInterface } from "helper/types/common/table";

// Fetch companies list
const GET_COMPANY_LIST = (tableConfig: initialTableConfigInterface) => async (dispatch: AppDispatch) => {
  dispatch(SET_COMPANY_LIST_LOADING(true));
  await CompanyTabApiClient.fetchCompanyList(tableConfig)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(SET_COMPANY_LIST_DATA(response?.data));
        dispatch(SET_COMPANY_LIST_LOADING(false));
      }
    }).catch((error) => {
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

// Common auth Config
export {
  GET_COMPANY_LIST,
};
