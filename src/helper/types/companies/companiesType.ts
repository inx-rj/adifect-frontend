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
  storyDetailsList: {
    loading: boolean;
    data: TableRowsType;
  };
}
export interface IdNameObjectType {
  [key: string]: any;
}
export interface filterUIOptionsListType {
  name: string;
  label?: string;
  placeholder?: string;
  options: IdNameObjectType[];
  valueAs?: string;
  labelAs?: string;
  filterType?: string;
}
