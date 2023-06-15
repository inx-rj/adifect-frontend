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

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { DraftJoblist, deleteJob } from "../../redux/actions/job-actions";
import {
  MemberAdminDraftJoblistAction,
  MemberAdminDraftJobDeleteAction,
} from "../../redux/actions/Member-Admin-Job-List-Actions";
import {
  DRAFT_JOB_lIST_RESET,
  JOB_DETAILS_RESET,
} from "../../constants/job-constants";
import { MEMBER_ADMIN_GET_DRAFT_JOB_RESET } from "../../constants/Member-Admin-job-list-constants";
import { useOutletContext } from "react-router-dom";

export default function Member_Admin_draft_jobs_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();

  const [usersForRender, setUsersForRender] = useState([]);

  const { MemberAdminDraftJobs, loading: MemberdraftJobsLoading } = useSelector(
    (state) => state.MemberAdminDraftJoblistReducer
  );

  console.log("MemberAdminDraftJobs", MemberAdminDraftJobs);

  // const { DraftJobs, loading: MemberdraftJobsLoading } = useSelector(
  //   (state) => state.DraftJoblistReducer
  // );
  // const { success } = useSelector((state) => state.jobDeleteReducer);
  const { success } = useSelector(
    (state) => state.MemberAdminDraftJobDeleteReducer
  );

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  useEffect(() => {
    if (headerCompany) {
      // dispatch({ type: JOB_DETAILS_RESET });
      dispatch({ type: MEMBER_ADMIN_GET_DRAFT_JOB_RESET });
      dispatch(MemberAdminDraftJoblistAction(headerCompany));
    }
  }, [success, headerCompany]);

  useEffect(() => {
    // console.log('ss', DraftJobs)
    if (MemberAdminDraftJobs) {
      let userData = [];
      // console.log("DraftJoblist == ", DraftJobs);
      MemberAdminDraftJobs?.map((item, index) => {
        item.name = item.title;
        var utc = null;
        if (item.created) {
          utc = moment(item.created).format("MM-DD-yyyy hh:mm a");
        }
        item.created = utc;
        let utc1 = null;
        if (item.modified) {
          utc1 = moment(item.modified).format("MM-DD-yyyy hh:mm a");
        }
        item.modified = utc1;
        // item.is_active = (
        //   <div style={{ display: "flex" }}>
        //     {item.is_active ? (
        //       <div className="active_status">
        //         <i className="fa fa-check" aria-hidden="true"></i>{" "}
        //       </div>
        //     ) : (
        //       <div className="inactive_status">
        //         <i className="fa fa-times" aria-hidden="true"></i>
        //       </div>
        //     )}
        //   </div>
        // );
        item.action = (
          <div style={{ display: "flex" }}>
            <Link
              title="edit"
              className="EditBut editAdminButton"
              to={`/jobs/${item.id}`}
            >
              {" "}
              {/* <img className="editicon" src="/img/editicon.png" alt="" /> */}
              <p className="editionEdit">Edit</p>
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
                  className="editiconDelete"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </p>
              </Button>
            </div>
          </div>
        );
        userData.push(item);
      });
      setUsersForRender(userData);
    }
  }, [MemberAdminDraftJobs]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "title",
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
        label: "Created",
        field: "created",
        sort: "asc",
        width: 500,
      },
      {
        label: "Modified",
        field: "modified",
        sort: "asc",
        width: 500,
      },
      // {
      //   label: "Status",
      //   field: "is_active",
      //   sort: "asc",
      //   width: 500,
      // },
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
      text: "Are you sure you want to delete this draft job?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(MemberAdminDraftJobDeleteAction(id));
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
      ) : MemberdraftJobsLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(workflowData)} */}
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Draft Jobs</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1 draft">
              <div className="Status"></div>
              {/* <div className="savebtn Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`add/`}
                >
                  {" "}
                  Add Draft Job List{" "}
                </Link>
              </div> */}
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