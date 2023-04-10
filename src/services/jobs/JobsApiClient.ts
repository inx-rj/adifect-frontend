import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class JobsApiClient {
  fetchJobsDetails = (id) =>
    axiosPrivate.get(`${API_URL.HOMEPAGE.IN_PROGRESS_JOBS_LIST}${id}/`);

  jobApply = (formData) =>
    axiosPrivate.post(`${API_URL.HOMEPAGE.JOB_APPLIED}/` + formData);
}

export default new JobsApiClient();
