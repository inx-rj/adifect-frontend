import axiosPrivate from "../../api/axios";
import { Roles } from "helper/config";
import { setNotificationQueryParams } from "helper/utility/customFunctions";
import { API_URL } from "../../helper/env";

class CommonApiClient {
  // Fetch all notification
  fetchAllNotifications = (filters, userRole) => {
    if (userRole === Roles?.MEMBER) {
      return axiosPrivate.get(
        `${API_URL.NOTIFICATION.MEMBER_NOTIFICATION}` + setNotificationQueryParams(filters)
      );
    } else {
      return axiosPrivate.get(
        `${API_URL.NOTIFICATION.AGENCY_NOTIFICATION}` + setNotificationQueryParams(filters)
      );
    }
  }

  // get all channel list
  fetchChannelList = () =>
    axiosPrivate.get(API_URL.COMPANIES.CHANNEL);

}
export default new CommonApiClient();
