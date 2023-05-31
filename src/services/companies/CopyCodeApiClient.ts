import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class CopyCodeApiClient {
  // Copy Code table data list
  fetchCopyCodeList = (filters: initialTableConfigInterface) =>
    axiosPrivate.get(
      `${API_URL.COMPANIES.COPY_CODE}` + setQueryParams(filters)
    );

  // Create Copy Code data
  createCopyCodeData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.COMPANIES.COPY_CODE}`, formData);

  // Edit Copy Code data
  updateCopyCodeData = (id: number, formData: { [key: string]: string }) =>
    axiosPrivate.put(`${API_URL.COMPANIES.COPY_CODE}${id}/`, formData);

  // Delete Copy Code data
  deleteCopyCodeData = (id: number) =>
    axiosPrivate.delete(`${API_URL.COMPANIES.COPY_CODE}${id}/`);
}

export default new CopyCodeApiClient();
