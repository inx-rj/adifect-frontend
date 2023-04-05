import React, { lazy, Suspense } from "react";
import { RouteType } from "../helper/types";
import {
  AUTH_ROUTE,
  COMPANIES_ROUTE,
  PAGE_ROUTE,
} from "./baseRoute";

// Import lazy load component
const Login = lazy(() => import("components/auth/Login"));
const Signup = lazy(() => import("components/auth/Signup"));
const Thankyou = lazy(() => import("components/auth/Thankyou"));
const ForgotPassword = lazy(() => import("components/auth/ForgotPassword"));
const HomePage = lazy(() => import("pages/dashboard/home/HomePage"));
const AgencyCompanyProjects = lazy(() => import("components/pages/agency/companyProjects/AgencyCompanyProjects"));

// Define Authentication Route
export const AUTH_ROUTES: RouteType[] = [
  {
    path: AUTH_ROUTE.LOGIN,
    component: (
      <Suspense fallback={""}>
        <Login />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.SIGNUP,
    component: (
      <Suspense fallback={""}>
        <Signup />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.THANK_YOU,
    component: (
      <Suspense fallback={""}>
        <Thankyou />
      </Suspense>
    )
  },
  {
    path: AUTH_ROUTE.FORGOT_PASSWORD,
    component: (
      <Suspense fallback={""}>
        <ForgotPassword />
      </Suspense>
    )
  },
];


// Define Tabs/Pages Wise Route
export const PAGES_ROUTES: RouteType[] = [
  {
    path: PAGE_ROUTE.HOME,
    component: (
      <Suspense fallback={""}>
        <HomePage />
      </Suspense>
    )
  },
  {
    path: COMPANIES_ROUTE.COMPANIES_PROJECTS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjects />
      </Suspense>
    )
  },
];
