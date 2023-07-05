import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { isDividerAfterTab, getAllowedRoutes } from "helper/utility/customFunctions";
import { SIDEBAR_ROUTES } from "routes/baseRoute";
import { GET_USER_DATA, GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import SidebarMenuItem from "./SidebarMenuItem";
import { Divider } from "@mui/material";

export default function Sidebar() {

  const isPersist = useAppSelector(IS_PERSISTED);
  const userData = useAppSelector(GET_USER_DATA);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);

  // RBAC - Code
  let allowedRoutes = [];

  if (isPersist)
    allowedRoutes = getAllowedRoutes(SIDEBAR_ROUTES, [userData?.data?.user?.role ?? userProfile?.data?.role]);
  else return <Navigate to={`/login`} />;

  return (
    <ul id="mySidepanel" className={`nav-list py-2 px-4 `}>
      {allowedRoutes?.map((item, index) => (
        <>
          <SidebarMenuItem key={index} navItem={item} />
          {isDividerAfterTab(userData?.data?.user, item.name) && <Divider sx={{ my: 2 }} variant="middle" />}
        </>
      ))}
    </ul>
  );
}
