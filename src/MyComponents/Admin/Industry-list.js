import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listAllIndustries,
  deleteIndustry,
} from "../../redux/actions/industry-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { INDUSTRY_DETAILS_RESET } from "../../constants/industry-constants";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";

function IndustryList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [usersForRender, setUsersForRender] = useState([]);

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const { industriesData, loading: industryLoading } = useSelector(
    (state) => state.industryReducer
  );

  const { success } = useSelector((state) => state.industryDeleteReducer);

  useEffect(() => {
    dispatch({ type: INDUSTRY_DETAILS_RESET });
    dispatch(listAllIndustries());
  }, [success]);

  useEffect(() => {
    // let industriesDataArray = JSON.parse(JSON.stringify(industriesData));
    let userData = [];
    industriesData?.map((item, index) => {
      // item.industry_name = (
      //   <Button title="edit" className="EditBut" href={`/industry/${item.id}`}>
      //     {item.industry_name}
      //   </Button>
      // );
      item.industry_name = item.industry_name;

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
            to={`/industries/${item.id}`}
          >
            {/* <img className="editicon" src="/img/editicon.png" alt="" /> */}
            <p className="editionEdit">Edit</p>
          </Link>
          <Button
            title="delete"
            className="deletebutt"
            onClick={() => deleteHandler(item.id)}
          >
            {/* <img className="editicon" src="/img/delet.png" alt="" /> */}
            <p className="editiconDelete">Delete</p>
          </Button>
        </div>
      );
      userData.push(item);
    });

    setUsersForRender(userData);
    // }
  }, [industriesData]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "industry_name",
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
      text: "Are you sure you want to delete this industry?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",

      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteIndustry(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
      }
      // window.location.reload();
      // } else {
      //   swal("Your imaginary file is safe!");
      // }
    });
    // if (window.confirm("Are you sure you want to delete this industry?")) {
    //   dispatch(deleteIndustry(id));
    // }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p industrylist">
            <div className="CategorylistName">
              <h1>Industry List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1 Induslist">
              <div className="Status"></div>
              <div className="savebtnnew Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/industries/add/`}
                >
                  {" "}
                  <img
                    className="alladdimg"
                    src="/img/plusicon.png"
                  /> Industry{" "}
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

export default IndustryList;
