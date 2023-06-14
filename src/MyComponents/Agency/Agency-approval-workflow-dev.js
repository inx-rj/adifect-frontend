import React, { useEffect, useState, useRef } from "react";
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
import Select from "@mui/material/Select";
import { workflowlistAlllevels } from "../../redux/actions/workflowslevel-action";

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
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
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
      stage_id: "",
      stage_name: "",
      is_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      order: "",
    },
  ]);
  const stagesRef = useRef([
    {
      stage_id: "",
      stage_name: "",
      is_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      order: "",
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
  const [isOpen6, setIsOpen6] = useState(false);

  useEffect(() => {
    const handler = () => {
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
        order: "",
      },
    ]);
    stagesRef.current = [
      ...stages,
      {
        stage_id: "",
        stage_name: "",
        is_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        order: "",
      },
    ];
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
            order: workflowDetails[i].order,
          });
        }
      } else {
        finalArr.push({
          stage_id: "",
          stage_name: "",
          is_approval: false,
          approvals: [],
          is_observer: false,
          observer: [],
          order: "",
        });
      }
      setStages(finalArr);
      stagesRef.current = finalArr;
    }
  }, [workflowDetails]);

  const [showbutton, setshowbutton] = useState(true);

  useEffect(() => {
    if (workflowMainDetails && workflowId) {
      setWorkflowName(workflowMainDetails.name);
      setcompanyvalue(workflowMainDetails?.company);

      // console.log(
      //   "workflowMainDetails?.assigned_job -- ",
      //   workflowMainDetails?.assigned_job
      // );
      if (workflowMainDetails?.assigned_job == true) {
        setshowbutton(false);
      } else {
        setshowbutton(true);
      }
    }
  }, [workflowMainDetails]);

  // console.log("showbutton", showbutton);
  const validateSubmit = (e, data) => {
    e.preventDefault();

    const tempErrors = {
      workflowName: !workflowName && "This field cannot be empty",
      // price: validations.price(price),
      // job_type: !job_type && "Please select a job type",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };

  const submitHandler = () => {
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

    // console.log("workflowName -- ", workflowName);
    // console.log("newArr -- ", newArr);
    // console.log("workflowId -- ", workflowId);

    if (workflowId) {
      const update = api
        .put(`${BACKEND_API_URL}agency/works-flow/${workflowId}/`, {
          agency: userData.user.user_id,
          name: workflowName,
          stage: newArr,
        })
        .then((res) => {
          // console.log(res);
          // console.log("status - ", res.status);
          if (res?.data?.status == 400) {
            setIsLoading(true);
            swal({
              title: "Error",
              text: res?.data?.message,
              className: "errorAlert",
              icon: "/img/logonew-red.svg",
              buttons: false,
              timer: 2000,
            });
            navigate("/workflow");
          } else if (res.status == 200) {
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
              icon: "/img/logonew-red.svg",
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
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            setIsLoading(true);
          }, 1);
        });
    } else {
      const success = api
        .post(`${BACKEND_API_URL}agency/works-flow/`, {
          // job: 67,
          agency: userData.user.user_id,
          name: workflowName,
          stage: newArr,
          company: companyvalue,
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
          swal({
            title: "Error",
            text: err.message,
            className: "errorAlert",
            icon: "/img/logonew-red.svg",
            buttons: false,
            timer: 1500,
          });
          setTimeout(() => {
            setIsLoading(true);
          }, 1);
        });
    }
  };

  const [companydata, setcompanydata] = useState();
  const [companyvalue, setcompanyvalue] = useState(null);

  useEffect(() => {
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const success = axios
      .get(`${BACKEND_API_URL}agency/company/`, config)
      .then((res) => {
        // console.log(res);
        setcompanydata(res.data);
      })
      .catch((err) => {});
  }, []);

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

  const orderUp = async (e, newid, index) => {
    e.preventDefault();
    // console.log("start--", stages);
    // console.log("index--", index);
    // console.log("newid--", newid);
    if (index > 0 && workflowId) {
      let newVar = stages.find((item, i) => item.stage_id == newid);
      let reorderItem = newVar.stage_id;
      let newVarIndex = stages.indexOf(newVar);

      let newVar2 = stages.find((item, i) => i == index - 1);
      // let reorderUpItem = newVar2.stage_id;
      let newVar2Index = stages.indexOf(newVar2);

      // console.log("+++", newVarIndex, newVar2Index);

      let newArr = stages;
      let b = newArr[newVar2Index];
      newArr[newVar2Index] = newArr[newVarIndex];
      newArr[newVarIndex] = b;

      let newItems = newArr.slice();
      let temp = newArr[newVar2Index];
      newItems[newVar2Index] = newArr[newVarIndex];
      newItems[newVarIndex] = temp;
      // console.log("final--", newItems);

      let finalArr = [];
      for (let i = 0; i < newItems.length; i++) {
        // console.log("hrere2222--", newItems[i].stage_id);
        finalArr.push(newItems[i].stage_id);
      }
      // console.log("finalArr", finalArr);
      // console.log("finalArr", typeof finalArr);

      let finalArrStr = String(finalArr);
      // console.log("finalArrStr", finalArrStr);
      // console.log("finalArrStr", typeof finalArrStr);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      let updateOrder = await axios
        .post(
          `${BACKEND_API_URL}agency/works-flow-stages/set_order/${workflowId}/`,
          { order_list: finalArrStr },
          config
        )
        .then((res) => {
          // console.log("response", res.data);
          // swal({
          //   title: "Successfully Complete",
          //   text: res.data.message,
          //   className: "successAlert",
          //   icon: "/img/SuccessAlert.png",
          //   buttons: false,
          //   timer: 1500,
          // });
          // navigate(`/jobs/list`);
        })
        .catch((err) => {
          // console.log("err", err);
          // swal({
          //   title: "Error",
          //   text: err.response.data.message,
          //   className: "errorAlert",
          //   icon: "/img/ErrorAlert.png",
          //   buttons: false,
          //   timer: 1500,
          // });
        });

      setStages(newItems);
      stagesRef.current = newItems;
    }
    // TODO: Do the same for add page

    // e.preventDefault();
    // console.log("up", newid);
    // console.log(stages);

    // const reorderItem = stages.find((item) => item.stage_id == newid);
    // console.log(reorderItem.stage_id, index);

    // for (let i = 0; i < stages.length; i++) {
    //   // console.log("hrere", stages[i].stage_id);
    // }
  };

  useEffect(() => {
    stagesRef.current = stages;
  }, [stages]);

  const orderDown = async (e, newid, index) => {
    e.preventDefault();
    // console.log("start--", stages);
    // console.log("index--", index);
    // console.log("newid--", newid);
    if (index < stages.length - 1 && workflowId) {
      let newVar = stages.find((item, i) => item.stage_id == newid);
      let reorderItem = newVar.stage_id;
      let newVarIndex = stages.indexOf(newVar);

      let newVar2 = stages.find((item, i) => i == index + 1);
      // let reorderUpItem = newVar2.stage_id;
      let newVar2Index = stages.indexOf(newVar2);

      // console.log("+++", newVarIndex, newVar2Index);

      let newArr = stages;
      let b = newArr[newVar2Index];
      newArr[newVar2Index] = newArr[newVarIndex];
      newArr[newVarIndex] = b;

      let newItems = newArr.slice();
      let temp = newArr[newVar2Index];
      newItems[newVar2Index] = newArr[newVarIndex];
      newItems[newVarIndex] = temp;
      // console.log("final--", newItems);

      let finalArr = [];
      for (let i = 0; i < stages.length; i++) {
        // console.log("hrere2222--", newItems[i].stage_id);
        finalArr.push(stages[i].stage_id);
      }
      // console.log("finalArr", finalArr);
      // console.log("finalArr", typeof finalArr);

      let finalArrStr = String(finalArr);
      // console.log("finalArrStr", finalArrStr);
      // console.log("finalArrStr", typeof finalArrStr);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userData.token}`,
        },
      };

      let updateOrder = await axios
        .post(
          `${BACKEND_API_URL}agency/works-flow-stages/set_order/${workflowId}/`,
          { order_list: finalArrStr },
          config
        )
        .then((res) => {
          // console.log("response", res.data);
          // swal({
          //   title: "Successfully Complete",
          //   text: res.data.message,
          //   className: "successAlert",
          //   icon: "/img/SuccessAlert.png",
          //   buttons: false,
          //   timer: 1500,
          // });
          // navigate(`/jobs/list`);
        })
        .catch((err) => {
          // console.log("err", err);
          // swal({
          //   title: "Error",
          //   text: err.response.data.message,
          //   className: "errorAlert",
          //   icon: "/img/ErrorAlert.png",
          //   buttons: false,
          //   timer: 1500,
          // });
        });

      setStages(newItems);
      stagesRef.current = newItems;
    }
  };

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
            {showbutton == true ? null : (
              <h6 className="currentlyWorkflow">
                This workflow is currently in use and cannot be edited.{" "}
                <span className="jobsusing">Jobs using workflow</span>
              </h6>
            )}
            {/* {datashow ? ( */}
            {/*  */}
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
              <div className="Approvalworkflowpage mt-3">
                <div className="text-content ">
                  <h5 className="selectworklabel">
                    Workflow Assign to Company?
                  </h5>{" "}
                  <div className="styled-select Companyname">
                    <Select
                      className={
                        companyvalue === null
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      open={isOpen6}
                      onOpen={() => {
                        setIsOpen6(true);
                      }}
                      onClose={() => {
                        setIsOpen6(false);
                      }}
                      MenuProps={menuProps}
                      value={companyvalue}
                      onChange={(e) => {
                        setcompanyvalue(e.target.value);
                        // console.log(e.target.value);
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      <MenuItem value={null}>Select Company</MenuItem>
                      {companydata?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <span></span>
              </div>
              {/* <div className="AWokflowButton">
                <button
                  className="Work-C-Btt"
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={goback}
                >
                  Cancel
                </button>
                {showbutton ? (
                  <button
                    className="Save-C-Btt"
                    type="button"
                    onClick={validateSubmit}
                  >
                    Save
                  </button>
                ) : (
                  <button className="Save-C-Btt" disabled type="hidden">
                    Save
                  </button>
                )}
              </div> */}
            </div>
            <div id="items">
              {stagesRef?.current?.map((item, index) => {
                // {stages?.map((item, index) => {
                return (
                  <div key={index} className="services servicesworkflow">
                    <div className="Stage1">
                      <div className="Stage1_left_Workflow">
                        <label>
                          <h2>
                            {JSON.stringify(item.order)}
                            Stage {item.order + 1}-
                          </h2>
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
                            // disabled={stages}
                            to=""
                            onClick={(e) => orderUp(e, item.stage_id, index)}
                            // onClick={(e) => setselected(index)}
                            className="up"
                          >
                            <img src="/img/upimg.png" />
                          </Link>
                        </li>
                        {/* <li disabled={item.stage_id == 64}> */}
                        <li>
                          <Link
                            to=""
                            className="down"
                            onClick={(e) => orderDown(e, item.stage_id, index)}
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
                          // id="is_approval"
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
                            getOptionLabel={(option) => option?.user_name}
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
                              getOptionLabel={(option) => option?.user_name}
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
            <div className="StageAddPlusB stage-action-btn-left">
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

            <div className="workflow-heading stage-action-btn-right">
              <div className="AWokflowButton">
                <button
                  className="Work-C-Btt"
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={goback}
                >
                  Cancel
                </button>
                {showbutton ? (
                  <button
                    className="Save-C-Btt"
                    type="button"
                    onClick={validateSubmit}
                  >
                    Save
                  </button>
                ) : (
                  <button className="Save-C-Btt" disabled type="hidden">
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
