import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useSelector } from "react-redux";
import { ROLE } from "../../constants/other-constants";
import { useNavigate, useLocation } from "react-router-dom";

export default function DAMSidebar() {
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
  }, []);
  let topData;
  let midData;
  let bottomData;
  if (userData?.user?.role == Object.keys(ROLE)[0]) {
    topData = [
      { title: "Home", imgPath: "/img/Homeicon.png", path: "/home" },
      { title: "Projects", imgPath: "/img/Projects.png", path: "#" },
      {
        title: "Earnings",
        imgPath: "/img/Earnings_old.png",
        path: "#",
      },
      { title: "Analytics", imgPath: "/img/Analytics.png", path: "#" },
      {
        title: "Transactions",
        imgPath: "/img/Transactions.png",
        path: "#",
      },
    ];

    bottomData = [
      { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (userData?.user?.role == Object.keys(ROLE)[1]) {
    topData = [
      { title: "Home", imgPath: "/img/Homeicon.png", path: "/home" },
      { title: "Projects", imgPath: "/img/Projects.png", path: "#" },
      {
        title: "Earnings",
        imgPath: "/img/Earnings_old.png",
        path: "#",
      },
      { title: "Analytics", imgPath: "/img/Analytics.png", path: "#" },
      {
        title: "Transactions",
        imgPath: "/img/Transactions.png",
        path: "#",
      },
    ];
    midData = [
      {
        title: "Available Jobs",
        imgPath: "/img/Projects.png",
        path: "/jobs/list",
      },
    ];
    bottomData = [
      { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  } else if (userData?.user?.role == Object.keys(ROLE)[2]) {
    topData = [
      { title: "Home", imgPath: "/img/Homeicon.png", path: "/DAM" },
      {
        title: "Media",
        imgPath: "/img/Projects.png",
        path: "/Media",
      },

      {
        title: "Earnings",
        imgPath: "/img/Earnings_old.png",
        path: "#",
      },

      { title: "Analytics", imgPath: "/img/Analytics.png", path: "#" },
      {
        title: "Transactions",
        imgPath: "/img/Transactions.png",
        path: "#",
      },
      {
        title: "Settings",
        imgPath: "/img/Settings.png",
        path: "#",
      },
      {
        title: "Help",
        imgPath: "/img/help.png",
        path: "#",
      },
    ];
    midData = [
      { title: "My Jobs", imgPath: "/img/Projects.png", path: "/jobs/list" },
      {
        title: "Workflow Levels",
        imgPath: "/img/Projects.png",
        path: "/levels-workflow/list",
      },
      {
        title: "Workflow Stages",
        imgPath: "/img/Projects.png",
        path: "/stages-workflow/list",
      },
    ];
    bottomData = [
      { title: "Settings", imgPath: "/img/Settings.png", path: "/settings" },
      { title: "Help", imgPath: "/img/help.png", path: "/help" },
    ];
  }
  return (
    <>
      <div
        id="mySidepanel"
        className="sidemenubar sidepanel "
        style={{ width: "100%" }}
      >
        <div className="logodivslider">
          <Link to="/home">
            <img
              // chamge classNameadd11
              className="logosliderpage"
              src={process.env.PUBLIC_URL + "/img/Grou3.png"}
              alt=""
            />
          </Link>
        </div>

        <a
          href="javascript:void(0)"
          className="closebtn"
          onClick={closeNav}
          style={{ display: "none" }}
        >
          ×
        </a>
        <ul className="nav-list">
          {topData?.map((item, index) => (
            <li className={pathname == item.path ? "active" : ""} key={index}>
              {/* <li className={pathname.includes(item?.path?.split('/')[1]) ? "active" : ""} key={index}> */}

              <Link className="Menu Menu2" to={item.path}>
                <span className="menu_img ">
                  <img
                    className=""
                    src={process.env.PUBLIC_URL + item.imgPath}
                    alt=""
                  />
                </span>
                <br />
                {item.title}
              </Link>
            </li>
          ))}

          {midData && (
            <div className="borderlinesidebar">
              <hr className="borderline" />
            </div>
          )}
        </ul>
      </div>
    </>
  );
}
