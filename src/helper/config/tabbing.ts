import { getMemberApprover, getUserRole } from "helper/utility/customFunctions";
import { ROLES } from "helper/config";

const userData = () => JSON.parse(localStorage.getItem("userData")) ?? "";

type ProfileTabTitleTYpe = {
  [key: string]: string;
};

interface ProfileTabHeadersType {
  id: number;
  icon: string;
  name: string;
  info: string;
  permission: number[];
}

export interface TabbingInitialType {
  tabbing: {
    user_profile: {
      active: string;
    };
    company_profile: {
      active: string;
    };
    job_details: {
      active: string;
    };
  };
}

export const profileTabTitle: ProfileTabTitleTYpe = {
  ABOUT: "About",
  COMMUNICATION: "Communication",
  COMPANIES: "Companies",
  ACCOUNT_SETTINGS: "Account Settings",
};

export const companyProfileTabTitle: ProfileTabTitleTYpe = {
  COMPANY_INFO: "Company Info",
  USERS: "Users",
  APPROVAL_WORKFLOWS: "Approval Workflows",
  JOBS: "Jobs",
  JOB_TEMPLATE: "Job Template",
  WORKFLOW: "Workflow",
  MEMBERS: "Members",
};

export const JobDetailsTabTitle: ProfileTabTitleTYpe = {
  JOB_DETAILS: "Job Details",
  ACTIVITY: "Activity",
  FILES: "Files",
  PROPOSALS: "Proposals",
  QUESTION_ANSWERS: "Question And Answers",
};

export const profileTabHeaders: ProfileTabHeadersType[] = [
  {
    id: 0,
    icon: "InfoOutlined",
    name: profileTabTitle.ABOUT,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.AGENCY, ROLES.ADMIN, ROLES.CREATOR, ROLES.MEMBER],
  },
  {
    id: 1,
    icon: "CallOutlined",
    name: profileTabTitle.COMMUNICATION,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.AGENCY, ROLES.MEMBER],
  },
  {
    id: 2,
    icon: "BusinessOutlined",
    name: profileTabTitle.COMPANIES,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.AGENCY],
  },
  {
    id: 2,
    icon: "SettingsOutlined",
    name: profileTabTitle.ACCOUNT_SETTINGS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.AGENCY, ROLES.ADMIN, ROLES.CREATOR, ROLES.MEMBER],
  },
];

export const companyProfileTabHeaders: ProfileTabHeadersType[] = [
  {
    id: 0,
    icon: "InfoOutlined",
    name: companyProfileTabTitle.COMPANY_INFO,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 1,
    icon: "PeopleAltOutlined",
    name: companyProfileTabTitle.USERS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 3,
    icon: "AccountTreeOutlined",
    name: companyProfileTabTitle.APPROVAL_WORKFLOWS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 4,
    icon: "DescriptionOutlined",
    name: companyProfileTabTitle.JOBS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      ROLES.ADMIN,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 5,
    icon: "PostAddOutlined",
    name: companyProfileTabTitle.JOB_TEMPLATE,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 6,
    icon: "AccountTreeOutlined",
    name: companyProfileTabTitle.WORKFLOW,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.ADMIN],
  },
  {
    id: 7,
    icon: "PeopleAltOutlined",
    name: companyProfileTabTitle.MEMBERS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.ADMIN],
  },
];

export const JobDetailsTabHeaders: ProfileTabHeadersType[] = [
  {
    id: 0,
    icon: "InfoOutlined",
    name: JobDetailsTabTitle.JOB_DETAILS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      ROLES.ADMIN,
      ROLES.CREATOR,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 1,
    icon: "PeopleAltOutlined",
    name: JobDetailsTabTitle.ACTIVITY,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      ROLES.ADMIN,
      ROLES.CREATOR,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 3,
    icon: "AccountTreeOutlined",
    name: JobDetailsTabTitle.FILES,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      ROLES.ADMIN,
      ROLES.CREATOR,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    id: 4,
    icon: "DescriptionOutlined",
    name: JobDetailsTabTitle.PROPOSALS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [ROLES.AGENCY, ROLES.ADMIN],
  },
  {
    id: 5,
    icon: "PostAddOutlined",
    name: JobDetailsTabTitle.QUESTION_ANSWERS,
    info: "It is a long established fact that a reader will be distracted.",
    permission: [
      ROLES.AGENCY,
      ROLES.ADMIN,
      ROLES.CREATOR,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
];
