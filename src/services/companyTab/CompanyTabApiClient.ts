import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class CompanyTabApiClient {
  //fetch company list
  fetchCompanyList = (filters: any) =>
    axiosPrivate.get(`${API_URL.COMPANY.COMPANY_LIST}` + setQueryParams(filters));

  //update company entry
  updateSingleCompany = (id: number, payload: any) => {
    return axiosPrivate.put(`${API_URL.COMPANY.COMPANY_LIST}${id}/`, payload)
  }
}

export default new CompanyTabApiClient();