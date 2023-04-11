import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class JobsApiClient {
  fetchJobsDetails = (id) =>
    axiosPrivate.get(`${API_URL.HOMEPAGE.JOBS_LIST}${id}/`);

  jobApply = (formData) =>
    axiosPrivate.post(`${API_URL.HOMEPAGE.JOB_APPLIED}/` + formData);

  //delete job
  deleteJob = (id) =>
    axiosPrivate.delete(`${API_URL.HOMEPAGE.JOBS_LIST}${id}/`);
}

export default new JobsApiClient();