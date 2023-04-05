import { getAllowedRoutes, isLoggedIn } from "../helper/utility/customFunctions";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_ROUTE } from "../routes/baseRoute";
import { AUTH_ROUTES } from "../routes/routes";

const AuthLayout = () => {
  // let allowedRoutes = [];

  // if (isLoggedIn()) allowedRoutes = getAllowedRoutes(AUTH_ROUTES);
  // else return <Navigate to={`/`} />;

  return (
    <div role="main" className="bg-[#2472fc0f] w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
