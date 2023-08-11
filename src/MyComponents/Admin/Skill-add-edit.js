import React, { useEffect, useState } from "react";
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
import { getSkillDetails } from "../../redux/actions/skill-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Skill_add_edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { skillId } = useParams();
  const [skill_name, setSkillName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    skill_name: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      skill_name: validations.skill_name(skill_name),
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

  const { loading } = useSelector((state) => state.loaderReducer);

  const {
    loading: skillLoading,
    success,
    skillDetails,
  } = useSelector((state) => state.skillDetailsReducer);

  useEffect(async () => {
    console.log(skillId);
    if (skillId) {
      if (!skillDetails || !skillDetails.skill_name) {
        await dispatch(getSkillDetails(skillId));
      } else {
        setSkillName(skillDetails.skill_name);
        setDescription(skillDetails.description);
        setStatus(skillDetails.is_active);
      }
    }
  }, [dispatch, success]);

  // useEffect(async () => {
  //   if (skillId) {
  //     await dispatch(getSkillDetails(skillId));
  //     if (success) {
  //       setSkillName(skillDetails.skill_name);
  //       setDescription(skillDetails.description);
  //       setStatus(skillDetails.is_active);
  //     }
  //     console.log("skillDetails222--", skillDetails);
  //   }
  //   console.log("skillDetails--", skillDetails);
  // }, [success]);

  const submitHandler = (e) => {
    if (skill_name.length >= 50) {
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
    if (skillId) {
      axios
        .put(`${BACKEND_API_URL}skills/${skillId}/`, {
          skill_name,
          description,
          is_active: status,
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
          navigate("/skills/list");
        });
    } else {
      axios
        .post(`${BACKEND_API_URL}skills/`, {
          skill_name,
          description,
          is_active: status,
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
          navigate("/skills/list");
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
              {skillId ? <h1>Edit Skill</h1> : <h1>Add Skill</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop Categorypage">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.skill_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Skill</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Skill Name"
                    name="skill_name"
                    onChange={(e) => {
                      setSkillName(e.target.value);
                      setErrors({ ...errors, skill_name: null });
                    }}
                    value={skill_name}
                  />
                  <span
                    style={{
                      color: "#D14F4F",
                      opacity: errors.skill_name ? 1 : 0,
                    }}
                  >
                    {errors.skill_name ?? "valid"}
                  </span>
                </div>

                <div className="inputCntnr CategoryinputH ">
                  <h4 className="">Description</h4>
                  <textarea
                    className="category_descripiton validateInput w-100 h-47 border-radius border-1  addedittextarar"
                    type="textarea"
                    placeholder="Skill Description"
                    name="skill_description"
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
                    to="/skills/list"
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
export default Skill_add_edit;
