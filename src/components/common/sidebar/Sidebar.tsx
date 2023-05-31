import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { getAllowedRoutes } from "helper/utility/customFunctions";
import { SIDEBAR_ROUTES } from "routes/baseRoute";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";

// Import lazy load component
const SidebarMenuItem = lazy(
  () => import("components/common/sidebar/SidebarMenuItem")
);

export default function Sidebar() {
  // const splitLocation = pathname.split("/");

  const isPersist = useAppSelector(IS_PERSISTED);
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  // RBAC - Code
  let allowedRoutes = [];

  if (isPersist)
    allowedRoutes = getAllowedRoutes(SIDEBAR_ROUTES, [userData?.data?.role]);
  else return <Navigate to={`/login`} />;

  return (
    <ul id="mySidepanel" className={`nav-list py-2 px-4 `}>
      {allowedRoutes?.map((item, index) => (
        <Suspense fallback={""} key={index}>
          <SidebarMenuItem key={index} navItem={item} />
        </Suspense>
      ))}
    </ul>
  );
}
