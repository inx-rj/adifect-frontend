import swal from "sweetalert";
import { AppDispatch } from "../../store";
import { initialTableConfigInterface } from "helper/types/common/tableType";
import { Images } from "helper/images";

import skillsApiClient from "services/skills/skillsApiClient";
import {
  SET_ALL_SKILLS_LIST_DATA,
  SET_ALL_SKILLS_LIST_LOADING,
  SET_SKILLS_LIST_LOADING,
  SET_USER_SKILL_SET_LIST_DATA,
  SET_USER_SKILL_SET_LIST_LOADING,
} from "redux/reducers/skills/skills.slice";
import { SET_SKILLS_LIST_DATA } from "redux/reducers/skills/skills.slice";

// Fetch skills list
const GET_SKILLS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    dispatch(SET_SKILLS_LIST_LOADING(true));
    await skillsApiClient
      .fetchSkillsList(tableConfig)
      .then((response) => {
        // console.log("response",response, response.status);
        if (response.status === 201 || response.status === 200) {
          dispatch(SET_SKILLS_LIST_DATA(response?.data?.data));
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

// Get all skills list
const GET_ALL_SKILLS_LIST = () => async (dispatch: AppDispatch) => {
  dispatch(SET_ALL_SKILLS_LIST_LOADING(true));
  await skillsApiClient
    .getAllSkillsList()
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(SET_ALL_SKILLS_LIST_DATA(response?.data?.data));
      }
    })
    .catch((error) => {
      dispatch(SET_ALL_SKILLS_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
    .finally(() => {
      dispatch(SET_ALL_SKILLS_LIST_LOADING(false));
    });
};

// Get user skill se list
const GET_USER_SKILL_SET_LIST = (userId) => async (dispatch: AppDispatch) => {
  dispatch(SET_USER_SKILL_SET_LIST_LOADING(true));
  await skillsApiClient
    .getUserSkillSetList(userId)
    .then((response) => {
      if (response.status === 201 || response.status === 200) {
        dispatch(SET_USER_SKILL_SET_LIST_DATA(response?.data));
      }
    })
    .catch((error) => {
      dispatch(SET_USER_SKILL_SET_LIST_LOADING(false));
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
    .finally(() => {
      dispatch(SET_USER_SKILL_SET_LIST_LOADING(false));
    });
};

// Add user skill set list
const ADD_USER_SKILL_SET_LIST = (userSkillData) => async () => {
  await skillsApiClient
    .addUserrSkillList(userSkillData)
    .then((response) => {
      console.log("Update skill", response);
    })
    .catch((error) => {
      swal({
        title: "Error",
        text: error?.response?.data?.message,
        className: "errorAlert-login",
        icon: Images.Logo,
        timer: 5000,
      });
    })
    .finally(() => {});
};

// Add  skill set list
const ADD_SKILL_SET_LIST = (SkillData) => async () => {
  return await skillsApiClient.addSkills(SkillData);

};

export {
  GET_SKILLS_LIST,
  GET_ALL_SKILLS_LIST,
  GET_USER_SKILL_SET_LIST,
  ADD_USER_SKILL_SET_LIST,
  ADD_SKILL_SET_LIST,
};
