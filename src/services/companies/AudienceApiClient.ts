import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class AudienceApiClient {
  // audience table data list
  fetchAudienceList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.AUDIENCES}` + setQueryParams(filters)
    );

  // Create audience data
  createAudienceData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.COMPANIES.AUDIENCES}`, formData);

  // Edit audience data
  updateAudienceData = (id: number, formData: { [key: string]: string }) =>
    axiosPrivate.put(`${API_URL.COMPANIES.AUDIENCES}${id}/`, formData);

  // Delete audience data
  deleteAudienceData = (id: number) =>
    axiosPrivate.delete(`${API_URL.COMPANIES.AUDIENCES}${id}/`);

  // audience table data list
  fetchCommunityAudienceList = (storyId: string) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.COMMUNITY_AUDIENCES}?story_id=${storyId}`
    );
}

export default new AudienceApiClient();
