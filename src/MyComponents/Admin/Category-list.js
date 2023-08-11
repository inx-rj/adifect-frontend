import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listAllCategories,
  deleteCategory,
} from "../../redux/actions/category-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { CATEGORY_DETAILS_RESET } from "../../constants/category-constants";

function CategoryList() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [usersForRender, setUsersForRender] = useState([]);
  const { categoryData, loading: categoryLoading } = useSelector(
    (state) => state.categoryReducer
  );
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch({ type: CATEGORY_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const { success } = useSelector((state) => state.categoryDeleteReducer);

  useEffect(() => {
    dispatch(listAllCategories());
  }, [success]);

  useEffect(() => {
    // let categoryDataArray = JSON.parse(JSON.stringify(categoryData));
    let userData = [];
    categoryData?.map((item, index) => {
      // console.log("catList - ", item);
      // item.category_name = (
      //   <Button title="edit" className="EditBut" href={`/category/${item.id}`}>
      //     {item.category_name}
      //   </Button>
      // );
      item.category_name = item.category_name;
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
            to={`/categories/${item.id}`}
          >
            {" "}
            <img src="/img/editicon.png" className="editicon" alt="" />{" "}
          </Link>
          <Button
            title="delete"
            className="deletebutt"
            onClick={() => deleteHandler(item.id)}
          >
            {" "}
            <img src="/img/delet.png" className="editicon" alt="" />{" "}
          </Button>
          {/* <Button
            title="copy"
            className="EditBut"
            onClick={() => clipboardHandler(item.slug)}
          >
            {" "}
            <i className="fa fa-clipboard"></i>{" "}
          </Button> */}
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
    // }
  }, [categoryData]);
  const clipboardHandler = (item) => {
    toast.info(
      <div>
        <i
          className="fas fa-light fa-circle-info"
          style={{ color: "#2153a3" }}
        ></i>{" "}
        {"Copied to clipboard!"}
      </div>
    );
    navigator.clipboard.writeText("/" + item);
  };
  const data = {
    columns: [
      {
        label: "Title",
        field: "category_name",
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
        dispatch(deleteCategory(id));
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
    // if (window.confirm("Are you sure you want to delete this category?")) {
    //   dispatch(deleteCategory(id));
    // }
  };
  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {/* <LoadingSpinner /> */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="Category_p">
            <div className="CategorylistName">
              <h1>Categories List</h1>
            </div>
          </div>
          <div className="Topallpage AllPageHight Custompage">
            <div className="ContentDiv Categoriesdiv1">
              <div className="Status"></div>
              <div className="savebtn Categorybtn">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/categories/add/`}
                >
                  {" "}
                  <img
                    className="alladdimg"
                    src="/img/plusicon.png"
                  /> Category{" "}
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
export default CategoryList;
