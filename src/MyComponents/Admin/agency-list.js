import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAllAgency } from "../../redux/actions/agency-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";

import { AGENCY_ADMIN_LIST_REQUEST } from "../../constants/agency-constants";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";

function AgencyList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [usersForRender, setUsersForRender] = useState([]);

  // useEffect(() => {
  //   dispatch(defaultPageLoader());
  // }, []);

  // const { loading } = useSelector((state) => state.loaderReducer);

  const { agencyadminData, loading: companyLoading } = useSelector(
    (state) => state.agencyAdminReducer
  );

  // const { success } = useSelector((state) => state.companyAdminDeleteReducer);

  useEffect(() => {
    // dispatch({ type: AGENCY_ADMIN_LIST_REQUEST });
    dispatch(listAllAgency());
  }, []);

  useEffect(() => {
    // let companyDataArray = JSON.parse(JSON.stringify(companiesData));
    let userData = [];
    if (agencyadminData) {
      agencyadminData?.map((item, index) => {
        // item.company_name = (
        //   <Button title="edit" className="EditBut" href={`/company/${item.id}`}>
        //     {item.company_name}
        //   </Button>
        // );
        item.first_name = item.first_name ? item.first_name : "N/A";
        item.email = item.email;

        item.is_blocked = (
          <div style={{ display: "flex" }}>
            {item.is_blocked ? (
              <div className="inactive_status">
                <i className="fa fa-times" aria-hidden="true"></i>
              </div>
            ) : (
              <div className="active_status">
                <i className="fa fa-check" aria-hidden="true"></i>{" "}
              </div>
            )}
          </div>
        );

        item.action = (
          <div style={{ display: "flex" }}>
            <Link
              title="edit"
              className="EditBut editAdminButton"
              to={`/agencydata/${item.id}`}
            >
              {" "}
              <img
                className="viewiconagency"
                src="/img/viewicon.png"
                alt=""
              />{" "}
            </Link>
            {/* <Button
              title="delete"
              className="deletebutt"
              // onClick={() => deleteHandler(item.id)}
            >
              {" "}
              <img className="editicon" src="/img/delet.png" alt="" />{" "}
            </Button> */}
          </div>
        );
        userData.push(item);
      });

      setUsersForRender(userData);
    }
  }, [agencyadminData, dispatch]);

  const data = {
    columns: [
      {
        label: "Name",
        field: "first_name",
        sort: "asc",
        width: 500,
      },
      {
        label: "Email",
        field: "email",
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
        field: "is_blocked",
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

  // const deleteHandler = (id) => {
  //   swal({
  //     title: "Warning",
  //     text: "Are you sure you want to delete this company?",
  //     className: "errorAlert",
  //     icon: "/img/WarningAlert.png",
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       dispatch(deleteAdminCompany(id));
  //       swal({
  //         title: "Successfully Complete",
  //         text: "Successfully Deleted!",
  //         className: "successAlert",
  //         icon: "/img/SuccessAlert.png",
  //         buttons: false,
  //         timer: 1500,
  //       });
  //     }
  //     // window.location.reload();
  //     // } else {
  //     //   swal("Your imaginary file is safe!");
  //     // }
  //   });
  //   // if (window.confirm("Are you sure you want to delete this company?")) {
  //   //   dispatch(deletecompany(id));
  //   // }
  // };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading && <LoadingSpinner />}
      <>
        <div className="Category_p">
          <div className="CategorylistName">
            <h1>Agency List</h1>
          </div>
        </div>
        <div className="Topallpage AllPageHight Custompage">
          <div className="ContentDiv Categoriesdiv1">
            <div className="Status"></div>
            {/* <div className="savebtn Categorybtn">
              <Link
                className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                to={`/companies/add/`}
              >
                {" "}
                Add New Company{" "}
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
      {/* )} */}
    </>
  );
}

export default AgencyList;
