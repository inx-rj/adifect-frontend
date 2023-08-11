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

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import {
  AllInvite,
  deleteInvite,
  getLevelInvite,
} from "../../redux/actions/invite-actions";
import { listAllCompanies } from "../../redux/actions/company-actions";

export default function Invite() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  const [isOpen9, setIsOpen9] = useState(false);
  const [usersForRender, setUsersForRender] = useState([]);
  const [open3, setOpen3] = React.useState(false);
  const [companydata, setcompanydata] = useState();
  const [companyvalue, setcompanyvalue] = useState(null);

  const { inviteData, loading: draftJobsLoading } = useSelector(
    (state) => state.AllInviteReducer
  );

  const { companiesData } = useSelector((state) => state.companyReducer);

  const { success } = useSelector((state) => state.InviteDeleteReducer);
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

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  useEffect(() => {
    handleClickOpen3();
    const handler = () => {
      setIsOpen9(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    dispatch(AllInvite());
  }, [success]);

  useEffect(() => {
    if (inviteData) {
      let userData = [];
      // console.log("inviteData == ", inviteData);

      inviteData?.map((item, index) => {
        item.user = item.user_name;
        var utc = null;
        if (item.modified) {
          // utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }

        item.status = item.status;
        var utc = null;
        if (item.modified) {
          // utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }

        item.email = item.user_email;
        var utc = null;
        if (item.modified) {
          // utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }

        item.name = item.user_first_name;
        var utc = null;
        if (item.modified) {
          // utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }

        // item.modified = utc1;
        item.is_active = (
          <div style={{ display: "flex" }}>
            {item.is_active ? (
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
        item.action = (
          <div style={{ display: "flex" }}>
            {/* <Link
              title="edit"
              className="EditBut editAdminButton"
              to={`/jobs/${item.id}`}
            >
              {" "}
              <img className="editicon" src="/img/editicon.png" alt="" />{" "}
            </Link> */}
            <div style={{ display: "flex" }}>
              <Button title="delete" className="deletebutt">
                {" "}
                <img
                  className="editicon"
                  src="/img/delet.png"
                  alt=""
                  onClick={() => deleteHandler(item.id)}
                />{" "}
              </Button>
            </div>
          </div>
        );
        userData.push(item);
      });
      setUsersForRender(userData);
    }
  }, [inviteData]);

  const data = {
    columns: [
      {
        label: "Name",
        field: "user",
        sort: "asc",
        width: 500,
      },

      // {
      //   label: "Name",
      //   field: "name",
      //   sort: "asc",
      //   width: 500,
      // },

      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 500,
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
      text: "Are you sure you want to delete this workflow?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteInvite(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
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
      company: !companyvalue && "please select an company",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler();
  };

  const submitHandler = (e) => {
    api
      .post(`${BACKEND_API_URL}agency/invite-member/`, {
        email: email,
        agency: userid,
        company: companyvalue,
      })
      .then((res) => {
        console.log("Post success ", res);
        swal({
          title: "Successfully Complete",
          text: "Successfully Saved!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        toast.success("Successfully Saved!");
        navigate("/home");
      })
      .catch(
        (err) => {
          console.log("Post error ", err);
          swal({
            title: "Error",
            text: "Please try again.",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
          });
        },
        [email]
      );
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Invite Member</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
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
            className="profileImgDialog"
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
                        <h4>E-MAIL</h4>
                        <input
                          className="category_name validateInput w-100 h-47 border-radius border-1"
                          type="email"
                          placeholder="Add a E-mail"
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

                      {/* <div className="checkboxStatus"></div> */}
                      <div className="invitepagenew">
                        <button
                          onClick={validateSubmit}
                          type="button"
                          className="btn-primary Small border-radius mt-2 addeditbtn addeditbtninvitesave"
                        >
                          Save
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
