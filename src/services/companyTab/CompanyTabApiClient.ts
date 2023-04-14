import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";


class CompanyTabApiClient {
  //fetch company list
  fetchCompanyList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  //Add a new company entry
  addSingleCompany = (payload: any, endpoint: string) => {
    return axiosPrivate.post(endpoint, payload);
  }

  //Update a company entry
  updateSingleCompany = (id: number, payload: any, endpoint: string) => {
    return axiosPrivate.put(`${endpoint}${id}/`, payload)
  }

  //Delete a company entry
  deleteSingleCompany = (id: number, endpoint: string) => {
    return axiosPrivate.delete(`${endpoint}${id}/`);
  }

}

export default new CompanyTabApiClient();