import React, { useEffect, useState } from "react";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { ROLE } from "../../constants/other-constants";
import axios from "axios";
import swal from "sweetalert";
import { Button } from "@mui/material";
import { BACKEND_API_URL } from "../../environment";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { workflowlistAlllevels } from "../../redux/actions/workflowslevel-action";
import {
  workflowdelete,
  workflowlistAll,
} from "../../redux/actions/workflow-action";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import {
  workflowstagelistAllstages,
  workflowstagedeletestage,
} from "../../redux/actions/workflowstageskill-action";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Agency_approval_workflow_dev() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { levelData } = useSelector((state) => state.workflowlevelReducer);

  const { workflowData, loading: levelsLoading } = useSelector(
    (state) => state.workflowReducer
  );

  const { success } = useSelector((state) => state.workflowDeleteReducer);

  const { stagesData, loading: skillsLoading } = useSelector(
    (state) => state.workflowstagestageReducer
  );

  const handlechange = (event, option) => {
    if (option) {
      setstages(option.id);
    } else {
      setstages();
    }
  };

  const handlechange1 = (event, option) => {
    if (option) {
      setMessage(option.id);
    } else {
      setMessage();
    }
  };

  const [selects, setselects] = useState(null);
  const [flowData, setdata] = useState();
  const [message, setMessage] = useState();
  const [nameData, setuserdata] = useState("");
  const [stages, setstages] = useState();
  const { userData } = useSelector((state) => state.authReducer);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this skill?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(workflowdelete(id));
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
  };

  const submitHandler = async (data, event) => {
    const success = await axios
      .post(`${BACKEND_API_URL}agency/workflow/`, {
        level: selects,
        stage: stages,
        user: message,
      })
      .then((res) => {
        setstages();
        setMessage();
        dispatch(workflowlistAll());
        swal({
          title: "Successfully Complete",
          text: res.data.message,
          className: "successAlert-login",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
      })
      .catch((err) => {});
  };

  useEffect(() => {
    dispatch({ type: WORKFLOW_level_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  useEffect(() => {
    dispatch(workflowlistAlllevels());
    dispatch(workflowstagelistAllstages());
  }, [success]);

  useEffect(() => {
    dispatch(workflowlistAll());
  }, [success]);

  useEffect(() => {
    const success = axios
      .get(`${BACKEND_API_URL}users-list/`, {})
      .then((res) => {
        setuserdata(res.data);
      })
      .catch((err) => {});
  }, []);

  const [isOpen4, setIsOpen4] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen4(false);
    };

    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  return (
    <>
      <div className="right-sidebar-workflow">
        <div className="workflow-heading">
          <h1 className="Approvalwork">Approval Workflows</h1>
        </div>
        <div className="content-bar2">
          <div className="icon-discussion">
            {/* <img src="/img/icon1.png" className="first-icon" />{" "} */}
            <h3 className="ideation-discussion">
              Create and Assign Approved Stage
            </h3>
          </div>

          <div className="Approvaldiv">
            <div className="input-field2Select Approval441">
              <p className="selectworklabel">Select Approval Stage</p>
              <div className="styled-select wh-select">
                {stages}
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  value={stages}
                  onChange={handlechange}
                  options={stagesData?.filter((item) => item.is_active)}
                  getOptionLabel={(option) => option.stage_name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Stage 1" />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="inside-content ApprovalStage">
            <div className="input-field1 Approval441">
              <p>Assign to?</p>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={handlechange1}
                value={message}
                options={nameData}
                getOptionLabel={(option) => option.first_name}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="username or email" />
                )}
              />
            </div>

            <div className="input-field2">
              <p>Select Approval Level</p>
              <div className="styled-select wh-select">
                <Select
                className={
                  selects === null
                  ? "selectinputcolor"
                  : "menuiteminputcolor"
                  }
                  open={isOpen4}
                  onOpen={() => {
                    setIsOpen4(true);
                  }}
                  onClose={() => {
                    setIsOpen4(false);
                  }}
                  onChange={(e) => {
                    setselects(e.target.value);
                    console.log(e.target.value);
                  }}
                  value={selects}
                  MenuProps={menuProps}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={null}>Select one option</MenuItem>
                  {levelData?.map((item) =>
                    item.is_active ? (
                      <MenuItem key={item.id} value={item.id}>
                        {item.level_name}
                      </MenuItem>
                    ) : null
                  )}
                </Select>
              </div>
              {/* <select name="cars" id="cars" className="wh-select">
                                      <option value="volvo">Select one option</option>
                                      <option value="saab"></option>
                                      <option value="opel"></option>
                                      <option value="audi"></option>
                                 </select> */}
            </div>
          </div>
          <button className="CreateApprovalworkflowbtn" onClick={submitHandler}>
            Create Approval Stage
          </button>
        </div>
        <h1 className="AssignedApprovals">Assigned Approvals</h1>
        {workflowData?.map((item, i) => (
          <div className="content-bar1" key={i + 1}>
            <div className="Stagefirstsec">
              <div className="icon-discussion" key={i + 1}>
                <img src="/img/staga.png" className="first-iconimg" />{" "}
                <h3 className="ideation-discussion1">
                  {item?.get_stage_details.stage_name}
                </h3>
              </div>
              <div className="stegefirstsec1">
                <Button
                  title="delete"
                  className="deletebutt"
                  onClick={() => deleteHandler(item.id)}
                >
                  {" "}
                  <img
                    className="stagade1"
                    src="/img/stagade.png"
                    alt=""
                  />{" "}
                </Button>
              </div>
            </div>
            <div className="inside-content">
              <div className="input-field1">
                <p className="Searchuser2">Search user to add in workflow</p>
                <div className="Jennasec">
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={item?.get_user_details.first_name}
                    placeholder="Jenna Jane"
                    className="bor-col"
                  />
                  <img src="/img/workflowimage.png" className="input-img" />
                </div>
              </div>
              <div className="input-field4">
                <p className="Searchuser2">Select Approval Level</p>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={item?.get_level_details.level_name}
                  placeholder="Jenna Jane"
                  className="bor-col"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
    // )}
    // </>
  );
}
