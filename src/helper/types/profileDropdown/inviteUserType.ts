import { LoadingType } from "../../types";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

export interface inviteUserPayloadData {
  levels: "" | 1 | 2 | 3 | 4;
  email: string;
  company: "" | number;
}

export interface InviteUserInitialType extends LoadingType {
  inviteUserList: {
    loading: boolean;
    data: {
      count: number;
      prev: null | string;
      next: null | string;
      results: TableRowsType[];
    };
  };
  inviteMembersList: {
    loading: boolean;
    data: TableRowsType[];
  };
}
