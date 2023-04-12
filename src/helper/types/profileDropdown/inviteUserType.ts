import { LoadingType } from "../../types";
import { TableRowsType } from "../muiCustomTable/muiCustomTable";

export interface paginationData {
  page: number,
  rowsPerPage: number,
}

export interface inviteUserPayloadData {
  levels: "" | 1 | 2 | 3 | 4;
  email: string,
  company: "" | number,
}


// export interface InviteUserListDataType {
//   id: number;
//   user_id: number;
//   user_name: string;
//   user_email: string
//   user_image: string;
//   user_first_name: string;
//   user_last_name: string;
//   level: number;
//   company_name: string;
//   user_full_name: string;
//   created: string;
//   modified: string;
//   is_trashed: boolean;
//   status: 0 | 1;
//   email?: string;
//   is_blocked: boolean;
//   is_modified: boolean;
//   is_inactive: boolean;
//   agency: number;
//   user: number;
//   company: number;
// }

export interface InvitedUserDataType {
  count: number,
  results: TableRowsType[];
}

// export interface CompaniesListDataType {
//   // agency: number;
//   // agency_name: string;
//   // company_email: null | string;
//   // company_id: number;
//   // company_phone_number: null | string;
//   // company_profile_img: null | string;
//   // company_type: number;
//   // company_website: null;
//   // created: string;
//   // created_by: number;
//   // description: string;
//   // id: number;
//   // industry: null | string;
//   // industry_name: string;
//   // is_active: boolean;
//   // is_assigned_workflow: boolean;
//   // is_blocked: boolean;
//   // is_trashed: boolean;
//   // modified: string;
//   // name: string;
// }

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
}

