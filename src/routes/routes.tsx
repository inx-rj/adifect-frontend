import { lazy, Suspense } from "react";
import { RouteType } from "../helper/types";
import { AUTH_ROUTE } from "./baseRoute";

// Import lazy load component
const Login = lazy(() => import("../components/auth/Login"));
const Signup = lazy(() => import("../components/auth/Signup"));

// Define Authentication Route
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
];
