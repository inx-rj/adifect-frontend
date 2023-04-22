import { LoadingType } from "..";
import { TableRowsType } from "../muiTable/muiTable";

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
      community: IdNameObjectType[];
      tag: IdNameObjectType[];
      status: IdNameObjectType[];
    };
  };
}
export interface IdNameObjectType {
  id: number;
  name: string;
}
export interface filterUIOptionsListType {
  name: string;
  label: string;
  options: IdNameObjectType[];
  filterType?: string;
}
