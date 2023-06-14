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
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import DialogActions from "@mui/material/DialogActions";

import MenuItem from "@mui/material/MenuItem";
import api from "../../utils/api";
// import axios from "axios";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import {
  AllInvite,
  deleteInvite,
  getinviteDetails,
  updateInvite,
} from "../../redux/actions/invite-actions";

import {
  AllIcompanynvite,
  deleteMedmberlist,
  blockMemberAction,
} from "../../redux/actions/Agency-data-company-actions";

import { listAllAdminCompanies } from "../../redux/actions/company-actions";

export default function Agency_inviteList_companydata() {
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
  const [levelvalue, setlevelvalue1] = useState(null);

  const [renderPage, setRenderPage] = useState(false);

  const {
    blockAgencyMember,
    success: successdel,
    error: errordel,
  } = useSelector((state) => state.AgencyMemeberBlockReducer);

  const [rerender, setRerender] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [MemberStatus, setMemberStatus] = useState(false);

  const MemberSubmit = () => {
    dispatch(blockMemberAction({ is_blocked: MemberStatus }, memberId));
    handleClose();
    setRerender(true);
  };

  const doubleSubmit = () => {
    levelSubmit();
    MemberSubmit();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { inviteData } = useSelector((state) => state.AllInviteReducer);

  const { success: successUpdate, error: errorUpdate } = useSelector(
    (state) => state.InviteUpdateReducer
  );

  const { companiesData } = useSelector((state) => state.companyAdminReducer);

  const [Level, setLevel] = useState(null);

  const { success } = useSelector((state) => state.InviteDeleteReducer);
  const [isLoading, setIsLoading] = useState(true);

  const { companyid, agencyId } = useParams();

  const { inviteuserlist, loading: loadingInvite } = useSelector(
    (state) => state.allInvitescompanyReducer
  );

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  // useEffect(() => {
  //   dispatch(defaultPageLoader());
  // }, []);

  useEffect(() => {
    setcompanyvalue(companyid);
  }, []);

  useEffect(() => {
    dispatch(listAllAdminCompanies(agencyId));
  }, []);

  useEffect(() => {
    dispatch(AllIcompanynvite(companyid));
  }, [success, renderPage, successUpdate]);

  const getvalue = (e) => {
    setcompanyvalue(e.target.value);
    setErrors({ ...errors, company: null });
    // console.log(e.target.value);
    if (e.target.value == "null") {
    }
    if (e.target.value !== "null") {
    }
  };

  const getinvitevalue = (e, id) => {
    setlevelvalue1(e.target.value);
    setErrors({ ...errors, level: null });
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const [isInviteId, setIsInviteId] = useState();
  const [isUserName, setIsUserName] = useState("");
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
    const handler = () => {
      setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    const handler = () => {
      setIsOpen11(false);
      setIsOpen10(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    if (successUpdate && renderPage) {
      swal({
        title: "Successfully Complete",
        text: "Member Updated Successfully!",
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
        title: "Error",
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
    if (inviteuserlist) {
      // console.log("inviteuserlist -- ", inviteuserlist);
      // setNametitle(item.user_name);
      let userData = [];
      inviteuserlist?.map((item, index) => {
        item.user = "N/A";
        if (item.user_email) {
          item.user = item.user_name;
        }

        if (item.is_blocked) {
          item.status = (
            <div style={{ display: "flex" }}>
              <p className="blocked_company_listss">
                <i className="blocked_company_listss fa fa-ban"></i>
              </p>
            </div>
          );
        } else {
          item.status = (
            <div style={{ display: "flex" }}>
              {item.status ? (
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
        }

        item.email = item.email;
        if (item.user_email) {
          item.email = item.user_email;
        }

        item.name = item.user_first_name;

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

        item.action = (
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <Button title="delete" className="deletebutt">
                {" "}
                <img
                  className="editicon editicon14"
                  src="/img/delet.png"
                  alt=""
                  onClick={() => deleteHandler(item.id)}
                />{" "}
              </Button>

              <button
                className="addanewmailnew"
                type="button"
                onClick={(e) => {
                  handleClickOpen4(
                    item.id,
                    item.user_first_name,
                    item.user_level
                  );
                  setMemberId(item.id);
                  setMemberStatus(item.is_blocked);
                }}
              >
                {" "}
                <img
                  // onClick={() => levelSubmit(item.id)}
                  className="editicond"
                  src="/img/Settings.png"
                  alt=""
                />{" "}
              </button>
            </div>
          </div>
        );
        userData.push(item);
      });
      setUsersForRender(userData);
    }
  }, [inviteuserlist]);

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
      title: "Warning",
      text: "Are you sure you want to remove this user?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteMedmberlist(id));
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
      company: !companyvalue && "please select a company",
      level: !levelvalue && "please select a level",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };

  const submitHandler = (e) => {
    setIsLoading(true);
    api
      .post(`${BACKEND_API_URL}agency/invite-member/`, {
        email: email,
        agency: userid,
        company: companyvalue,
        levels: levelvalue,
      })
      .then((res) => {
        setRenderPage(true);
      })
      .catch((err) => {
        swal({
          title: "Error",
          text: err.response.data.message,
          className: "errorAlert",
          icon: "/img/logonew-red.svg",
          buttons: false,
          timer: 5000,
        });
        setIsLoading(false);
      });
  };

  const levelSubmit = (e) => {
    setIsLoading(true);
    dispatch(
      updateInvite(isInviteId, {
        levels: levelvalue,
      })
    );
    setIsInviteId("");
    setOpen4(false);
    setRenderPage(true);
    // dispatch(  AllIcompanynvite,());
  };

  useEffect(() => {
    if (renderPage) {
      swal({
        title: "Successfully Complete",
        text: "Successfully invited user!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setOpen3(false);
      setOpen4(false);
      setIsLoading(false);
      setcompanyvalue(null);
      setemail("");
    }
  }, [renderPage]);

  useEffect(() => {
    if (renderPage) {
      swal({
        title: "Successfully Complete",
        text: "Successfully invited user!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setOpen3(false);
      setOpen4(false);
      setIsLoading(false);
      setlevelvalue1(null);
      setemail("");
    }
  }, [renderPage]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Topallpage AllPageHight Custompage Custompageinvite ">
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
                {inviteuserlist?.map((item) => {
                  item.user_name;
                })} */}
                {isUserName}
              </h3>

              <div className="userforminput Roleuserpage">
                {/* {JSON.stringify(levelvalue)} */}
                <label>Level Name</label>
                <Select
                  className={
                    levelvalue === "null"
                      ? "selectinputcolor"
                      : "menuiteminputcolor"
                  }
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
                  <MenuItem value="3">Approver Level</MenuItem>
                </Select>
              </div>

              <div className="userforminput Roleuserpage">
                <label>Member Status</label>
                <Select

                  className={
                    MemberStatus === "null"
                      ? "selectinputcolor"
                      : "menuiteminputcolor"
                  }
                  value={MemberStatus}
                  onChange={(e) => setMemberStatus(e.target.value)}
                >
                  <MenuItem value={false}>Unblock</MenuItem>
                  <MenuItem value={true}> Block</MenuItem>
                </Select>
              </div>

              <button onClick={() => doubleSubmit()} className="savebtninvite">
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
              Invite Member
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
                            className={
                              companyvalue === "null"
                                ? "selectinputcolor"
                                : "menuiteminputcolor"
                            }
                            open={isOpen9}
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
                            <MenuItem value="null">Select Company</MenuItem>
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
                          className={
                            levelvalue === "null"
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
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
                        </Select>
                      </div>

                      {/* <div className="checkboxStatus"></div> */}
                      <div className="invitepagenew">
                        <button
                          onClick={validateSubmit}
                          type="button"
                          className="btn-primary Small border-radius mt-2 addeditbtn addeditbtninvitesave"
                        >
                          Send
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
