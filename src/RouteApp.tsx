import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, PAGES_ROUTES } from "./routes/routes";
import DashLayout from "layouts/DashLayout";

// Import lazy load component
const AuthLayout = lazy(() => import("layouts/AuthLayout"));
const Master = lazy(() => import("layouts/Master"));

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
          {/* Homepage Route  */}
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
          }>
          <Route
            path="*"
            element={
              <Suspense fallback={""}>
                <div>Not Found</div>
              </Suspense>
            }
          />
        </Route>
      </Route>
    </Routes >
  );
};
export default RouteApp;
