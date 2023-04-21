import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { initialTableConfigInterface } from "helper/types/common/table";
import { Images } from "helper/images";

import skillsApiClient from "services/skills/skillsApiClient";
import { SET_SKILLS_LIST_LOADING } from "redux/reducers/skills/skills.slice";
import { SET_SKILLS_LIST_DATA } from "redux/reducers/skills/skills.slice";

// Fetch skills list
const GET_SKILLS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_SKILLS_LIST_LOADING(true));
    await skillsApiClient
      .fetchSkillsList(tableConfig)
      .then((response) => {
        console.log("response", response.status);
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_SKILLS_LIST_DATA(response?.data));
          dispatch(SET_SKILLS_LIST_LOADING(false));
        }
      })
      .catch((error) => {
        dispatch(SET_SKILLS_LIST_LOADING(false));
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
export { GET_SKILLS_LIST };
