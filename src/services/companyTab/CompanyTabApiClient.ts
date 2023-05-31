import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";


class CompanyTabApiClientCls {
  //fetch company list
  fetchCompanyList = (filters: any, endpoint: string) =>
    axiosPrivate.get(endpoint + setQueryParams(filters));

  //Add a new company entry
  addSingleCompany = (payload: any, endpoint: string) => {
    return axiosPrivate.post(endpoint, payload);
  };

  //Update a company entry
  updateSingleCompany = (id: number, payload: any, endpoint: string) => {
    return axiosPrivate.put(`${endpoint}${id}/`, payload);
  };

  //Delete a company entry
  deleteSingleCompany = (id: number, endpoint: string) => {
    return axiosPrivate.delete(`${endpoint}${id}/`);
  };

  //Fetch a company based on Header Company Id
  fetchSingleCompany = (id: number, endpoint: string) => {
    return axiosPrivate.get(`company/${id}/`);
  };
}

const CompanyTabApiClient = new CompanyTabApiClientCls();

export default CompanyTabApiClient;
