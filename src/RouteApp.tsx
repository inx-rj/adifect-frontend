import React, { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, WORKFLOW_ROUTES, COMPANIES_ROUTES, DRAFT_JOBS_ROUTES, JOBS_ROUTES, MEDIA_ROUTES, MY_PROJECTS_ROUTES, PAGES_ROUTES, TEMPLATES_ROUTES, COMPANY_ROUTES } from "./routes/routes";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { getAllowedRoutes } from "helper/utility/customFunctions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";

// Import lazy load component
const AuthLayout = lazy(() => import("layouts/AuthLayout"));
const Master = lazy(() => import("layouts/Master"));
const NotFound = lazy(() => import("pages/error/NotFound"));
const DashLayout = lazy(() => import("layouts/DashLayout"));

const RouteApp = () => {

  // Router hook
  let navigate = useNavigate();

  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  const COMBINED_ROUTES = [...PAGES_ROUTES, ...WORKFLOW_ROUTES, ...MY_PROJECTS_ROUTES, ...COMPANIES_ROUTES, ...MEDIA_ROUTES, ...JOBS_ROUTES, ...DRAFT_JOBS_ROUTES, ...TEMPLATES_ROUTES, ...COMPANY_ROUTES]

  // RBAC - Code
  const AllowedRoutes = [];

  if (isPersist) AllowedRoutes.push(getAllowedRoutes(COMBINED_ROUTES, [userProfile.data.role]))
  else navigate('/login');

  // console.log(isPersist, COMBINED_ROUTES, AllowedRoutes, 'Allowed');

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
        {/* Agency Routes  */}
        <Route
          element={
            <Suspense fallback={""}>
              <DashLayout />
            </Suspense>
          }
        >
          {/* Pages Route  */}
          {COMBINED_ROUTES?.map((pageItem: RouteType, pageIndex: number) => {
            return (
              <Route
                key={pageIndex}
                path={pageItem?.path}
                element={pageItem.component}
              />
            );
          })}
        </Route>
      </Route>

      {/* Not Found Page  */}
      <Route
        path="*"
        element={
          <Suspense fallback={""}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes >
  );
};

export default RouteApp;
