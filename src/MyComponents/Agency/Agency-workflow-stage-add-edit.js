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
import { workflowstagegetstageDetails } from "../../redux/actions/workflowstageskill-action";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Workflow_agency_stage_add() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { stageId } = useParams();
  const [stage_name, setstageName] = useState("");
  const [description, setDescription] = useState("");
  const [checkbox, setcheckbox] = useState(false);
  const [namefield, setnamefield] = useState(false);
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    stage_name: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      stage_name: validations.stage_name(stage_name),
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

  const { userData } = useSelector((state) => state.authReducer);
  const [userid, setuserid] = useState("");
  useEffect(() => {
    dispatch(defaultPageLoader());
    let user = JSON.parse(localStorage.getItem("userData"));
    setuserid(user?.user.user_id);
  }, []);

  const getback = () => {
    navigate("/stages-workflow/list");
  };

  const { loading } = useSelector((state) => state.loaderReducer);

  const {
    loading: stageLoading,
    success,
    stageDetails,
  } = useSelector((state) => state.workflowstagestageDetailsReducer);

  useEffect(async () => {
    console.log(stageId);
    if (stageId) {
      if (!stageDetails || !stageDetails.stage_name) {
        await dispatch(workflowstagegetstageDetails(stageId));
      } else {
        setstageName(stageDetails.stage_name);
        setDescription(stageDetails.description);
        setStatus(stageDetails.is_active);
      }
    }
  }, [dispatch, success]);

  console.log("stageDetails-- ", stageDetails);

  const submitHandler = (e) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    if (stage_name.length >= 50) {
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
    if (stageId) {
      api
        .put(`${BACKEND_API_URL}agency/stages/${stageId}/`, {
          stage_name,
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
          navigate("/stages-workflow/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Stage alreay exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          navigate("/stages-workflow/list");
        });
    } else {
      api
        .post(`${BACKEND_API_URL}agency/stages/`, {
          stage_name: stage_name,
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
          navigate("/stages-workflow/list");
        })
        .catch((err) => {
          swal({
            title: "Error",
            text: "Stage alreay exist",
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
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
              {stageId ? <h1>Edit Stage</h1> : <h1>Add Stage</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.stage_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Stage</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Stage Name"
                    name="stage_name"
                    onChange={(e) => {
                      setstageName(e.target.value);
                      setnamefield(true);
                      setErrors({ ...errors, stage_name: null });
                    }}
                    value={stage_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.stage_name ? 1 : 0,
                    }}
                  >
                    {errors.stage_name ?? "valid"}
                  </span>
                </div>

                <div className="inputCntnr CategoryinputH ">
                  <h4 className="">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Stage Description"
                    name="stage_description"
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
                    className="create-account-btn mt-2 border-radius CancelAddBtN workflowcancelbtn"
                    onClick={getback}
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
export default Workflow_agency_stage_add;
