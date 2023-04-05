import { lazy, Suspense } from "react";
import { RouteType, SidebarRoutesTypes } from "../helper/types";
import {
  AUTH_ROUTE,
  DASHBOARD_COMPANIES_ROUTE,
  DASHBOARD_COMPANY_ROUTE,
  DASHBOARD_HELP_ROUTE,
  DASHBOARD_MY_JOBS_ROUTE,
  DASHBOARD_TEMPLATES_ROUTES,
  DASHBOARD_WORKFLOW_ROUTE,
  MAIN_ROUTE,
  PAGE_ROUTE,
} from "./baseRoute";
import { Roles } from "helper/config";

// Import lazy load component
const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));
const Thankyou = lazy(() => import("components/auth/Thankyou"));
const ForgotPassword = lazy(() => import("components/auth/ForgotPassword"));

// Define Authentication Route
export const AUTH_ROUTES: RouteType[] = [
  {
    path: AUTH_ROUTE.LOGIN,
    component: (
      <Suspense fallback={""}>
        <Login />
      </Suspense>
    ),
    permission: [],
  },
  {
    path: AUTH_ROUTE.SIGNUP,
    component: (
      <Suspense fallback={""}>
        <Signup />
      </Suspense>
    ),
    permission: [],
  },
  {
    path: AUTH_ROUTE.THANK_YOU,
    component: (
      <Suspense fallback={""}>
        <Thankyou />
      </Suspense>
    ),
    permission: [],
  },
  {
    path: AUTH_ROUTE.FORGOT_PASSWORD,
    component: (
      <Suspense fallback={""}>
        <ForgotPassword />
      </Suspense>
    ),
    permission: [],
  },
];

// Define Sidebar Route
export const SIDEBAR_ROUTES: SidebarRoutesTypes[] = [
  // Dashboard
  //Agency Sidebar
  {
    name: "Dashboard",
    path: PAGE_ROUTE.DASHBOARD,
    icon: "radix-icons:dashboard",
    children: [],
  },
  {
    name: "Workflow",
    path: DASHBOARD_WORKFLOW_ROUTE.HOME,
    children: [],
  },
  {
    name: "Companies",
    // imgPath: "/img/Projects.png",
    path: DASHBOARD_COMPANIES_ROUTE.HOME,
    children: [
      {
        name: "Company Projects",
        path: DASHBOARD_COMPANIES_ROUTE.COMPANIES_PROJECTS,
        children: [],
        // imgPath: "/img/tabsicon.png",
      },
      {
        name: "Tags",
        // imgPath: "/img/tabsicon.png",
        path: DASHBOARD_COMPANIES_ROUTE.TAGS,
        children: [],
      },
      // {
      //   title: "Stories Options",
      //   imgPath: "/img/tabsicon.png",
      //   path: "/company-project/stories-options",
      // },
    ],
  },
  {
    name: "Media",
    path: PAGE_ROUTE.MEDIA,
    children: [],
  },
  { name: "My Jobs", path: DASHBOARD_MY_JOBS_ROUTE.HOME, children: [] },
  // { name: "Media", imgPath: "/img/Projects.png", path: "/Media" },
  {
    name: "Draft Jobs",
    path: PAGE_ROUTE.DRAFT_JOBS,
    children: [],
  },
  {
    name: "Templates",
    path: DASHBOARD_TEMPLATES_ROUTES.HOME,
    children: [],
  },
  {
    name: "Company",
    path: DASHBOARD_COMPANY_ROUTE.HOME,
    children: [],
  },
  { name: "Help", path: DASHBOARD_HELP_ROUTE.HOME, children: [] },

  //Agency Member - ADMIN Sidebar
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

// Define Authentication Route
export const PAGES_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.DASHBOARD,
    component: (
      <Suspense fallback={""}>
        <p>Home Dashboard</p>
      </Suspense>
    ),
    permission: [],
  },
];
