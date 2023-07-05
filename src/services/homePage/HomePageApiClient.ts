import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class HomePageApiClient {
  fetchAdminDashboardInProgressJobsList = (
    endpoint: string,
    filters: any,
    orderingFilter?: any
  ) => {
    if (orderingFilter === "" || orderingFilter === undefined) {
      return axiosPrivate.get(`${endpoint}` + setQueryParams(filters));
    } else {
      return axiosPrivate.get(
        `${endpoint}` + setQueryParams(filters) + `&${orderingFilter}`
      );
    }
  };

  fetchSuperAdminJobListInReviewList = (filters: any) =>
    axiosPrivate.get(`${API_URL.JOBS.JOBS_LIST}` + setQueryParams(filters));

  fetchMembersJobListList = () =>
    axiosPrivate.get(`${API_URL.JOBS.MEMBERS_LATEST_JOBS}`);

  fetchMembersLatestJobListList = (endpoint) => axiosPrivate.get(`${endpoint}`);

  fetchMembersApprovalJobsList = (currentPage) =>
    axiosPrivate.get(
      `${API_URL.JOBS.MEMBERS_APPROVAL_JOBS_LIST}` + setQueryParams(currentPage)
    );

  fetchDuplicateMemberAdminJobListInReview = (data) =>
    axiosPrivate.get(
      `${API_URL.JOBS.MEMBERS_JOBS_LIST}?company=${data?.id}&job_applied__status=${data?.status}&ordering=${data?.ordering}&page=${data?.page}`
    );

  fetchCreatorJobsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.JOBS.CREATOR_JOBS_LIST}` + setQueryParams(filters)
    );
}

export default new HomePageApiClient();
