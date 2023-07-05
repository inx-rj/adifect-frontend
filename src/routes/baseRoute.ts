import { ROLES } from "helper/config";
import { SidebarRoutesTypes } from "helper/types";
import { getMemberApprover, getUserRole } from "helper/utility/customFunctions";

const userData = () => JSON.parse(localStorage.getItem("userData")) ?? "";

export const SYSTEM: Readonly<{ LOGIN: string; HOME: string }> = Object.freeze({
  LOGIN: "/",
  HOME: "/",
});

export const MAIN_ROUTE: Readonly<{ HOME: string; HOME_DASH: string }> =
  Object.freeze({
    HOME: `${SYSTEM.HOME}`,
    HOME_DASH: `${SYSTEM.HOME}home`,
  });

// Authentication Route
export const AUTH_ROUTE: Readonly<{
  LOGIN: string;
  SIGNUP: string;
  THANK_YOU: string;
  FORGOT_PASSWORD: string;
  RESET_PASSWORD: string;
}> = Object.freeze({
  LOGIN: `${SYSTEM.LOGIN}`,
  SIGNUP: `${SYSTEM.HOME}signup`,
  THANK_YOU: `${SYSTEM.HOME}thank-you`,
  FORGOT_PASSWORD: `${SYSTEM.HOME}forgot-password`,
  RESET_PASSWORD: `${SYSTEM.HOME}reset-password/:ResetpasswordId/:userId/`,
});

// Authentication Route
export const PAGE_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${MAIN_ROUTE.HOME_DASH}`,
  WORKFLOW: `${MAIN_ROUTE.HOME}workflow`,
  MY_PROJECTS: `${MAIN_ROUTE.HOME}projects`,
  COMPANIES: `${MAIN_ROUTE.HOME}`,
  COMPANY: `${MAIN_ROUTE.HOME}company`,
  INTAKE_FORMS: `${MAIN_ROUTE.HOME}intake-forms`,
  MEDIA: `${MAIN_ROUTE.HOME}media`,
  MY_JOBS: `${MAIN_ROUTE.HOME}jobs`,
  DRAFT_JOBS: `${MAIN_ROUTE.HOME}draft-jobs`,
  TEMPLATES: `${MAIN_ROUTE.HOME}templates`,
  HELP: `${MAIN_ROUTE.HOME}help`,
  PROFILE: `${MAIN_ROUTE.HOME}profile`,
  INVITE: `${MAIN_ROUTE.HOME}invite`,
  COMPANY_PROJECTS: `${MAIN_ROUTE.HOME}company-projects`,
  INDUSTRIES: `${MAIN_ROUTE.HOME}industries`,
  SKILLS: `${MAIN_ROUTE.HOME}skills`,
  USERS: `${MAIN_ROUTE.HOME}users-list`,
});

// Workflow Route
export const WORKFLOW_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.WORKFLOW}`,
  CREATE_WORKFLOW: `${PAGE_ROUTE.WORKFLOW}/*`,
  // UPDATE_WORKFLOW: `${PAGE_ROUTE.WORKFLOW}/edit/:workflowId`,
});

// Companies Route
export const COMPANIES_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  COMPANY_PROJECTS_DETAILS: `${PAGE_ROUTE.COMPANY_PROJECTS}/:storyId`,
  TAGS: `${PAGE_ROUTE.HOME}company-project/tags`,
  COMMUNITY_SETTINGS: `${PAGE_ROUTE.HOME}company-project/community-settings`,
  PROGRAMS: `${PAGE_ROUTE.HOME}company-project/programs`,
  COPY_CODE: `${PAGE_ROUTE.HOME}company-project/copy-code`,
  CREATIVE_CODE: `${PAGE_ROUTE.HOME}company-project/creative-code`,
  AUDIENCE: `${PAGE_ROUTE.HOME}company-project/audience`,
});

//IntakeForm Route
export const INTAKE_FORMS_ROUTE: Readonly<{
  CREATE_INTAKE_FORM: string;
  EDIT_INTAKE_FORM: string;
  VIEW_INTAKE_FORM: string;
  RESPONSE_INTAKE_FORM: string;
  PUBLIC_INTAKE_FORM: string;
  [key: string]: string;
}> = Object.freeze({
  CREATE_INTAKE_FORM: `${PAGE_ROUTE.INTAKE_FORMS}/create`,
  EDIT_INTAKE_FORM: `${PAGE_ROUTE.INTAKE_FORMS}/edit/:formName`,
  VIEW_INTAKE_FORM: `${PAGE_ROUTE.INTAKE_FORMS}/view/:formName`,
  RESPONSE_INTAKE_FORM: `${PAGE_ROUTE.INTAKE_FORMS}/responses/:formName`,
  PUBLIC_INTAKE_FORM: `${PAGE_ROUTE.INTAKE_FORMS}/:formName`,
});

//Media Route
export const MEDIA_ROUTE: Readonly<{
  MEDIA_HOME: string;
}> = Object.freeze({
  MEDIA_HOME: `${PAGE_ROUTE.MEDIA}`,
});

// My Jobs Route
export const MY_JOBS_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.MY_JOBS}/list`,
  CREATE_MY_JOB: `${PAGE_ROUTE.MY_JOBS}/add`,
  UPDATE_MY_JOB: `${PAGE_ROUTE.MY_JOBS}/:jobId`,
  MY_JOB_DETAILS: `${PAGE_ROUTE.MY_JOBS}/details/:jobId`,
});

// Draft Jobs Route
export const DRAFT_JOBS_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.DRAFT_JOBS}`,
  CREATE_DRAFT_JOB: `${PAGE_ROUTE.DRAFT_JOBS}/add`,
  UPDATE_DRAFT_JOB: `${PAGE_ROUTE.DRAFT_JOBS}/:jobId`,
});

