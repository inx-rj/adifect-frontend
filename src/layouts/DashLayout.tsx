import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import {
  IS_PERSISTED,
  IS_SIDEBAR_OPEN,
} from "redux/reducers/config/app/app.slice";
import { useAppSelector } from "redux/store";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";
import { ROLES, UserLevel } from "helper/config";

// Import lazy load component
const Header = lazy(() => import("components/common/header/Header"));
const Sidebar = lazy(() => import("components/common/sidebar/Sidebar"));
const Footer = lazy(() => import("components/common/footer/Footer"));

const DashLayout = () => {
  // Redux states
  const isPersist = useAppSelector(IS_PERSISTED);
  const isSidebarOpen = useAppSelector(IS_SIDEBAR_OPEN);
  const userData = useAppSelector(GET_USER_DATA);

  return isPersist ? (
    <main role="main" className={`relative min-h-screen`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        {userData.data.user.role === ROLES.MEMBER &&
        userData.data.user.user_level === UserLevel.APPROVER ? (
          <div className="dashboard min-h-[calc(100vh-115px)] p-5 relative">
            <Outlet />
          </div>
        ) : (
          <>
          <div
            className={`sidebar custom-scrollbar ${
              isSidebarOpen ? "w-[220px] xlg:w-[256px]" : "w-0 md:w-[156px]"
            }`}
          >
            <Sidebar />
          </div>
        <div
          className={`transition-all ease-in-out duration-100 ${
            isSidebarOpen
              ? "ml-0 md:ml-[220px] xlg:ml-[256px]"
              : "ml-0 md:ml-[156px]"
          }`}
        >
          <div className="dashboard min-h-[calc(100vh-115px)] p-5 relative">
            <Outlet />
          </div>
        </div>
        </>
        )}

        <Footer />
      </Suspense>
    </main>
  ) : (
    <></>
  );
};

export default DashLayout;
