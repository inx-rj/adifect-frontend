import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../../utils/api";
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
import { getInviteDetails } from "../../redux/actions/invite-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Invite_add() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { inviteid } = useParams();
  const [userid, setuserid] = useState("");
  const [company_name, setcompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [namefield, setnamefield] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    company_name: null,
  });
  const { userData } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      company_name: validations.company_name(company_name),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };

  useEffect(() => {
    dispatch(defaultPageLoader());
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);

  const { loading } = useSelector((state) => state.loaderReducer);

  const {
    loading: companyLoading,
    success,
    InviteDetails,
  } = useSelector((state) => state.detailsInvitereducer);

  useEffect(() => {
    console.log(inviteid);
    if (inviteid) {
      if (!InviteDetails || !InviteDetails.name) {
        dispatch(getInviteDetails(inviteid));
      } else {
        setcompanyName(InviteDetails.name);
        setDescription(InviteDetails.description);
        setStatus(InviteDetails.is_active);
      }
    }
  }, [dispatch, success]);

  const getback = () => {
    navigate("/home");
  };

  const submitHandler = (e) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (company_name.length >= 50) {
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
    if (inviteid) {
      api
        .put(`${BACKEND_API_URL}agency/invite-member/${inviteid}/`, {
          email: company_name,
          description,
          is_active: status,
          is_check: checkbox,
          is_name: namefield,
          agency: userid,
        })
        .then((res) => {
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          // toast.success("Successfully Saved!");
          navigate("/home");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "E-mail is not valid",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
          });
          navigate("/home");
        });
    } else {
      api
        .post(`${BACKEND_API_URL}agency/invite-member/`, {
          email: company_name,
          description,
          is_active: status,
          agency: userid,
        })
        .then((res) => {
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          // toast.success("Successfully Saved!");
          navigate("/home");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Company is already exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
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
              {inviteid ? <h1>Edit E-mail</h1> : <h1>Add E-mail</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.company_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>E-MAIL</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Add a E-mail"
                    name="company_name"
                    onChange={(e) => {
                      setcompanyName(e.target.value);
                      setnamefield(true);
                      setErrors({ ...errors, company_name: null });
                    }}
                    value={company_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.company_name ? 1 : 0,
                    }}
                  >
                    {errors.company_name ?? "valid"}
                  </span>
                </div>

                <div className="inputCntnr CategoryinputH ">
                  {/* <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Invite Description"
                    name="company_description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrors({ ...errors, description: null });
                    }}
                    value={description}
                  /> */}
                </div>

                <div className="checkboxStatus"></div>
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
                  <button
                    onClick={getback}
                    className="create-account-btn mt-2 border-radius CancelAddBtN workflowcancelbtn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Invite_add;
