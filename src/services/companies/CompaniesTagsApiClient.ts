import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class CompaniesTagsApiClient {
  // fetch Company projects tags table data list
  fetchCompanyProjectsTagsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.TAGS}` + setQueryParams(filters)
    );

  // Add new tags to tags table data list
  addCompanyProjectsTag = (postObj: any) =>
    axiosPrivate.post(
      `${API_URL.COMPANIES.TAGS}`, postObj);
}

export default new CompaniesTagsApiClient();
