import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class JobsApiClient {
  fetchAllJobsList = (data) =>
    axiosPrivate.post(`${API_URL.MY_JOBS.AGENCY_JOBS_LIST}/` + data);

  fetchJobsDetails = (id) =>
    axiosPrivate.get(`${API_URL.HOMEPAGE.JOBS_LIST}${id}/`);

  jobApply = (formData) =>
    axiosPrivate.post(`${API_URL.HOMEPAGE.JOB_APPLIED}`, formData);

  //create job
  createApply = (formData) =>
    axiosPrivate.post(`${API_URL.HOMEPAGE.JOBS_LIST}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  //update job
  updateJob = (id, formData) =>
    axiosPrivate.put(`${API_URL.HOMEPAGE.JOBS_LIST}${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  //delete job
  deleteJob = (id) =>
    axiosPrivate.delete(`${API_URL.HOMEPAGE.JOBS_LIST}${id}/`);
}

export default new JobsApiClient();
