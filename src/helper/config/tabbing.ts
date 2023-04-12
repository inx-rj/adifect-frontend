import Roles from "./Roles";

type ProfileTabTitleTYpe = {
  [key: string]: string
}

interface ProfileTabHeadersType {
  id: number,
  icon: string,
  name: string,
  info: string,
  permission: number[]
}

export interface TabbingInitialType {
  tabbing: {
    user_profile: {
      active: string
    },
    company_profile: {
      active: string
    }
  }
}

export const profileTabTitle: ProfileTabTitleTYpe = {
  ABOUT: 'About',
  COMMUNICATION: 'Communication',
  COMPANIES: 'Companies',
  ACCOUNT_SETTINGS: 'Account Settings',
};

export const profileTabHeaders: ProfileTabHeadersType[] = [
  {
    id: 0,
    icon: 'InfoOutlined',
    name: profileTabTitle.ABOUT,
    info: 'It is a long established fact that a reader will be distracted.',
    permission: [Roles.AGENCY, Roles.ADMIN, Roles.CREATOR, Roles.MEMBER]
  },
  {
    id: 1,
    icon: 'CallOutlined',
    name: profileTabTitle.COMMUNICATION,
    info: 'It is a long established fact that a reader will be distracted.',
    permission: [Roles.AGENCY, Roles.MEMBER]
  },
  {
    id: 2,
    icon: 'BusinessOutlined',
    name: profileTabTitle.COMPANIES,
    info: 'It is a long established fact that a reader will be distracted.',
    permission: [Roles.AGENCY]
  },
  {
    id: 2,
    icon: 'SettingsOutlined',
    name: profileTabTitle.ACCOUNT_SETTINGS,
    info: 'It is a long established fact that a reader will be distracted.',
    permission: [Roles.AGENCY, Roles.ADMIN, Roles.CREATOR, Roles.MEMBER]
  }
];

// Todo - Need to remove old route for leave settings page
