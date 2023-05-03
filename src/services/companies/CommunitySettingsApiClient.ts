import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/table";

class CommunitySettingsApiClient {
  // Community Settings table data list
  fetchCommunitySettingsList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.COMMUNITY_SETTINGS}` + setQueryParams(filters)
    );

  // Create Community Settings data
  createCommunitySettingsData = (formData: { [key: string]: any }) =>
    axiosPrivate.post(`${API_URL.COMPANIES.COMMUNITY_SETTINGS}`, formData);

  // Edit Community Settings data
  updateCommunitySettingsData = (
    id: number,
    formData: { [key: string]: any }
  ) =>
    axiosPrivate.put(`${API_URL.COMPANIES.COMMUNITY_SETTINGS}${id}/`, formData);

  // Delete Community Settings data
  deleteCommunitySettingsData = (id: number) =>
    axiosPrivate.delete(`${API_URL.COMPANIES.COMMUNITY_SETTINGS}${id}/`);
}

export default new CommunitySettingsApiClient();
