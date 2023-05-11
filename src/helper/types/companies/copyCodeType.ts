import { LoadingType } from "..";
import { TableDataResponseType } from "../muiTable/muiTable";

export interface CopyCodeInitialType extends LoadingType {
  copyCodeList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  response: {
    add: null | string;
    update: null | string;
    delete: null | string;
  };
}
