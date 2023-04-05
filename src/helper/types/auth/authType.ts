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

export interface UserProfileDetailsType {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  profile_title: string | null,
  profile_description: string | null,
  role: number,
  video: string | null,
  profile_img: string | null,
  profile_status: string,
  preferred_communication_mode: string,
  preferred_communication_id: string | null,
  availability: string | null,
  Portfolio_user: [],
  sub_title: string | null,
  Language: string | null,
  website: string | null,
  portfolio: [],
}
export interface AuthInitialType extends LoadingType {
  user: {
    loading: boolean;
    hasData: boolean;
    data: UserDataType;
  };
  userProfile: {
    loading: false,
    hasData: boolean;
    data: UserProfileDetailsType
  }
}

export interface appInitialType {
  persist: boolean;
  isMiniSidebar: boolean;
}
