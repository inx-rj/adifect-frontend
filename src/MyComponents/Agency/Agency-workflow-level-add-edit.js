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
import { workflowgetlevelDetails } from "../../redux/actions/workflowslevel-action";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Workflow_agency_level_add() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { levelId } = useParams();
  const [userid, setuserid] = useState("");
  const [level_name, setlevelName] = useState("");
  const [description, setDescription] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [namefield, setnamefield] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    level_name: null,
  });
  const { userData } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      level_name: validations.level_name(level_name),
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
    loading: levelLoading,
    success,
    levelDetails,
  } = useSelector((state) => state.workflowlevelDetailsReducer);

  useEffect(() => {
    if (levelId) {
      if (!levelDetails || !levelDetails.level_name) {
        dispatch(workflowgetlevelDetails(levelId));
      } else {
        setlevelName(levelDetails.level_name);
        setDescription(levelDetails.description);
        setStatus(levelDetails.is_active);
      }
    }
  }, [dispatch, success]);

  const getback = () => {
    navigate("/levels-workflow/list");
  };

  const submitHandler = (e) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (level_name.length >= 50) {
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
    if (levelId) {
      api
        .put(`${BACKEND_API_URL}agency/levels/${levelId}/`, {
          level_name: level_name,
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
          navigate("/levels-workflow/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Levels already exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 2000,
          });
          navigate("/levels-workflow/list");
        });
    } else {
      api
        .post(`${BACKEND_API_URL}agency/levels/`, {
          level_name: level_name,
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
          navigate("/levels-workflow/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Levels already exist",
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
              {levelId ? <h1>Edit Level</h1> : <h1>Add Levels</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.level_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Levels</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Levels Name"
                    name="level_name"
                    onChange={(e) => {
                      setlevelName(e.target.value);
                      setnamefield(true);
                      setErrors({ ...errors, level_name: null });
                    }}
                    value={level_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.level_name ? 1 : 0,
                    }}
                  >
                    {errors.level_name ?? "valid"}
                  </span>
                </div>

                <div className="inputCntnr CategoryinputH ">
                  <h4 className="">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Level Description"
                    name="Level_description"
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
                        setcheckbox(true);
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
export default Workflow_agency_level_add;
