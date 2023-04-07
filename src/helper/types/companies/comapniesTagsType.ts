import { LoadingType } from "..";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

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
}


export interface tagPayloadDataType {
  community: number | undefined,
  title: string,
  description: string,
}

