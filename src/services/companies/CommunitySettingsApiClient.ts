import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class CommunitySettingsApiClient {
  // Community Settings table data list
  fetchCommunitySettingsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.COMMUNITY_SETTINGS}` + setQueryParams(filters)
    );
}

export default new CommunitySettingsApiClient();
