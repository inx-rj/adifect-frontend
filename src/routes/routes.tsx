import React, { lazy, Suspense } from "react";
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
import HomePage from "pages/dashboard/home/HomePage";
import AgencyCompanyProjects from "components/pages/agency/companyProjects/AgencyCompanyProjects";

// Import lazy load component
const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));
const Thankyou = lazy(() => import("../components/auth/Thankyou"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));

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


// Define Authentication Route
export const PAGES_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.DASHBOARD,
    component: (
      <Suspense fallback={""}>
        <HomePage />
      </Suspense>
    ),
    permission: [
      Roles.ADMIN,
      Roles.AGENCY,
      Roles.CREATOR,
      Roles.MEMBER
    ],
  },
  {
    path: DASHBOARD_COMPANIES_ROUTE.COMPANIES_PROJECTS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjects />
      </Suspense>
    ),
    permission: [
      Roles.ADMIN,
      Roles.AGENCY,
      Roles.CREATOR,
      Roles.MEMBER
    ],
  },
];
