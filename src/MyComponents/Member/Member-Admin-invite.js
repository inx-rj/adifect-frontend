import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import api from "../../utils/api";
// import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import { useOutletContext } from "react-router-dom";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import {
  AllInvite,
  getinviteDetails,
  updateInvite,
} from "../../redux/actions/invite-actions";

import { listAllCompanies } from "../../redux/actions/company-actions";
import { CompanyInviteProflePostAction } from "../../redux/actions/invite-actions";
import { COMPANY_INVITE_PROFILE_POST_RESET } from "../../constants/invite-constants";
import {
  memberAdminInviteListAction,
  memberAdminInviteLisDeldetetAction,
  memberAdminInvitePostAction,
  memberAdminInviteUpdateAction,
} from "../../redux/actions/Member-Admin-Invite-List-Action";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";
import { MEMBER_ADMIN_INVITE_POST_RESET } from "../../constants/Member-Admin-Invite-list-Constants";

export default function Member_Admin_invite() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [isOpen11, setIsOpen11] = useState(false);
  const [usersForRender, setUsersForRender] = useState([]);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [nametitle, setNametitle] = useState(false);
  const [companyvalue, setcompanyvalue] = useState(null);
  const [levelvalue, setlevelvalue1] = useState(1);
  const [agencyId, setAgencyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [headerCompany, setHeaderCompany] = useOutletContext();

  const [renderPage, setRenderPage] = useState(false);

  // const { inviteData, loading: draftJobsLoading } = useSelector(
  //   (state) => state.AllInviteReducer
  // );

  // const { success: successUpdate, error: errorUpdate } = useSelector(
  //   (state) => state.InviteUpdateReducer
  // );
  const { success: successUpdate, error: errorUpdate } = useSelector(
    (state) => state.memberAdminInviteListUpdateReducer
  );

  const {
    success: successInvite,
    error: errorInvite,
    inviteMsg,
  } = useSelector((state) => state.CompanyInviteProflePostReducer);
  const {
    success: successInvitePost,
    error: errorInvitePost,
    memberAdminPost,
  } = useSelector((state) => state.memberAdminInviteListPostReducer);

  const {
    memberAdmInviteList,
    success: MemberInviteSuccess,
    error: MemberInviteError,
  } = useSelector((state) => state.memberAdminInviteListReducer);

  //GET THE AGENCY ID IN HEADERS REDUCERS
  const {
    memberCompanyAdmin,
    agecyIdCompany,
    agecyNameCompany,
    success: successCompanyList,
  } = useSelector((state) => state.memberAdminCompanyListReducer);

  // console.log("memberCompanyAdmin",memberCompanyAdmin);
  // console.log("agecyIdCompany",agecyIdCompany);
  // console.log("agecyNameCompany",agecyNameCompany);

  //GET THE AGENCY ID IN HEADERS ACTIONS
  useEffect(() => {
    dispatch(memberAdminCompanyListAction());
  }, []);

  const { companiesData } = useSelector((state) => state.companyReducer);

  const [Level, setLevel] = useState(null);

  const { success } = useSelector((state) => state.InviteDeleteReducer);
  const { success: InviteDeleteSuccess } = useSelector(
    (state) => state.memberAdminInviteListDeleteReducer
  );

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  useEffect(() => {
    dispatch(listAllCompanies());
  }, []);

  useEffect(() => {
    if (headerCompany) {
      dispatch(memberAdminInviteListAction(headerCompany));
    }
  }, [headerCompany, InviteDeleteSuccess, successUpdate, successInvitePost]);

  // useEffect(() => {
  //   dispatch(CompanyInviteProflePostAction());
  // }, []);

  const getvalue = (e) => {
    setcompanyvalue(e.target.value);
    setErrors({ ...errors, company: null });
    // console.log(e.target.value);
    if (e.target.value == "null") {
    }
    if (e.target.value !== "null") {
      //   dispatch(getRelatedJobs(e.target.value));
      //   setShow(true);
      //   const success = api
      //     .get(`${BACKEND_API_URL}agency/works-flow/?company=${e.target.value}`)
      //     .then((res) => {
      //       // console.log(res.data);
      //       setapivalue(res.data);
      //     });
      // } else {
      //   setShow(false);
    }
  };

  const getinvitevalue = (e, id) => {
    setlevelvalue1(e.target.value);
    setErrors({ ...errors, level: null });
    // console.log(e.target.value);
    //   dispatch(getRelatedJobs(e.target.value));
    //   setShow(true);
    //   const success = api
    //     .get(`${BACKEND_API_URL}agency/works-flow/?company=${e.target.value}`)
    //     .then((res) => {
    //       // console.log(res.data);
    //       setapivalue(res.data);
    //     });
    // } else {
    //   setShow(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const [isInviteId, setIsInviteId] = useState();
  const [isUserName, setIsUserName] = useState("");
  // const [isUserLevel, setIsUserLevel] = useState("");
  const handleClickOpen4 = (invite_id, username, level) => {
    setIsInviteId(invite_id);
    setIsUserName(username);
    setlevelvalue1(level);
    setOpen4(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  useEffect(() => {
    // handleClickOpen3();
    const handler = () => {
      setIsOpen9(false);
    };

    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    dispatch(defaultPageLoader());
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const {
    loading: inviteLoading,
    success1,
    inviteDetails,
  } = useSelector((state) => state.inviteDetailsReducer);

  useEffect(() => {
    // handleClickOpen3();
    const handler = () => {
      setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    // handleClickOpen3();
    const handler = () => {
      setIsOpen11(false);
      setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  // useEffect(() => {
  //   dispatch(AllInvite());
  // }, [success, renderPage, successUpdate, successInvite]);

  useEffect(() => {
    if (successUpdate && renderPage) {
      swal({
        title: "Successfully Complete",
        text: "Level Successfully Updated!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setRenderPage(false);
      setIsLoading(false);
      setIsInviteId("");
      setOpen4(false);
      // closePopup();
    }
    if (errorUpdate && renderPage) {
      swal({
        title: "",
        text: "Something went wrong!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      setIsLoading(false);
      setRenderPage(false);
    }
    // dispatch({ type: UPDATE_USERADMIN_RESET });
  }, [successUpdate, errorUpdate]);

  useEffect(() => {
    if (memberAdmInviteList) {
      // console.log("inviteData -- ", inviteData);
      // setNametitle(item.user_name);
      let userData = [];
      memberAdmInviteList?.map((item, index) => {
        item.user = "N/A";
        if (item.user_email) {
          item.user = item.user_name;
        }

        item.status = (
          <div style={{ display: "flex" }}>
            {item.status == 1 ? (
              <div className="active_status">
                <i className="fa fa-check" aria-hidden="true"></i>{" "}
              </div>
            ) : (
              <div className="inactive_status">
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            )}
          </div>
        );

        item.email = item.email;
        // item.name = item.name;
        if (item.user_email) {
          item.email = item.user_email;
        }
        if (item.company_name) {
          item.company = item.company_name;
        }
        item.user_level = item.level;

        if (item.level == 1) {
          item.level = "Admin";
        }
        if (item.level == 2) {
          item.level = "Marketer";
        }
        if (item.level == 3) {
          item.level = "Approver";
        }
        if (item.level == 4) {
          item.level = "In-house Designer";
        }

        item.action = (
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <Button
                title="delete"
                className="Deleteadmininvite"
                onClick={() => deleteHandler(item.id)}
              >
                Delete
              </Button>

              <button
                className="addanewmailnew Editadmininvite"
                type="button"
                onClick={(e) => {
                  handleClickOpen4(
                    item.id,
                    item.user_first_name,
                    item.user_level
                  );
                }}
              >
                {" "}
                Edit
              </button>
            </div>
          </div>
        );
        userData.push(item);
      });
      setUsersForRender(userData);
    }
  }, [memberAdmInviteList]);

  const data = {
    columns: [
      {
        label: "Name",
        field: "user",
        sort: "asc",
        width: 500,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 500,
      },
      {
        label: "Company",
        field: "company",
        sort: "asc",
        width: 500,
      },
      {
        label: "Level",
        field: "level",
        sort: "asc",
        width: 100,
      },

      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 500,
      },

      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: usersForRender,
  };

  const deleteHandler = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to remove this user?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(memberAdminInviteLisDeldetetAction(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully removed!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
      }
    });
  };

  const [email, setemail] = useState("");
  const [userid, setuserid] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    userid: null,
    company: null,
  });

  useEffect(() => {
    dispatch(defaultPageLoader());
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
      // company: !companyvalue && "Please select a company",
      level: !levelvalue && "Please select a level",
    };

    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler();
    setemail("");
    // setIsLoading(true);
  };

  const submitHandler = (e) => {
    setIsLoading(true);
    dispatch(
      memberAdminInvitePostAction({
        email: email,
        agency: agecyIdCompany,
        company: headerCompany,
        levels: levelvalue,
      })
    );
  };

  useEffect(() => {
    if (successInvitePost) {
      swal({
        title: "Successfully Complete",
        text: memberAdminPost,
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 1500,
      });
      setOpen3(false);
    }
    if (errorInvitePost) {
      swal({
        title: "",
        text: errorInvitePost,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
    }
    setemail("");
    setcompanyvalue(null);
    setlevelvalue1(1);

    dispatch({ type: MEMBER_ADMIN_INVITE_POST_RESET });
  }, [successInvitePost, errorInvitePost]);

  // api
  //   .post(`${BACKEND_API_URL}agency/invite-member/`, {
  //     email: email,
  //     agency: userid,
  //     company: companyvalue,
  //     levels: levelvalue,
  //   })
  //   .then((res) => {
  //     setRenderPage(true);
  //   })
  //   .catch((err) => {
  //     swal({
  //       title: "Error",
  //       text: err.response.data.message,
  //       className: "errorAlert",
  //       icon: "/img/ErrorAlert.png",
  //       buttons: false,
  //       timer: 5000,
  //     });
  //     setIsLoading(false);
  //   });

  const levelSubmit = (e) => {
    setIsLoading(true);
    dispatch(
      memberAdminInviteUpdateAction(isInviteId, {
        levels: levelvalue,
      })
    );
    setIsInviteId("");
    setOpen4(false);
    setRenderPage(true);
    // dispatch(AllInvite());
  };

  // useEffect(() => {
  //   if (renderPage) {
  //     swal({
  //       title: "Successfully Complete",
  //       text: "Successfully invited user!",
  //       className: "successAlert",
  //       icon: "/img/SuccessAlert.png",
  //       buttons: false,
  //       timer: 5000,
  //     });
  //     setOpen3(false);
  //     setOpen4(false);
  //     setIsLoading(false);
  //     setcompanyvalue(null);
  //     setemail("");
  //   }
  // }, [renderPage]);

  // useEffect(() => {
  //   if (renderPage) {
  //     swal({
  //       title: "Successfully Complete",
  //       text: "Successfully invited user!",
  //       className: "successAlert",
  //       icon: "/img/SuccessAlert.png",
  //       buttons: false,
  //       timer: 5000,
  //     });
  //     setOpen3(false);
  //     setOpen4(false);
  //     setIsLoading(false);
  //     setlevelvalue1(null);
  //     setemail("");
  //   }
  // }, [renderPage]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(inviteData)} */}
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Invite Member</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage Custompageinvite memberadmininvite ">
            <div className="ContentDiv Categoriesdiv1 draft">
              <div className="Status"></div>
              <div className="savebtn Categorybtn">
                <button
                  className="addanewmail"
                  type="button"
                  onClick={(e) => {
                    handleClickOpen3(e);
                  }}
                >
                  {" "}
                  Invite User{" "}
                </button>
              </div>

              {/* <Button
                className="save_profilepic"
                onClick={(e) => {
                  handleClickOpen3(e);
                }}
              >
                Add a new Mail
              </Button> */}
              <MDBDataTable
                style={{}}
                responsive
                striped
                bordered
                small
                data={data}
              />
            </div>
          </div>

          <Dialog
            className="profileImgDialognew"
            open={open4}
            onClose={handleClose4}
          >
            <DialogContent className="image_and_invitesec">
              <h3 className="leveltext">
                {/* {nametitle}
                {inviteData?.map((item) => {
                  item.user_name;
                })} */}
                {isUserName}
              </h3>

              <div className="userforminput Roleuserpage">
                {/* {JSON.stringify(levelvalue)} */}
                <label>Level Name</label>
                <Select
                  open={isOpen11}
                  onOpen={() => {
                    setIsOpen11(true);
                  }}
                  onClose={() => {
                    setIsOpen11(false);
                  }}
                  MenuProps={menuProps}
                  value={levelvalue}
                  onChange={getinvitevalue}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  // value={userRole}
                  // onChange={(e) => setUserRole(e.target.value)}
                  // displayEmpty
                >
                  {/* <MenuItem value={null}> Select Level </MenuItem> */}
                  <MenuItem value="1">Admin Level</MenuItem>
                  <MenuItem value="2">Marketer Level</MenuItem>
                  <MenuItem value="3">Approver Levelss</MenuItem>
                  <MenuItem value="4">In-house Designer</MenuItem>
                </Select>
              </div>

              <button onClick={() => levelSubmit()} className="savebtninvite">
                Save
              </button>
            </DialogContent>
          </Dialog>

          <Dialog
            className="profileImgDialognew"
            open={open3}
            onClose={handleClose3}
          >
            <DialogTitle className="profileImgHeading">
              Invite Members
              <span onClick={handleClose3}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </DialogTitle>
            <div className="dialogcontent_and_actionsinvite">
              <DialogContent className="image_and_namesinvite">
                <div className="Topallpage-- AllPageHight--">
                  <div className="invitepage2">
                    <div className="invite1sec">
                      <div
                        className={
                          errors.email
                            ? "inputCntnr error"
                            : "inputCntnr CategoryinputH"
                        }
                      >
                        <h4>Email Address</h4>
                        <input
                          className="category_name validateInput w-100 h-47 border-radius border-1"
                          type="email"
                          placeholder="Enter Email Address"
                          name="email"
                          onChange={(e) => {
                            setemail(e.target.value);
                            setErrors({ ...errors, email: null });
                          }}
                          value={email}
                          required
                        />
                        {/* {error1 && <h2 style={{color: 'red'}}>{error1}</h2>} */}
                        <span
                          style={{
                            color: "#D14F4F",
                            opacity: errors.email ? 1 : 0,
                          }}
                        >
                          {errors.email ?? "valid"}
                        </span>
                      </div>

                      <div
                        className={
                          errors.company
                            ? "text-content error Experiencenew"
                            : "text-content  Experiencenew"
                        }
                      >
                        <h4 className="Company_nameinvite">Company</h4>{" "}
                        <div className="styled-select inviteselect">
                          <Select
                            open={isOpen9}
                            disabled
                            onOpen={() => {
                              setIsOpen9(true);
                            }}
                            onClose={() => {
                              setIsOpen9(false);
                            }}
                            MenuProps={menuProps}
                            value={companyvalue}
                            onChange={getvalue}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value="null">{agecyNameCompany}</MenuItem>
                            {companiesData?.map((item) =>
                              item.is_active ? (
                                <MenuItem key={item.id} value={item.id}>
                                  {item?.name}
                                </MenuItem>
                              ) : null
                            )}
                          </Select>
                          <span
                            className="companyclass45"
                            style={{
                              color: "#D14F4F",
                              opacity: errors.company ? 1 : 0,
                            }}
                          >
                            {errors.company ?? "valid"}
                          </span>
                        </div>
                      </div>

                      <div className="Levelsec">
                        <h4>Level</h4>
                        <Select
                          open={isOpen10}
                          onOpen={() => {
                            setIsOpen10(true);
                          }}
                          onClose={() => {
                            setIsOpen10(false);
                          }}
                          MenuProps={menuProps}
                          value={levelvalue}
                          onChange={getinvitevalue}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          // value={userRole}
                          // onChange={(e) => setUserRole(e.target.value)}
                          // displayEmpty
                        >
                          {/* <MenuItem value={null}> Select Level </MenuItem> */}
                          <MenuItem value="1">Admin Level</MenuItem>
                          <MenuItem value="2">Marketer Level</MenuItem>
                          <MenuItem value="3">Approver Level</MenuItem>
                          <MenuItem value="4">In-house Designer</MenuItem>
                        </Select>
                      </div>

                      {/* <div className="checkboxStatus"></div> */}
                      <div className="invitepagenew">
                        <button
                          onClick={validateSubmit}
                          type="button"
                          className="btn-primary Small border-radius mt-2 addeditbtn addeditbtninvitesave"
                        >
                          Invite
                        </button>
                        <button
                          onClick={handleClose3}
                          className="create-account-btn mt-2 border-radius CancelAddBtN workflowcancelbtn addeditbtninvitcancel"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </div>
          </Dialog>
        </>
      )}
    </>
  );
}
