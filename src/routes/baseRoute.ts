import { Roles } from "helper/config";
import { SidebarRoutesTypes } from "helper/types";

export const SYSTEM: Readonly<{ LOGIN: string; HOME: string }> = Object.freeze({
  LOGIN: "/login",
  HOME: "/",
});

export const MAIN_ROUTE: Readonly<{ HOME: string }> = Object.freeze({
  HOME: `${SYSTEM.HOME}`,
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
  HOME: `${MAIN_ROUTE.HOME}`,
  WORKFLOW: `${MAIN_ROUTE.HOME}workflow`,
  MY_PROJECTS: `${MAIN_ROUTE.HOME}projects`,
  COMPANIES: `${MAIN_ROUTE.HOME}`,
  COMPANY: `${MAIN_ROUTE.HOME}company`,
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
  USERS: `${MAIN_ROUTE.HOME}users`,
});

// Workflow Route
export const WORKFLOW_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.WORKFLOW}`,
  CREATE_WORKFLOW: `${PAGE_ROUTE.WORKFLOW}/add`,
  UPDATE_WORKFLOW: `${PAGE_ROUTE.WORKFLOW}/edit/:workflowId`,
});

// Companies Route
export const COMPANIES_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  COMPANY_PROJECTS_DETAILS: `${PAGE_ROUTE.COMPANY_PROJECTS}/:communityId`,
  TAGS: `${PAGE_ROUTE.HOME}company-project/tags`,
});

// My Jobs Route
export const MY_JOBS_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.MY_JOBS}/list`,
  CREATE_MY_JOB: `${PAGE_ROUTE.MY_JOBS}/add`,
  UPDATE_MY_JOB: `${PAGE_ROUTE.MY_JOBS}/update`,
});

// Templates Route
export const TEMPLATES_ROUTES: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.TEMPLATES}/list`,
});

// Company Route
export const COMPANY_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  COMPANY_LIST_DETAILS: `${PAGE_ROUTE.COMPANY}/:companyId`,
  CREATE_COMPANY: `${PAGE_ROUTE.COMPANY}/add`,
});

// Help Route
export const HELP_ROUTE: Readonly<{
  [key: string]: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.HELP}`,
  CREATE_HELP: `${PAGE_ROUTE.HELP}/add`,
});

// Define Sidebar Route
export const SIDEBAR_ROUTES: SidebarRoutesTypes[] = [
  // Dashboard
  //Agency Sidebar
  {
    name: "Home",
    path: PAGE_ROUTE.HOME,
    icon: "HomeOutlined",
    children: [], // Empty means it has all role access
  },
  {
    name: "Workflow",
    path: WORKFLOW_ROUTE.HOME,
    icon: "GridViewOutlined",
    children: [],
    permission: [Roles.ADMIN, Roles.AGENCY],
  },
  {
    name: "My Projects",
    path: PAGE_ROUTE.MY_PROJECTS,
    icon: "StickyNote2Outlined",
    permission: [Roles.CREATOR, Roles.AGENCY],
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
      // {
      //   title: "Stories Options",
      //   imgPath: "/img/tabsicon.png",
      //   path: "/company-project/stories-options",
      // },
    ],
    permission: [Roles.AGENCY],
  },
  {
    name: "Media",
    path: PAGE_ROUTE.MEDIA,
    icon: "MovieOutlined",
    children: [],
    permission: [Roles.ADMIN, Roles.AGENCY],
  },
  {
    name: "Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "BusinessCenterOutlined",
    children: [],
    permission: [Roles.ADMIN],
  },
  {
    name: "My Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "BusinessCenterOutlined",
    children: [],
    permission: [Roles.AGENCY, Roles.ADMIN, Roles.MEMBER],
  },
  {
    name: "Industries",
    path: PAGE_ROUTE.INDUSTRIES,
    icon: "LocationCityOutlined",
    children: [],
    permission: [Roles.ADMIN],
  },
  {
    name: "Skills",
    path: PAGE_ROUTE.SKILLS,
    icon: "DrawOutlined",
    children: [],
    permission: [Roles.ADMIN],
  },
  {
    name: "Users",
    path: PAGE_ROUTE.SKILLS,
    icon: "Groups2Outlined",
    children: [],
    permission: [Roles.ADMIN],
  },
  {
    name: "Draft Jobs",
    path: PAGE_ROUTE.DRAFT_JOBS,
    icon: "CardTravelOutlined",
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "Templates",
    path: TEMPLATES_ROUTES.HOME,
    icon: "ReceiptLongOutlined",
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "Company",
    path: PAGE_ROUTE.COMPANY,
    icon: "ApartmentOutlined",
    children: [],
    permission: [Roles.ADMIN, Roles.AGENCY],
  },
  {
    name: "Available Jobs",
    path: MY_JOBS_ROUTE.HOME,
    icon: "CardTravelOutlined",
    permission: [Roles.CREATOR],
  },
  {
    name: "Help",
    path: HELP_ROUTE.HOME,
    icon: "HelpOutlineOutlined",
    children: [],
  },

  //Agency Member - ADMIN Sidebar
  // { name: "Home", path: "/home" },
  // {
  //   name: "Workflow",
  //   path: "/workflow",
  // },
  // {
  //   name: "Media",
  //   path: "/member-media",
  // },
  // { name: "My Jobs", path: "/jobs/list" },
  // // { name: "Media", imgPath: "/img/Projects.png", path: "/Media" },
  // {
  //   name: "Draft Jobs",
  //   path: "/member-draft-jobs/",
  // },
  // {
  //   name: "Templates",
  //   path: "/member-templates/list",
  // },
  // {
  //   name: "Company",
  //   path: "/member/company",
  // },
  // { name: "Help", path: "/help" },

  // //Agency Member - MARKETER Sidebar
  // { name: "Home", path: "/home" },
  // {
  //   name: "Workflow",
  //   path: "/workflow",
  // },
  // { name: "My Projects", path: "/projects" },
  // {
  //   name: "Media",
  //   path: "/member-media",
  // },
  // { name: "My Jobs", path: "/jobs/list" },
  // {
  //   name: "Templates",
  //   path: "/member-templates/list",
  // },
  // {
  //   name: "Company",
  //   path: "/member/company",
  // },
  // { name: "Help", path: "/help" },

  // //Agency Member - APPROVER Sidebar

  // { name: "Home", path: "/home" },
  // {
  //   name: "Media",
  //   path: "/member-media",
  // },
  // { name: "My Jobs", path: "/jobs/list" },
  // {
  //   name: "Company",
  //   path: "/member/company",
  // },
  // { name: "Help", path: "/help" },

  // //Agency Member - IN-HOUSE DESIGNER Sidebar
  // { name: "Home", path: "/home" },
  // {
  //   name: "Media",
  //   path: "/member-media",
  // },
  // { name: "My Projects", path: "/projects" },
  // { name: "My Jobs", path: "/jobs/list" },
  // { name: "Help", path: "/help" },
];
