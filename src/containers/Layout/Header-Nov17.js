import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { getUserDetails, logout } from "../../redux/actions/auth-actions";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";

export default function Header(props) {
  const dispatch = useDispatch();

  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isOpenCompanyDropdown, setIsOpenCompanyDropdown] = useState(true);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [profile_img, setProfileImage] = useState([]);

  const menuRef = useRef(null);
  const companyRef = useRef(null);

  const { userData } = useSelector((state) => state.authReducer);

  const { user, successDetails } = useSelector(
    (state) => state.userDetailsReducer
  );

  const { companyData } = useSelector((state) => state.agencyCompanyReducer);

  useEffect(() => {
    const handler = () => {
      setIsOpenCompany(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const toggleClass = (e) => {
    if (
      menuRef.current &&
      showDropdown &&
      !menuRef.current.contains(e.target)
    ) {
      setShowDropdown(false);
      // setShowDropdown(!showDropdown);
      // } else {
      //   setShowDropdown(true);
      // }
    }
    // setShowDropdown(!showDropdown);
  };
  document.addEventListener("mousedown", toggleClass);

  const toggleCompanyClass = (e) => {
    if (
      companyRef.current &&
      showCompanyDropdown &&
      !companyRef.current.contains(e.target)
    ) {
      setTimeout(function () {
        setShowCompanyDropdown(false);
      }, 1200);
    }
  };
  document.addEventListener("mousedown", toggleCompanyClass);

  useEffect(async () => {
    await dispatch(listAllCompanies());

    await dispatch(getUserDetails());
    if (successDetails) {
      setProfileImage(user?.profile_img);
    }
  }, [dispatch, successDetails]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function restrictUsers() {
    if (userData?.user?.role === 1) {
      // Creator
      return false;
    }
    if (userData?.user?.role === 3 && userData?.user?.user_level !== 1) {
      // Member Agency other than MEMBER ADMIN
      return false;
    }
    return true;
  }

  function restrictUsersOtherThanAgency() {
    if (userData?.user?.role !== 2) {
      // Other than agency user
      return false;
    }
    return true;
  }

  return (
    <>
      <div className="mainDiv">
        <div className="header">
          {/* <div className="logo">
            <Link to="/home">
              <img
                className="logoimg"
                src={process.env.PUBLIC_URL + "/img/logonew.svg"}
                alt=""
              />
            </Link>
            <button
              className="openbtn"
              onClick={openNav}
              style={{ display: "none" }}
            >
              ☰{" "}
            </button>
          </div> */}
          <div className="loginRight">
            <li
              style={{ color: "#a0a0a0", marginRight: "5px", fontSize: "15px" }}
            >
              {companyName ? `${companyName}` : "All "}
            </li>
            <li
              className="icon1"
              ref={companyRef}
              onClick={() => {
                setShowCompanyDropdown(true);
                setIsOpenCompanyDropdown(true);
              }}
            >
              <Link to="#">
                {/* <img src={process.env.PUBLIC_URL + "/img/icon.png"} alt="" /> */}
                <img
                  src={process.env.PUBLIC_URL + "/img/Company-Vector.png"}
                  alt=""
                />
              </Link>
              {restrictUsersOtherThanAgency() && (
                <>
                  {showCompanyDropdown && (
                    <>
                      <div className="loginsigin header_company_dropdown">
                        {/* <MenuItem value={null}>Select Company</MenuItem>
                        {companyData?.map((item) =>
                          item.is_active ? (
                            <MenuItem key={item.id} value={item.id}>
                              {item?.name}
                            </MenuItem>
                          ) : null
                        )} */}
                        <Select
                          className={
                            props.headerCompany === null
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
                          open={isOpenCompanyDropdown}
                          onOpen={() => {
                            setIsOpenCompanyDropdown(true);
                          }}
                          onClose={() => {
                            setIsOpenCompanyDropdown(false);
                          }}
                          MenuProps={menuProps}
                          value={props.headerCompany}
                          onChange={(e) => {
                            props.setHeaderCompany(e.target.value);
                            setShowCompanyDropdown(false);
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value={null}>Select Company</MenuItem>
                          {companyData?.map((item) =>
                            item.is_active ? (
                              <MenuItem key={item.id} value={item.id}>
                                {item?.name}
                              </MenuItem>
                            ) : null
                          )}
                        </Select>
                      </div>
                    </>
                  )}
                </>
              )}
            </li>

            <li className="ml-7 icon2">
              <Link to="#">
                <img
                  src={process.env.PUBLIC_URL + "/img/Emailicon.png"}
                  alt=""
                />
              </Link>
            </li>
            <li className="ml-7 nots">
              <Link className="vector" to="#">
                <img src={process.env.PUBLIC_URL + "/img/Vector.png"} alt="" />
              </Link>
            </li>
            <li
              className="ml-7 johndoe"
              ref={menuRef}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Link className="LoginName dropdown" to="#">
                <span className="header-profile-pic">
                  {user?.profile_img && (
                    <img src={user?.profile_img} alt="Profile Picture" />
                  )}
                  {!user?.profile_img && (
                    <img
                      src={process.env.PUBLIC_URL + "/img/avataruser.png"}
                      alt=""
                    />
                  )}
                  {/* <img
                    src={process.env.PUBLIC_URL + "/img/loginimg.png"}
                    alt=""
                  /> */}
                </span>
                <span className="loginName ml-1">
                  {userData?.user?.first_name} {userData?.user?.last_name}
                </span>
                <i className="fa fa-caret-down dropdown"></i>
              </Link>
              {showDropdown && (
                <>
                  <div className="loginsigin">
                    <li>
                      <Link to="/profile">
                        <img
                          className="mr-2 logout"
                          src={process.env.PUBLIC_URL + "/img/profile.png"}
                          alt=""
                        />
                        Profile
                      </Link>
                    </li>
                    {restrictUsers() && (
                      <>
                        <li>
                          <Link to="/invite">
                            <img
                              className="mr-2 logout"
                              src={process.env.PUBLIC_URL + "/img/Projects.png"}
                              alt=""
                            />
                            Invite
                          </Link>
                        </li>
                      </>
                    )}
                    <li onClick={logoutHandler}>
                      <Link to="/">
                        <img
                          className="mr-2 logout"
                          src={process.env.PUBLIC_URL + "/img/logout.png"}
                          alt=""
                        />
                        Logout
                      </Link>
                    </li>
                  </div>
                </>
              )}
            </li>
          </div>
        </div>
      </div>
    </>
  );
}
