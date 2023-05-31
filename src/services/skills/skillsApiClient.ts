import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "helper/env";

class SkillsApiClient {
  //fetch skills list
  fetchSkillsList = (filters: any) =>
    axiosPrivate.get(`${API_URL.SKILLS.SKILLS_LIST}` + setQueryParams(filters));

  //get all skill data with out query parameter
  getAllSkillsList = () => axiosPrivate.get(API_URL.SKILLS.SKILLS_LIST);

  //get user skill set list
  getUserSkillSetList = (userId) =>
    axiosPrivate.get(
      `${API_URL.SKILLS.INDIVIDUAL_USER_SKILL_LIST}?user=${userId}`
    );

  //Edit user skill set lists
  addUserrSkillList = (userSkillData) =>
    axiosPrivate.post(API_URL.SKILLS.INDIVIDUAL_USER_SKILL_LIST, userSkillData);

  //add Skills
  addSkills = (SkillData) =>
    axiosPrivate.post(API_URL.SKILLS.SKILLS_LIST, SkillData);
}

export default new SkillsApiClient();
