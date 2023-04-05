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
}> = Object.freeze({
  LOGIN: `${SYSTEM.LOGIN}`,
  SIGNUP: `${SYSTEM.HOME}signup`,
  THANK_YOU: `${SYSTEM.HOME}/thank-you`,
  FORGOT_PASSWORD: `${SYSTEM.HOME}/forgot-password`,
});

// Authentication Route
export const PAGE_ROUTE: Readonly<{
  HOME: string;
  WORKFLOW: string;
  MY_PROJECTS: string;
  COMPANY: string;
  COMPANIES: string;
  MEDIA: string;
  MY_JOBS: string;
  DRAFT_JOBS: string;
  TEMPLATES: string;
  HELP: string;
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
  HELP: `${MAIN_ROUTE.HOME}`,
});

// Companies Route
export const COMPANIES_ROUTE: Readonly<{
  COMPANIES_PROJECTS: string;
  TAGS: string;
}> = Object.freeze({
  COMPANIES_PROJECTS: `${PAGE_ROUTE.HOME}company-projects`,
  TAGS: `${PAGE_ROUTE.HOME}company-project/tags`,
});

// Workflow Route
export const DASH_WORKFLOW: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.WORKFLOW}workflow`,
});

// Workflow Route
export const DASHBOARD_WORKFLOW_ROUTE: Readonly<{
  HOME: string;
  CREATE_WORKFLOW: string;
  UPDATE_WORKFLOW: string;
}> = Object.freeze({
  HOME: `${DASH_WORKFLOW.HOME}`,
  CREATE_WORKFLOW: `${DASH_WORKFLOW.HOME}add`,
  UPDATE_WORKFLOW: `${DASH_WORKFLOW.HOME}update`,
});

// My Jobs Route
export const DASH_MY_JOBS: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.MY_JOBS}`,
});

// My Jobs Route
export const DASHBOARD_MY_JOBS_ROUTE: Readonly<{
  HOME: string;
  CREATE_MY_JOB: string;
  UPDATE_MY_JOB: string;
}> = Object.freeze({
  HOME: `${DASH_MY_JOBS.HOME}list`,
  CREATE_MY_JOB: `${DASH_MY_JOBS.HOME}add`,
  UPDATE_MY_JOB: `${DASH_MY_JOBS.HOME}update`,
});

// Templates Route
export const DASHBOARD_TEMPLATES_ROUTES: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.TEMPLATES}list`,
});

// Company Route
export const DASH_COMPANY: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.COMPANY}agency/company`,
});

// Company Route
export const DASHBOARD_COMPANY_ROUTE: Readonly<{
  HOME: string;
  CREATE_COMPANY: string;
}> = Object.freeze({
  HOME: `${DASH_COMPANY.HOME}`,
  CREATE_COMPANY: `${DASH_COMPANY.HOME}add`,
});

// Help Route
export const DASH_HELP: Readonly<{
  HOME: string;
}> = Object.freeze({
  HOME: `${PAGE_ROUTE.HELP}help`,
});

// Help Route
export const DASHBOARD_HELP_ROUTE: Readonly<{
  HOME: string;
  CREATE_HELP: string;
}> = Object.freeze({
  HOME: `${DASH_HELP.HOME}`,
  CREATE_HELP: `${DASH_HELP.HOME}add`,
});

// Define Sidebar Route
export const SIDEBAR_ROUTES: SidebarRoutesTypes[] = [
  // Dashboard
  //Agency Sidebar
  {
    name: "Home",
    path: PAGE_ROUTE.HOME,
    icon: "radix-icons:dashboard",
    children: [],
  },
  {
    name: "Workflow",
    path: DASHBOARD_WORKFLOW_ROUTE.HOME,
    children: [],
    permission: [Roles.AGENCY],
  },
  { name: "My Projects", path: PAGE_ROUTE.MY_PROJECTS },
  {
    name: "Companies",
    // imgPath: "/img/Projects.png",
    path: PAGE_ROUTE.COMPANIES,
    children: [
      {
        name: "Company Projects",
        path: COMPANIES_ROUTE.COMPANIES_PROJECTS,
        children: [],
        // imgPath: "/img/tabsicon.png",
      },
      {
        name: "Tags",
        // imgPath: "/img/tabsicon.png",
        path: COMPANIES_ROUTE.TAGS,
        children: [],
      },
      // {
      //   title: "Stories Options",
      //   imgPath: "/img/tabsicon.png",
      //   path: "/company-project/stories-options",
      // },
    ],
    permission: [Roles.ADMIN, Roles.AGENCY],
  },
  {
    name: "Media",
    path: PAGE_ROUTE.MEDIA,
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "My Jobs",
    path: DASHBOARD_MY_JOBS_ROUTE.HOME,
    children: [],
    permission: [Roles.AGENCY],
  },
  // { name: "Media", imgPath: "/img/Projects.png", path: "/Media" },
  {
    name: "Draft Jobs",
    path: PAGE_ROUTE.DRAFT_JOBS,
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "Templates",
    path: DASHBOARD_TEMPLATES_ROUTES.HOME,
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "Company",
    path: DASHBOARD_COMPANY_ROUTE.HOME,
    children: [],
    permission: [Roles.AGENCY],
  },
  {
    name: "Available Jobs",
    path: DASHBOARD_MY_JOBS_ROUTE.HOME,
    permission: [Roles.CREATOR],
  },
  { name: "Help", path: DASHBOARD_HELP_ROUTE.HOME, children: [] },

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
