import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
// import useWebSocket, { ReadyState } from 'react-use-websocket';

//import mui components
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Menu, Typography } from "@mui/material";
import Fade from "@mui/material/Fade";
import Business from "@mui/icons-material/Business";

//import redux actions
// import { getUserDetails, logout } from "../../redux/actions/auth-actions";
// import { listAllCompanies } from "../../redux/actions/Workflow-company-action";
// import {
//   memberAdminCompanyListAction,
//   memberAdminGetCompanyListAction,
// } from "../../redux/actions/Member-Company-List-Action";
// import {
//   listAllAgencycount,
//   updateAllAgencycount,
//   Deletenotification,
// } from "../../redux/actions/Notification-action";

//SUPER ADMIN
// import { listAllAdminCompanies } from "../../redux/actions/company-actions";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { Images } from "helper/images";
import CustomPopup from "../customPopup/CustomPopup";
import { GET_USER_DETAILS } from "redux/actions/auth/auth.actions";
import {
  ArrowDropDownOutlined,
  DescriptionOutlined,
  MailOutline,
  NotificationsNone,
  Person,
  PowerSettingsNewOutlined,
} from "@mui/icons-material";
import { ActionTypes } from "helper/actions";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { GET_NOTIFICATION_DATA } from "redux/reducers/common/notification.slice";
import { GET_NOTIFICATIONS_LIST } from "redux/actions/common/notification.actions";
import { Roles } from "helper/config";

// Import lazy load component
const Logo = lazy(() => import("components/common/logo/Logo"));
const SidebarToggle = lazy(
  () => import("components/common/header/SidebarToggle")
);

