import { LoadingType } from "..";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

export interface WorkFlowMainDetailsType {
  loading: boolean;
  details: {
    id: number;
    assigned_job: boolean;
    company_name: string;
    created: string;
    modified: string;
    is_trashed: boolean;
    name: string;
    is_active: boolean;
    is_blocked: boolean;
    agency: number;
    company: number;
  };
}

export interface WorkFlowInitialsType extends LoadingType {
  workFlowList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
  workFlowMainDetails: WorkFlowMainDetailsType;
  workFlowStageDetails: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
}
