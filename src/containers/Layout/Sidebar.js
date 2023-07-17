import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import SidebarMenuItem from "../../MyComponents/Frontend/SidebarMenuItem";

export default function Sidebar() {
  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  // const splitLocation = pathname.split("/");
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData]);

  let topData;
  let midData;
  let bottomData;
  if (userData?.user?.role == Object.keys(ROLE)[0]) {
    //Admin Sidebar.
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Workflow",
        imgPath: "/img/app1.png",
        path: "/workflow",
      },
      // { title: "Projects", imgPath: "/img/Projects.png", path: "/projects" },

      {
        title: "Companies",
        imgPath: "/img/Projects.png",
        // path: "/projects",
        children: [
          {
            title: "Company Projects",
            imgPath: "/img/tabsicon.png",
            path: "/company-projects",
          },

          {
            title: "Tags",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/tags",
          },
          // {
          //   title: "Stories Options",
          //   imgPath: "/img/tabsicon.png",
          //   path: "/company-project/stories-options",
          // },
          {
            title: "Community Settings",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/community-settings",
          },
          {
            title: "Programs",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/programs",
          },
          {
            title: "Copy Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/copy-code",
          },
          {
            title: "Creative Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/creative-code",
          },
          {
            title: "Audiences",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/audiences",
          },
        ],
      },
      {
        title: "Intake Forms",
        imgPath: "/img/Projects.png",
        path: "/intake",
      },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/admin-media",
      },
      // {
      //   title: "Earnings",
      //   imgPath: "/img/Earnings_old.png",
      //   path: "/earnings",
      // },
      // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
      // {
      //   title: "Transactions",
      //   imgPath: "/img/Transactions.png",
      //   path: "/transactions",
      // },
    ];
    midData = [
      { title: "Jobs", imgPath: "/img/jobicon1.png", path: "/jobs/list" },
      {
        title: "Industries",
        imgPath: "/img/icon40.png",
        path: "/industries/list",
      },
      // { title: "Levels", imgPath: "/img/lavel.png", path: "/levels/list" },
      // {
      //   title: "Categories",
      //   imgPath: "/img/category.png",
      //   path: "/categories/list",
      // },
      {
        title: "Skills",
        imgPath: "/img/skillicon.png",
        path: "/skills/list",
      },
      {
        title: "Companies",
        imgPath: "/img/Company-Vector.png",
        path: "/companies/list",
      },
      {
        title: "Users",
        imgPath: "/img/user1.png",
        path: "/user-list",
      },
      // {
      //   title: "Agency",
      //   imgPath: "/img/Earnings.png",
      //   path: "/agency-list",
      // },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/Admin-help" },
    ];
  } else if (userData?.user?.role == Object.keys(ROLE)[1]) {
    //Creator Sidebar
    topData = [
      {
        title: "Home",
        imgPath: "/img/homeicon.png",
        path: "/home",
      },
      {
        title: "My Projects",
        imgPath: "/img/Projects.png",
        path: "/projects",
      },
      // {
      //   title: "Earnings",
      //   imgPath: "/img/Earnings_old.png",
      //   path: "/earnings",
      // },
      // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
      // {
      //   title: "Transactions",
      //   imgPath: "/img/Transactions.png",
      //   path: "/transactions",
      // },
    ];
    midData = [
      {
        title: "Available Jobs",
        imgPath: "/img/jobicon1.png",
        path: "/jobs/list",
      },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (userData?.user?.role == Object.keys(ROLE)[2]) {
    //Agency Sidebar
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Workflow",
        imgPath: "/img/app1.png",
        path: "/workflow",
      },
      {
        title: "My Projects",
        imgPath: "/img/Projects.png",
        path: "/projects",
      },
      {
        title: "Companies",
        imgPath: "/img/Projects.png",
        // path: "/projects",
        children: [
          {
            title: "Company Projects",
            imgPath: "/img/tabsicon.png",
            path: "/company-projects",
          },

          {
            title: "Tags",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/tags",
          },
          // {
          //   title: "Stories Options",
          //   imgPath: "/img/tabsicon.png",
          //   path: "/company-project/stories-options",
          // },
          {
            title: "Community Settings",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/community-settings",
          },
          {
            title: "Programs",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/programs",
          },
          {
            title: "Copy Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/copy-code",
          },
          {
            title: "Creative Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/creative-code",
          },
          {
            title: "Audiences",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/audiences",
          },
        ],
      },
      {
        title: "Intake Forms",
        imgPath: "/img/Projects.png",
        path: "/intake",
      },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/media",
      },
      {
        title: "My Tasks",
        imgPath: "/img/task.svg",
        path: "/my_tasks",
      },
      // {
      //   title: "Earnings",
      //   imgPath: "/img/Earnings_old.png",
      //   path: "/earnings",
      // },
      // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
      // {
      //   title: "Transactions",
      //   imgPath: "/img/Transactions.png",
      //   path: "/transactions",
      // },
    ];
    midData = [
      {
        title: "My Jobs",
        imgPath: "/img/jobicon1.png",
        path: "/jobs/list",
      },
      // { title: "Media", imgPath: "/img/Projects.png", path: "/Media" },
      {
        title: "Draft Jobs",
        imgPath: "/img/iconimg78.png",
        path: "/draft-jobs",
      },
      {
        title: "Templates",
        imgPath: "/img/menuicon.png",
        path: "/templates/list",
      },
      {
        title: "Company",
        imgPath: "/img/Company-Vector.png",
        path: "/agency/company",
      },
      {
        title: "Reporting",
        imgPath: "/img/reporting.svg",
        path: "/agency/reporting",
      },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (
    userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 1
  ) {
    //Agency Member - ADMIN Sidebar
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Workflow",
        imgPath: "/img/app1.png",
        path: "/workflow",
      },
      {
        title: "My Projects",
        imgPath: "/img/Projects.png",
        path: "/projects",
      },
      {
        title: "Companies",
        imgPath: "/img/Projects.png",
        // path: "/projects",
        children: [
          {
            title: "Company Projects",
            imgPath: "/img/tabsicon.png",
            path: "/company-projects",
          },

          {
            title: "Tags",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/tags",
          },
          // {
          //   title: "Stories Options",
          //   imgPath: "/img/tabsicon.png",
          //   path: "/company-project/stories-options",
          // },
          {
            title: "Community Settings",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/community-settings",
          },
          {
            title: "Programs",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/programs",
          },
          {
            title: "Copy Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/copy-code",
          },
          {
            title: "Creative Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/creative-code",
          },
          {
            title: "Audiences",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/audiences",
          },
        ],
      },
      {
        title: "Intake Forms",
        imgPath: "/img/Projects.png",
        path: "/intake",
      },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/member-media",
      },
      // {
      //   title: "Earnings",
      //   imgPath: "/img/Earnings_old.png",
      //   path: "/earnings",
      // },
      // { title: "Analytics", imgPath: "/img/Analytics.png", path: "/analytics" },
      // {
      //   title: "Transactions",
      //   imgPath: "/img/Transactions.png",
      //   path: "/transactions",
      // },
    ];
    midData = [
      {
        title: "My Jobs",
        imgPath: "/img/Projects.png",
        path: "/jobs/list",
      },
      // { title: "Media", imgPath: "/img/Projects.png", path: "/Media" },
      {
        title: "Draft Jobs",
        imgPath: "/img/iconimg78.png",
        path: "/member-draft-jobs/",
      },
      {
        title: "Templates",
        imgPath: "/img/menuicon.png",
        path: "/member-templates/list",
      },
      {
        title: "Company",
        imgPath: "/img/Company-Vector.png",
        path: "/member/company",
      },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (
    userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 2
  ) {
    //Agency Member - MARKETER Sidebar
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Workflow",
        imgPath: "/img/app1.png",
        path: "/workflow",
      },
      {
        title: "My Projects",
        imgPath: "/img/Projects.png",
        path: "/projects",
      },
      {
        title: "Companies",
        imgPath: "/img/Projects.png",
        // path: "/projects",
        children: [
          {
            title: "Company Projects",
            imgPath: "/img/tabsicon.png",
            path: "/company-projects",
          },

          {
            title: "Tags",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/tags",
          },
          // {
          //   title: "Stories Options",
          //   imgPath: "/img/tabsicon.png",
          //   path: "/company-project/stories-options",
          // },
          {
            title: "Community Settings",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/community-settings",
          },
          {
            title: "Programs",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/programs",
          },
          {
            title: "Copy Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/copy-code",
          },
          {
            title: "Creative Code",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/creative-code",
          },
          {
            title: "Audiences",
            imgPath: "/img/tabsicon.png",
            path: "/company-project/audiences",
          },
        ],
      },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/member-media",
      },
      // {
      //   title: "Media",
      //   imgPath: "/img/Earnings_old.png",
      //   path: "/media",
      // },
    ];
    midData = [
      {
        title: "My Jobs",
        imgPath: "/img/Projects.png",
        path: "/jobs/list",
      },
      {
        title: "Templates",
        imgPath: "/img/menuicon.png",
        path: "/member-templates/list",
      },
      {
        title: "Company",
        imgPath: "/img/Company-Vector.png",
        path: "/member/company",
      },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (
    userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 3
  ) {
    //Agency Member - APPROVER Sidebar
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/member-media",
      },
    ];
    midData = [
      {
        title: "My Jobs",
        imgPath: "/img/Projects.png",
        path: "/jobs/list",
      },
      {
        title: "Company",
        imgPath: "/img/Company-Vector.png",
        path: "/member/company",
      },

      // {
      //   title: "Company",
      //   imgPath: "/img/Projects.png",
      //   path: "/agency/company",
      // },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (
    userData?.user?.role == Object.keys(ROLE)[3] &&
    userData?.user?.user_level === 4
  ) {
    //Agency Member - IN-HOUSE DESIGNER Sidebar
    topData = [
      { title: "Home", imgPath: "/img/homeicon.png", path: "/home" },
      {
        title: "Media",
        imgPath: "/img/Earnings_old.png",
        path: "/member-media",
      },
      {
        title: "My Projects",
        imgPath: "/img/Projects.png",
        path: "/projects",
      },
    ];
    midData = [
      {
        title: "My Jobs",
        imgPath: "/img/Projects.png",
        path: "/jobs/list",
      },

      // {
      //   title: "Company",
      //   imgPath: "/img/Projects.png",
      //   path: "/member/company",
      // },
      // {
      //   title: "Company",
      //   imgPath: "/img/Projects.png",
      //   path: "/agency/company",
      // },
    ];
    bottomData = [
      // { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  }
  useEffect(() => { }, []);
  // const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        document.getElementById("mySidepanel").style.width = "0px";
      } else {
        // document.getElementById("mySidepanel").style.width = "250px";
      }
    };
    window.addEventListener("resize", handleWindowResize);

    if (window.innerWidth < 768) {
      document.getElementById("mySidepanel").style.width = "0px";
    }
    if (window.innerWidth > 767) {
      document.getElementById("mySidepanel").style.width = "256px";
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <>
      <div
        id="mySidepanel"
        className={
          windowWidth < 768
            ? "sidemenubar sidepanel mobile-device-active"
            : "sidemenubar sidepanel"
        }
        style={{ width: "0%" }}
      >
        <ul className="nav-list">
          <h1
            // href=""
            className="closebtn"
            onClick={closeNav}
          // style={{ display: "none" }}
          >
            ×
          </h1>
          {topData?.map((item, index) => (
            <SidebarMenuItem key={index} navItem={item} pathname={pathname} />
          ))}

          {midData?.length > 0 && (
            <div className="borderlinesidebar">
              <hr className="borderline" />
            </div>
          )}

          {midData?.map((item, index) => (
            <li className={pathname == item.path ? "active" : ""} key={index}>
              {/* <li className={pathname.includes(item?.path?.split('/')[1]) ? "active" : ""} key={index}> */}
              <Link className="Menu" to={item.path}>
                <span className="menu_img">
                  <img
                    className="mr-2"
                    src={process.env.PUBLIC_URL + item.imgPath}
                    alt=""
                  />
                </span>
                {item.title}
              </Link>
            </li>
          ))}

          {bottomData?.length > 0 && (
            <div className="borderlinesidebar">
              <hr className="borderline" />
            </div>
          )}
          {bottomData?.map((item, index) => (
            <li className={pathname == item.path ? "active" : ""} key={index}>
              {/* <li className={pathname.includes(item?.path?.split('/')[1]) ? "active" : ""} key={index}> */}

              <Link className="Menu" to={item.path}>
                <span className="menu_img">
                  <img
                    className="mr-2"
                    src={process.env.PUBLIC_URL + item.imgPath}
                    alt=""
                  />
                </span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
