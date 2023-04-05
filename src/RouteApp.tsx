import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, DASHBOARD_ROUTES } from "./routes/routes";
import AuthLayout from "./layouts/AuthLayout";
import Master from "./layouts/Master";
import Dashboard from "./layouts/Dashboard";
import React from "react";

// Import lazy load component

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
      {/* Dashboard Routing  */}
      <Route
        element={
          <Suspense fallback={""}>
            <Master />{" "}
          </Suspense>
        }
      >
        <Route
          element={
            <Suspense fallback={""}>
              <Dashboard />
            </Suspense>
          }
        >
          {/* Homepage Route  */}
          {DASHBOARD_ROUTES?.map((dashItem: RouteType, dashIndex: number) => {
            return (
              <Route
                key={dashIndex}
                path={dashItem?.path}
                element={dashItem.component}
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
            <div>Not Found</div>
          </Suspense>
        }
      />
    </Routes>
  );
};
export default RouteApp;
