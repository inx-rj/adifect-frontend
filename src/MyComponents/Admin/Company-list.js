import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listAllAdminCompanies,
  deleteAdminCompany,
} from "../../redux/actions/company-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { COMPANY_DETAILS_RESET } from "../../constants/company-constants";

import Pagination from "react-bootstrap/Pagination";
import DialogActions from "@mui/material/DialogActions";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import api from "../../utils/api";
import { blockCompanyAction } from "../../redux/actions/Agency-data-actions";

function CompanyList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [usersForRender, setUsersForRender] = useState([]);
  const { companyid, agencyId } = useParams();

  const { companiesData, loading: companyLoading } = useSelector(
    (state) => state.companyAdminReducer
  );

  const {
    success,
    message,
    error: errorMsg,
  } = useSelector((state) => state.companyAdminDeleteReducer);

  // console.log("message-----------", message)

  const { userData } = useSelector((state) => state.authReducer);

  const [rerender, setRerender] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [companyTitle, setCompanyTitle] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [companyStatus, setCompanyStatus] = useState(false);
  const [companyUpdate, SetCompanyUpdate] = useState(false);
  const [dataShow, setDataShow] = useState(false);

  const {
    blockCompany,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.CompanyBlockReducer);

  useEffect(() => {
    dispatch({ type: COMPANY_DETAILS_RESET });
    dispatch(listAllAdminCompanies(companyid));
    SetCompanyUpdate(false);
  }, [success, successUpdate, companyUpdate]);

  const validateSubmit = () => {
    dispatch(
      blockCompanyAction({ company_id: companyId, status: companyStatus })
    );
    handleClose();
    setRerender(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (message == "Deleted Succesfully" && dataShow) {
      swal({
        title: "Successfully Complete",
        text: message,
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    } else if (
      message ==
        "This company is assigned to a workflow, so cannot be deleted!" &&
      dataShow
    ) {
      swal({
        // title: "Successfully Complete",
        text: message,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    } else if (
      message ==
        "This company is associated with an active job, so cannot be deleted!" &&
      dataShow
    ) {
      swal({
        // title: "Successfully Complete",
        text: message,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    } else if (
      message ==
        "This company is associated with an active job, so cannot be Edited!" &&
      dataShow
    ) {
      swal({
        // title: "Successfully Complete",
        text: message,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    } else if (message == "Company Inactive successfully." && dataShow) {
      swal({
        // title: "Successfully Complete",
        text: message,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    } else if (errorMsg && dataShow) {
      swal({
        // title: "Successfully Complete",
        text: errorMsg,
        className: "warning",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 2000,
      });
      setDataShow(false);
    }
  }, [success, errorMsg]);

  useEffect(() => {
    if (successUpdate && rerender) {
      swal({
        title: "Successfully Complete",
        text: "Company updated successfully!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 1500,
      });
      setRerender(false);
    }
    if (errorUpdate && rerender) {
      swal({
        title: "Error",
        text: "Something went wrong!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      setRerender(false);
    }
  }, [dispatch, successUpdate, errorUpdate]);

  useEffect(() => {
    // let companyDataArray = JSON.parse(JSON.stringify(companiesData));
    let userData = [];
    if (companiesData) {
      companiesData?.map((item, index) => {
        // item.company_name = (
        //   <Button title="edit" className="EditBut" href={`/company/${item.id}`}>
        //     {item.company_name}
        //   </Button>
        // );
        item.name = item.name;
        item.agency_name = item.agency_name ? item.agency_name : "N/A";

        var utc1 = null;
        if (item.created) {
          utc1 = moment(item.created).format("MM-DD-yyyy hh:mm a");
        }
        item.created_at = utc1;

        var utc = null;
        if (item.modified) {
          utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }

        item.updated_at = utc;
        const adminIsActive = item.is_active;
        if (item.is_blocked) {
          item.is_active = (
            <div style={{ display: "flex" }}>
              <p className="blocked_company_listss">
                <i className="blocked_company_listss fa fa-ban"></i>
              </p>
            </div>
          );
        } else {
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
        }

        item.action = (
          <div style={{ display: "flex" }}>
            <Link
              title="View"
              className="EditBut editAdminButton view_company_date"
              to={item.agency ? `/companydata/${item.id}/${item.agency}` : "#"}
            >
              {/*            
              <img
                className="viewiconagency"
                src="/img/viewicon.png"
                alt=""
              /> */}
              <p className="editiconDelete">View</p>
            </Link>
            <Link
              title="edit"
              className="EditBut editAdminButton"
              to={`/companies/${item.id}`}
            >
              {" "}
              {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
              <p className="editionEdit">Edit</p>
            </Link>
            {adminIsActive ? (
              <Button
                className="deletebutt"
                onClick={() => deleteHandler(item.id)}
              >
                {/* <img className="editicon" src="/img/delet.png" alt="" />{" "} */}
                <p className="editiconDelete">InActive</p>
              </Button>
            ) : (
              <Button
                className="deletebutt"
                onClick={() => deleteHandlerEditData(item.id)}
              >
                {/* <img className="editicon" src="/img/delet.png" alt="" />{" "} */}
                <p className="editiconDelete">Active</p>
              </Button>
            )}
            <Button
              title="Setting"
              className="blockbutto"
              onClick={() => {
                handleClickOpen();
                setCompanyId(item.id);
                setCompanyStatus(item.is_blocked);
                setCompanyTitle(item.title);
              }}
            >
              {/* <img className="block_icon" src="/img/Settings.png" /> */}
              <p className="deleteSettingsAdminLast">Setting</p>
            </Button>
          </div>
        );
        userData.push(item);
      });

      setUsersForRender(userData);
    }
  }, [companiesData, dispatch]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "name",
        sort: "asc",
        width: 500,
      },
      {
        label: "Agency",
        field: "agency_name",
        sort: "asc",
        width: 500,
      },
      {
        label: "Created At",
        field: "created_at",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Updated At",
      //   field: "updated_at",
      //   sort: "asc",
      //   width: 500,
      // },
      {
        label: "Status",
        field: "is_active",
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
      text: "Are you sure you want to InActive this company?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setDataShow(true);
        dispatch(deleteAdminCompany(id));
        // swal({
        //   title: "Successfully Complete",
        //   text: "company InActive  Successfully",
        //   className: "successAlert",
        //   icon: "/img/logonew.svg",
        //   buttons: false,
        //   timer: 1500,
        // });
      }
      // window.location.reload();
      // } else {
      //   swal("Your imaginary file is safe!");
      // }
    });
    // if (window.confirm("Are you sure you want to delete this company?")) {
    //   dispatch(deletecompany(id));
    // }
  };

  const deleteHandlerEditData = (id) => {
    swal({
      title: "",
      text: "Are you sure you want to active this company?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userData.token}`,
          },
        };

        api
          .put(`${BACKEND_API_URL}company/${id}/`, {
            agency: userData.user.user_id,
            is_active: true,
          })
          .then((res) => {
            SetCompanyUpdate(true);
            swal({
              title: "Successfully Complete",
              text: "Updated Successfully Complete",
              className: "successAlert",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            // toast.success("Successfully Saved!");
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err?.response?.data?.message
                ? err?.response?.data?.message
                : "Company is already exist",
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 2000,
            });
            // navigate("/agency/company");
            // dispatch(companyDetailsdata(companyid));
          });
      }
    });
    // if (window.confirm("Are you sure you want to delete this level?")) {
    //   dispatch(deletelevel(id));
    // }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading && <LoadingSpinner />}
      <>
        <div className="Category_p">
          <div className="CategorylistName">
            <h1>Company List</h1>
          </div>
        </div>
        <div className="Topallpage AllPageHight Custompage">
          <div className="ContentDiv Categoriesdiv1 companylistdiv">
            <div className="Status">
              <Dialog
                className="profileImgDialogagency"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle className="profileImgHeadingAnew">
                  <div className="Ajobshare">
                    <h2>{companyTitle}</h2>

                    <span className="closebuttonsec">
                      <i
                        className="fa-solid fa-xmark"
                        onClick={handleClose}
                      ></i>
                    </span>
                  </div>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="enterNameInputNewD">
                    <div className="userforminput Roleuserpage">
                      <label>Company Status</label>
                      <Select
                        className={
                          companyStatus === "null"
                            ? "selectinputcolor"
                            : "menuiteminputcolor"
                        }
                        value={companyStatus}
                        onChange={(e) => setCompanyStatus(e.target.value)}
                      >
                        <MenuItem value={false}>Unblock</MenuItem>
                        <MenuItem value={true}> Block</MenuItem>
                      </Select>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="cancelButtonnew">
                        <button
                          className="canceButtonnewPop"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <Button
                          title="Setting"
                          onClick={() => {
                            validateSubmit();
                          }}
                          className="shareNewPop"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
            <div className="savebtnnew Categorybtn">
              <Link
                className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                to={`/companies/add/`}
              >
                {" "}
                <img
                  className="alladdimg"
                  src="/img/plusicon.png"
                /> Company{" "}
              </Link>
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
      </>
    </>
  );
}

export default CompanyList;
