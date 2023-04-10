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


// Update an entry from the company list
const PUT_SINGLE_COMPANY = (id: number, payloadObj: { name?: string, description?: string, is_active?: boolean }) => async (dispatch: AppDispatch) => {
  dispatch(SET_COMPANY_LIST_LOADING(true));
  await CompanyTabApiClient.updateSingleCompany(id, payloadObj)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        swal({
          title: "Successfully Complete",
          text: response?.data?.message,
          icon: Images.Logo,
          timer: 5000,
        });
      }
      dispatch(GET_COMPANY_LIST({
        page: 1,
        rowsPerPage: 10,
      }));
      dispatch(SET_COMPANY_LIST_LOADING(false));
    }).catch((error) => {
      dispatch(SET_COMPANY_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
};

// Common auth Config
export {
  GET_COMPANY_LIST,
  PUT_SINGLE_COMPANY
};
