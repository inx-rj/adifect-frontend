import { LoadingType } from "..";
import { TableDataResponseType } from "../muiTable/muiTable";

export interface ProgramsInitialType extends LoadingType {
  programsList: {
    loading: boolean;
    data: TableDataResponseType;
  };
  response: {
    add: null | string;
    update: null | string;
    delete: null | string;
  };
}
