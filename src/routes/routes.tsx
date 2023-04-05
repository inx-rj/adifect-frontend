import { lazy, Suspense } from "react";
import { RouteType } from "../helper/types";
import { AUTH_ROUTE, DASH_CHILD } from "./baseRoute";
import { Roles } from "../helper/config";
import HomePage from "../pages/dashboard/home/HomePage";
import Dashboard from "../layouts/Dashboard";
import React from "react";

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

// Define Dashboard Route
export const DASHBOARD_ROUTES: RouteType[] = [
  {
    path: DASH_CHILD.HOME,
    component: (
      <Suspense fallback={""}>
        {/* <Dashboard /> */}
        <HomePage />
      </Suspense>
    ),
  },
];
