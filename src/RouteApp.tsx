import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import {
  AUTH_ROUTES,
  WORKFLOW_ROUTES,
  COMPANIES_ROUTES,
  INTAKE_FORMS_ROUTES,
  DRAFT_JOBS_ROUTES,
  JOBS_ROUTES,
  MEDIA_ROUTES,
  MY_PROJECTS_ROUTES,
  PAGES_ROUTES,
  TEMPLATES_ROUTES,
  COMPANY_ROUTES,
  HEADER_ROUTES,
  HELP_ROUTES,
  PUBLIC_INTAKE_FORM_ROUTE,
} from "./routes/routes";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { getAllowedRoutes } from "helper/utility/customFunctions";
import {
  GET_USER_DATA,
  GET_USER_PROFILE_DATA,
} from "redux/reducers/auth/auth.slice";
import { INTAKE_FORMS_ROUTE } from "routes/baseRoute";
// import { useSingleEffect, useUpdateEffect } from "react-haiku";

// Import lazy load component
const AuthLayout = lazy(() => import("layouts/AuthLayout"));
const Master = lazy(() => import("layouts/Master"));
const NotFound = lazy(() => import("pages/error/NotFound"));
const DashLayout = lazy(() => import("layouts/DashLayout"));

const RouteApp = () => {
  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);
  const userData = useAppSelector(GET_USER_DATA);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // Combined various pages route list into single
  const COMBINED_ROUTES = [
    ...HEADER_ROUTES,
    ...PAGES_ROUTES,
    ...WORKFLOW_ROUTES,
    ...MY_PROJECTS_ROUTES,
    ...COMPANIES_ROUTES,
    ...INTAKE_FORMS_ROUTES,
    ...MEDIA_ROUTES,
    ...JOBS_ROUTES,
    ...DRAFT_JOBS_ROUTES,
    ...TEMPLATES_ROUTES,
    ...COMPANY_ROUTES,
    ...HELP_ROUTES
  ];

  // RBAC(RoleBasedAccessControl) - Code
  let ALLOWED_ROUTES = [];

  if (isPersist)
    ALLOWED_ROUTES = getAllowedRoutes(COMBINED_ROUTES, [
      userData?.data?.user?.role ?? userProfile?.data?.role,
    ]);

  // useUpdateEffect(() => {
  //   if (isPersist)
  //     ALLOWED_ROUTES.push(
  //       getAllowedRoutes(COMBINED_ROUTES, [userProfile?.data?.role])
  //     );
  //   else {
  //     ALLOWED_ROUTES.splice(0, ALLOWED_ROUTES.length);
  //     // navigate("/login");
  //   }
  // }, [userProfile?.data?.role, isPersist, COMBINED_ROUTES]);

  // console.log({ ALLOWED_ROUTES, AUTH_ROUTES, COMBINED_ROUTES }, [userData?.data?.user?.role ?? userProfile?.data?.role], 'ALLOWED_ROUTES');

  return (
    <Routes>
      {/* Authentication Routing  */}
      <Route
        element={
          <Suspense fallback={""}>
            <AuthLayout />
          </Suspense>
        }
      >
        {AUTH_ROUTES?.map((authItem: RouteType, authIndex: number) => {
          return (
            <Route
              key={authIndex}
              path={authItem?.path}
              element={authItem.component}
            />
          );
        })}
      </Route>

      {/* All pages route  */}
      <Route
        element={
          <Suspense fallback={""}>
            <Master />
          </Suspense>
        }
      >
        <Route
          element={
            <Suspense fallback={""}>
              <DashLayout />
            </Suspense>
          }
        >
          {/* Pages Route  */}
          {ALLOWED_ROUTES?.map((pageItem: RouteType, pageIndex: number) => {
            return (
              <Route
                key={pageIndex}
                path={pageItem?.path}
                element={pageItem.component}
              />
            );
          })}
        </Route>
        <Route
          path={PUBLIC_INTAKE_FORM_ROUTE.path}
          element={PUBLIC_INTAKE_FORM_ROUTE.component}
        />
      </Route>

      {/* Not Found Page (UnKnown Route)  */}
      <Route
        path="*"
        element={
          <Suspense fallback={""}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RouteApp;
