import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "redux/store";
import { IS_PERSISTED } from "redux/reducers/config/app/app.slice";
import { getAllowedRoutes } from "helper/utility/customFunctions";
import { SIDEBAR_ROUTES } from "routes/baseRoute";
import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";

// Import lazy load component
const SidebarMenuItem = lazy(
  () => import("components/common/sidebar/SidebarMenuItem")
);

export default function Sidebar() {
  // const splitLocation = pathname.split("/");

  const isPersist = useAppSelector(IS_PERSISTED);
  const userData = useAppSelector(GET_USER_DATA);

  // console.log([userData.data.user.role]);

  // let topData;
  // let midData;
  // let bottomData;

  // if (userData.data.user.role == Roles.ADMIN) {
  //   //Admin Sidebar.
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
  //     {
  //       title: "Workflow",
  //       imgPath: "/img/app1.png",
  //       path: "/workflow",
  //     },
  //     // { title: "Projects", imgPath: "/img/Projects.png", path: "/projects" },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/admin-media",
  //     },
  //     // {
  //     //   title: "Earnings",
  //     //   imgPath: "/img/Earnings_old.png",
  //     //   path: "/earnings",
  //     // },
  //     // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
  //     // {
  //     //   title: "Transactions",
  //     //   imgPath: "/img/Transactions.png",
  //     //   path: "/transactions",
  //     // },
  //   ];
  //   midData = [
  //     { title: "Jobs", imgPath: "/img/jobicon1.png", path: "/jobs/list" },
  //     {
  //       title: "Industries",
  //       imgPath: "/img/icon40.png",
  //       path: "/industries/list",
  //     },
  //     // { title: "Levels", imgPath: "/img/lavel.png", path: "/levels/list" },
  //     // {
  //     //   title: "Categories",
  //     //   imgPath: "/img/category.png",
  //     //   path: "/categories/list",
  //     // },
  //     {
  //       title: "Skills",
  //       imgPath: "/img/skillicon.png",
  //       path: "/skills/list",
  //     },
  //     {
  //       title: "Companies",
  //       imgPath: "/img/Company-Vector.png",
  //       path: "/companies/list",
  //     },
  //     {
  //       title: "Users",
  //       imgPath: "/img/user1.png",
  //       path: "/user-list",
  //     },
  //     // {
  //     //   title: "Agency",
  //     //   imgPath: "/img/Earnings.png",
  //     //   path: "/agency-list",
  //     // },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/Admin-help" },
  //   ];
  // } else if (userData.data.user.role == Roles.CREATOR) {
  //   //Creator Sidebar
  //   topData = [
  //     {
  //       title: "Home",
  //       imgPath: "/img/homeicon.png",
  //       path: "/home",
  //     },
  //     {
  //       title: "My Projects",
  //       imgPath: "/img/Projects.png",
  //       path: "/projects",
  //     },
  //     // {
  //     //   title: "Earnings",
  //     //   imgPath: "/img/Earnings_old.png",
  //     //   path: "/earnings",
  //     // },
  //     // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
  //     // {
  //     //   title: "Transactions",
  //     //   imgPath: "/img/Transactions.png",
  //     //   path: "/transactions",
  //     // },
  //   ];
  //   midData = [
  //     {
  //       title: "Available Jobs",
  //       imgPath: "/img/jobicon1.png",
  //       path: "/jobs/list",
  //     },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // } else if (userData.data.user.role == Roles.AGENCY) {
  //   //Agency Sidebar
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/" },
  //     {
  //       title: "Workflow",
  //       imgPath: "/img/app1.png",
  //       path: "/workflow",
  //     },
  //     { title: "My Projects", imgPath: "/img/Projects.png", path: "/projects" },
  //     {
  //       title: "Companies",
  //       imgPath: "/img/Projects.png",
  //       // path: "/projects",
  //       children: [
  //         {
  //           title: "Company Projects",
  //           imgPath: "/img/tabsicon.png",
  //           path: "/company-projects",
  //         },

  //         {
  //           title: "Tags",
  //           imgPath: "/img/tabsicon.png",
  //           path: "/company-project/tags",
  //         },
  //         // {
  //         //   title: "Stories Options",
  //         //   imgPath: "/img/tabsicon.png",
  //         //   path: "/company-project/stories-options",
  //         // },
  //       ],
  //     },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/media",
  //     },
  //     // {
  //     //   title: "Earnings",
  //     //   imgPath: "/img/Earnings_old.png",
  //     //   path: "/earnings",
  //     // },
  //     // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
  //     // {
  //     //   title: "Transactions",
  //     //   imgPath: "/img/Transactions.png",
  //     //   path: "/transactions",
  //     // },
  //   ];
  //   midData = [
  //     { title: "My Jobs", imgPath: "/img/jobicon1.png", path: "/jobs/list" },
  //     // { title: "Media", imgPath: "/img/Projects.png", path: "/Media" },
  //     {
  //       title: "Draft Jobs",
  //       imgPath: "/img/iconimg78.png",
  //       path: "/draft-jobs",
  //     },
  //     {
  //       title: "Templates",
  //       imgPath: "/img/menuicon.png",
  //       path: "/templates/list",
  //     },
  //     {
  //       title: "Company",
  //       imgPath: "/img/Company-Vector.png",
  //       path: "/agency/company",
  //     },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // } else if (
  //   userData.data.user.role == Roles.MEMBER &&
  //   userData.data.user.user_level === 1
  // ) {
  //   //Agency Member - ADMIN Sidebar
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
  //     {
  //       title: "Workflow",
  //       imgPath: "/img/app1.png",
  //       path: "/workflow",
  //     },
  //     { title: "My Projects", imgPath: "/img/Projects.png", path: "/projects" },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/member-media",
  //     },
  //     // {
  //     //   title: "Earnings",
  //     //   imgPath: "/img/Earnings_old.png",
  //     //   path: "/earnings",
  //     // },
  //     // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
  //     // {
  //     //   title: "Transactions",
  //     //   imgPath: "/img/Transactions.png",
  //     //   path: "/transactions",
  //     // },
  //   ];
  //   midData = [
  //     { title: "My Jobs", imgPath: "/img/Projects.png", path: "/jobs/list" },
  //     // { title: "Media", imgPath: "/img/Projects.png", path: "/Media" },
  //     {
  //       title: "Draft Jobs",
  //       imgPath: "/img/iconimg78.png",
  //       path: "/member-draft-jobs/",
  //     },
  //     {
  //       title: "Templates",
  //       imgPath: "/img/menuicon.png",
  //       path: "/member-templates/list",
  //     },
  //     {
  //       title: "Company",
  //       imgPath: "/img/Company-Vector.png",
  //       path: "/member/company",
  //     },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // } else if (
  //   userData.data.user.role == Roles.MEMBER &&
  //   userData.data.user.user_level === 2
  // ) {
  //   //Agency Member - MARKETER Sidebar
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
  //     {
  //       title: "Workflow",
  //       imgPath: "/img/app1.png",
  //       path: "/workflow",
  //     },
  //     { title: "My Projects", imgPath: "/img/Projects.png", path: "/projects" },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/member-media",
  //     },
  //     // {
  //     //   title: "Media",
  //     //   imgPath: "/img/Earnings_old.png",
  //     //   path: "/media",
  //     // },
  //   ];
  //   midData = [
  //     { title: "My Jobs", imgPath: "/img/Projects.png", path: "/jobs/list" },
  //     {
  //       title: "Templates",
  //       imgPath: "/img/menuicon.png",
  //       path: "/member-templates/list",
  //     },
  //     {
  //       title: "Company",
  //       imgPath: "/img/Company-Vector.png",
  //       path: "/member/company",
  //     },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // } else if (
  //   userData.data.user.role == Roles.MEMBER &&
  //   userData.data.user.user_level === 3
  // ) {
  //   //Agency Member - APPROVER Sidebar
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/member-media",
  //     },
  //   ];
  //   midData = [
  //     { title: "My Jobs", imgPath: "/img/Projects.png", path: "/jobs/list" },
  //     {
  //       title: "Company",
  //       imgPath: "/img/Company-Vector.png",
  //       path: "/member/company",
  //     },

  //     // {
  //     //   title: "Company",
  //     //   imgPath: "/img/Projects.png",
  //     //   path: "/agency/company",
  //     // },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // } else if (
  //   userData.data.user.role == Roles.MEMBER &&
  //   userData.data.user.user_level === 4
  // ) {
  //   //Agency Member - IN-HOUSE DESIGNER Sidebar
  //   topData = [
  //     { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
  //     {
  //       title: "Media",
  //       imgPath: "/img/Earnings_old.png",
  //       path: "/member-media",
  //     },
  //     { title: "My Projects", imgPath: "/img/Projects.png", path: "/projects" },
  //   ];
  //   midData = [
  //     { title: "My Jobs", imgPath: "/img/Projects.png", path: "/jobs/list" },

  //     // {
  //     //   title: "Company",
  //     //   imgPath: "/img/Projects.png",
  //     //   path: "/member/company",
  //     // },
  //     // {
  //     //   title: "Company",
  //     //   imgPath: "/img/Projects.png",
  //     //   path: "/agency/company",
  //     // },
  //   ];
  //   bottomData = [
  //     // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
  //     { title: "Help", imgPath: "/img/help.png", path: "/help" },
  //   ];
  // }
  // useEffect(() => { }, []);
  // const windowSize = useRef([window.innerWidth, window.innerHeight]);

  // RBAC - Code
  let allowedRoutes = [];

  if (isPersist)
    allowedRoutes = getAllowedRoutes(SIDEBAR_ROUTES, [userData.data.user.role]);
  else return <Navigate to={`/login`} />;

  return (
    <ul
      id="mySidepanel"
      className={`nav-list py-2 px-4 `}
    >
      {/* {topData?.map((item, index) => (
        <SidebarMenuItem key={index} navItem={item} />
      ))}
      {midData?.map((item, index) => (
        <li className={pathname == item.path ? "active" : ""} key={index}>
          <Link className="Menu" to={item.path}>
            <span className="menu_img">
              <img className="mr-2" src={"/assest/images/logo.png"} alt="" />
            </span>
            {item.title}
          </Link>
        </li>
      ))}
      {bottomData?.map((item, index) => (
        <li className={pathname == item.path ? "active" : ""} key={index}>
          <Link className="Menu" to={item.path}>
            <span className="menu_img">
              <img className="mr-2" src={"/assest/images/logo.png"} alt="" />
            </span>
            {item.title}
          </Link>
        </li>
      ))} */}
      {allowedRoutes?.map((item, index) => (
        <Suspense fallback={""} key={item.id}>
          <SidebarMenuItem key={index} navItem={item} />
        </Suspense>
      ))}
    </ul>
  );
}
