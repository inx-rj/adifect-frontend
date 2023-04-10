import { getAllowedRoutes, isLoggedIn } from "../helper/utility/customFunctions";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AUTH_ROUTE, MAIN_ROUTE } from "../routes/baseRoute";
import { AUTH_ROUTES } from "../routes/routes";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";

const AuthLayout = () => {
  // let allowedRoutes = [];

  // if (isLoggedIn()) allowedRoutes = getAllowedRoutes(AUTH_ROUTES);
  // else return <Navigate to={`/`} />;

  const isPersist = useAppSelector(IS_PERSISTED);

  // To be updated with redux
  if (isPersist) {
    return <Navigate to={MAIN_ROUTE.HOME} replace={true} state={true} />;
  }

  return (
    // <div role="main" className="bg-[#2472fc0f] w-full min-h-screen">
    //   <Outlet />
    // </div>
    <main role="main" className="min-h-screen">
      <section className="relative">
        <Outlet />
      </section>
    </main>
  );
};

export default AuthLayout;
