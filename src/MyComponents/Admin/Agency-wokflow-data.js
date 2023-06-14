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
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { workflowAdminlistAll } from "../../redux/actions/workflow-action";
import { workflowdelete } from "../../redux/actions/workflow-action";

import DialogActions from "@mui/material/DialogActions";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select  from "@mui/material/Select";
import { blockCompanyAction } from "../../redux/actions/Agency-data-actions";
import {
  workflowdeletelevel,
  workflowlistAlllevels,
} from "../../redux/actions/workflowslevel-action";
import { WORKFLOW_ADMIN_ADD_RESET } from "../../constants/Workflow-constants";
import {
  allworkflowlist,
  blockWorkflowAction,
} from "../../redux/actions/Agency-data-actions";

export default function Admin_workflow_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [usersForRender, setUsersForRender] = useState([]);
  const { levelData, loading: levelsLoading } = useSelector(
    (state) => state.workflowlevelReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: WORKFLOW_level_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);
  const { workflowData } = useSelector((state) => state.workflowAdminReducer);

  const { workflowuser, loading: loadingWorkflow } = useSelector(
    (state) => state.allworkflowReducer
  );
  const [rerender, setRerender] = useState(false);
  const [workflowId, setWorkflowId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [workflowStatus, setWorkflowStatus] = useState(false);

  const {
    blockworkflow,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.WorkflowBlockReducer);

  const validateSubmit = () => {
    dispatch(blockWorkflowAction({ is_blocked: workflowStatus }, workflowId));
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
    if (successUpdate && rerender) {
      swal({
        title: "Successfully Complete",
        text: "Workflow updated successfully!",
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
    dispatch(allworkflowlist(companyid));
  }, [success, successUpdate]);
  const { companyid } = useParams();

  useEffect(() => {
    dispatch({ type: WORKFLOW_ADMIN_ADD_RESET });
    dispatch(workflowAdminlistAll());
  }, [success]);

  useEffect(() => {
    let userData = [];
    // console.log("levelData == ", levelData);
    workflowuser?.map((item, index) => {
      item.name = item.name;

      var utc = null;
      if (item.modified) {
        utc = moment(item.modified).format("MM-DD-yyyy hh:mm a");
      }
      item.updated_at = utc;
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
            title="edit"
            className="EditBut editAdminButton"
            to={`/workflow/edit/${item.id}`}
          >
            {" "}
            {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
            <p className="editiconDelete">View</p>
          </Link>

          <div style={{ display: "flex" }}>
            <Button title="delete" className="deletebutt">
              {" "}
              {/* <img
                className="editicon"
                src="/img/delet.png"
                alt=""
                onClick={() => deleteHandler(item.id)}
              />{" "} */}
              <p
                onClick={() => deleteHandler(item.id)}
                className="editiconDelete deleteSettingsAdmin"
              >
                Delete
              </p>
            </Button>

            <Button
              title="Setting"
              className="blockbutto"
              onClick={() => {
                handleClickOpen();
                setWorkflowId(item.id);
                setWorkflowStatus(item.is_blocked);
              }}
            >
              {/* <img className="block_icon" src="/img/Settings.png" /> */}
              <p className="editiconDelete deleteSettingsAdmin">Setting</p>
            </Button>
          </div>
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
  }, [workflowuser]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "name",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Job",
      //   field: "job_title",
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
      text: "Are you sure you want to delete this workflow?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(workflowdelete(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        // setIsLoading(true);
      }
    });
    // if (window.confirm("Are you sure you want to delete this level?")) {
    //   dispatch(deletelevel(id));
    // }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(workflowData)} */}

          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1 Agencyworkflowpagetop">
              <div className="Status">
                <Dialog
                  className="profileImgDialogagency"
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2></h2>

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
                        <label>Workflow Status</label>
                        <Select
                          className={
                            workflowStatus === "null"
                              ? "selectinputcolor"
                              : "menuiteminputcolor"
                          }
                          value={workflowStatus}
                          onChange={(e) => setWorkflowStatus(e.target.value)}
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
                  to={`/workflow/add/`}
                >
                  {" "}
                  <img className="alladdimg" src="/img/plusicon.png" />
                  Workflow{" "}
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
      )}
    </>
  );
}
