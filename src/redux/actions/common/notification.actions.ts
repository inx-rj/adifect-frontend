import { AppDispatch } from "redux/store";
import CommonApiClient from "services/common/CommonApiClient";
import { initialNotificationQueryInterface } from "helper/types/common/notification";
import { SET_NOTIFICATION_DATA } from "redux/reducers/common/notification.slice";


// Get Notifications List
const GET_NOTIFICATIONS_LIST =
  (id, offsetid, companyId, userRole) =>
  async (dispatch: AppDispatch) => {
    const filters = {id, offsetid}
    console.log("filters", companyId);
    await CommonApiClient.fetchAllNotifications(filters, userRole).then(
      (response) => {
        console.log("Notification data", response?.data);
        
        dispatch(SET_NOTIFICATION_DATA(response?.data));
      }
    );
  };

export {GET_NOTIFICATIONS_LIST}