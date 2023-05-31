import { LoadingType } from "..";
import { TableRowsType } from "../muiTable/muiTable";

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
  singleCompany: {
    loading: boolean;
    data: TableRowsType;
  };
}

export interface singleCompanyPayloadData {
  name?: string,
  description?: string,
  is_active?: boolean,
  company_id?: number
  status?: boolean,
  agency?: number
  company_email?: string,
  company_phone_number?: string,
  company_website?: string,
  industry?: number,
}
