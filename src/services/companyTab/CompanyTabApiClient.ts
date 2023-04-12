import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

const userData = () => JSON.parse(localStorage.getItem("userData") ?? '');

class CompanyTabApiClient {
  //fetch company list
  fetchCompanyList = (filters: any) =>
    axiosPrivate.get(`${API_URL.COMPANY.COMPANY_LIST}` + setQueryParams(filters));

  //Add a new company entry
  addSingleCompany = (postObj: any) => {
    const payload = {
      ...postObj,
      agency: userData()?.user.user_id
    }
    return axiosPrivate.post(`${API_URL.COMPANY.COMPANY_LIST}`, payload);
  }

  //Update a company entry
  updateSingleCompany = (id: number, payload: any) => {
    return axiosPrivate.put(`${API_URL.COMPANY.COMPANY_LIST}${id}/`, payload)
  }

  //Delete a company entry
  deleteSingleCompany = (id: number) => {
    return axiosPrivate.delete(`${API_URL.COMPANY.COMPANY_LIST}${id}/`);
  }

}

export default new CompanyTabApiClient();