import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";
import { initialTableConfigInterface } from "helper/types/common/tableType";

class DraftJobsApiClient {
  // Creative Code table data list
  fetchDraftJobsList = (filter: initialTableConfigInterface, id: number) =>
    axiosPrivate.get(
      `${API_URL.DRAFT_JOBS.DRAFT_JOBS_LIST}` + setQueryParams(filter)
    );

  // Create Creative Code data
  createDraftJobsData = (formData: { [key: string]: string }) =>
    axiosPrivate.post(`${API_URL.DRAFT_JOBS.DRAFT_JOBS_LIST}`, formData);

  // Edit Creative Code data
  updateDraftJobsData = (id: string, formData: FormData) =>
    axiosPrivate.put(`${API_URL.DRAFT_JOBS.DRAFT_JOBS_LIST}${id}/`, formData);

  // Delete Creative Code data
  deleteDraftJobsData = (id: number) =>
    axiosPrivate.delete(`${API_URL.DRAFT_JOBS.DRAFT_JOBS_LIST}${id}/`);
}

export default new DraftJobsApiClient();
