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
}

export default new HomePageApiClient();
