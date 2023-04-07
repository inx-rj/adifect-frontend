import { Roles } from "helper/config";
import { setNotificationQueryParams } from "helper/utility/customFunctions";
import axiosPrivate from "../../api/axios";
import { API_URL } from "../../helper/env";

class CommonApiClient {
  // Fetch all notification

    fetchAllNotifications = (filters, userRole) =>
    axiosPrivate.get(
      `${API_URL.NOTIFICATION.AGENCY_NOTIFICATION}` + setNotificationQueryParams(filters)
    );
  //   {if(userRole === Roles?.MEMBER){
  //   if (filters?.companyId && filters?.companyId !== null && filters?.companyId !== "null") {
  //     return axiosPrivate.get(
  //       `${API_URL.NOTIFICATION.MEMBER_NOTIFICATION}` + setNotificationQueryParams(filters)
  //     );
  //   } else {
  //     return axiosPrivate.get(
  //       `${API_URL.NOTIFICATION.MEMBER_NOTIFICATION}` + setNotificationQueryParams(filters)
  //     );
  //   }
  // }else {
  //   if (filters?.companyId && filters?.companyId !== null && filters?.companyId !== "null") {
  //     return axiosPrivate.get(
  //       `${API_URL.NOTIFICATION.AGENCY_NOTIFICATION}` + setNotificationQueryParams(filters)
  //     );
  //   } else {
  //     return axiosPrivate.get(
  //       `${API_URL.NOTIFICATION.AGENCY_NOTIFICATION}` + setNotificationQueryParams(filters)
  //     );
  //   }
  // }}

}
export default new CommonApiClient();
