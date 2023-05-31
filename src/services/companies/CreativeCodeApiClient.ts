import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class CreativeCodeApiClient {
  // Creative Code table data list
  fetchCreativeCodeList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.CREATIVE_CODE}` + setQueryParams(filters)
    );

  // Create Creative Code data
  createCreativeCodeData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.COMPANIES.CREATIVE_CODE}`, formData);

  // Edit Creative Code data
  updateCreativeCodeData = (id: number, formData: { [key: string]: string }) =>
    axiosPrivate.put(`${API_URL.COMPANIES.CREATIVE_CODE}${id}/`, formData);

  // Delete Creative Code data
  deleteCreativeCodeData = (id: number) =>
    axiosPrivate.delete(`${API_URL.COMPANIES.CREATIVE_CODE}${id}/`);
}

export default new CreativeCodeApiClient();
