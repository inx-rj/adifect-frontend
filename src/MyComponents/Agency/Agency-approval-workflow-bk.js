import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { ROLE } from "../../constants/other-constants";
import { listAllSkills } from "../../redux/actions/skill-actions";
import axios from "axios";
import swal from "sweetalert";
import { Button } from "@mui/material";
import { BACKEND_API_URL } from "../../environment";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { workflowlistAlllevels } from "../../redux/actions/workflowslevel-action";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import api from "../../utils/api";
import {
  workflowdelete,
  workflowdelete1,
  workflowinvitememberlist,
  workflowgetDetails,
  workflowgetMainDetails,
} from "../../redux/actions/workflow-action";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import {
  workflowstagelistAllstages,
  workflowstagedeletestage,
} from "../../redux/actions/workflowstageskill-action";
import TextField from "@mui/material/TextField";
import $ from "jquery";
import Autocomplete from "@mui/material/Autocomplete";
import { validations } from "../../utils";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Agency_approval_workflow() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [workflowName, setWorkflowName] = useState("");
  const [stages, setStages] = useState([
    {
      stage_id: 1,
      stage_name: "",
      is_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      // order: ''
    },
  ]);

  const [errors, setErrors] = useState({
    workflowName: null,
    stages: null,
    selects: null,
  });

  const { workflowMemberData } = useSelector(
    (state) => state.workflowMemberReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);

  const { loading: flowLoading, workflowDetails } = useSelector(
    (state) => state.workflowDetailsReducer
  );

  const { stagesData } = useSelector(
    (state) => state.workflowstagestageReducer
  );

  const { workflowMainDetails } = useSelector(
    (state) => state.workflowMainDetailsReducer
  );

  const { userData } = useSelector((state) => state.authReducer);

  const { workflowId } = useParams();

  const handleAddStage = () => {
    let lenStages = stages.length;
    setStages([
      ...stages,
      {
        stage_id: "",
        stage_name: "",
        is_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        // order: ''
      },
    ]);
  };

  const handleRemoveStage = (id) => {
    if (stages.length > 1) {
      let newValues = [...stages];
      newValues.splice(id, 1);
      setStages(newValues);
    }
  };

  const handleObserver = (id) => {
    let prevRecord = stages[id].is_observer;
    let newValues = [...stages];
    newValues[id].is_observer = !prevRecord;
    setStages(newValues);
  };

  const handleServiceChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
  };

  const handleApproverChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
    setStages(list);
  };

  const goback = () => {
    navigate("/workflow");
  };

  const changeHandler1 = (e, v, index) => {
    let list = [...stages];
    list[index]["approvals"] = v;
    setStages(list);
  };

  const handleInputChangeAutocomplete1 = (event, newInputValue) => {
    // setSkills(newInputValue);
  };

  function handleKeyDownApprover(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    // setIsOpenApprovers(true);
    if (e.key !== "Enter") return;
    // if (!value.trim()) return;
    e.target.value = "";
  }

  const changeHandler2 = (e, v, index) => {
    let list = [...stages];
    list[index]["observer"] = v;
    setStages(list);
  };

  const handleInputChangeAutocomplete2 = (event, newInputValue) => {
    if (newInputValue.length > 0) {
      setStages([...stages, { is_observer: true }]);
      // setIsOpenObservers(true);
    } else {
      setStages([...stages, { is_observer: false }]);
      // setIsOpenObservers(false);
    }
  };

  function handleKeyDownObserver(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    setStages([...stages, { is_observer: true }]);
    // setIsOpenObservers(true);
    if (e.key !== "Enter") return;
    // if (!value.trim()) return;
    e.target.value = "";
  }

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.user_name,
  });

  useEffect(() => {
    dispatch(workflowinvitememberlist());
    if (workflowId) {
      dispatch(workflowgetDetails(workflowId));
      dispatch(workflowgetMainDetails(workflowId));
    }
  }, []);

  useEffect(() => {
    let finalArr = [];

    if (workflowDetails && workflowId) {
      if (workflowDetails.length > 0) {
        for (let i in workflowDetails) {
          finalArr.push({
            stage_id: workflowDetails[i].id,
            stage_name: workflowDetails[i].name,
            is_approval: workflowDetails[i].is_approval,
            approvals: workflowDetails[i].approvals_details,
            is_observer: workflowDetails[i].is_observer,
            observer: workflowDetails[i].observer_detail,
            // order: ''
          });
        }
      } else {
        finalArr.push([
          {
            stage_id: 1,
            stage_name: "",
            is_approval: false,
            approvals: [],
            is_observer: false,
            observer: [],
            // order: ''
          },
        ]);
      }
      setStages(finalArr);
    }
  }, [workflowDetails]);

  useEffect(() => {
    if (workflowMainDetails && workflowId) {
      setWorkflowName(workflowMainDetails.name);
    }
  }, [workflowMainDetails]);

  const validateSubmit = (e, data) => {
    e.preventDefault();

    const tempErrors = {
      workflowName: !workflowName && "This field cannot be empty",
      // price: validations.price(price),
      // job_type: !job_type && "Please select a job type",
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

  const submitHandler = async () => {
    let newArr = stages?.map((item, index) => {
      let myArr = [];
      let myArr2 = [];
      for (let i = 0; i < item?.approvals?.length; i++) {
        myArr.push(item.approvals[i].id);
      }
      for (let i = 0; i < item?.observer?.length; i++) {
        myArr2.push(item.observer[i].id);
      }

      item.approvals = myArr;
      item.observer = myArr2;
      return item;
    });
    // newArr = newArr.filter((v, index) => v[index] != "");
    // TODO: Check for values of the fields used

    console.log("workflowName -- ", workflowName);
    console.log("newArr -- ", newArr);
    console.log("workflowId -- ", workflowId);
    if (workflowId) {
      const update = await api
        .put(`${BACKEND_API_URL}agency/works-flow/${workflowId}/`, {
          // job: 67,
          agency: userData.user.user_id,
          name: workflowName,
          stage: newArr,
        })
        .then((res) => {
          // setname();
          if (res.status == 200) {
            setIsLoading(true);
            swal({
              title: "Successfully Complete",
              text: "Successfully Saved",
              className: "successAlert-login",
              icon: "/img/logonew.svg",
              buttons: false,
              timer: 1500,
            });
            navigate("/workflow");
          } else {
            swal({
              title: "Error",
              text: res.message,
              className: "errorAlert",
              icon: "/img/ErrorAlert.png",
              buttons: false,
              timer: 1500,
            });
            setTimeout(() => {
              setIsLoading(true);
            }, 1);
          }
        })
        .catch((err) => {
          // setname();
          swal({
            title: "Error",
            text: err.message,
            className: "errorAlert",
            icon: "/img/ErrorAlert.png",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            setIsLoading(true);
          }, 1);
        });
    } else {
      const success = await api
        .post(`${BACKEND_API_URL}agency/works-flow/`, {
          // job: 67,
          agency: userData.user.user_id,
          name: workflowName,
          stage: newArr,
        })
        .then((res) => {
          // setname();
          setIsLoading(true);
          swal({
            title: "Successfully Complete",
            text: "Successfully Created",
            className: "successAlert-login",
            icon: "/img/logonew.svg",
            buttons: false,
            timer: 1500,
          });
          navigate("/workflow");
        })
        .catch((err) => {
          // setname();
          swal({
            title: "Error",
            text: err.message,
            className: "errorAlert",
            icon: "/img/ErrorAlert.png",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            setIsLoading(true);
          }, 1);
        });
    }
  };

  // useEffect(() => {
  //   const success = axios
  //     .get(`${BACKEND_API_URL}users-list/`, {})
  //     .then((res) => {
  //       // setuserdata(res.data);
  //     })
  //     .catch((err) => {});
  // }, []);

  // const [isOpen4, setIsOpen4] = useState(false);
  // useEffect(() => {
  //   const handler = () => {
  //     setIsOpen4(false);
  //   };
  //   window.addEventListener("scroll", handler);
  //   return () => {
  //     window.removeEventListener("scroll", handler);
  //   };
  // }, []);
  // const menuProps = {
  //   variant: "menu",
  //   disableScrollLock: true,
  // };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : flowLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isLoading && <LoadingSpinner />}
          <div className="right-sidebar-workflow">
            {/* {datashow ? ( */}
            {/* <div className="workflow-heading">
              <h1 className="approvaltitle">
                Edit Approval Workflow{" "}
                <span className="backbtnlink">
                  <Link to="/workflow">Back</Link>
                </span>
              </h1>
            </div>
            ) : ( */}
            <div className="workflow-heading">
              <h1 className="approvaltitle">
                Create Approval Workflow{" "}
                <span className="backbtnlink">
                  <Link to="/workflow">Back</Link>
                </span>
              </h1>
            </div>
            {/* )} */}
            {/* {datashow ? ( */}
            {/* <h6 className="currentlyWorkflow">
              This workflow is currently in use and cannot be edited.{" "}
              <span className="jobsusing">Jobs using workflow</span>
            </h6> */}
            {/* ) : null} */}
            <div className="AG-Workflow">
              <div className="Approvalworkflowpage">
                <h5 className="selectworklabel">Approval Workflow Name</h5>
                <input
                  className="ApprovalNameInput"
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  name="Name"
                  placeholder="Name"
                  // onChange={handlechange}
                />
                <span></span>
              </div>
              <div className="AWokflowButton">
                <button
                  className="Work-C-Btt"
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={goback}
                >
                  Cancel
                </button>
                <button
                  className="Save-C-Btt"
                  type="button"
                  onClick={validateSubmit}
                >
                  Save
                </button>
              </div>
            </div>
            <div id="items">
              {stages?.map((item, index) => {
                return (
                  <div key={index} className="services servicesworkflow">
                    <div className="Stage1">
                      <div className="Stage1_left_Workflow">
                        <label>
                          <h2>Stage {index + 1}-</h2>
                        </label>
                        <input
                          className="ApprovalNameInput w-393"
                          // onChange={(e) =>
                          //   setStages((prev) => [
                          //     ...prev,
                          //     { stage_name: e.target.value },
                          //   ])
                          // }
                          onChange={(e) => handleServiceChnge(e, index)}
                          type="text"
                          value={item.stage_name}
                          name="stage_name"
                          placeholder="Workflow stage name"
                        />
                      </div>

                      <div className="Stage1_right_Workflow">
                        <li>
                          <Link
                            to=""
                            // onClick={(e) => setselected(index)}
                            className="up"
                          >
                            <img src="/img/upimg.png" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to=""
                            className="down"
                            // onClick={(e) => setselected(index)}
                          >
                            <img src="/img/don.png" />
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <img
                              onClick={(e) => handleRemoveStage(index)}
                              src="/img/d_11.png"
                            />
                          </Link>
                        </li>
                      </div>
                    </div>
                    <div className="Approvers">
                      <h4>Approvers</h4>
                      <div className="related-jobs-check-box">
                        <input
                          type="checkbox"
                          id="is_approval"
                          onClick={(e) => handleApproverChnge(e, index)}
                          // onChange={(e) => handleApproverChnge(e, index)}
                          // setStages(...stages, { ...item, {item.!item.is_approval })
                          checked={item.is_approval}
                          name="is_approval"
                        />
                        <label className="EveryoneColor" htmlFor="is_approval">
                          {" "}
                          Everyone must approve job before it will move to the
                          next stage
                        </label>
                      </div>
                      <div className="Observersskillssec">
                        <div className="skills-input-container">
                          <Autocomplete
                            value={item.approvals}
                            name="approvals"
                            // value={approvers}
                            multiple
                            id="tags-outlined"
                            // open={isOpenApprovers}
                            onInputChange={handleInputChangeAutocomplete1}
                            filterOptions={filterOptions}
                            options={workflowMemberData}
                            getOptionLabel={(option) => option.user_name}
                            // onChange={(event, value) => setSkills(value)}
                            onChange={(e, v) => {
                              changeHandler1(e, v, index);
                            }}
                            // defaultValue={skills ?? []}
                            // inputValue={skills}
                            inputProps={{ "aria-label": "Without label" }}
                            filterSelectedOptions
                            // noOptionsText={
                            //   "Press enter to add this skill and select again"
                            // }
                            hiddenLabel="true"
                            onKeyDown={handleKeyDownApprover}
                            autoHighlight={true}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                placeholder="Type something"
                              />
                            )}
                            isOptionEqualToValue={(option, value) =>
                              value === undefined ||
                              value === "" ||
                              option.id === value.id
                            }
                          />
                        </div>
                      </div>
                      <div className="switch_Agency">
                        <div className="Observers">
                          <label className="switch">
                            <input type="checkbox" checked={item.is_observer} />
                            <span
                              className="slider round"
                              onClick={() => {
                                handleObserver(index);
                              }}
                            ></span>
                          </label>
                          <h4>Observers</h4>
                        </div>
                      </div>
                      <p className="Observerstext">
                        Observers will see this stage of approvals, but will not
                        be asked to approve anything.
                      </p>
                      {stages[index]?.is_observer && (
                        // {stages[index].isObserver && (
                        <div className="Observersskillssec">
                          <div className="skills-input-container">
                            <Autocomplete
                              value={item.observer}
                              multiple
                              id="tags-outlined"
                              // open={isOpenObservers}
                              onInputChange={handleInputChangeAutocomplete2}
                              filterOptions={filterOptions}
                              options={workflowMemberData}
                              getOptionLabel={(option) => option.user_name}
                              // onChange={(event, value) => setSkills(value)}
                              onChange={(e, v) => {
                                changeHandler2(e, v, index);
                              }}
                              // defaultValue={skills ?? []}
                              // inputValue={skills}
                              inputProps={{ "aria-label": "Without label" }}
                              filterSelectedOptions
                              // noOptionsText={
                              //   "Press enter to add this skill and select again"
                              // }
                              hiddenLabel="true"
                              onKeyDown={handleKeyDownObserver}
                              autoHighlight={true}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  placeholder="Type something"
                                />
                              )}
                              isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                value === "" ||
                                option.id === value.id
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="StageAddPlusB">
              {/* <button
                className="Save-C-Btt"
                type="button"
                onClick={submitstage}
              >
                Save{" "}
              </button> */}
              <button
                type="button"
                onClick={handleAddStage}
                className="addBtnWorkPage"
              >
                <img className="addstwimg" src="/img/plusicon.png" />
                Add Stage
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
