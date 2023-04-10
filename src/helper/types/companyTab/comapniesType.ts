import { LoadingType } from "..";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

export interface CompanyListInitialsType extends LoadingType {
  companyList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
}