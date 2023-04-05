import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteType } from "./helper/types";
import { AUTH_ROUTES } from "./routes/routes";
import AuthLayout from "./layouts/AuthLayout";
import InviteUser from "components/ProfileDropdown/InviteUser";

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
