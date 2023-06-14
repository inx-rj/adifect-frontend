import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { listAllLevels } from "../../redux/actions/level-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { LEVEL_DETAILS_RESET } from "../../constants/level-constants";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { deleteLevel } from "../../redux/actions/level-actions";

import LoadingSpinner from "../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";

function LevelsList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);
  const { loading } = useSelector((state) => state.loaderReducer);

  const [usersForRender, setUsersForRender] = useState([]);
  const { levelsData, loading: levelsLoading } = useSelector(
    (state) => state.levelReducer
  );
  const { success } = useSelector((state) => state.levelDeleteReducer);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: LEVEL_DETAILS_RESET });
    dispatch(listAllLevels());
  }, [success]);

  useEffect(() => {
    let userData = [];
    levelsData?.map((item, index) => {
      item.level_name = item.level_name;

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
            to={`/levels/${item.id}`}
          >
            {/* <img className="editicon" src="/img/editicon.png" alt="" /> */}
            <p className="editionEdit">Edit</p>
          </Link>
          <Button
            title="delete"
            className="deletebutt"
            onClick={() => deleteHandler(item.id)}
          >
            <p className="editiconDelete">Delete</p>
            {/* <img className="editicon" src="/img/delet.png" alt="" /> */}
          </Button>
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
  }, [levelsData]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "level_name",
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
      text: "Are you sure you want to delete this category?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",

      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteLevel(id));
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

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Levels List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1">
              <div className="Status"></div>
              <div className="savebtnnew Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/levels/add/`}
                >
                  {" "}
                  <img
                    className="alladdimg"
                    src="/img/plusicon.png"
                  /> Level{" "}
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

export default LevelsList;
