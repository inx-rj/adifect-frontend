import React, { lazy, Suspense } from "react";
import { RouteType } from "../helper/types";
import {
  AUTH_ROUTE,
  COMPANIES_ROUTE,
  COMPANY_ROUTE,
  MY_JOBS_ROUTE,
  PAGE_ROUTE,
  WORKFLOW_ROUTE,
} from "./baseRoute";

// ---------------------------- Import lazy load component ----------------------------

// => Auth pages
const Login = lazy(() => import("components/auth/Login"));
const Signup = lazy(() => import("components/auth/Signup"));
const Thankyou = lazy(() => import("components/auth/Thankyou"));
const ForgotPassword = lazy(() => import("components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("components/auth/ResetPassword"));

// ==> Header Pages

// Profile dropdown pages
const Profile = lazy(
  () => import("components/ProfileDropdown/profile/Profile")
);

// Invite Pages and Components
const InviteUser = lazy(
  () => import("components/ProfileDropdown/invite/InviteUser")
);

// ==> Sidebar pages

// Home Pages and Components
const HomePage = lazy(() => import("pages/dashboard/home/HomePage"));

// Workflow Pages and Components
const WorkFlowList = lazy(
  () => import("components/pages/workflow/WorkFlowList")
);
const ApprovalWorkflow = lazy(
  () => import("components/pages/workflow/ApprovalWorkflow")
);

// Company Projects(Communities) Pages and Components
const AgencyCompanyProjects = lazy(
  () => import("components/pages/agency/companyProjects/AgencyCompanyProjects")
);
const AgencyCompanyProjectsDetails = lazy(
  () =>
    import(
      "components/pages/agency/companyProjects/AgencyCompanyProjectsDetails"
    )
);
const AgencyCompanyProjectsTags = lazy(
  () =>
    import("components/pages/agency/companyProjects/AgencyCompanyProjectsTags")
);

// Jobs Pages and Components
const AdminJobsList = lazy(() => import("components/pages/jobs/AdminJobsList"));
const AdminJobsAddEdit = lazy(
  () => import("components/pages/jobs/adminJobs/AdminJobsAddEdit")
);

// Company Pages and Components
const AgencyCompanyList = lazy(
  () => import("components/pages/agency/companyTab/AgencyCompanyList")
);
const AgencyCompanyProfile = lazy(
  () => import("components/pages/companyProfile/AgencyCompanyProfile")
);

// ---------------------------- Define main pages routes ----------------------------

// => Authentication Route
export const AUTH_ROUTES: RouteType[] = [
  {
    path: AUTH_ROUTE.LOGIN,
    component: (
      <Suspense fallback={""}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: AUTH_ROUTE.SIGNUP,
    component: (
      <Suspense fallback={""}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: AUTH_ROUTE.THANK_YOU,
    component: (
      <Suspense fallback={""}>
        <Thankyou />
      </Suspense>
    ),
  },
  {
    path: AUTH_ROUTE.FORGOT_PASSWORD,
    component: (
      <Suspense fallback={""}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: AUTH_ROUTE.RESET_PASSWORD,
    component: (
      <Suspense fallback={""}>
        <ResetPassword />
      </Suspense>
    ),
  },
];

// => Header Dropdown Pages Route
export const HEADER_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.INVITE,
    component: (
      <Suspense fallback={""}>
        <InviteUser />
      </Suspense>
    ),
  },
  {
    path: PAGE_ROUTE.PROFILE,
    component: (
      <Suspense fallback={""}>
        <Profile />
      </Suspense>
    ),
  },
];

// => Tabs/Pages Wise Route
export const PAGES_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.HOME,
    component: (
      <Suspense fallback={""}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: WORKFLOW_ROUTE.HOME,
    component: (
      <Suspense fallback={""}>
        <WorkFlowList />
      </Suspense>
    ),
  },
  {
    path: PAGE_ROUTE.COMPANY_PROJECTS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjects />
      </Suspense>
    ),
  },
  {
    path: COMPANIES_ROUTE.TAGS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjectsTags />
      </Suspense>
    ),
  },
  {
    path: MY_JOBS_ROUTE.HOME,
    component: (
      <Suspense fallback={""}>
        <AdminJobsList />
      </Suspense>
    ),
  },
  {
    path: PAGE_ROUTE.COMPANY,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyList />
      </Suspense>
    ),
  },
];

// ---------------------------- Define other routes then main pages ----------------------------

// Workflow page routes
export const WORKFLOW_ROUTES: RouteType[] = [
  {
    path: WORKFLOW_ROUTE.CREATE_WORKFLOW,
    component: (
      <Suspense fallback={""}>
        <ApprovalWorkflow />
      </Suspense>
    ),
  },
];
// MY Projects page routes
export const MY_PROJECTS_ROUTES: RouteType[] = [];
// Company(Community) page routes
export const COMPANIES_ROUTES: RouteType[] = [
  {
    path: COMPANIES_ROUTE.COMPANY_PROJECTS_DETAILS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjectsDetails />
      </Suspense>
    ),
  },
];
// Media page routes
export const MEDIA_ROUTES: RouteType[] = [];
// Jobs page routes
export const JOBS_ROUTES: RouteType[] = [
  {
    path: MY_JOBS_ROUTE.CREATE_MY_JOB,
    component: (
      <Suspense fallback={""}>
        <AdminJobsAddEdit />
      </Suspense>
    ),
  },
];
// Draft jobs routes
export const DRAFT_JOBS_ROUTES: RouteType[] = [];
// Template jobs routes
export const TEMPLATES_ROUTES: RouteType[] = [];
// Company page routes
export const COMPANY_ROUTES: RouteType[] = [
  {
    path: COMPANY_ROUTE.COMPANY_LIST_DETAILS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProfile />
      </Suspense>
    ),
  },
  {
    path: COMPANY_ROUTE.ADMIN_COMPANY_LIST_DETAILS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProfile />
      </Suspense>
    ),
  },
];