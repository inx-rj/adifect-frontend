import { LoadingType } from "..";
import { TableDataResponseType } from "../muiTable/muiTable";

export interface CreativeCodeInitialType extends LoadingType {
  creativeCodeList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  response: {
    add: null | string;
    update: null | string;
    delete: null | string;
  };
}
