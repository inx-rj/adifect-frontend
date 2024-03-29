import { LoadingType } from "../../types";

export interface UserDataType {
  user_id: number;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  role: number;
  user_level: number;
}

export interface UserPortfolioType {
  id: number;
  portfolio_images: string;
  user: number;
}
export interface UserProfileDetailsType {
  id?: number;
  email?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  profile_title?: string | null;
  profile_description?: string | null;
  role?: number;
  video?: [];
  remove_video?: string;
  profile_img?: string | null;
  remove_image?: string | number;
  profile_status?: string;
  preferred_communication_mode?: string;
  preferred_communication_id?: string | null;
  availability?: string | null;
  Portfolio_user?: UserPortfolioType[];
  user_level?: number;
  sub_title?: string | null;
  Language?: string | null;
  website?: string | null;
  portfolio?: File[] | any;
  remove_portfolio?: File[] | any;
  skills?: { id: number | string; name: string }[];
  username?: string | null;
  profile_changed?: string | null;
}

export interface profileKeyValueType {
  name: string;
  value?: string | null | number | File | Blob;
}
export interface AuthInitialType extends LoadingType {
  user: {
    loading: boolean;
    hasData: boolean;
    data: {
      message: string;
      refresh: string;
      token: string;
      user: UserDataType;
    };
  };
  userProfile: {
    loading: false;
    hasData: UserProfileDetailsType;
    data: UserProfileDetailsType;
  };
}

export interface appInitialType {
  persist: boolean;
  isMiniSidebar: boolean;
  headerCompany: number | null;
  headerCompanyName: string | null;
}
