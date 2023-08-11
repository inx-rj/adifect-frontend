import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllAdminCompanies } from "../../redux/actions/company-actions";
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
import {
  workflowStageDelete,
  adminWorkflowAdd,
  adminWorkflowEdit,
} from "../../redux/actions/workflow-action.js";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
// import {
//   workflowstagelistAllstages,
//   workflowstagedeletestage,
// } from "../../redux/actions/workflowstageskill-action";
import TextField from "@mui/material/TextField";
import $ from "jquery";
import Autocomplete from "@mui/material/Autocomplete";
import { validations } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Admin_approval_workflow() {
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
      is_all_approval: false,
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
      is_all_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      order: "",
    },
  ]);
  // const [isOpenObservers, setIsOpenObservers] = useState(false);
  // const [isOpenApprovers, setIsOpenApprovers] = useState(false);
  const [deleteStageIds, setDeleteStageIds] = useState([]);
  const [saveEffect, setSaveEffect] = useState(false);

  const [errors, setErrors] = useState({
    workflowName: null,
    stages: null,
    selects: null,
    observer: null,
  });

  const { workflowMemberData } = useSelector(
    (state) => state.workflowMemberReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);
  const { successDeleteStage } = useSelector(
    (state) => state.workflowStageDeleteReducer
  );

  const { loading: flowLoading, workflowDetails } = useSelector(
    (state) => state.workflowDetailsReducer
  );

  const { companiesData, loading: companyLoading } = useSelector(
    (state) => state.companyAdminReducer
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

  const { workflowAdd, error, message } = useSelector(
    (state) => state.adminWorkflowAddReducer
  );

  const { workflowId } = useParams();

  const handleAddStage = () => {
    let lenStages = stages.length;
    setStages([
      ...stages,
      {
        stage_id: "",
        stage_name: "",
        is_approval: false,
        is_all_approval: false,
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
        is_all_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        order: "",
      },
    ];
  };

  const handleRemoveStage = (id, newid, isDatabase) => {
    if (stages.length > 1) {
      let newValues = [...stages];

      if (isDatabase) {
        swal({
          title: "Warning",
          text: "Are you sure you want to delete this stage?",
          className: "errorAlert",
          icon: "/img/WarningAlert.png",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            newValues.splice(id, 1);

            // setNowDeleted(true);
            setDeleteStageIds((prev) => [...prev, newid]);
            // dispatch(workflowStageDelete(id));
            // swal({
            //   title: "Successfully Complete",
            //   text: "Successfully Deleted!",
            //   className: "successAlert",
            //   icon: "/img/SuccessAlert.png",
            //   buttons: false,
            //   timer: 1500,
            // });
          }
        });
      } else {
        newValues.splice(id, 1);
      }
      setStages(newValues);
      stagesRef.current = newValues;
    }
  };

  const handleObserver = (id) => {
    let prevRecord = stages[id].is_observer;
    let newValues = [...stages];
    newValues[id].is_observer = !prevRecord;
    setStages(newValues);
    stagesRef.current = newValues;
  };

  const handleServiceChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
    stagesRef.current = list;
  };

  const handleApproverChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
    setStages(list);
    stagesRef.current = list;
  };

  const handleAllApproverChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
    setStages(list);
    stagesRef.current = list;
  };

  const goback = () => {
    navigate("/workflow");
  };

  const changeHandler1 = (e, v, index) => {
    let list = [...stages];
    list[index]["approvals"] = v;
    setStages(list);
    stagesRef.current = list;
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
    stagesRef.current = list;
  };

  const handleInputChangeAutocomplete2 = (event, newInputValue) => {
    if (newInputValue.length > 0) {
      // setStages([...stages, { is_observer: true }]);
      // setIsOpenObservers(true);
    } else {
      // setStages([...stages, { is_observer: false }]);
      // setIsOpenObservers(false);
    }
  };

  function handleKeyDownObserver(e) {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    // setStages([...stages, { is_observer: true }]);
    // setIsOpenObservers(true);
    if (e.key !== "Enter") return;
    // if (!value.trim()) return;
    e.target.value = "";
  }

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.user_first_name + " " + option.user_last_name,
  });
  // const filterOptions = createFilterOptions({
  //   matchFrom: "start",
  //   stringify: (option) => option.user_name,
  // });

  useEffect(() => {
    dispatch(workflowinvitememberlist());
    if (workflowId) {
      dispatch(workflowgetDetails(workflowId));
      dispatch(workflowgetMainDetails(workflowId));
    }
  }, [successDeleteStage]);

  useEffect(() => {
    let finalArr = [];

    if (workflowDetails && workflowId) {
      if (workflowDetails.length > 0) {
        for (let i in workflowDetails) {
          finalArr.push({
            stage_id: workflowDetails[i].id,
            stage_name: workflowDetails[i].name,
            is_approval: workflowDetails[i].is_approval,
            is_all_approval: workflowDetails[i].is_all_approval,
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
          is_all_approval: false,
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
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let tempErrors = {
      observer: "",
    };

    for (let i = 0; i < stages.length; i++) {
      if (stages[i].is_observer && stages[i].observer.length == 0) {
        tempErrors = {
          observer: "Please select atleast one observer",
        };
        setErrors(tempErrors);
      }
    }

    const isError = Object.values(tempErrors).every(
      (x) => x == null || x == ""
    );

    let newArr;

    if (isError) {
      newArr = stages?.map((item, index) => {
        let myArr = [];
        let myArr2 = [];
        let orderArr = [];
        for (let i = 0; i < item?.approvals?.length; i++) {
          myArr.push(item.approvals[i].id);
        }
        for (let i = 0; i < item?.observer?.length; i++) {
          myArr2.push(item.observer[i].id);
        }

        item.approvals = myArr;
        item.observer = myArr2;
        if (item.order == "") {
          item.order = index;
        }
        return item;
      });
    }

    const isEmpty = Object.values(tempErrors).every(
      (x) => x == null || x == ""
    );

    if (isEmpty) {
      if (deleteStageIds.length) {
        for (let i = 0; i < deleteStageIds.length; i++) {
          dispatch(workflowStageDelete(deleteStageIds[i]));
        }
      }
      if (workflowId) {
        dispatch(
          adminWorkflowEdit(workflowId, {
            agency: userData.user.user_id,
            name: workflowName,
            stage: newArr,
            company: companyvalue,
          })
        );
        setSaveEffect(true);

        // const update = await api
        //   .put(`${BACKEND_API_URL}agency/works-flow/${workflowId}/`, {
        //     agency: userData.user.user_id,
        //     name: workflowName,
        //     stage: newArr,
        //     company: companyvalue,
        //   })
        //   .then((res) => {
        //     // console.log("status - ", res.status);
        //     if (res.data.message == "error") {
        //       swal({
        //         title: "Error",
        //         text: "Workflow name already exists",
        //         className: "errorAlert",
        //         icon: "/img/ErrorAlert.png",
        //         buttons: false,
        //         timer: 2000,
        //       });
        //     } else if (res?.data?.status == 400) {
        //       setIsLoading(true);
        //       swal({
        //         title: "Error",
        //         text: res?.data?.message,
        //         className: "errorAlert",
        //         icon: "/img/ErrorAlert.png",
        //         buttons: false,
        //         timer: 2000,
        //       });
        //       navigate("/workflow");
        //     } else if (res.status == 200) {
        //       setIsLoading(true);
        //       swal({
        //         title: "Successfully Complete",
        //         text: "Successfully Saved",
        //         className: "successAlert-login",
        //         icon: "/img/logonew.svg",
        //         buttons: false,
        //         timer: 1500,
        //       });
        //       navigate("/workflow");
        //     } else {
        //       swal({
        //         title: "Error",
        //         text: res.message,
        //         className: "errorAlert",
        //         icon: "/img/ErrorAlert.png",
        //         buttons: false,
        //         timer: 1500,
        //       });
        //       // setTimeout(() => {
        //       //   setIsLoading(true);
        //       // }, 1);
        //     }
        //   })
        //   .catch((err) => {
        //     // setname();
        //     swal({
        //       title: "Error",
        //       text: err.message,
        //       className: "errorAlert",
        //       icon: "/img/ErrorAlert.png",
        //       buttons: false,
        //       timer: 1500,
        //     });
        //     setTimeout(() => {
        //       setIsLoading(true);
        //     }, 1);
        //   });
      } else {
        dispatch(
          adminWorkflowAdd({
            // job: 67,
            agency: userData.user.user_id,
            name: workflowName,
            stage: newArr,
            company: companyvalue,
          })
        );
        setSaveEffect(true);
        // const success = await api
        //   .post(`${BACKEND_API_URL}agency/works-flow/`, {
        //     // job: 67,
        //     agency: userData.user.user_id,
        //     name: workflowName,
        //     stage: newArr,
        //     company: companyvalue,
        //   })
        //   .then((res) => {
        //     if (res.data.message == "Error!") {
        //       swal({
        //         title: "Error",
        //         text: "Workflow name already exists",
        //         className: "errorAlert",
        //         icon: "/img/ErrorAlert.png",
        //         buttons: false,
        //         timer: 1500,
        //       });
        //       // setname();
        //     } else {
        //       setIsLoading(true);
        //       swal({
        //         title: "Successfully Complete",
        //         text: "Successfully Created",
        //         className: "successAlert-login",
        //         icon: "/img/logonew.svg",
        //         buttons: false,
        //         timer: 1500,
        //       });
        //       navigate("/workflow");
        //     }
        //   })
        //   .catch((err) => {
        //     // setname();
        //     swal({
        //       title: "Error",
        //       text: err.message,
        //       className: "errorAlert",
        //       icon: "/img/ErrorAlert.png",
        //       buttons: false,
        //       timer: 1500,
        //     });
        //     setTimeout(() => {
        //       setIsLoading(true);
        //     }, 1);
        //   });
      }
    }
  };

  useEffect(() => {
    if (workflowId) {
      if (message == "error") {
        swal({
          title: "Error",
          text: "Workflow name already exists",
          className: "errorAlert",
          icon: "/img/ErrorAlert.png",
          buttons: false,
          timer: 1500,
        });
      } else if (workflowAdd?.status == 400) {
        setIsLoading(true);
        swal({
          title: "Error",
          text: message,
          className: "errorAlert",
          icon: "/img/ErrorAlert.png",
          buttons: false,
          timer: 2000,
        });
        navigate("/workflow");
      } else if (error?.status == 200) {
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
        // } else {
        //   swal({
        //     title: "Error",
        //     text: message,
        //     className: "errorAlert",
        //     icon: "/img/ErrorAlert.png",
        //     buttons: false,
        //     timer: 1500,
        //   });
      }
    } else {
      if (message == "Error!") {
        swal({
          title: "Error",
          text: "Workflow name already exists",
          className: "errorAlert",
          icon: "/img/ErrorAlert.png",
          buttons: false,
          timer: 1500,
        });
      } else {
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
      }
      if (message && error) {
        swal({
          title: "Error",
          text: message,
          className: "errorAlert",
          icon: "/img/ErrorAlert.png",
          buttons: false,
          timer: 1500,
        });
        setTimeout(() => {
          setIsLoading(true);
        }, 1);
      }
    }
    setSaveEffect(false);
  }, [saveEffect]);

  const [companydata, setcompanydata] = useState();
  const [companyvalue, setcompanyvalue] = useState(null);

  useEffect(() => {
    dispatch(listAllAdminCompanies());
  }, []);

  useEffect(() => {
    if (companiesData) {
      setcompanydata(companiesData);
    }
  }, [companiesData, dispatch]);

  const orderUp = async (e, newid, index) => {
    if (index > 0) {
      let destIndex = index - 1;

      const items = Array.from(stages);
      const [reorderedItem] = items.splice(index, 1);
      items.splice(destIndex, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = i;
      }

      setStages(items);
      stagesRef.current = items;
    }
  };

  const orderDown = async (e, newid, index) => {
    if (index < stages.length - 1) {
      let destIndex = index + 1;

      const items = Array.from(stages);
      const [reorderedItem] = items.splice(index, 1);

      let newVar2 = stages.find((item, i) => i == index + 1);
      items.splice(destIndex, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = i;
      }

      setStages(items);
      stagesRef.current = items;
    }
  };

  // useEffect(() => {
  //   stagesRef.current = stages;
  // }, [stages]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    if (showbutton) {
      const items = Array.from(stages);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = i;
      }

      setStages(items);
      stagesRef.current = items;

      // ++++++ Rerender page after state change --FIX ++++++
      // forceUpdate();
      // ++++++ Rerender page after state change --FIX ++++++
    }
  }

  // // ++++++ Rerender page after state change --FIX ++++++
  // const useForceUpdate = () => {
  //   const [, setState] = useState();
  //   return () => setState({});
  // };

  // const forceUpdate = useForceUpdate();
  // // ++++++ Rerender page after state change --FIX ++++++

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
            {showbutton ? (
              <div className="workflow-heading">
                <h1 className="approvaltitle">
                  Edit Approval Workflow{" "}
                  <span className="backbtnlink">
                    <Link to="/workflow">Back</Link>
                  </span>
                </h1>
              </div>
            ) : (
              <div className="workflow-heading">
                <h1 className="approvaltitle">
                  Create Approval Workflow{" "}
                  <span className="backbtnlink">
                    <Link to="/workflow">Back</Link>
                  </span>
                </h1>
              </div>
            )}
            {showbutton == true ? null : (
              <h6 className="currentlyWorkflow">
                This workflow is currently in use and cannot be edited.{" "}
                <span className="jobsusing">Jobs using workflow</span>
              </h6>
            )}
            <div className="AG-Workflow">
              <div
                className={
                  errors.workflowName
                    ? "Approvalworkflowpage error"
                    : "Approvalworkflowpage"
                }
              >
                <h5 className="selectworklabel">Approval Workflow Name</h5>
                <input
                  disabled={!showbutton}
                  className="ApprovalNameInput"
                  type="text"
                  value={workflowName}
                  onChange={(e) => {
                    setWorkflowName(e.target.value);
                    setErrors({ ...errors, workflowName: null });
                  }}
                  name="Name"
                  placeholder="Name"
                // onChange={handlechange}
                />
                <span
                  style={{
                    color: "#D14F4F",
                    opacity: errors.workflowName ? 1 : 0,
                  }}
                >
                  {errors.workflowName ?? "valid"}
                </span>
              </div>
              {/* {JSON.stringify(companyvalue)} */}
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

                      disabled={!showbutton}
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
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {stagesRef?.current?.map((item, index) => {
                        // {stages?.map((item, index) => {
                        return (
                          <Draggable
                            isDragDisabled={!showbutton}
                            key={index}
                            draggableId={String(index)}
                            // draggableId={
                            //   item.stage_id != ""
                            //     ? String(item.stage_id)
                            //     : index
                            // }
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* {JSON.stringify(index)} */}
                                <div
                                  // key={index}
                                  className="services servicesworkflow"
                                >
                                  <div className="Stage1">
                                    <div className="Stage1_left_Workflow">
                                      <label>
                                        <h2>
                                          Stage {index + 1}
                                          {/* {item.order != ""
                                            ? item.order + 1
                                            : index + 1} */}
                                          -
                                        </h2>
                                      </label>
                                      <input
                                        disabled={!showbutton}
                                        className="ApprovalNameInput w-393"
                                        // onChange={(e) =>
                                        //   setStages((prev) => [
                                        //     ...prev,
                                        //     { stage_name: e.target.value },
                                        //   ])
                                        // }
                                        onChange={(e) => {
                                          handleServiceChnge(e, index);
                                        }}
                                        type="text"
                                        value={item.stage_name}
                                        name="stage_name"
                                        placeholder="Workflow stage name"
                                      />
                                    </div>

                                    <div className="Stage1_right_Workflow">
                                      <li
                                        className={
                                          index == 0 ? "disable_up_down" : ""
                                        }
                                      >
                                        <Link
                                          to=""
                                          onClick={(e) =>
                                            showbutton &&
                                            orderUp(e, item.stage_id, index)
                                          }
                                          // onClick={(e) => setselected(index)}
                                          className="up"
                                        >
                                          <img src="/img/upimg.png" />
                                        </Link>
                                      </li>
                                      <li
                                        className={
                                          index == stagesRef.current.length - 1
                                            ? "disable_up_down"
                                            : ""
                                        }
                                      >
                                        <Link
                                          to=""
                                          className="down"
                                          onClick={(e) =>
                                            showbutton &&
                                            orderDown(e, item.stage_id, index)
                                          }
                                        // onClick={(e) => setselected(index)}
                                        >
                                          <img src="/img/don.png" />
                                        </Link>
                                      </li>
                                      <li
                                        className={
                                          index == 0 ? "disable_up_down" : ""
                                        }
                                      >
                                        <Link to="">
                                          <img
                                            // hidden={!showbutton}
                                            onClick={(e) => {
                                              showbutton &&
                                                (item.stage_id
                                                  ? handleRemoveStage(
                                                    index,
                                                    item.stage_id,
                                                    true
                                                  )
                                                  : handleRemoveStage(
                                                    index,
                                                    index,
                                                    false
                                                  ));
                                            }}
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
                                        onClick={(e) =>
                                          showbutton &&
                                          handleApproverChnge(e, index)
                                        }
                                        // onChange={(e) => handleApproverChnge(e, index)}
                                        // setStages(...stages, { ...item, {item.!item.is_approval })
                                        checked={item.is_approval}
                                        name="is_approval"
                                      />
                                      <label
                                        className="EveryoneColor"
                                        htmlFor="is_approval"
                                      >
                                        {" "}
                                        All Approvers must approve job before it
                                        will move to the next stage
                                      </label>
                                    </div>
                                    <div className="related-jobs-check-box secondAllApprover">
                                      <input
                                        type="checkbox"
                                        // id="is_approval"
                                        onClick={(e) =>
                                          showbutton &&
                                          handleAllApproverChnge(e, index)
                                        }
                                        // onChange={(e) => handleApproverChnge(e, index)}
                                        // setStages(...stages, { ...item, {item.!item.is_approval })
                                        checked={item.is_all_approval}
                                        name="is_all_approval"
                                      />
                                      <label
                                        className="EveryoneColor"
                                        htmlFor="is_all_approval"
                                      >
                                        {" "}
                                        Approvers must approve job every time
                                        revisions are requested
                                      </label>
                                    </div>
                                    <div className="Observersskillssec">
                                      <div className="skills-input-container">
                                        <Autocomplete
                                          disabled={!showbutton}
                                          value={item.approvals}
                                          name="approvals"
                                          // value={approvers}
                                          multiple
                                          id="tags-outlined"
                                          // open={isOpenApprovers}
                                          onInputChange={
                                            handleInputChangeAutocomplete1
                                          }
                                          filterOptions={filterOptions}
                                          options={workflowMemberData}
                                          getOptionLabel={(option) =>
                                            option?.user_first_name +
                                            " " +
                                            option?.user_last_name
                                          }
                                          // onChange={(event, value) => setSkills(value)}
                                          onChange={(e, v) => {
                                            changeHandler1(e, v, index);
                                          }}
                                          // defaultValue={skills ?? []}
                                          // inputValue={skills}
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
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
                                          isOptionEqualToValue={(
                                            option,
                                            value
                                          ) =>
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
                                          <input
                                            disabled={!showbutton}
                                            type="checkbox"
                                            checked={item.is_observer}
                                          />
                                          <span
                                            className="slider round"
                                            disabled={!showbutton}
                                            onClick={() => {
                                              showbutton &&
                                                handleObserver(index);
                                              setErrors({
                                                ...errors,
                                                observer: null,
                                              });
                                            }}
                                          ></span>
                                        </label>
                                        <h4>Observers</h4>
                                      </div>
                                    </div>
                                    <p className="Observerstext">
                                      Observers will see this stage of
                                      approvals, but will not be asked to
                                      approve anything.
                                    </p>
                                    {/* {JSON.stringify(item.observer)} */}
                                    {item?.is_observer && (
                                      <>
                                        {/* // {stages[index].isObserver && ( */}
                                        <div
                                          className={
                                            errors.observer
                                              ? "Observersskillssec error1"
                                              : "Observersskillssec"
                                          }
                                        >
                                          <div className="skills-input-container">
                                            <Autocomplete
                                              disabled={!showbutton}
                                              value={item.observer}
                                              multiple
                                              id="tags-outlined"
                                              // open={isOpenObservers}
                                              onInputChange={
                                                handleInputChangeAutocomplete2
                                              }
                                              filterOptions={filterOptions}
                                              options={workflowMemberData}
                                              getOptionLabel={(option) =>
                                                option?.user_first_name +
                                                " " +
                                                option?.user_last_name
                                              }
                                              // onChange={(event, value) => setSkills(value)}
                                              onChange={(e, v) => {
                                                changeHandler2(e, v, index);
                                                setErrors({
                                                  ...errors,
                                                  observer: null,
                                                });
                                              }}
                                              // defaultValue={skills ?? []}
                                              // inputValue={skills}
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
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
                                              isOptionEqualToValue={(
                                                option,
                                                value
                                              ) =>
                                                value === undefined ||
                                                value === "" ||
                                                option.id === value.id ||
                                                option.value == value.value
                                              }
                                            // isOptionEqualToValue={(
                                            //   option,
                                            //   value
                                            // ) =>
                                            //   value === undefined ||
                                            //   value === "" ||
                                            //   option.id === value.id ||
                                            //   option.value === value.value
                                            // }
                                            />
                                          </div>
                                          {!item?.observer?.length ? (
                                            <span
                                              className={"errorObservervalid"}
                                              style={{
                                                color: "#D14F4F",
                                                opacity: errors.observer
                                                  ? 1
                                                  : 0,
                                              }}
                                            >
                                              {errors.observer ?? "valid"}
                                              {/* {(errors.observer &&
                                              !item.observer.length) ??
                                              "valid"} */}
                                            </span>
                                          ) : (
                                            <span
                                              className="errorObservervalid"
                                              style={{
                                                opacity: 0,
                                              }}
                                            >
                                              valid
                                            </span>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <span></span>
            <div className="StageAddPlusB stage-action-btn-left">
              {/* <button
                className="Save-C-Btt"
                type="button"
                onClick={submitstage}
              >
                Save{" "}
              </button> */}
              <button
                hidden={!showbutton}
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
