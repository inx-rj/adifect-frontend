import { LoadingType } from "..";
import { TableRowsType } from "../muiTable/muiTable";

export interface IndustriesInitialsType extends LoadingType {
  industriesList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
}