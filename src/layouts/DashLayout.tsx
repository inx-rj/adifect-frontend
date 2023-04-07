import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import {
  IS_PERSISTED,
  IS_SIDEBAR_COLLAPSED,
} from "redux/reducers/config/app/app.slice";
import { useAppSelector } from "redux/store";

// Import lazy load component
const Header = lazy(() => import("components/common/header/Header"));
const Sidebar = lazy(() => import("components/common/sidebar/Sidebar"));

const DashLayout = () => {
  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);
  const isSidebarCollapsed = useAppSelector(IS_SIDEBAR_COLLAPSED);

  return isPersist ? (
    <main role="main" className={`relative ${false ? "mini" : "full"}`}>
      <div className={`main-content`}>
        <Suspense fallback={""}>
          <Header />
        </Suspense>
        <div
          className={`sidebar pt-[65px] ${
            isSidebarCollapsed ? "w-[250px]" : "w-[73px]"
          }`}
        >
          <Suspense fallback={""}>
            <Sidebar />
          </Suspense>
        </div>
        <div
          className={`transition-all ease-in-out duration-500 ${
            isSidebarCollapsed ? "pl-[250px]" : "pl-[73px]"
          }`}
        >
          <Suspense fallback={""}>
            <div className="dashboard min-h-[calc(100vh-103px)] p-4">
              <Outlet />
            </div>
          </Suspense>
          <Suspense fallback={""}>
            {/* <Footer /> */}
            Footer
          </Suspense>
        </div>
      </div>
    </main>
  ) : (
    <></>
  );
};

export default DashLayout;
