import { LoadingType } from "..";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

export interface CompaniesInitialsType extends LoadingType {
  companyProjectsList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
  companyProjectsFilters: {
    loading: boolean;
    data: {
      community: string[];
      tag: string[];
      status: string[];
    };
  };
}

export interface filterUIOptionsListType {
  name: string;
  label: string;
  options: string[];
  filterType?: string;
}
