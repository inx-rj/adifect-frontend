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
import Select  from "@mui/material/Select";
import { workflowlistAlllevels } from "../../redux/actions/workflowslevel-action";
import {
  workflowdelete,
  workflowlistAll,
} from "../../redux/actions/workflow-action";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import { WORKFLOW_DETAILS_RESET } from "../../constants/Workflow-constants";
import {
  workflowstagelistAllstages,
  workflowstagedeletestage,
} from "../../redux/actions/workflowstageskill-action";
import TextField from "@mui/material/TextField";
 import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

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

  const [selects, setselects] = useState(null);
  const [flowData, setdata] = useState();
  const [message, setMessage] = useState("");
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
      icon: "/img/WarningAlert.png",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(workflowdelete(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/SuccessAlert.png",
          buttons: false,
          timer: 1500,
        });
        workflowapi()
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
        workflowapi();
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

  const handlechange = (event, option) => {
    if (option) {
      setstages(option.id);
    } else {
      setstages();
    }
  };

  useEffect(() => {
    dispatch(workflowlistAll());
  }, [success]);

  useEffect(() => {
    dispatch({ type: WORKFLOW_DETAILS_RESET });
    dispatch(defaultPageLoader());
  }, []);

  useEffect(() => {
    dispatch(workflowlistAlllevels());
    dispatch(workflowstagelistAllstages());
  }, []);

  const workflowapi = () => {
    const success = axios
      .get(`${BACKEND_API_URL}agency/workflow/`, {})
      .then((res) => {
        console.log(res.data);
        setdata(res?.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    workflowapi();
  }, []);

  useEffect(() => {
    const success = axios
      .get(`${BACKEND_API_URL}users-list/`, {})
      .then((res) => {
        setuserdata(res.data);
      })
      .catch((err) => {});
  }, []);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  useEffect(() => {
    const handler = () => {
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen3(false);
      setIsOpen4(false);
      setIsOpen5(false);
      setIsOpen6(false);
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
            <h3 className="ideation-discussion">
              Create and Assign Approved Stage
            </h3>
          </div>

          <div className="Approvaldiv">
            <p>Select Approval Stage</p>
            <div className="styled-select wh-select">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={handlechange}
                options={stagesData?.filter((item) => item.is_active)}
                getOptionLabel={(option) => option.stage_name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </div>

          <div className="inside-content ApprovalStage">
            <div className="input-field1">
              <p>Assign to?</p>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                onChange={(event, value) => setMessage(value.id)}
                options={nameData}
                getOptionLabel={(option) => option.first_name}
                sx={{ width: 300 }}
                renderInput={({ inputProps, ...rest }) => (
                  <TextField
                    {...rest}
                    placeholder="Options based on title"
                    inputProps={{ ...inputProps, readOnly: true }}
                  />
                )}
                // renderInput={(params) => <TextField {...params} label="Name" />}
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
                    // console.log(e.target.value);
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

        {flowData?.map((item, i) => (
          <div className="content-bar1" key={i + 1}>
            <div className="icon-discussion" key={i + 1}>
              <img src="/img/icon1.png" className="first-icon" />{" "}
              <h3 className="ideation-discussion">
                Stage {i + 1}: {item?.get_stage_details.stage_name}
              </h3>
            </div>
            <div className="inside-content">
              <div className="input-field1">
                <p>Search user to add in workflow</p>
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
              <div className="input-field2">
                <p>Select Approval Level</p>
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
            <Button
              title="delete"
              className="deletebutt"
              onClick={() => deleteHandler(item.id)}
            >
              {" "}
              <img className="editicon" src="/img/delet.png" alt="" />{" "}
            </Button>
          </div>
        ))}
      </div>
    </>
    // )}
    // </>
  );
}
