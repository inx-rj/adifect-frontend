import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class ProgramsApiClient {
  // Programs table data list
  fetchProgramsList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(`${API_URL.COMPANIES.PROGRAMS}` + setQueryParams(filters));

  // Create Programs data
  createProgramsData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.COMPANIES.PROGRAMS}`, formData);

  // Edit Programs data
  updateProgramsData = (id: number, formData: { [key: string]: string }) =>
    axiosPrivate.put(`${API_URL.COMPANIES.PROGRAMS}${id}/`, formData);

  // Delete Programs data
  deleteProgramsData = (id: number) =>
    axiosPrivate.delete(`${API_URL.COMPANIES.PROGRAMS}${id}/`);
}

export default new ProgramsApiClient();
