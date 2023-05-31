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
const Footer = lazy(() => import("components/common/footer/Footer"));

const DashLayout = () => {
  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);
  const isSidebarCollapsed = useAppSelector(IS_SIDEBAR_COLLAPSED);

  console.log({ isPersist }, 'InDash');

  return isPersist ? (
    <main role="main" className={`relative ${false ? "mini" : "full"}`}>
      <div className={`main-content`}>
        <Suspense fallback={""}>
          <Header />
        </Suspense>
        <div
          className={`sidebar custom-scrollbar ${isSidebarCollapsed ? "w-[220px] xlg:w-[250px]" : "w-0 lg:w-[73px]"
            }`}
        >
          <Suspense fallback={"Loading"}>
            <Sidebar />
          </Suspense>
        </div>
        <div
          className={`transition-all ease-in-out duration-500 ${isSidebarCollapsed ? "ml-0 lg:ml-[220px] xlg:ml-[250px]" : "ml-0 lg:ml-[73px]"
            }`}
        >
          <Suspense fallback={""}>
            <div className="dashboard min-h-[calc(100vh-115px)] p-5 relative">
              <Outlet />
            </div>
          </Suspense>
        </div>
        <Suspense fallback={""}>
          <Footer />
        </Suspense>
      </div>
    </main>
  ) : (
    <></>
  );
};

export default DashLayout;
