import React, { useEffect, useState } from "react";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { BACKEND_API_URL } from "../../environment";
import LoadingSpinner from "../../containers/LoadingSpinner";
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
import { getIndustryDetails } from "../../redux/actions/industry-actions";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function Industry_add_edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { industryId } = useParams();
  const [industry_name, setIndustryName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    industry_name: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      industry_name: validations.industry_name(industry_name),
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

  useEffect(() => {
    dispatch(defaultPageLoader());
  }, []);

  const { userData } = useSelector((state) => state.authReducer);

  const { loading } = useSelector((state) => state.loaderReducer);

  const {
    loading: industryLoading,
    success,
    industryDetails,
  } = useSelector((state) => state.industryDetailsReducer);

  useEffect(async () => {
    if (industryId) {
      if (!industryDetails || !industryDetails.industry_name) {
        console.log("if");
        await dispatch(getIndustryDetails(industryId));
      } else {
        console.log("else");
        setIndustryName(industryDetails.industry_name);
        setDescription(industryDetails.description);
        setStatus(industryDetails.is_active);
      }
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    if (industry_name.length >= 50) {
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

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (industryId) {
      axios
        .put(
          `${BACKEND_API_URL}agency/industries/${industryId}/`,
          {
            industry_name,
            description,
            is_active: status,
          },
          config
        )
        .then((res) => {
          // toast.success("Successfully Saved!");
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate("/industries/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Industry is already exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",

            buttons: false,
            timer: 2000,
          });
          navigate("/industries/list");
        });
    } else {
      axios
        .post(
          `${BACKEND_API_URL}agency/industries/`,
          {
            industry_name,
            description,
            is_active: status,
          },
          config
        )
        .then((res) => {
          // toast.success("Successfully Saved!");
          console.log(res);
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate("/industries/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Industry is already exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
          });
          navigate("/industries/list");
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
              {industryId ? <h1>Edit Industry</h1> : <h1>Add Industry</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.industry_name
                      ? "inputCntnrIN h-4-1 error"
                      : "inputCntnr1 h-4-1 "
                  }
                >
                  <h4>Name</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Industry Name"
                    name="industry_name"
                    onChange={(e) => {
                      setIndustryName(e.target.value);
                      setErrors({ ...errors, industry_name: null });
                    }}
                    value={industry_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.industry_name ? 1 : 0,
                    }}
                  >
                    {errors.industry_name ?? "valid"}
                  </span>
                </div>
                <div className="inputCntnr1 DescriptionINh">
                  <h4 className="">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1 addedittextarar"
                    type="textarea"
                    placeholder="Industry Description"
                    name="industry_description"
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
                    className="btn-primary Small border-radius mt-2 addeditbtn"
                  >
                    {" "}
                    Save
                  </button>
                  <Link
                    className="create-account-btn mt-2 border-radius CancelAddBtN"
                    to="/industries/list"
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
export default Industry_add_edit;
