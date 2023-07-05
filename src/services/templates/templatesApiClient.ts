import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class TemplatesApiClient {
  // Templates table data list
  fetchTemplatesList = (
    endpoint: string,
    filter: initialTableConfigInterface,
    id: number
  ) => axiosPrivate.get(`${endpoint}` + setQueryParams(filter));

  // Templates details
  fetchTemplatesdetails = (id: string) =>
    axiosPrivate.get(`${API_URL.TEMPLATES.TEMPLATES_LIST}${id}`);

  // Create Templates data
  createTemplatesData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.TEMPLATES.TEMPLATES_LIST}`, formData);

  // Edit Templates data
  updateTemplatesData = (id: string, formData: FormData) =>
    axiosPrivate.put(`${API_URL.TEMPLATES.TEMPLATES_LIST}${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  // Delete Templates data
  deleteTemplatesData = (id: number) =>
    axiosPrivate.delete(`${API_URL.TEMPLATES.TEMPLATES_LIST}${id}/`);
}

export default new TemplatesApiClient();
