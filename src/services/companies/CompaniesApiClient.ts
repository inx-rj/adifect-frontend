import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class CompaniesApiClient {
  // Company projects table data list
  fetchCompanyProjectsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.COMPANY_PROJECTS}` + setQueryParams(filters)
    );

  // Company projects table filters dropdwon list
  fetchCompanyProjectsFiltersList = () =>
    axiosPrivate.get(`${API_URL.COMPANIES.FILTERS}`);
}

export default new CompaniesApiClient();
