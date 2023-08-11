import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { Menu } from "@mui/material";
// import useWebSocket, { ReadyState } from 'react-use-websocket';
import { getUserDetails, logout } from "../../redux/actions/auth-actions";
import { listAllCompanies } from "../../redux/actions/Workflow-company-action";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";
import moment from "moment";
import {
  listAllcount,
  listAllAgencycount,
  updateAllAgencycount,
  Deletenotification,
} from "../../redux/actions/Notification-action";
import Button from "@mui/material/Button";

import Fade from "@mui/material/Fade";
//SUPER ADMIN
import { listAllAdminCompanies } from "../../redux/actions/company-actions";

export default function Header(props) {
  const dispatch = useDispatch();
  const [count, setcount] = useState("");
  const [notificationId, setNotificationId] = useState("");
  const [isOpenCompany, setIsOpenCompany] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const [isOpenCompanyDropdown, setIsOpenCompanyDropdown] = useState(true);
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [profile_img, setProfileImage] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [anchorElInProgress, setAnchorElInProgress] = useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);
  const [oldcount, setOldcount] = useState("");
  const [newcount, setNewcount] = useState("");
  const [first, setFirst] = useState(false);
  const menuRef = useRef(null);
  const companyRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClickNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    const formData = new FormData();
    if(props.headerCompany){
      formData.append("company_id",  props.headerCompany)
    }else{
      formData.append("company_id",  "")
    }
    if (notificationId) {
      dispatch(updateAllAgencycount(notificationId,formData));
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { userData } = useSelector((state) => state.authReducer);

  const { user, successDetails } = useSelector(
    (state) => state.userDetailsReducer
  );
  const { updateagencyCountData, success: successupdateCount } = useSelector(
    (state) => state.updateAllAgencycountReducer
  );
  const {
    // jobData,
    agencyJobData,
    loading: jobListLoading,
  } = useSelector((state) => state.agencyJobReducer);
  const { CountData, success } = useSelector((state) => state.CountReducer);

  const { Countlist } = useSelector((state) => state.CountReducer);

  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    // 👇️ toggle isActive state variable
    setIsActive((current) => !current);
  };
  const { companyData } = useSelector((state) => state.agencyCompanyReducer);
  const { agencyCountData, success: successCount } = useSelector(
    (state) => state.listAllAgencycountReducer
  );

  // const { memberInviteAdmin, success: successCompanyList } = useSelector(
  //   (state) => state.memberAdminInviteListReducer
  // );

  const { memberCompanyAdmin, success: successCompanyList } = useSelector(
    (state) => state.memberAdminCompanyListReducer
  );

  useEffect(() => {
    const handler = () => {
      setIsOpenCompany(false);
    };
    // window.addEventListener("scroll", handler);
    // return () => {
    //   window.removeEventListener("scroll", handler);
    // };
  }, []);

  const [rowadd, setrowadd] = useState([]);

  const removesampleFile = (file) => () => {
    const newfileGallery = [...rowadd];
    newfileGallery.splice(newfileGallery.indexOf(file), 1);
    setrowadd(newfileGallery);
    dispatch(Deletenotification(file.id, userData?.user?.user_id));
  };

  useEffect(() => {
    let myArr = [];
    if (agencyCountData?.data.length) {
    setrowadd(agencyCountData?.data);
    }
  }, [successCount, props.headerCompany]);

  useEffect(() => {
    dispatch(memberAdminCompanyListAction());
  }, []);

  useEffect(() => {
    setNotificationId(agencyCountData?.data[0]?.id);
  }, [successCount, props.headerCompany]);

  // useEffect(() => {
  //   dispatch(listAllcount());
  //   // setcount(CountData);
  // }, [success]);

  useEffect(() => {
    if (memberCompanyAdmin && userData?.user?.role === 3) {
      props.setHeaderCompany(memberCompanyAdmin[0]?.company);
      setCompanyName(memberCompanyAdmin.company__name);
    }
  }, [successCompanyList]);

  useEffect(() => {
    if (companyData && userData?.user?.role === 2) {
      const findCompanyName = companyData.find(
        (item) => item.id === props.headerCompany
      );
      if (findCompanyName && findCompanyName.name) {
        setCompanyName(findCompanyName.name);
      } else {
        setCompanyName();
      }
    }
  }, [companyData, props.headerCompany, openMenuInProgress]);

  useEffect(() => {
    if (userData?.user?.role === 3 && props.headerCompany) {
      dispatch(
        listAllAgencycount(userData?.user?.user_id, 0, props.headerCompany)
      );
    } else {
      if (props.headerCompany) {
        dispatch(
          listAllAgencycount(userData?.user?.user_id, 0, props.headerCompany)
        );
      } else {
        dispatch(listAllAgencycount(userData?.user?.user_id, 0));
      }
    }
  }, [successupdateCount, props.headerCompany]);

  useEffect(() => {
    let beforecount = agencyCountData?.count;
    setcount(beforecount);
  }, [successCount, props.headerCompany]);

  const chatSocket = new WebSocket(
    "wss://" +
      "dev-ws.adifect.com" +
      "/ws/notifications/" +
      userData?.user?.user_id +
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

  useEffect(() => {
    if (memberCompanyAdmin && userData?.user?.role === 3) {
      const findCompanyName = memberCompanyAdmin.find(
        (item) => item.company === props.headerCompany
      );
      if (findCompanyName && findCompanyName.company__name) {
        setCompanyName(findCompanyName.company__name);
      }
    }
  }, [memberCompanyAdmin, props.headerCompany, openMenuInProgress]);

  const handleCloseCompany = () => {
    setAnchorElInProgress(null);
  };

  //--------------------SUPER ADMIN NEW CODE START---------------------------------
  const {
    companiesData: adminCompanies,
    loading: companyLoading,
    success: companiesListSuccess,
  } = useSelector((state) => state.companyAdminReducer);

  useEffect(() => {
    if (adminCompanies && userData?.user?.role === 0) {
      const findCompanyName = adminCompanies.find(
        (item) => item.id === props.headerCompany
      );
      if (findCompanyName && findCompanyName.name) {
        setCompanyName(findCompanyName.name);
      } else {
        setCompanyName();
      }
    }
  }, [adminCompanies, props.headerCompany, openMenuInProgress]);

  useEffect(() => {
    if (userData?.user?.role === 0) {
      dispatch(listAllAdminCompanies());
    }
  }, []);

  //----------------------SUPER ADMIN NEW CODE START---------------------------------

  const menuHandleCompany = (event, value, name) => {
    handleCloseCompany();
    props.setHeaderCompany(value);
  };

  const menuHandleCompanyMember = (event, value, name) => {
    handleCloseCompany();
    props.setHeaderCompany(value);
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

  useEffect(async () => {
    if (userData?.user?.role === 2) {
      await dispatch(listAllCompanies());
    }

    await dispatch(getUserDetails());
    if (successDetails) {
      setProfileImage(user?.profile_img);
    }
  }, [dispatch, successDetails]);

  const logoutHandler = () => {
    props.setHeaderCompany(null);
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
  function restrictUsersOtherThanMember() {
    if (userData?.user?.role !== 3) {
      // Other than agency user
      return false;
    }
    return true;
  }
  // -----------------------------SUPER ADMIN START----------------------------------------------

  function restrictUsersOtherThanSuperAdmin() {
    if (userData?.user?.role !== 0) {
      // Other than superadmin user
      return false;
    }
    return true;
  }
  // -----------------------------SUPER ADMIN END----------------------------------------------

  return (
    <>
      <div className="mainDiv">
        <div className="header">
          <div className="logo">
            {/*<Link to="/home">*/}
            <img
              className="openbtn logoimg"
              onClick={openNav}
              style={{ display: "none" }}
              src={process.env.PUBLIC_URL + "/img/logonew.svg"}
              alt=""
            />
            {/* </Link> */}
            {/* <button
              className="openbtn"
              onClick={openNav}
              style={{ display: "none" }}
            >
              ☰{" "}
            </button> */}
          </div>
          <div className="loginRight">
            <li
              style={{ color: "#a0a0a0", marginRight: "5px", fontSize: "15px" }}
            >
              {companyName}
            </li>
            <li className="icon1" ref={companyRef} onClick={handleClickCompany}>
              {/* <Link to=""> */}
              {/* <img src={process.env.PUBLIC_URL + "/img/icon.png"} alt="" /> */}

              {userData?.user?.role !== 1 && (
                <img
                  src={process.env.PUBLIC_URL + "/img/Company-Vector.png"}
                  alt="Company-Vector"
                />
              )}

              {/* </Link> */}
              {restrictUsersOtherThanAgency() && (
                <>
                  <Menu
                    id="long-menu"
                    MenuProps={menuProps}
                    anchorEl={anchorElInProgress}
                    keepMounted
                    open={openMenuInProgress}
                    onClose={handleCloseCompany}
                  >
                    {/* <Menu
                          id="long-menu"
                          MenuProps={menuProps}
                          anchorEl={anchorElInProgress}
                          keepMounted
                          open={openMenuInProgress}
                          onClose={handleCloseCompany}
                        > */}
                    <MenuItem onClick={(e) => menuHandleCompany(e, null)}>
                      All Companies
                    </MenuItem>
                    {companyData?.map(
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
                    )}
                  </Menu>
                </>
              )}

              {restrictUsersOtherThanMember() && (
                <>
                  <Menu
                    id="long-menu"
                    MenuProps={menuProps}
                    anchorEl={anchorElInProgress}
                    keepMounted
                    open={openMenuInProgress}
                    onClose={handleCloseCompany}
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
                    {memberCompanyAdmin?.map((option) => (
                      <MenuItem
                        key={option.company}
                        // onClick={menuHandleCompany}
                        onClick={(e) =>
                          menuHandleCompanyMember(
                            e,
                            option.company,
                            option.company__name
                          )
                        }
                      >
                        {option.company__name}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}

              {restrictUsersOtherThanSuperAdmin() && (
                <>
                  <Menu
                    id="long-menu"
                    MenuProps={menuProps}
                    anchorEl={anchorElInProgress}
                    keepMounted
                    open={openMenuInProgress}
                    onClose={handleCloseCompany}
                  >
                    <MenuItem onClick={(e) => menuHandleCompanyMember(e, null)}>
                      All Companies
                    </MenuItem>
                    {adminCompanies?.map(
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
                    )}
                  </Menu>
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
              <Link
                className="agencyCountDataDesDiv"
                //  to={`/jobs/details/${item.id}`}
                to="#"
              >
                <div onClick={handleClickNotifications}>
                  <img
                    src={process.env.PUBLIC_URL + "/img/Vector.png"}
                    alt=""
                    onClick={handleClick}
                    title="notification"
                  />
                  {!open && (
                    // first && count &&
                    <span className="agencyCountDataDes">{count}</span>
                  )}
                </div>
                {rowadd && (
                  <>
                    <div className="topmenunavbar">
                      {open && (
                        // first && count &&
                        <span className="agencyiconsec">
                          {" "}
                          <img
                            className="headericonimg"
                            src="/img/bakimgh2.png"
                          />
                        </span>
                      )}

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
                                        {item?.notification}{" "}
                                        {moment(item?.created).format(
                                          "DD MMM, YYYY, h:mm"
                                        )}
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
