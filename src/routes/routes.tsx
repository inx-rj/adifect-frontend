import React, { lazy, Suspense } from "react";
import { RouteType } from "../helper/types";
import {
  AUTH_ROUTE,
  COMPANIES_ROUTE,
  DASH_COMPANY,
  DASHBOARD_COMPANY_ROUTE,
  PAGE_ROUTE,
  PROFILE_ROUTE,
} from "./baseRoute";

// => Import lazy load component

// Auth pages
const Login = lazy(() => import("components/auth/Login"));
const Signup = lazy(() => import("components/auth/Signup"));
const Thankyou = lazy(() => import("components/auth/Thankyou"));
const ForgotPassword = lazy(() => import("components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("components/auth/ResetPassword"));

// Sidebar pages
const HomePage = lazy(() => import("pages/dashboard/home/HomePage"));
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
const AgencyCompanyList = lazy(
  () => import("components/pages/agency/companyTab/AgencyCompanyList")
);

const AgencyCompanyProfile = lazy(
  () => import("components/pages/companyProfile/AgencyCompanyProfile")
);

// Profile dropdown pages
const InviteUser = lazy(() => import("components/ProfileDropdown/InviteUser"));
const Profile = lazy(
  () => import("components/ProfileDropdown/profile/Profile")
);

// => Define Authentication Route
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

// => Define Tabs/Pages Wise Route
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
    path: COMPANIES_ROUTE.COMPANY_PROJECTS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjects />
      </Suspense>
    ),
  },
  {
    path: COMPANIES_ROUTE.COMPANY_PROJECTS_DETAILS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProjectsDetails />
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
    path: DASHBOARD_COMPANY_ROUTE.HOME,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyList />
      </Suspense>
    ),
  },
  {
    path: DASH_COMPANY.COMPANY_LIST_DETAILS,
    component: (
      <Suspense fallback={""}>
        <AgencyCompanyProfile />
      </Suspense>
    ),
  },
  {
    path: PROFILE_ROUTE.INVITE,
    component: (
      <Suspense fallback={""}>
        <InviteUser />
      </Suspense>
    ),
  },
  {
    path: PROFILE_ROUTE.PROFILE,
    component: (
      <Suspense fallback={""}>
        <Profile />
      </Suspense>
    ),
  },
];
