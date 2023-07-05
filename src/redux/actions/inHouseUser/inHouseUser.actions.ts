import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { Images } from "helper/images";

import InHouseUserApiClient from "services/inHouseUser/InHouseUserApiClient";
import {
  SET_IN_HOUSE_USER_LIST_DATA,
  SET_IN_HOUSE_USER_LIST_LOADING,
  SET_IN_HOUSE_USER_SUCCESS_MESSAGE,
} from "redux/reducers/inHouseUser/inHouseUser.slice";
import { API_URL } from "helper/env";

// Fetch In House User list
const GET_IN_HOUSE_USER_LIST =
  (companyId, endpoint: string = `${API_URL.IN_HOUSE_USER.AGENCY_USER_LIST}`) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_IN_HOUSE_USER_LIST_LOADING(true));
    await InHouseUserApiClient.fetchInHouseUserList(companyId, endpoint)
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_IN_HOUSE_USER_LIST_DATA(response?.data));
          dispatch(SET_IN_HOUSE_USER_SUCCESS_MESSAGE("Successfully fetched"))
          dispatch(SET_IN_HOUSE_USER_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_IN_HOUSE_USER_LIST_LOADING(false));
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
export { GET_IN_HOUSE_USER_LIST };
