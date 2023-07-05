import { LoadingType } from "..";
import { TableRowsType } from "../muiTable/muiTable";

export interface CompaniesTagsInitialsType extends LoadingType {
  companyProjectsTagsList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
  response: {
    add: null;
    update: null;
    remove: null;
    addNew: null;
  };
}

export interface tagPayloadDataType {
  community: number | undefined;
  title: string;
  description: string;
}
