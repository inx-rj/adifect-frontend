import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useNavigate, useRoutes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, PAGES_ROUTES } from "./routes/routes";
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

  // RBAC - Code
  const allowedRoutes = [];

  if (isPersist) {
    allowedRoutes.push(getAllowedRoutes([...PAGES_ROUTES], [userProfile.data.role]))
  }
  else {
    navigate('/login');
  }

  console.log(isPersist, [...PAGES_ROUTES,], allowedRoutes, 'allowed');

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
          {PAGES_ROUTES?.map((pageItem: RouteType, pageIndex: number) => {
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
