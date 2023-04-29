import { AppDispatch } from "redux/store";
import { initialTableConfigInterface } from "helper/types/common/table";
import { SET_COMMUNITY_SETTINGS_DATA } from "redux/reducers/companies/communitySettings.slice";
import CommunitySettingsApiClient from "services/companies/CommunitySettingsApiClient";

// Get Community Settings List
const GET_COMMUNITY_SETTINGS_LIST =
  (tableConfig: initialTableConfigInterface) =>
  async (dispatch: AppDispatch) => {
    await CommunitySettingsApiClient.fetchCommunitySettingsList(
      tableConfig
    ).then((response) => {
      dispatch(SET_COMMUNITY_SETTINGS_DATA(response?.data?.data));
    });
  };

// Common auth Config
export { GET_COMMUNITY_SETTINGS_LIST };