// Templates Route
export const TEMPLATES_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.TEMPLATES}/list`,
  UPDATE_TEMPLATE: `${PAGE_ROUTE.TEMPLATES}/:templateId`,
});

// Company Route
export const COMPANY_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  COMPANY_LIST_DETAILS: `${PAGE_ROUTE.COMPANY}/*`,
  // ADMIN_COMPANY_LIST_DETAILS: `${PAGE_ROUTE.COMPANY}/:companyId/:agencyId`,
  // CREATE_COMPANY: `${PAGE_ROUTE.COMPANY}/add`,
});

// Help Route
export const HELP_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.HELP}`,
  CREATE_HELP: `${PAGE_ROUTE.HELP}/add`,
  VIEW_HELP: `${PAGE_ROUTE.HELP}/view-message/:helpChatId`
});

// Define Sidebar Route
export const SIDEBAR_ROUTES: SidebarRoutesTypes[] = [
  // Dashboard
  //Agency Sidebar
  {
    name: "Home",
    path: PAGE_ROUTE.HOME,
    icon: "HomeOutlined",
    children: [],
    permission: [], // Empty means it has all role access
  },
  {
    name: "Workflow",
    path: WORKFLOW_ROUTE.HOME,
    icon: "GridViewOutlined",
    children: [],
    permission: [
      ROLES.ADMIN,
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "My Projects",
    path: PAGE_ROUTE.MY_PROJECTS,
    icon: "StickyNote2Outlined",
    permission: [
      ROLES.CREATOR,
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Companies",
    path: PAGE_ROUTE.COMPANIES,
    icon: "DescriptionOutlined",
    children: [
      {
        name: "Company Projects",
        path: PAGE_ROUTE.COMPANY_PROJECTS,
        children: [],
      },
      {
        name: "Tags",
        path: COMPANIES_ROUTE.TAGS,
        children: [],
      },
      {
        name: "Community Settings",
        path: COMPANIES_ROUTE.COMMUNITY_SETTINGS,
        children: [],
      },
      {
        name: "Programs",
        path: COMPANIES_ROUTE.PROGRAMS,
        children: [],
      },
      {
        name: "Copy Code",
        path: COMPANIES_ROUTE.COPY_CODE,
        children: [],
      },
      {
        name: "Creative Code",
        path: COMPANIES_ROUTE.CREATIVE_CODE,
        children: [],
      },
      {
        name: "Audience",
        path: COMPANIES_ROUTE.AUDIENCE,
        children: [],
      },
      // {
      //   title: "Stories Options",
      //   imgPath: "/img/tabsicon.png",
      //   path: "/company-project/stories-options",
      // },
    ],
    permission: [ROLES.ADMIN, ROLES.AGENCY],
  },
  {
    name: "Intake Forms",
    path: PAGE_ROUTE.INTAKE_FORMS,
    icon: "DescriptionOutlined",
    children: [],
    permission: [
      ROLES.ADMIN,
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Media",
    path: PAGE_ROUTE.MEDIA,
    icon: "MovieOutlined",
    children: [],
    permission: [
      ROLES.ADMIN,
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "BusinessCenterOutlined",
    children: [],
    permission: [ROLES.ADMIN],
  },
  {
    name: "My Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "BusinessCenterOutlined",
    children: [],
    permission: [
      ROLES.AGENCY,
      ROLES.MEMBER,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Industries",
    path: PAGE_ROUTE.INDUSTRIES,
    icon: "LocationCityOutlined",
    children: [],
    permission: [ROLES.ADMIN],
  },
  {
    name: "Skills",
    path: PAGE_ROUTE.SKILLS,
    icon: "DrawOutlined",
    children: [],
    permission: [ROLES.ADMIN],
  },
  {
    name: "Users",
    path: PAGE_ROUTE.USERS,
    icon: "Groups2Outlined",
    children: [],
    permission: [ROLES.ADMIN],
  },
  {
    name: "Draft Jobs",
    path: PAGE_ROUTE.DRAFT_JOBS,
    icon: "CardTravelOutlined",
    children: [],
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Templates",
    path: TEMPLATES_ROUTE.HOME,
    icon: "ReceiptLongOutlined",
    children: [],
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Available Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "CardTravelOutlined",
    permission: [ROLES.CREATOR],
  },
  {
    name: "Companies",
    path: PAGE_ROUTE.COMPANY,
    icon: "ApartmentOutlined",
    children: [],
    permission: [
      ROLES.ADMIN,
      getMemberApprover(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Company",
    path: PAGE_ROUTE.COMPANY,
    icon: "ApartmentOutlined",
    children: [],
    permission: [
      ROLES.AGENCY,
      getUserRole(userData()?.user?.role, userData()?.user?.user_level),
    ],
  },
  {
    name: "Help",
    path: HELP_ROUTE.HOME,
    icon: "HelpOutlineOutlined",
    children: [],
    permission:[]
  },

  // Agency and admin
  // {
  //   name: "Earnings",
  //   imgPath: "/img/Earnings_old.png",
  //   path: "/earnings",
  // },
  // { name: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
  // {
  //   name: "Transactions",
  //   imgPath: "/img/Transactions.png",
  //   path: "/transactions",
  // },

  // Admin
  // { name: "Levels", imgPath: "/img/lavel.png", path: "/levels/list" },
  // {
  //   name: "Categories",
  //   imgPath: "/img/category.png",
  //   path: "/categories/list",
  // },
  // { name: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
];
