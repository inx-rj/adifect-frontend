import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { EmailPWDType, EmailType } from "../../helper/types";

class CompaniesApiClient {
  // Company projects table data list
  fetchCompanyProjectsList = (filters: any) =>
    axiosPrivate.get(`${API_URL.COMPANIES.COMPANY_PROJECTS}`, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${userData.token}`,
      },
      params: { ...filters },
    });

  // Company projects table filters dropdwon list
  fetchCompanyProjectsFiltersList = () =>
    axiosPrivate.get(`${API_URL.COMPANIES.FILTERS}`, {
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${userData.token}`,
      },
    });
}

export default new CompaniesApiClient();
