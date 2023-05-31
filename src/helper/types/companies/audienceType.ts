import { LoadingType } from "..";
import { TableDataResponseType } from "../muiTable/muiTable";

export interface AudienceInitialType extends LoadingType {
  audienceList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  communityAudienceList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  response: {
    add: null | string;
    update: null | string;
    delete: null | string;
  };
}
