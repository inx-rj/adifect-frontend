import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class JobsApiClient {
  fetchAllJobsList = (data) =>
    axiosPrivate.post(`${API_URL.MY_JOBS.AGENCY_JOBS_LIST}/` + data);

  fetchJobsDetails = (id, endpoint?: string) => {
    if (endpoint) {
      return axiosPrivate.get(`${endpoint}${id}/`);
    } else {
      return axiosPrivate.get(`${API_URL.JOBS.JOBS_LIST}${id}/`);
    }
  };
  fetchCreatorAvailableJobsList = () =>
    axiosPrivate.get(`${API_URL.JOBS.CREATOR_AVAILABLE_JOBS}`);

  fetchCreatorAvailableJobsDetails = (id) =>
    axiosPrivate.get(`${API_URL.JOBS.CREATOR_AVAILABLE_JOBS}${id}/`);

  fetchJobsSubmitStatus = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_WORK_STATUS}`, data);

  getJobCompletedUsers = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_COMPLETED_STATUS}`, data);

  getJobDetailsMember = (id) =>
    axiosPrivate.get(`${API_URL.JOBS.MEMBERS_JOBS_LIST}${id}/`);

  listAllQuestion = (p_data) =>
    axiosPrivate.get(`${API_URL.JOBS.JOBS_QUESTION}${p_data}/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  listAllAnswer = () =>
    axiosPrivate.get(`${API_URL.JOBS.JOBS_ANSWER}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

  postNewQuestion = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_QUESTION}`, data);

  listAllAnswerPost = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_ANSWER}`, data);

  deleteJobAnswer = (id) =>
    axiosPrivate.delete(`${API_URL.JOBS.JOBS_ANSWER}${id}`);

  deleteJobQuestion = (id) =>
    axiosPrivate.delete(`${API_URL.JOBS.JOBS_QUESTION}${id}`);

  fetchJobsProposalDetails = (id) =>
    axiosPrivate.get(`${API_URL.JOBS.JOBS_PROPOSAL}${id}/`);

  acceptRejectJobsProposals = (id) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_PROPOSAL}${id}`);

  updateJobsProposals = (id) =>
    axiosPrivate.put(`${API_URL.JOBS.JOBS_PROPOSAL}${id}/`);

  listAllSearch = (data, endpoint) => axiosPrivate.post(endpoint, data);

  jobsProposalsSeen = (id) =>
    axiosPrivate.put(`${API_URL.JOBS.JOBS_PROPOSAL}${id}/`);

  fetchJobsFilesDetails = (endpoint, id, user) =>
    axiosPrivate.get(`${endpoint}?job=${id}&user=${user ?? ""}`);

  //fecth job activity details
  fetchJobsActivityDetails = (endpoint, id, order, user?: any) => {
    if (user) {
      return axiosPrivate.get(
        `${endpoint}?job=${id}&ordering=${order}&user=${user}`
      );
    } else {
      return axiosPrivate.get(`${endpoint}?job=${id}&ordering=${order}`);
    }
  };

  fetchCreatorJObActivityDetails = (jobId, order) =>
    axiosPrivate.get(
      `${API_URL.JOBS.CREATOR_JOBS_ACTIVITY}/?job=${jobId}&ordering=${order}`
    );

  isApprovalRejectedStatus = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.IS_APPROVAL_REJECTED_STATUS}`, data);

  creatorAppliedJobIdAction = (id) =>
    axiosPrivate.get(`${API_URL.JOBS.CREATOR_JOB_APPLIED}?job=${id}`);

  getCompletedTaskList = (data) =>
    axiosPrivate.post(`${API_URL.JOBS.CREATOR_COMPLETED_TASK_LIST}`, data);

  getJobAppliedDetails = (id) =>
    axiosPrivate.get(`${API_URL.JOBS.JOB_APPLIED}${id}/`);

  CreatorActivityGetRatingAction = (id, userId) =>
    axiosPrivate.get(
      `${API_URL.JOBS.CREATOR_JOB_FEEDBACK}?job=${id}&sender_user=${userId}`
    );

  CreatorActivityPostRatingAction = (data) =>
    axiosPrivate.get(`${API_URL.JOBS.CREATOR_JOB_FEEDBACK}/`, data);

  creatorActivityJobSubmitAction = (data) => {
    const ifPutMethod = data.get("put");
    const putId = data.get("putId");

    if (ifPutMethod) {
      return axiosPrivate.post(
        `${API_URL.JOBS.SUBMIT_JOB_WORK}${putId}/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      return axiosPrivate.post(`${API_URL.JOBS.SUBMIT_JOB_WORK}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  };

  fetchCompletedJobsActivity = (id) =>
    axiosPrivate.post(`${API_URL.JOBS.COMPLETED_JOB_STATUS}`);

  postActivityChat = (formData) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_ACTIVITY}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  memberworkApproval = (jobId, userId) =>
    axiosPrivate.get(
      `${API_URL.JOBS.MEMBER_WORK_APPROVAL}?approver__user__user=${userId}&status=0&job_work__job_applied__job=${jobId}`
    );

  MemberViewApproveAction = (id, data) =>
    axiosPrivate.put(`${API_URL.JOBS.MEMBER_WORK_APPROVAL}${id}/`, data);

  fetchCompletedJobsList = (id, params) =>
    axiosPrivate.post(`${API_URL.JOBS.COMPLETED_JOB_ACTIVITY}${id}/`, params);

  jobApply = (formData) =>
    axiosPrivate.post(`${API_URL.JOBS.JOB_APPLIED}`, formData);

  //create job
  createApply = (formData) =>
    axiosPrivate.post(`${API_URL.JOBS.JOBS_LIST}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  //update job
  updateJob = (id, formData) =>
    axiosPrivate.put(`${API_URL.JOBS.JOBS_LIST}${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  //delete job
  deleteJob = (id) => axiosPrivate.delete(`${API_URL.JOBS.JOBS_LIST}${id}/`);

  fetchAgencyJobCount = () =>
    axiosPrivate.get(`${API_URL.JOBS.AGENCY_JOB_COUNT}`);

  // Get admin and creator count
  fetchCreatorJobCount = () =>
    axiosPrivate.get(`${API_URL.JOBS.CREATOR_JOB_COUNT}`);

  // Get member count
  fetcMemberJobCount = () =>
    axiosPrivate.get(`${API_URL.JOBS.MEMBER_JOB_COUNT}`);

  fetchCompanyAllJobList = (endpoint, filter) =>
    axiosPrivate.get(`${endpoint}` + setQueryParams(filter));
}

export default new JobsApiClient();
