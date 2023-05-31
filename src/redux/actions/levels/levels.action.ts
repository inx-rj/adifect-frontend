import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { Images } from "helper/images";

import {
  SET_LEVELS_LIST_DATA,
  SET_LEVELS_LIST_LOADING,
} from "redux/reducers/levels/levels.slice";
import levelsApiClient from "services/levels/levelsApiClient";

// Fetch levels list
const GET_LEVELS_LIST =
  (tableConfig: initialTableConfigInterface) =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_LEVELS_LIST_LOADING(true));
      await levelsApiClient
        .fetchLevelsList(tableConfig)
        .then((response) => {
          console.log("response", response);
          if (response.status === 201 || response.status === 200) {
            dispatch(SET_LEVELS_LIST_DATA(response?.data));
            dispatch(SET_LEVELS_LIST_LOADING(false));
          }
        })
        .catch((error) => {
          dispatch(SET_LEVELS_LIST_LOADING(false));
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
export { GET_LEVELS_LIST };
