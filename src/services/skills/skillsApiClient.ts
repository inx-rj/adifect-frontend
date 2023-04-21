import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "helper/env";


class SkillsApiClient {
  //fetch skills list
  fetchSkillsList = (filters: any) =>
    axiosPrivate.get(`${API_URL.SKILLS.SKILLS_LIST}` + setQueryParams(filters));

}

export default new SkillsApiClient();