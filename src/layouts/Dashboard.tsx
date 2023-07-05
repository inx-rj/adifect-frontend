import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import React from "react";
// import { IS_SIDEBAR_OPEN } from "../redux/reducers/config/app/app.slice";
// import Sidebar from "../containers/Layout/Sidebar";
// import Header from "../containers/Layout/Header";
// import { IS_SIDEBAR_OPEN } from "../redux/reducers/app/app.slice";
// import Sidebar from "../containers/Layout/Sidebar";

//Import lazy load Component
// const Header = lazy(() => import("../components/common/header/Header"));
// const Footer = lazy(() => import("../components/common/footer/Footer"));
// const Sidebar = lazy(() => import("../MyComponents/Common/sidebar/Sidebar"));

const Dashboard = () => {
  // const isSidebarOpen = useAppSelector(IS_SIDEBAR_OPEN);

  return (
    <div className={`relative `}>
      <Suspense fallback={''}>
        {/* <Sidebar /> */}
      </Suspense>
      <Suspense fallback={''}>
        {/* <Header /> */}
      </Suspense>
      <Suspense fallback={''}>
        <div className="dashboard min-h-[calc(100vh-103px)]">
          <main role="main">
            <Outlet />
          </main>
        </div>
      </Suspense>
      <Suspense fallback={''}>
        {/* <Footer /> */}
      </Suspense>
    </div>
  );
};

export default Dashboard;
