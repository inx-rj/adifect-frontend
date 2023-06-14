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
import { WORKFLOW_STAGES_DETAILS_RESET } from "../../constants/workflowstages-constant";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import {
  workflowstagedeletestage,
  workflowstagelistAllstages,
} from "../../redux/actions/workflowstageskill-action";

function Agency_jobs_workflowstage() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [usersForRender, setUsersForRender] = useState([]);
  const { stagesData, loading: stagesLoading } = useSelector(
    (state) => state.workflowstagestageReducer
  );
  const { success } = useSelector(
    (state) => state.workflowstagestageDeleteReducer
  );

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: WORKFLOW_STAGES_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  useEffect(() => {
    dispatch(workflowstagelistAllstages());
    console.log("stagesData---", stagesData);
  }, [success]);

  useEffect(() => {
    let userData = [];
    stagesData?.map((item, index) => {
      item.stage_name = item.stage_name;

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
          <Link
            title="edit"
            className="EditBut editAdminButton"
            to={`/stages-workflow/${item.id}`}
          >
            {" "}
            <img className="editicon" src="/img/editicon.png" alt="" />{" "}
          </Link>
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
      );
      userData.push(item);
    });

    setUsersForRender(userData);
  }, [stagesData]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "stage_name",
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
      text: "Are you sure you want to delete this stage?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(workflowstagedeletestage(id));
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
    // if (window.confirm("Are you sure you want to delete this stage?")) {
    //   dispatch(deletestage(id));
    // }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Stages List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1">
              <div className="Status"></div>
              <div className="savebtn Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/stages-workflow/list/add/`}
                >
                  {" "}
                  Add New Stages{" "}
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

export default Agency_jobs_workflowstage;
