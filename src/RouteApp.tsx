import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES, PAGES_ROUTES } from "./routes/routes";
import DashLayout from "layouts/DashLayout";
import InviteUser from "components/ProfileDropdown/InviteUser";

// Import lazy load component
const Master = lazy(() => import("layouts/Master"));
const AuthLayout = lazy(() => import("./layouts/AuthLayout"));

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
              <DashLayout />
            </Suspense>
          }
        >
          {/* Homepage Route  */}
          {PAGES_ROUTES?.map((dashItem: RouteType, dashIndex: number) => {
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

      <Route
        path="/invite-user"
        element={
          <Suspense fallback={""}>
            <InviteUser />
          </Suspense>
        }
      />

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