export default function Header(props) {
  const dispatch = useAppDispatch();
  const [count, setcount] = useState("");
  const [notificationId, setNotificationId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [openLogoutPopup, setOpenLogoutPopup] = useState(false);

  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  // const [companyName, setCompanyName] = useState<string>("");
  const [anchorElInProgress, setAnchorElInProgress] = useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);
  const menuRef = useRef(null);
  const companyRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    const formData = new FormData();
    if (props.headerCompany) {
      formData.append("company_id", props.headerCompany);
    } else {
      formData.append("company_id", "");
    }
    if (notificationId) {
      // dispatch(updateAllAgencycount(notificationId, formData));
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // -------------------------comapny Show Reducer Member--------------------------------
  // const {
  //   memberAdminCompanyData,
  //   loading: memberAdminLoading,
  //   success: memberSuccessCompanyList,
  // } = useAppSelector((state) => state.memberAdminGetCompanyListReducer);
  // -------------------------comapny Show Reducer Member--------------------------------

  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  // const { updateagencyCountData, success: successupdateCount } = useAppSelector(
  //   (state) => state.updateAllAgencycountReducer
  // );
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle isActive state variable
    setIsActive((current) => !current);
  };
  // const { companyData } = useAppSelector((state) => state.agencyCompanyReducer);
  // const { agencyCountData, success: successCount } = useAppSelector(
  //   (state) => state.listAllAgencycountReducer
  // );

  const notificationData = useAppSelector(GET_NOTIFICATION_DATA);
  // const { memberInviteAdmin, success: successCompanyList } = useAppSelector(
  //   (state) => state.memberAdminInviteListReducer
  // );

  const [rowadd, setrowadd] = useState([]);

  const removesampleFile = (file) => () => {
    const newfileGallery = [...rowadd];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setrowadd(newfileGallery);
    // dispatch(Deletenotification(file.id, userProfile?.data?.id));
  };

  // ----------------------------action------------------------------------c
  // useEffect(() => {
  //   dispatch(memberAdminGetCompanyListAction());
  //   // SetCompanyUpdate(false)
  // }, []);

  // ----------------------------action------------------------------------

  // useEffect(() => {
  //   let myArr = [];
  //   if (?.data?.length) {
  //     setrowadd(notificationData?.agencyCountData?.data);
  //   }
  // }, [successCount, props.headerCompany]);

  // useEffect(() => {
  //   dispatch(memberAdminCompanyListAction());
  // }, []);

  // useEffect(() => {
  //   setNotificationId(notificationDataagencyCountData?.data?.[0]?.id);
  // }, [successCount, props.headerCompany]);

  // useEffect(() => {
  //   // set for Member user
  //   if (memberAdminCompanyData && userProfile?.data?.role === 3) {
  //     props.setHeaderCompany(memberAdminCompanyData[0]?.company_id);
  //     setCompanyName(memberAdminCompanyData[0]?.name);
  //   }
  // }, [memberSuccessCompanyList]);

  // useEffect(() => {
  //   if (companyData?.length > 0 && userProfile?.data?.role === 2) {
  //     const findCompanyName = companyData?.find(
  //       (item) => item.id === props.headerCompany
  //     );
  //     if (findCompanyName && findCompanyName.name) {
  //       setCompanyName(findCompanyName.name);
  //     } else {
  //       setCompanyName("");
  //     }
  //   }
  // }, [companyData, props.headerCompany, openMenuInProgress]);
  useSingleEffect(() => {
    if (!userProfile?.data?.id) {
      dispatch(GET_USER_DETAILS());
    }
  });

  useUpdateEffect(() => {
    if (userProfile?.data?.id) {
      dispatch(
        GET_NOTIFICATIONS_LIST(
          userProfile?.data?.id,
          0,
          props.headerCompany,
          userProfile?.data?.role
        )
      );
    }
  }, [userProfile?.data?.id]);

  useEffect(() => {
    if (userProfile?.data?.role === Roles?.MEMBER && props.headerCompany) {
    }

    // else {
    //   if (props.headerCompany) {
    //     dispatch(
    //       GET_NOTIFICATIONS_LIST(userProfile?.data?.id, 0, props.headerCompany)
    //     );
    //   } else {
    //     dispatch(GET_NOTIFICATIONS_LIST(userProfile?.data?.id, 0));
    //   }
    // }
  }, [props.headerCompany]);

  useEffect(() => {
    let beforecount = notificationData?.agencyCountData?.count;
    setcount(beforecount);
  }, [notificationData?.hasData, props.headerCompany]);

  const chatSocket = new WebSocket(
    "wss://" +
      "dev-ws.adifect.com" +
      "/ws/notifications/" +
      userProfile?.data?.id +
      "/"
  );

  chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);

    if (data && data?.data?.value) {
      let newStr1 = data.data.value.text.count;
      setcount(newStr1);
    }

    // let newStr = data.data.value.replace("/", "");
    // let newarr = newStr.split(",");
    // let updatedarray = newarr[0].replace("{", "");
    // let updated = updatedarray.split(":");
    // console.log("abc---",updated)
    // setcount(updated[1]);
    // document.querySelector('#chat-log').value += (data.message + '\n');
    // console.log("updatedd--", updated[1]?.data?.value?.text?.count);
  };

  chatSocket.onclose = function (e) {
    // console.error("Chat socket closed unexpectedly");
  };

  // useEffect(() => {
  //   // Set for member user
  //   if (memberAdminCompanyData && userProfile?.data?.role === 3) {
  //     const findCompanyName = memberAdminCompanyData.find(
  //       (item) => item.company_id === props.headerCompany
  //     );
  //     if (findCompanyName && findCompanyName.name) {
  //       setCompanyName(findCompanyName.name);
  //     }
  //   }
  // }, [memberAdminCompanyData, props.headerCompany, openMenuInProgress]);

  const handleCloseCompany = () => {
    setAnchorElInProgress(null);
  };

  //--------------------SUPER ADMIN NEW CODE START---------------------------------
  // const {
  //   companiesData: adminCompanies,
  //   loading: companyLoading,
  //   success: companiesListSuccess,
  // } = useAppSelector((state) => state.companyAdminReducer);

  // useEffect(() => {
  //   // Set for Admin user
  //   if (adminCompanies && userProfile?.data?.role === 0) {
  //     const findCompanyName = adminCompanies.find(
  //       (item) => item.id === props.headerCompany
  //     );
  //     if (findCompanyName && findCompanyName.name) {
  //       setCompanyName(findCompanyName.name);
  //     } else {
  //       setCompanyName("");
  //     }
  //   }
  // }, [adminCompanies, props.headerCompany, openMenuInProgress]);

  // useEffect(() => {
  //   if (userProfile?.data?.role === 0) {
  //     dispatch(listAllAdminCompanies());
  //   }
  // }, []);

  //----------------------SUPER ADMIN NEW CODE START---------------------------------

  const menuHandleCompany = (event, value, name) => {
    handleCloseCompany();
    // props.setHeaderCompany(value);
  };

  const menuHandleCompanyMember = (event, value, name) => {
    handleCloseCompany();
    // props.setHeaderCompany(value);
  };

  const handleClickCompany = (event) => {
    setAnchorElInProgress(event.currentTarget);
    if (openMenuInProgress) {
      setAnchorElInProgress(null);
    }
  };

  const menuProps = {
    variant: "menu",
    // disableScrollLock: true,
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

  // useEffect(() => {
  //   const callThis = () => {
  //     if (userProfile?.data?.role === 2) {
  //       // dispatch(listAllCompanies());
  //     }

  //     // dispatch(GET_USER_DETAILS());
  //   };
  //   callThis();
  // }, [dispatch]);

  //handle logout popup and actinon
  const logoutHandler = () => {
    setOpenLogoutPopup(false);
    // props.setHeaderCompany(null);
    // dispatch(logout());
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userData");
    dispatch({ type: ActionTypes.DESTROY_SESSION });
    // navigate(MAIN_ROUTE.HOME, { replace: true, state: true });
  };

  const handleOpenLogoutPopup = () => {
    setShowDropdown(false);
    setOpenLogoutPopup(true);
  };

  const handleCloseLogoutPopup = () => {
    setShowDropdown(false);
    setOpenLogoutPopup(false);
  };

  function openNav() {
    document.getElementById("mySidepanel").style.width = "250px";
  }

  function restrictUsers() {
    if (userProfile?.data?.role === 1) {
      // Creator
      return false;
    }
    if (userProfile?.data?.role === 3 && userProfile?.data?.user_level !== 1) {
      // Member Agency other than MEMBER ADMIN
      return false;
    }
    return true;
  }
  function restrictUsersOtherThanAgency() {
    if (userProfile?.data?.role !== 2) {
      // Other than agency user
      return false;
    }
    return true;
  }
  function restrictUsersOtherThanMember() {
    if (userProfile?.data?.role !== 3) {
      // Other than agency user
      return false;
    }
    return true;
  }
  // -----------------------------SUPER ADMIN START----------------------------------------------

  function restrictUsersOtherThanSuperAdmin() {
    if (userProfile?.data?.role !== 0) {
      // Other than superadmin user
      return false;
    }
    return true;
  }
  // -----------------------------SUPER ADMIN END----------------------------------------------

  return (
    <div className="header">
      <div className="logo h-[40px] max-w-[100px] xs:max-w-[200px] lg:max-w-[250px] w-full pl-3 pr-0 md:px-4">
        <Suspense fallback={""}>
          <Logo />
        </Suspense>
      </div>
      <div className="px-4 py-3 flex justify-between items-center w-full shadow-[0px_4px_10px_-9px_#d6d6d6]">
        <SidebarToggle />
        <ul className="loginRight flex items-center justify-end ml-auto gap-5 [&>:not(:last-child)]:hidden [&>:not(:last-child)]:md:block">
          {/* View company list dropdown  */}

          {/* <li style={{ color: "#a0a0a0", marginRight: "5px", fontSize: "15px" }}>
          {companyName}
          company name
        </li> */}
          <li className="icon1" ref={companyRef} onClick={handleClickCompany}>
            {userProfile?.data?.role !== 1 && (
              <Business
                sx={{
                  "&.MuiSvgIcon-root ": {
                    color: "#71757B",
                  },
                }}
              />
            )}
            {restrictUsersOtherThanAgency() && (
              <>
                <Menu
                  id="long-menu"
                  MenuListProps={{ variant: "menu" }}
                  anchorEl={anchorElInProgress}
                  keepMounted
                  open={openMenuInProgress}
                  onClose={handleCloseCompany}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                >
                  {/* <Menu
                          id="long-menu"
                          MenuProps={menuProps}
                          anchorEl={anchorElInProgress}
                          keepMounted
                          open={openMenuInProgress}
                          onClose={handleCloseCompany}
                        > */}
                  <MenuItem
                    onClick={(e) => menuHandleCompany(e, "value", "name")}
                  >
                    All Companies
                  </MenuItem>
                  {/* {companyData?.length > 0 &&
                      companyData?.map(
                        (option) =>
                          option.is_active && (
                            <MenuItem
                              key={option.id}
                              // onClick={menuHandleCompany}
                              onClick={(e) =>
                                menuHandleCompany(e, option.id, option.name)
                              }
                            >
                              {option.name}
                            </MenuItem>
                          )
                      )} */}
                </Menu>
              </>
            )}

            {restrictUsersOtherThanMember() && (
              <>
                <Menu
                  id="long-menu"
                  MenuListProps={{ variant: "menu" }}
                  anchorEl={anchorElInProgress}
                  keepMounted
                  open={openMenuInProgress}
                  onClose={handleCloseCompany}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                >
                  {/* <Menu
                          id="long-menu"
                          MenuProps={menuProps}
                          anchorEl={anchorElInProgress}
                          keepMounted
                          open={openMenuInProgress}
                          onClose={handleCloseCompany}
                        > */}
                  {/* <MenuItem onClick={(e) => menuHandleCompany(e, null)}>
                      All Companies
                    </MenuItem> */}
                  {/* {memberAdminCompanyData?.map((option) => (
                      <MenuItem
                        key={option.company_id}
                        // onClick={menuHandleCompany}
                        onClick={(e) =>
                          menuHandleCompanyMember(
                            e,
                            option.company_id,
                            option.name
                          )
                        }
                      >
                        {option.name}
                      </MenuItem>
                    ))} */}
                </Menu>
              </>
            )}

            {restrictUsersOtherThanSuperAdmin() && (
              <>
                <Menu
                  id="long-menu"
                  MenuListProps={{ variant: "menu" }}
                  anchorEl={anchorElInProgress}
                  keepMounted
                  open={openMenuInProgress}
                  onClose={handleCloseCompany}
                  transformOrigin={{
                    horizontal: "right",
                    vertical: "top",
                  }}
                  anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom",
                  }}
                >
                  <MenuItem
                    onClick={(e) => menuHandleCompanyMember(e, "value", "name")}
                  >
                    All Companies
                  </MenuItem>
                  {/* {adminCompanies?.map(
                      (option) =>
                        option.is_active && (
                          <MenuItem
                            key={option.company}
                            // onClick={menuHandleCompany}
                            onClick={(e) =>
                              menuHandleCompanyMember(e, option.id, option.name)
                            }
                          >
                            {option.name}
                          </MenuItem>
                        )
                    )} */}
                </Menu>
              </>
            )}
          </li>

          {/* View Email  */}
          <li className="icon2">
            <MailOutline
              sx={{
                "&.MuiSvgIcon-root ": {
                  color: "#71757B",
                },
              }}
            />
          </li>

          {/* View Notification dropdown  */}
          <li className="nots">
            <Link
              className="agencyCountDataDesDiv"
              //  to={`/jobs/details/${item.id}`}
              to="#"
            >
              <div onClick={handleClickNotifications} className="relative">
                <IconButton
                  onClick={handleClick}
                  title="notification"
                  className="p-0"
                  sx={{
                    "&.MuiIconButton-root": {
                      p: 0,
                      "&:hover": {
                        background: "transparent",
                      },
                    },
                  }}
                >
                  <NotificationsNone />
                </IconButton>
                {!open && (
                  // first && count &&
                  <span className="notification-count">{count ?? 0}</span>
                )}
              </div>
              {rowadd && (
                <>
                  <div className="topmenunavbar">
                    {/* {open && (
                    // first && count &&
                    <span className="agencyiconsec">
                      {" "}
                      <img className="headericonimg" src="/img/bakimgh2.png" />
                    </span>
                  )} */}

                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                      className="notificationheaddiv"
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >
                      {rowadd?.slice(0, 3).map((item, index) => (
                        <MenuItem className="notmenutop" key={item?.id}>
                          {item.notification_type != "invite_accepted" && (
                            <>
                              <div className="notdivnew">
                                <Link
                                  to={
                                    item.notification_type == "asset_uploaded"
                                      ? `/media`
                                      : `/jobs/details/${item.redirect_id}`
                                  }
                                >
                                  <div className="notdivnew1">
                                    <img
                                      className="userimg1"
                                      src="/img/userimg2.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="notdivnew2">
                                    <h3>
                                      {item?.notification} {item?.created}
                                      {/* {moment(item?.created).format(
                                          "DD MMM, YYYY, h:mm"
                                        )} */}
                                    </h3>
                                  </div>
                                </Link>
                                <div className="notdivnew3">
                                  <i
                                    onClick={removesampleFile(item)}
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>

                              {/* <Link to={`/jobs/details/${item.redirect_id}`}>
                                  <span className="notificationitme">
                                    <img
                                      className="userimg1"
                                      src="/img/userimg2.png"
                                      alt=""
                                    />
                                    {item?.notification.substring(0, 30)}...
                                    {moment(item?.created).format(
                                      "MMM DD, YYYY, h:mm:ss"
                                    )}
                                  </span>
                                  <span className="iconnot">
                                    <i
                                      onClick={removesampleFile(item)}
                                      className="fa fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </Link> */}
                            </>
                          )}
                          {item.notification_type == "invite_accepted" && (
                            <>
                              <Link to={`/invite}`}>
                                <span className="notificationitme">
                                  {item?.notification}
                                </span>
                              </Link>

                              <span className="iconnot">
                                <i
                                  onClick={removesampleFile(item)}
                                  className="fa fa-times"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </>
                          )}
                        </MenuItem>
                      ))}
                      {rowadd.length > 0 ? (
                        <MenuItem onClick={handleClose}>
                          {" "}
                          <Link className="seeallnotbtn" to="/notifications">
                            See all notifications...
                          </Link>{" "}
                        </MenuItem>
                      ) : (
                        <MenuItem onClick={handleClose}>
                          {" "}
                          <Link className="seeallnotbtn" to="#">
                            No new notifications...
                          </Link>{" "}
                        </MenuItem>
                      )}
                    </Menu>
                  </div>
                </>
              )}
            </Link>
            {/* <span>{count}</span>
              {isActive && (
                <>
                  <>
                    <div>
                      {Countlist?.slice(0, 4).map((item) => (
                        <>
                          <p>{item.notification}</p>
                        </>
                      ))}
                    </div>
                  </>
                </>
              )} */}
          </li>
          <li
            className="relative"
            ref={menuRef}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Link className="LoginName dropdown flex items-center" to="#">
              <span className="header-profile-pic max-w-[40px] w-full h-[40px]">
                {!userProfile?.data?.profile_img && (
                  <img
                    src={
                      !userProfile?.data?.profile_img
                        ? Images?.UserAvatar
                        : userProfile?.data?.profile_img
                    }
                    alt=""
                  />
                )}
              </span>
              <span className="loginName ml-1">
                {userProfile?.data?.first_name ?? "Invalid First Name"}{" "}
                {userProfile?.data?.last_name ?? "Invalid Last Name"}
              </span>
              <ArrowDropDownOutlined />
            </Link>
            {showDropdown && (
              <>
                <div className="loginsigin">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center text-dark-400 hover:text-theme py-2"
                    >
                      <Person className="mr-2" />
                      Profile
                    </Link>
                  </li>
                  {restrictUsers() && (
                    <>
                      <li>
                        <Link
                          to="/invite"
                          className="flex items-center text-dark-400 hover:text-theme py-2"
                        >
                          <DescriptionOutlined className="mr-2" /> Invite
                        </Link>
                      </li>
                    </>
                  )}
                  <li onClick={handleOpenLogoutPopup}>
                    <div className="flex items-center text-dark-400 hover:text-theme py-2 cursor-pointer">
                      <PowerSettingsNewOutlined className="mr-2" />
                      Logout
                    </div>
                  </li>
                </div>
              </>
            )}
          </li>
          <CustomPopup
            dialogTitle="Logout"
            // setShowDropDown={setShowDropdown}
            dialogContent={
              <>
                <img
                  className="mx-auto mb-5"
                  src={Images?.LogoutPopupVector}
                  alt="logout"
                />
                <div>
                  <h4 className="mb-3 font-semibold text-lg">Are you Sure?</h4>
                  <p className="max-w-[350px] w-full mx-auto text-base">
                    Do you really want to logout this account? This process
                    cannot be undone.
                  </p>
                </div>
              </>
            }
            openPopup={openLogoutPopup}
            closePopup={handleCloseLogoutPopup}
            mainActionHandler={logoutHandler}
            mainActionTitle="Logout"
          />
        </ul>
      </div>
    </div>
  );
}
