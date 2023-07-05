import { AppDispatch } from "redux/store";
import CommonApiClient from "services/common/CommonApiClient";
import { SET_CHANNEL_DATA, SET_CHANNEL_LOADING } from "redux/reducers/common/channel.slice";


// Get Notifications List
const TRIGGER_CHANNEL_LIST =
  () =>
    async (dispatch: AppDispatch) => {
      dispatch(SET_CHANNEL_LOADING(true));
      await CommonApiClient.fetchChannelList().then(
        (response) => {
          dispatch(SET_CHANNEL_DATA(response?.data?.data));
          dispatch(SET_CHANNEL_LOADING(false));
        }
      );
    };

export { TRIGGER_CHANNEL_LIST }