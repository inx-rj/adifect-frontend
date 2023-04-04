import { LoadingType } from "../../types";

export interface UserDataType {
  user_id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  role: number | string;
  user_level: number;
}
export interface AuthInitialType extends LoadingType {
  user: {
    loading: boolean;
    hasData: boolean;
    data: UserDataType;
  };
}
