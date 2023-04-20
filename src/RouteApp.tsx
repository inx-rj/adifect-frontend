import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, PAGES_ROUTES } from "./routes/routes";

// Import lazy load component
const AuthLayout = lazy(() => import("layouts/AuthLayout"));
const Master = lazy(() => import("layouts/Master"));
const NotFound = lazy(() => import("pages/error/NotFound"));
const DashLayout = lazy(() => import("layouts/DashLayout"));

const RouteApp = () => {
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
