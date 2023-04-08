import Roles from "./Roles";

export const profileNavTitle = {
  ABOUT: 'About',
  COMMUNICATION: 'Communication',
  COMPANIES: 'Companies',
  ACCOUNT_SETTINGS: 'Account Settings',
};

export const profileNavigation = [
  {
    id:0,
    icon: 'InfoOutlined',
    iconSize: 28,
    name: profileNavTitle.ABOUT,
    info: 'It is a long established fact that a reader will be distracted.',
    url: "/",
    permission: Roles.AGENCY
  },
  {
    id:1,
    icon: 'CallOutlined',
    iconSize: 28,
    name: profileNavTitle.COMMUNICATION,
    info: 'It is a long established fact that a reader will be distracted.',
    url: "/",
    permission: Roles.AGENCY
  },
  {
    id:2,
    icon: 'BusinessOutlined',
    iconSize: 20,
    name: profileNavTitle.COMPANIES,
    info: 'It is a long established fact that a reader will be distracted.',
    url: "/",
    permission: Roles.AGENCY
  },
  {
    id:2,
    icon: 'SettingsOutlined',
    iconSize: 20,
    name: profileNavTitle.ACCOUNT_SETTINGS,
    info: 'It is a long established fact that a reader will be distracted.',
    url: "/",
    permission: Roles.AGENCY
  }
];

// Todo - Need to remove old route for leave settings page
