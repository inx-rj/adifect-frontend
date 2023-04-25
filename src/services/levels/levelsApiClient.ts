import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "helper/env";

class LevelsApiClient {
  //fetch skills list
  fetchLevelsList = (filters: any) =>
    axiosPrivate.get(`${API_URL.LEVELS.LEVELS_LIST}` + setQueryParams(filters));
}

export default new LevelsApiClient();
