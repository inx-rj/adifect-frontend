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
import { AGENCY_Company_DETAILS_RESET } from "../../constants/AgencyCompany-constant";
import { ROLE } from "../../constants/other-constants";

import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import {
  deleteCompany,
  listAllCompanies,
} from "../../redux/actions/Workflow-company-action";
import { memberAdminGetCompanyListAction } from "../../redux/actions/Member-Company-List-Action";

function Member_Admin_Copmay_List() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [usersForRender, setUsersForRender] = useState([]);

  //   const { companyData, loading: stagesLoading } = useSelector(
  //     (state) => state.agencyCompanyReducer
  //   );

  const { memberAdminCompanyData, loading: memberAdminLoading } = useSelector(
    (state) => state.memberAdminGetCompanyListReducer
  );
  const { userData } = useSelector((state) => state.authReducer);


  //   console.log("memberAdminCompanyData+++", memberAdminCompanyData);

  const { success } = useSelector((state) => state.agencyCompanyDeleteReducer);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    // dispatch({ type: AGENCY_Company_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  //   useEffect(() => {
  //     dispatch(listAllCompanies());
  //   }, [success]);

  useEffect(() => {
    dispatch(memberAdminGetCompanyListAction());
  }, []);

  useEffect(() => {
    let userData = [];
    // console.log("levelData == ", levelData);
    memberAdminCompanyData?.map((item, index) => {
      item.name = item.name;

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
            // title="edit"
            className="EditBut editAdminButton"
            to={`/member/companydata/${item.id}`}
          >
            {/* <img
              className="editicon_company"
              src="/img/viewicon.png"
              alt=""
            /> */}
            <p className="editiconDelete">View</p>
          </Link>
          {userData?.user?.role == Object.keys(ROLE)[3] &&
            userData?.user?.user_level === 1 && (
              <>
                <Link
                  title="edit"
                  className="EditBut editAdminButton"
                  to={`/member/company/${item.id}`}
                >
                  {" "}
                  {/* <img className="editicon" src="/img/editicon.png" alt="" />{" "} */}
                  <p className="editionEdit">Edit</p>
                </Link>
                <div style={{ display: "flex" }}>
                  <Button title="delete" className="deletebutt">
                    {/* <img
                className="editicon"
                src="/img/delet.png"
                alt=""
                onClick={() => deleteHandler(item.id)}
              /> */}
                    <p
                      className="editiconDelete"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </p>
                  </Button>
                </div>
              </>
            )}
        </div>
      );
      userData.push(item);
    });

    setUsersForRender(userData);
  }, [memberAdminCompanyData]);

  const data = {
    columns: [
      {
        label: "Title",
        field: "name",
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
      title: "",
      text: "Are you sure you want to delete this company?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCompany(id));
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
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Company List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1">
              <div className="Status"></div>
              {userData?.user?.role == Object.keys(ROLE)[3] &&
                userData?.user?.user_level === 1 && (
                  <div className="savebtnnew Categorybtn">
                    <Link
                      className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                      to={`add/`}
                    >
                      {" "}
                      <img className="alladdimg" src="/img/plusicon.png" />{" "}
                      Company{" "}
                    </Link>
                  </div>
                )}

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

export default Member_Admin_Copmay_List;
