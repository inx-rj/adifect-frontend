import { LoadingType } from "..";
import { TableDataResponseType, TableRowsType } from "../muiTable/muiTable";
import { IdNameObjectType } from "./companiesType";

export interface CommunitySettingsInitialType extends LoadingType {
  communitySettingsList: {
    loading: boolean;
    data: TableDataResponseType;
  };
}
