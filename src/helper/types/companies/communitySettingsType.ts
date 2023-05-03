import { LoadingType } from "..";
import { TableDataResponseType } from "../muiTable/muiTable";

export interface CommunitySettingsInitialType extends LoadingType {
  communitySettingsList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  response: {
    add: null | string;
    update: null | string;
    delete: null | string;
  };
}
