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
import { getLevelDetails } from "../../redux/actions/level-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";
import swal from "sweetalert";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { Link } from "react-router-dom";

function Level_add_edit() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { levelId } = useParams();
  const [level_name, setLevelName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({
    level_name: null,
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
      level_name: validations.level_name(level_name),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {

      return;
    }
    submitHandler();
  };
  const {
    loading: levelLoading,
    success,
    levelDetails,
  } = useSelector((state) => state.levelDetailsReducer);

  useEffect(() => {
    // console.log(levelDetails);
    if (levelId) {
      if (!levelDetails || !levelDetails.level_name) {
        dispatch(getLevelDetails(levelId));
      } else {
        setLevelName(levelDetails.level_name);
        setDescription(levelDetails.description);
        setStatus(levelDetails.is_active);
      }
    }
  }, [dispatch, success]);

  // useEffect(() => {
  //   if (levelId) {
  //     dispatch(getLevelDetails(levelId));
  //     if (success) {
  //       setLevelName(levelDetails.level_name);
  //       setDescription(levelDetails.description);
  //       setStatus(levelDetails.is_active);
  //     }
  //     // console.log("levelDetails222--", levelDetails);
  //   }
  //   // console.log("levelDetails--", levelDetails);
  // }, [success]);

  const submitHandler = (e) => {
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
      axios
        .put(`${BACKEND_API_URL}levels/${levelId}/`, {
          level_name,
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
          navigate("/levels/list");
        });
    } else {
      axios
        .post(`${BACKEND_API_URL}levels/`, {
          level_name,
          description,
          is_active: status,
        })
        .then((res) => {
          // console.log("response", res.data);
          swal({
            title: "Successfully Complete",
            text: "Successfully Saved!",
            className: "successAlert",

            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate("/levels/list");
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
              {levelId ? <h1>Edit Level</h1> : <h1>Add Level</h1>}
            </div>
          </div>
          <div className="Topallpage AllPageHight">
            <div className="ContentDivTop">
              <div className="addpage Industrypage">
                <div
                  className={
                    errors.level_name
                      ? "inputCntnr error"
                      : "inputCntnr CategoryinputH"
                  }
                >
                  <h4>Name</h4>
                  <input
                    className="category_name validateInput w-100 h-47 border-radius border-1"
                    type="text"
                    placeholder="Name"
                    name="level_name"
                    onChange={(e) => {
                      setLevelName(e.target.value);
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
                    name="level_description"
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
                    to="/levels/list"
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
export default Level_add_edit;
