import { setQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class HomePageApiClient {
  fetchAdminDashboardInProgressJobsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.HOMEPAGE.IN_PROGRESS_JOBS_LIST}` + setQueryParams(filters)
    );

  fetchSuperAdminJobListInReviewList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.HOMEPAGE.IN_PROGRESS_JOBS_LIST}` + setQueryParams(filters)
    );

  fetchMembersJobListList = () =>
    axiosPrivate.get(`${API_URL.HOMEPAGE.MEMBERS_LATEST_JOBS}`);

  fetchMembersLatestJobListList = () =>
    axiosPrivate.get(`${API_URL.HOMEPAGE.LATEST_JOBS}`);

  fetchMembersApprovalJobsList = (currentPage) =>
    axiosPrivate.get(
      `${API_URL.HOMEPAGE.MEMBERS_APPROVAL_JOBS_LIST}` +
        setQueryParams(currentPage)
    );

  fetchDuplicateMemberAdminJobListInReview = (currentPage) =>
    axiosPrivate.get(
      `${API_URL.HOMEPAGE.MEMBERS_JOBS_LIST}` + setQueryParams(currentPage)
    );

  fetchCreatorJobsList = (filters: any) =>
    axiosPrivate.get(
      `${API_URL.HOMEPAGE.CREATOR_JOBS_LIST}` + setQueryParams(filters)
    );
}

export default new HomePageApiClient();
