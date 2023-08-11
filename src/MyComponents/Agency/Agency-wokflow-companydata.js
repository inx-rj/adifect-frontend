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
import { workflowlistAll } from "../../redux/actions/workflow-action";
import { workflowdelete } from "../../redux/actions/workflow-action";
import {
  workflowdeletelevel,
  workflowlistAlllevels,
} from "../../redux/actions/workflowslevel-action";
import { allworkflowlistconpany } from "../../redux/actions/Agency-data-company-actions";

export default function Agency_approval_workflow_dev() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [usersForRender, setUsersForRender] = useState([]);
  const { levelData, loading: levelsLoading } = useSelector(
    (state) => state.workflowlevelReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);

  const { workflowcompanyuser, loading: loadingworkflowcompanyuser } =
    useSelector((state) => state.allworkflowcompanyReducer);

  const { companyid } = useParams();

  useEffect(() => {
    dispatch(allworkflowlistconpany(companyid));
  }, [success]);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: WORKFLOW_level_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);
  const { workflowData } = useSelector((state) => state.workflowReducer);

  useEffect(() => {
    dispatch(workflowlistAll());
  }, [success]);

  useEffect(() => {
    let userData = [];
    // console.log("levelData == ", levelData);
    workflowcompanyuser?.map((item, index) => {
      item.name = item.name;

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
            to={`/workflow/edit/${item.id}`}
          >
            {" "}
            {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
            <p class="editiconDelete">View</p>
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
              <p onClick={() => deleteHandler(item.id)} class="editiconDelete">
                Delete
              </p>
            </Button>
          </div>
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
  }, [workflowcompanyuser]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "name",
        sort: "asc",
        width: 500,
      },
      {
        label: "Company",
        field: "company_name",
        sort: "asc",
        width: 500,
      },
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
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Agencyworkflowpagetop AgencyworkflowpagetopPaddingRest">
              <div className="Status"></div>
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
