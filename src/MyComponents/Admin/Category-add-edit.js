import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryDetails } from "../../redux/actions/category-actions";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Category_add_edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  const [category_name, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    category_name: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      category_name: validations.category_name(category_name),
    };

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler();
  };
  const {
    loading: categoryLoading,
    success,
    categoryDetails,
  } = useSelector((state) => state.categoryDetailsReducer);

  useEffect(async () => {
    if (categoryId) {
      if (!categoryDetails || !categoryDetails.category_name) {
        await dispatch(getCategoryDetails(categoryId));
      } else {
        setCategoryName(categoryDetails.category_name);
        setDescription(categoryDetails.description);
        setStatus(categoryDetails.is_active);
      }
    }
  }, [dispatch, success]);

  // useEffect(async () => {
  //   if (categoryId) {
  //     await dispatch(getCategoryDetails(categoryId));
  //     if (success) {
  //       setCategoryName(categoryDetails.category_name);
  //       setDescription(categoryDetails.description);
  //       setStatus(categoryDetails.is_active);
  //     }
  //     // console.log("categoryDetails222--", categoryDetails);
  //   }
  //   // console.log("categoryDetails--", categoryDetails);
  // }, [success]);

  const submitHandler = (e) => {
    if (category_name.length >= 50) {
      swal({
        title: "Error",
        text: "Max characters allowed is 50",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      return;
    }
    if (categoryId) {
      axios
        .put(`${BACKEND_API_URL}categories/${categoryId}/`, {
          category_name,
          description,
          is_active: status,
        })
        .then((res) => {
          // toast.success("Successfully Saved!");
          navigate("/categories/list");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
        });
    } else {
      axios
        .post(`${BACKEND_API_URL}categories/`, {
          category_name,
          description,
          is_active: status,
        })
        .then((res) => {
          // toast.success("Successfully Saved!");
          navigate("/categories/list");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
        });
    }
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
              {categoryId ? <h1>Edit Category</h1> : <h1>Add Category</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage">
                <div
                  className={
                    errors.category_name
                      ? "inputCntnr_1 error"
                      : "inputCntnr_1 "
                  }
                >
                  <h4>Category</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Category Name"
                    name="category_name"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      setErrors({ ...errors, category_name: null });
                    }}
                    value={category_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.category_name ? 1 : 0,
                    }}
                  >
                    {errors.category_name ?? "valid"}
                  </span>
                </div>

                <div className="inputCntnr CategoryinputH ">
                  <h4 className="">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Category Description"
                    name="category_description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: null });
                    }}
                    value={description}
                  />
                </div>

                <div className="checkboxStatus">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      id="status"
                      name="status"
                      value={status}
                      checked={status}
                      onChange={() => {
                        setStatus(!status);
                      }}
                    />
                    <label htmlFor="status" className="Status101">
                      {" "}
                      Active
                    </label>
                  </div>
                </div>
                <div>
                  {/* <div className="savebtn left-con"> */}
                  <button
                    onClick={validateSubmit}
                    type="button"
                    className="btn-primary Small  border-radius mt-2 addeditbtn"
                  >
                    {" "}
                    Save
                  </button>
                  <Link
                    className="create-account-btn mt-2 border-radius CancelAddBtN"
                    to="/categories/list"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Category_add_edit;
