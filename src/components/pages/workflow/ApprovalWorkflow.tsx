import {
  Add,
  CancelOutlined,
  DeleteOutlineOutlined,
  PresentToAllOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  MenuItem,
  Select,
  TextField,
  createFilterOptions,
} from "@mui/material";
import axiosPrivate from "api/axios";
import Title from "components/common/pageTitle/Title";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Roles } from "helper/config";
import { API_URL } from "helper/env";
import { Images } from "helper/images";
import { TablePaginationType } from "helper/types/muiTable/muiTable";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_COMPANY_LIST } from "redux/actions/companyTab/companyTab.actions";
import { GET_INVITE_MEMBERS_USERS } from "redux/actions/inviteUser/inviteUser.actions";
import {
  GET_WORKFLOW_MAIN_DETAILS,
  GET_WORKFLOW_STAGE_DETAILS,
} from "redux/actions/workFlow/workFlow.actions";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { COMPANY_LIST } from "redux/reducers/companyTab/companyTab.slice";
import { INVITE_USER_LIST } from "redux/reducers/inviteUser/inviteUser.slice";
import {
  WORKFLOW_MAIN_DETAILS,
  WORKFLOW_STAGE_DETAILS,
} from "redux/reducers/workFlow/workFlow.slice";
import { useAppDispatch, useAppSelector } from "redux/store";
import { WORKFLOW_ROUTE } from "routes/baseRoute";
import swal from "sweetalert";
import { isEmpty } from "helper/utility/customFunctions";

const ApprovalWorkflow = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { '*': workflowId } = useParams();

  const companyData = useAppSelector(COMPANY_LIST);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const workflowMemberApproversData = useAppSelector(INVITE_USER_LIST);
  const workflowMainDetails = useAppSelector(WORKFLOW_MAIN_DETAILS);
  const workflowStageDetails = useAppSelector(WORKFLOW_STAGE_DETAILS);

  const [isLoading, setIsLoading] = useState(true);
  const [showbutton, setshowbutton] = useState(true);

  const [isOpen6, setIsOpen6] = useState(false);

  const [workflowName, setWorkflowName] = useState("");
  const [companydata, setcompanydata] = useState([]);
  const [companyvalue, setcompanyvalue] = useState(null);
  const [nudgeChange, setNudgeChange] = useState(false);

  const [stages, setStages] = useState<any>([
    {
      stage_id: "",
      stage_name: "",
      is_all_approval: false,
      is_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      order: "",
      isDeadline: false,
      approval_time: 12,
      isOpenDeadline: false,
      is_nudge: false,
      nudgeOpen: [{ id: 1, open: false }],
      nudge_time: [{ id: 1, time: 3 }],
    },
  ]);
  const stagesRef = useRef<any>([
    {
      stage_id: "",
      stage_name: "",
      is_all_approval: false,
      is_approval: false,
      approvals: [],
      is_observer: false,
      observer: [],
      order: "",
      approval_time: 12,
      isDeadline: false,
      isOpenDeadline: false,
      is_nudge: false,
      nudgeOpen: [{ id: 1, open: false }],
      nudge_time: [{ id: 1, time: 3 }],
    },
  ]);

  const [deleteStageIds, setDeleteStageIds] = useState([]);

  const [errors, setErrors] = useState({
    workflowName: null,
    companyvalue: null,
    stages: null,
    selects: null,
    observer: null,
    approver: null,
  });

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  const [paginationData, setPaginationData] = useState<TablePaginationType>({
    page: 1,
    rowsPerPage: 10,
    search: "",
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (showbutton) {
      const items: any = Array.from(stages);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = JSON.stringify(i);
      }

      setStages(items);
      stagesRef.current = items;

      // ++++++ Rerender page after state change --FIX ++++++
      // forceUpdate();
      // ++++++ Rerender page after state change --FIX ++++++
    }
  };

  const handleServiceChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index][name] = value;
    setStages(list);
    stagesRef.current = list;
  };

  const orderUp = async (e, newid, index) => {
    if (index > 0) {
      let destIndex = index - 1;

      const items: any = Array.from(stages);
      const [reorderedItem] = items.splice(index, 1);
      items.splice(destIndex, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = JSON.stringify(i);
      }

      setStages(items);
      stagesRef.current = items;
    }
  };

  const orderDown = async (e, newid, index) => {
    if (index < stages.length - 1) {
      let destIndex = index + 1;

      const items: any = Array.from(stages);
      const [reorderedItem] = items.splice(index, 1);

      let newVar2 = stages.find((item, i) => i == index + 1);
      items.splice(destIndex, 0, reorderedItem);

      for (let i = 0; i < stages.length; i++) {
        items[i].order = JSON.stringify(i);
      }

      setStages(items);
      stagesRef.current = items;
    }
  };

  const handleRemoveStage = (id, newid, isDatabase) => {
    if (stages.length > 1) {
      let newValues = [...stages];

      if (isDatabase) {
        swal({
          title: "Warning",
          text: "Are you sure you want to delete this stage?",
          className: "errorAlert",
          icon: Images.ErrorLogo,
          buttons: {
            Cancel: true,
            OK: true,
          },
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

  const handleAllApproverChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
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

  const handleInputChangeAutocomplete1 = (event, newInputValue) => {
    // setSkills(newInputValue);
  };

  const changeHandler1 = (e, v, index) => {
    let list = [...stages];
    list[index]["approvals"] = v;
    setStages(list);
    stagesRef.current = list;
    setErrors({ ...errors, approver: null });
  };

  const handleKeyDownApprover = (e) => {
    if (e.keyCode === 8) return;
    if (!e.target.value) return;
    if (e.key === "Tab") return;
    // setIsOpenApprovers(true);
    if (e.key !== "Enter") return;
    // if (!value.trim()) return;
    e.target.value = "";
  };

  const handleObserver = (id) => {
    let prevRecord = stages[id].is_observer;
    let newValues = [...stages];
    newValues[id].is_observer = !prevRecord;
    setStages(newValues);
    stagesRef.current = newValues;
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

  const changeHandler2 = (e, v, index) => {
    let list = [...stages];
    list[index]["observer"] = v;
    setStages(list);
    stagesRef.current = list;
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

  const handleIsDeadlineChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
    setStages(list);
    stagesRef.current = list;
  };

  const handleOpenDeadline = (index) => {
    // const { name, value } = e.target;
    const list = [...stages];
    list[index].isOpenDeadline = !list[index].isOpenDeadline;
    setStages(list);
    stagesRef.current = list;
  };

  const handleDeadlineChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index].approval_time = value;
    if (value === 12) {
      const allNudgeTypes = [3, 6, 9, 12];

      const notSelectedNudges = allNudgeTypes.filter(
        (item1) => !list[index].nudge_time.some((item2) => item1 === item2.time)
      );

      for (let i = 0; i < list[index].nudge_time.length; i++) {
        if (list[index].nudge_time[i].time === 12) {
          list[index].nudge_time[i].time = notSelectedNudges[0];
        }
      }
    }
    setStages(list);
    stagesRef.current = list;
  };

  const handleNudge = (id) => {
    let prevRecord = stages[id].is_nudge;
    let newValues = [...stages];
    newValues[id].is_nudge = !prevRecord;
    setStages(newValues);
    stagesRef.current = newValues;
  };

  const handleOpenNudge = (index, nudge_index) => {
    const list = [...stages];
    list[index].nudgeOpen[nudge_index].open =
      !list[index].nudgeOpen[nudge_index].open;
    setStages(list);
    stagesRef.current = list;
  };

  const handleNudgeChnge = (e, index, nudge_index) => {
    const { name, value } = e.target;
    const list = [...stages];
    list[index].nudge_time[nudge_index].time = value;
    setStages(list);
    stagesRef.current = list;
  };

  const removeNudge = (e, index, nudge_index) => {
    e.preventDefault();
    const list = stages;

    list[index]?.nudge_time?.splice(nudge_index, 1);

    setNudgeChange(true);
    setStages(list);
    stagesRef.current = list;
  };

  const addMoreNudge = (e, index) => {
    e.preventDefault();
    const list = stages;

    const prevLength = list[index].nudge_time?.length;

    const allNudgeTypes = [3, 6, 9, 12];

    const notSelectedNudges = allNudgeTypes.filter(
      (item1) => !list[index].nudge_time.some((item2) => item1 === item2.time)
    );

    if (list[index]?.nudge_time?.length < 4) {
      list[index].nudgeOpen = [
        ...list[index].nudgeOpen,
        { id: prevLength + 1, open: false },
      ];
      list[index].nudge_time = [
        ...list[index].nudge_time,
        { id: prevLength + 1, time: notSelectedNudges[0] },
      ];
    }

    setNudgeChange(true);
    setStages(list);
    stagesRef.current = list;
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    // stringify: (option) => option.user_first_name + " " + option.user_last_name,
  });

  const goback = () => {
    navigate("/workflow");
  };

  const validateSubmit = (e) => {
    e.preventDefault();

    const tempErrors: any = {
      workflowName: !workflowName && "This field cannot be empty",
      companyvalue: !companyvalue && "This field is required",
      stages:
        stages.length <= 1 &&
        !stages[0].stage_name &&
        "Atleast one workflow stage is required",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler(e);
  };

  const submitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let tempErrors: any = {
      approver: "",
      observer: "",
    };

    for (let i = 0; i < stages.length; i++) {
      if (stages[i].approvals.length === 0) {
        tempErrors = {
          approver: "Please select atleast one approver",
        };
        setErrors(tempErrors);
      }

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
        let nudgeTimeStr = "";

        for (let i = 0; i < item?.approvals?.length; i++) {
          myArr.push(item.approvals[i].id);
        }
        item.approvals = myArr;

        for (let i = 0; i < item?.observer?.length; i++) {
          myArr2.push(item.observer[i].id);
        }
        item.observer = myArr2;

        if (item?.nudge_time.length > 0) {
          for (let i = 0; i < item?.nudge_time.length; i++) {
            nudgeTimeStr = nudgeTimeStr + item.nudge_time[i].time + ",";
          }
        }
        item.nudge_time = nudgeTimeStr;

        if (item.is_nudge) {
          item.nudge_time = item.nudge_time;
        } else {
          item.nudge_time = null;
        }
        if (item.isDeadline) {
          item.approval_time = item.approval_time;
          item.nudge_time = item.nudge_time;
        } else {
          item.approval_time = null;
          item.nudge_time = null;
        }
        if (item.order == "") {
          item.order = JSON.stringify(index);
        }
        // item.order = orderArr;
        return item;
      });
    }

    const isEmpty = Object.values(tempErrors).every(
      (x) => x == null || x == ""
    );

    if (isEmpty) {
      if (deleteStageIds.length) {
        for (let i = 0; i < deleteStageIds.length; i++) {
          // dispatch(workflowStageDelete(deleteStageIds[i]));
        }
      }
      if (workflowId) {
        const update = axiosPrivate
          .put(`${API_URL.WORKFLOW.WORKFLOW_LIST}${workflowId}/`, {
            agency: userProfile.data.id,
            name: workflowName,
            stage: newArr,
            company: companyvalue,
          })
          .then((res) => {
            if (res.data.message == "error") {
              swal({
                title: "Error",
                text: "Workflow name already exists",
                className: "errorAlert",
                icon: Images.ErrorLogo,
                buttons: {
                  OK: false,
                },
                timer: 2000,
              });
            } else if (res?.data?.status == 400) {
              setIsLoading(true);
              swal({
                title: "Error",
                text: res?.data?.message,
                className: "errorAlert",
                icon: Images.ErrorLogo,
                buttons: {
                  OK: false,
                },
                timer: 2000,
              });
              navigate("/workflow");
            } else if (res.status == 200) {
              setIsLoading(true);
              swal({
                title: "Successfully Complete",
                text: "Successfully Saved",
                className: "successAlert-login",
                icon: Images.Logo,
                // buttons: false,
                buttons: {
                  OK: false,
                },
                timer: 1500,
              });
              navigate("/workflow");
            } else {
              swal({
                title: "Error",
                text: res?.data?.message,
                className: "errorAlert",
                icon: Images.ErrorLogo,
                buttons: {
                  OK: false,
                },
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.message,
              className: "errorAlert",
              icon: Images.ErrorLogo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            setTimeout(() => {
              setIsLoading(true);
            }, 1);
          });
      } else {
        const success = axiosPrivate
          .post(`${API_URL.WORKFLOW.WORKFLOW_LIST}`, {
            agency: userProfile.data.id,
            name: workflowName,
            stage: newArr,
            company: companyvalue,
          })
          .then((res) => {
            if (res.data.message == "Error!") {
              swal({
                title: "Error",
                text: "Workflow name already exists",
                className: "errorAlert",
                icon: Images.ErrorLogo,
                buttons: {
                  OK: false,
                },
                timer: 1500,
              });
            } else {
              setIsLoading(true);
              swal({
                title: "Successfully Complete",
                text: "Successfully Created",
                className: "successAlert-login",
                icon: Images.Logo,
                buttons: {
                  OK: false,
                },
                // buttons: false,
                timer: 1500,
              });
              navigate("/workflow");
            }
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: err.message,
              className: "errorAlert",
              icon: Images.ErrorLogo,
              buttons: {
                OK: false,
              },
              timer: 1500,
            });
            setTimeout(() => {
              setIsLoading(true);
            }, 1);
          });
      }
    }
  };

  const handleAddStage = () => {
    let lenStages = stages.length;
    setStages([
      ...stages,
      {
        stage_id: "",
        stage_name: "",
        is_all_approval: false,
        is_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        order: "",
        approval_time: 12,
        isDeadline: false,
        isOpenDeadline: false,
        is_nudge: false,
        nudgeOpen: [{ id: 1, open: false }],
        nudge_time: [{ id: 1, time: 3 }],
      },
    ]);
    stagesRef.current = [
      ...stages,
      {
        stage_id: "",
        stage_name: "",
        is_all_approval: false,
        is_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        order: "",
        approval_time: 12,
        isDeadline: false,
        isOpenDeadline: false,
        is_nudge: false,
        nudgeOpen: [{ id: 1, open: false }],
        nudge_time: [{ id: 1, time: 3 }],
      },
    ];
  };

  //fetch initial companies data list
  useSingleEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
    } else {
      dispatch(GET_COMPANY_LIST(paginationData));
    }
  });

  useEffect(() => {
    if (workflowMainDetails && !isNaN(Number(workflowId))) {
      setWorkflowName(workflowMainDetails?.name);
      setcompanyvalue(workflowMainDetails?.company);

      if (workflowMainDetails?.assigned_job == true) {
        setshowbutton(false);
      } else {
        setshowbutton(true);
      }
    }
  }, [workflowMainDetails]);

  useEffect(() => {
    let finalArr = [];

    // if (!workflowId && headerCompany) {
    //   setcompanyvalue(headerCompany);
    // }
    if (workflowStageDetails && !isNaN(Number(workflowId))) {
      if (workflowStageDetails?.data?.results.length > 0) {
        for (let i in workflowStageDetails?.data?.results) {
          const finalNudgeTimeArr = [];
          const finalNudgeOpenArr = [];
          if (
            workflowStageDetails?.data?.results[i]?.nudge_time &&
            workflowStageDetails?.data?.results[i]?.nudge_time?.length > 0
          ) {
            const nudgeTimeArr =
              workflowStageDetails?.data?.results[i]?.nudge_time?.split(",");
            nudgeTimeArr.pop();

            var resultNudgeTime = nudgeTimeArr?.map(function (x) {
              return parseInt(x, 10);
            });

            for (let index = 0; index < resultNudgeTime?.length; index++) {
              finalNudgeTimeArr.push({
                id: index + 1,
                time: resultNudgeTime[index],
              });
              finalNudgeOpenArr.push({ id: index + 1, open: false });
            }
          }

          finalArr.push({
            stage_id: workflowStageDetails?.data?.results[i]?.id,
            stage_name: workflowStageDetails?.data?.results[i]?.name,
            is_all_approval:
              workflowStageDetails?.data?.results[i]?.is_all_approval,
            is_approval: workflowStageDetails?.data?.results[i]?.is_approval,
            approvals:
              workflowStageDetails?.data?.results[i]?.approvals_details,
            is_observer: workflowStageDetails?.data?.results[i]?.is_observer,
            observer: workflowStageDetails?.data?.results[i]?.observer_detail,
            order: workflowStageDetails?.data?.results[i]?.order,
            isDeadline: workflowStageDetails?.data?.results[i]?.approval_time
              ? true
              : false,
            approval_time: workflowStageDetails?.data?.results[i]?.approval_time
              ? workflowStageDetails?.data?.results[i]?.approval_time
              : 1,
            isOpenDeadline: false,
            is_nudge: workflowStageDetails?.data?.results[i]?.is_nudge,
            nudgeOpen:
              finalNudgeOpenArr?.length > 0
                ? finalNudgeOpenArr
                : [{ id: 1, open: false }],
            nudge_time:
              finalNudgeTimeArr?.length > 0
                ? finalNudgeTimeArr
                : [{ id: 1, time: 3 }],
          });
        }
      } else {
        finalArr.push({
          stage_id: "",
          stage_name: "",
          is_all_approval: false,
          is_approval: false,
          approvals: [],
          is_observer: false,
          observer: [],
          order: "",
          isDeadline: false,
          approval_time: 12,
          isOpenDeadline: false,
          is_nudge: false,
          nudgeOpen: [{ id: 1, open: false }],
          nudge_time: [{ id: 1, time: 3 }],
        });
      }
      setStages(finalArr);
      stagesRef.current = finalArr;
    }
  }, [workflowStageDetails]);

  // Adding more nudges by using useEffect
  useEffect(() => {
    if (nudgeChange) {
      setStages(stages);
      stagesRef.current = stagesRef.current;
      setNudgeChange(false);
    }
  }, [nudgeChange]);

  useEffect(() => {
    const success = axiosPrivate
      .get(`${API_URL.COMPANY.COMPANY_LIST}?is_active=1`)
      .then((res) => {
        const responseDestructredData = { ...res?.data?.data };
        // console.log({ res, responseDestructredData }, 'Res Company');

        // To append company data of selected workflow details
        if (isEmpty(responseDestructredData?.results?.find((e) => e.company_id == workflowMainDetails?.company))) {
          responseDestructredData?.results?.push({ id: workflowMainDetails?.company, name: workflowMainDetails?.company_name });
        }
        // console.log({ res, results: responseDestructredData?.results });
        setcompanydata(responseDestructredData?.results);
      })
      .catch((err) => { });
  }, [workflowMainDetails, workflowId]);

  //fetch company list when pagination change
  useEffect(() => {
    if (userProfile?.data?.role === Roles.ADMIN) {
      dispatch(GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.ADMIN}`));
    } else {
      dispatch(
        GET_COMPANY_LIST(paginationData, `${API_URL.COMPANY.COMPANY_LIST}`)
      );
    }
    if (!isNaN(Number(workflowId))) {
      dispatch(GET_WORKFLOW_STAGE_DETAILS(workflowId));
      dispatch(GET_WORKFLOW_MAIN_DETAILS(workflowId));
    }
  }, [paginationData, userProfile.data?.role]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {showbutton ? (
            <div className="flex justify-between">
              <Title title="Edit Approval Workflow" />{" "}
              <Link
                to={WORKFLOW_ROUTE.HOME}
                className="btn btn-outline max-w-[160px] w-full h-full"
              >
                <span className="text-lg font-semibold">
                  Back
                </span>
              </Link>
            </div>
          ) : (
            <div className="workflow-heading">
              <h1 className="approvaltitle">
                Create Approval Workflow{" "}
                <span className="backbtnlink">
                  <Link to={WORKFLOW_ROUTE.HOME}>Back</Link>
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
          <div className="page-card p-7 AG-Workflow">
            <div
              className={
                errors.workflowName
                  ? "max-w-[500px] w-full error"
                  : "max-w-[500px] w-full"
              }
            >
              <h5 className="text-base font-semibold">
                Approval Workflow Name
              </h5>
              <input
                disabled={!showbutton}
                className="input-style"
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
                className="text-[#D14F4F] flex justify-end"
                style={{
                  color: "#D14F4F",
                  opacity: errors.workflowName ? 1 : 0,
                }}
              >
                {errors.workflowName ?? "valid"}
              </span>
            </div>
            {/* {JSON.stringify(companyvalue)} */}
            <div
              className={
                errors.companyvalue
                  ? "mt-3 error max-w-[500px] w-full "
                  : "mt-3 max-w-[500px] w-full "
              }
            >
              <div className="text-content ">
                <h5 className="text-base font-semibold">
                  Workflow Assign to Company?
                </h5>{" "}
                <div className="styled-select Companyname">
                  <Select
                    className={
                      companyvalue === null
                        ? "selectinputcolor agency-workflow-company-selenium max-w-[500px] w-full "
                        : "menuiteminputcolor agency-workflow-company-selenium max-w-[500px] w-full "
                    }
                    disabled={!showbutton}
                    open={isOpen6}
                    onOpen={() => {
                      setIsOpen6(true);
                    }}
                    onClose={() => {
                      setIsOpen6(false);
                    }}
                    // MenuProps={menuProps}
                    value={companyvalue}
                    onChange={(e) => {
                      setcompanyvalue(e.target.value);
                      setErrors({ ...errors, companyvalue: null });
                      // {
                      //   e.target.value !== null &&
                      dispatch(GET_INVITE_MEMBERS_USERS(e.target.value, 3));
                      //   dispatch(
                      //     workflowinvitememberlistapprovers(e.target.value)
                      //   );
                      // }
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={null}>Select Company</MenuItem>
                    {companydata?.map((item) => (
                      <MenuItem
                        className={`agency-workflow-company-selenium-${item.id}`}
                        key={item.id}
                        value={item.id}
                      >
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <span
                className="text-[#D14F4F] flex justify-end"
                style={{
                  color: "#D14F4F",
                  opacity: errors.companyvalue ? 1 : 0,
                }}
              >
                {errors.companyvalue ?? "valid"}
              </span>
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
          <div id="items" className="">
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
                          // draggableId={String(index)}
                          draggableId={
                            item.stage_id != ""
                              ? String(item.stage_id)
                              : String(index)
                          }
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
                                className="services servicesworkflow page-card p-7"
                              >
                                <div className="Stage1 flex justify-between">
                                  <div className="Stage1_left_Workflow flex gap-2 items-center w-full">
                                    <label>
                                      <h2 className="text-2xl font-bold">
                                        Stage {index + 1}
                                        {/* {item.order != ""
                                            ? item.order + 1
                                            : index + 1} */}
                                        -
                                      </h2>
                                    </label>
                                    <input
                                      disabled={!showbutton}
                                      className="ApprovalNameInput max-w-[400px] w-full input-style"
                                      // onChange={(e) =>
                                      //   setStages((prev) => [
                                      //     ...prev,
                                      //     { stage_name: e.target.value },
                                      //   ])
                                      // }
                                      onChange={(e) => {
                                        handleServiceChnge(e, index);
                                        setErrors({
                                          ...errors,
                                          stages: null,
                                        });
                                      }}
                                      type="text"
                                      value={item.stage_name}
                                      name="stage_name"
                                      placeholder="Workflow stage name"
                                    />
                                  </div>

                                  <div className="Stage1_right_Workflow w-full max-w-[102px] flex gap-2">
                                    <div
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
                                        <PresentToAllOutlined />
                                      </Link>
                                    </div>
                                    <div
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
                                        {/* <img src="/img/don.png" /> */}
                                        <PresentToAllOutlined
                                          style={{
                                            transform: "rotate(180deg)",
                                          }}
                                        />
                                      </Link>
                                    </div>
                                    <div
                                      className={
                                        stagesRef.current.length < 2
                                          ? "disable_up_down"
                                          : ""
                                      }
                                    // className={
                                    //   index == 0 ? "disable_up_down" : ""
                                    // }
                                    >
                                      <Link to="">
                                        <div
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
                                                  true
                                                ));
                                          }}
                                        >
                                          <DeleteOutlineOutlined />
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                                <div className="Approvers">
                                  <h4 className="text-[#1b4ea8] text-lg font-bold mt-5 mb-2.5">
                                    Approvers
                                  </h4>
                                  <div className="related-jobs-check-box flex items-center gap-2">
                                    <input
                                      className="checkbox"
                                      type="checkbox"
                                      // id="is_all_approval"
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
                                      className="EveryoneColor  text-base font-normal text-[#474e55]"
                                      htmlFor="is_all_approval"
                                    >
                                      {" "}
                                      All Approvers must approve job before it
                                      will move to the next stage
                                    </label>
                                  </div>
                                  <div className="related-jobs-check-box secondAllApprover flex items-center gap-2">
                                    <input
                                      className="checkbox"
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
                                      className="EveryoneColor text-base font-normal text-[#474e55]"
                                      htmlFor="is_approval"
                                    >
                                      {" "}
                                      Approvers must approve job every time
                                      revisions are requested
                                    </label>
                                  </div>
                                  <div className="Observersskillssec mt-2.5 max-w-[586px] w-full">
                                    <div className="skills-input-container">
                                      <Autocomplete
                                        disabled={!showbutton || !companyvalue}
                                        value={item.approvals}
                                        // name="approvals"
                                        className="agency-workflow-approvers-selenium"
                                        // value={approvers}
                                        multiple
                                        id="tags-outlined"
                                        // open={isOpenApprovers}
                                        onInputChange={
                                          handleInputChangeAutocomplete1
                                        }
                                        filterOptions={filterOptions}
                                        options={
                                          workflowMemberApproversData
                                            ?.inviteMembersList?.data?.length >
                                            0
                                            ? workflowMemberApproversData
                                              ?.inviteMembersList?.data
                                            : []
                                        }
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
                                        // inputProps={{
                                        //   "aria-label": "Without label",
                                        // }}
                                        filterSelectedOptions
                                        // noOptionsText={
                                        //   "Press enter to add this skill and select again"
                                        // }
                                        // hiddenLabel="true"
                                        onKeyDown={handleKeyDownApprover}
                                        autoHighlight={true}
                                        renderInput={(params) => (
                                          <TextField
                                            {...params}
                                            fullWidth
                                            placeholder={
                                              !companyvalue
                                                ? "Select a company first"
                                                : "Type something"
                                            }
                                          />
                                        )}
                                        isOptionEqualToValue={
                                          (option, value) =>
                                            value === undefined ||
                                            value === "" ||
                                            option.id === value.id
                                          // option.value == value.value
                                        }
                                      />
                                    </div>
                                    {!item?.approvals?.length ? (
                                      <>
                                        <span
                                          className="text-[#D14F4F] flex justify-end"
                                          style={{
                                            color: "#D14F4F",
                                            opacity: errors.approver ? 1 : 0,
                                          }}
                                        >
                                          {errors.approver ?? "valid"}
                                        </span>
                                        {/* <span
                                          className={"errorObservervalid"}
                                          style={{
                                            color: "#D14F4F",
                                            opacity: errors.approver ? 1 : 0,
                                          }}
                                        >
                                          {errors.approver ?? "valid"} */}
                                        {/* {(errors.observer &&
                                              !item.observer.length) ??
                                              "valid"} */}
                                        {/* </span> */}
                                      </>
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
                                  <div className="switch_Agency">
                                    <div className="Observers flex gap-3">
                                      <label className="switch">
                                        <input
                                          disabled={!showbutton}
                                          type="checkbox"
                                          checked={item.is_observer}
                                        />
                                        <span
                                          className="slider round"
                                          // disabled={!showbutton}
                                          onClick={() => {
                                            showbutton && handleObserver(index);
                                            setErrors({
                                              ...errors,
                                              observer: null,
                                            });
                                          }}
                                        ></span>
                                      </label>
                                      <h4 className="text-[#1b4ea8] text-lg font-bold">
                                        Observers
                                      </h4>
                                    </div>
                                  </div>
                                  <p className="Observerstext  text-base font-normal text-[#474e55] mt-2.5">
                                    Observers will see this stage of approvals,
                                    but will not be asked to approve anything.
                                  </p>
                                  {/* {JSON.stringify(item.observer)} */}
                                  {item?.is_observer && (
                                    <>
                                      {/* // {stages[index].isObserver && ( */}
                                      <div
                                        className={
                                          errors.observer
                                            ? "Observersskillssec error1 ObserversskillssecSecond max-w-[586px] w-full mt-2.5"
                                            : "Observersskillssec ObserversskillssecSecond max-w-[586px] w-full mt-2.5"
                                        }
                                      >
                                        <div className="skills-input-container">
                                          <Autocomplete
                                            disabled={
                                              !showbutton || !companyvalue
                                            }
                                            value={item.observer}
                                            multiple
                                            id="tags-outlined"
                                            // open={isOpenObservers}
                                            onInputChange={
                                              handleInputChangeAutocomplete2
                                            }
                                            filterOptions={filterOptions}
                                            // options={
                                            //   workflowMemberData?.length > 0
                                            //     ? workflowMemberData
                                            //     : []
                                            // }
                                            options={
                                              workflowMemberApproversData
                                                ?.inviteMembersList?.data
                                                ?.length > 0
                                                ? workflowMemberApproversData
                                                  ?.inviteMembersList?.data
                                                : []
                                            }
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
                                            // inputProps={{
                                            //   "aria-label": "Without label",
                                            // }}
                                            filterSelectedOptions
                                            // noOptionsText={
                                            //   "Press enter to add this skill and select again"
                                            // }
                                            // hiddenLabel="true"
                                            onKeyDown={handleKeyDownObserver}
                                            autoHighlight={true}
                                            renderInput={(params) => (
                                              <TextField
                                                {...params}
                                                fullWidth
                                                placeholder={
                                                  !companyvalue
                                                    ? "Select a company first"
                                                    : "Type something"
                                                }
                                              />
                                            )}
                                            isOptionEqualToValue={
                                              (option, value) =>
                                                value === undefined ||
                                                value === "" ||
                                                option.id === value.id
                                              // option.value == value.value
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
                                          <>
                                            <span
                                              className="text-[#D14F4F] flex justify-end"
                                              style={{
                                                color: "#D14F4F",
                                                opacity: errors.observer
                                                  ? 1
                                                  : 0,
                                              }}
                                            >
                                              {errors.observer ?? "valid"}
                                            </span>
                                            {/* <span
                                              className={"errorObservervalid"}
                                              style={{
                                                color: "#D14F4F",
                                                opacity: errors.observer
                                                  ? 1
                                                  : 0,
                                              }}
                                            >
                                              {errors.observer ?? "valid"} */}
                                            {/* {(errors.observer &&
                                              !item.observer.length) ??
                                              "valid"} */}
                                            {/* </span> */}
                                          </>
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
                                <div
                                  style={{ marginTop: "10px" }}
                                  className="related-jobs-check-box flex items-center gap-2"
                                >
                                  <input
                                    className="checkbox"
                                    type="checkbox"
                                    // id="isDeadline"
                                    onClick={(e) =>
                                      showbutton &&
                                      handleIsDeadlineChnge(e, index)
                                    }
                                    // onChange={(e) => handleApproverChnge(e, index)}
                                    // setStages(...stages, { ...item, {item.!item.is_approval })
                                    checked={item.isDeadline}
                                    name="isDeadline"
                                  />
                                  <label
                                    className=" text-base font-normal text-[#474e55]"
                                    htmlFor="isDeadline"
                                  >
                                    {" "}
                                    Do you want to add deadline for approvers?
                                  </label>
                                </div>
                                {item?.isDeadline && (
                                  <>
                                    <div className="deadlineWorkflow">
                                      <h5 className="Deadlinetitle mt-5 mb-3 font-semibold text-base">
                                        {/* Deadline for approval */}
                                        Deadline for approval - Approver will
                                        have the assigned time below to approve
                                        asset once they receive the approval
                                        request
                                      </h5>
                                      <Select
                                        className="menuiteminputcolor menuiteminputcolor441"
                                        open={item.isOpenDeadline}
                                        onOpen={() => {
                                          handleOpenDeadline(index);
                                        }}
                                        onClose={() => {
                                          handleOpenDeadline(index);
                                        }}
                                        // MenuProps={menuProps}
                                        value={item.approval_time}
                                        onChange={(e) =>
                                          handleDeadlineChnge(e, index)
                                        }
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                      >
                                        <MenuItem value={12}>12hrs</MenuItem>
                                        <MenuItem value={24}>24hrs</MenuItem>
                                        <MenuItem value={36}>36hrs</MenuItem>
                                      </Select>
                                    </div>
                                    <div className="switch_Agency">
                                      <div className="Observers mt-4 flex gap-3">
                                        <label className="switch">
                                          <input
                                            disabled={!showbutton}
                                            type="checkbox"
                                            checked={item.is_nudge}
                                          />
                                          <span
                                            className="slider round"
                                            // disabled={!showbutton}
                                            onClick={() => {
                                              showbutton && handleNudge(index);
                                              // setErrors({
                                              //   ...errors,
                                              //   observer: null,
                                              // });
                                            }}
                                          ></span>
                                        </label>
                                        <h4 className="text-lg font-bold">
                                          Nudge
                                        </h4>
                                        {/* <h4>Nudge</h4> */}
                                      </div>
                                    </div>
                                    {item?.is_nudge && (
                                      <>
                                        <div className="Observersskillssec">
                                          <div className="skills-input-container">
                                            <h5 className="Deadlinetitle mt-5 mb-3 font-semibold text-base">
                                              Nudge Time
                                            </h5>
                                            {item?.nudge_time?.map(
                                              (nudge, nudge_index) => (
                                                <>
                                                  <div className="selectAndRemoveRight">
                                                    <Select
                                                      disabled={!showbutton}
                                                      style={{
                                                        marginTop: "10px",
                                                      }}
                                                      className="menuiteminputcolor menuiteminputcolor441"
                                                      open={
                                                        item.nudgeOpen[
                                                          nudge_index
                                                        ].open
                                                      }
                                                      onOpen={() => {
                                                        handleOpenNudge(
                                                          index,
                                                          nudge_index
                                                        );
                                                      }}
                                                      onClose={() => {
                                                        handleOpenNudge(
                                                          index,
                                                          nudge_index
                                                        );
                                                      }}
                                                      // MenuProps={menuProps}
                                                      value={nudge.time}
                                                      onChange={(e) =>
                                                        handleNudgeChnge(
                                                          e,
                                                          index,
                                                          nudge_index
                                                        )
                                                      }
                                                      displayEmpty
                                                      inputProps={{
                                                        "aria-label":
                                                          "Without label",
                                                      }}
                                                    >
                                                      <MenuItem
                                                        hidden={item?.nudge_time?.some(
                                                          (el) => el.time === 3
                                                        )}
                                                        value={3}
                                                      >
                                                        3 hrs before the
                                                        deadline
                                                      </MenuItem>
                                                      <MenuItem
                                                        hidden={item?.nudge_time?.some(
                                                          (el) => el.time === 6
                                                        )}
                                                        value={6}
                                                      >
                                                        6 hrs before the
                                                        deadline
                                                      </MenuItem>
                                                      <MenuItem
                                                        hidden={item?.nudge_time?.some(
                                                          (el) => el.time === 9
                                                        )}
                                                        value={9}
                                                      >
                                                        9 hrs before the
                                                        deadline
                                                      </MenuItem>
                                                      <MenuItem
                                                        hidden={
                                                          item?.nudge_time?.some(
                                                            (el) =>
                                                              el.time === 12
                                                          ) ||
                                                          item.approval_time ==
                                                          12
                                                        }
                                                        value={12}
                                                      >
                                                        12 hrs before the
                                                        deadline
                                                      </MenuItem>
                                                    </Select>
                                                    <button
                                                      className="selectAndRemoveRightButton"
                                                      hidden={nudge_index === 0}
                                                      onClick={(e) =>
                                                        removeNudge(
                                                          e,
                                                          index,
                                                          nudge_index
                                                        )
                                                      }
                                                    >
                                                      <CancelOutlined
                                                        color="error"
                                                        fontSize="medium"
                                                      />
                                                      {/* <svg
                                                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiChip-deleteIcon MuiChip-deleteIconMedium MuiChip-deleteIconColorDefault MuiChip-deleteIconOutlinedColorDefault css-i4bv87-MuiSvgIcon-root"
                                                          focusable="false"
                                                          aria-hidden="true"
                                                          viewBox="0 0 24 24"
                                                          data-testid="CancelIcon"
                                                        >
                                                          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                                        </svg> */}
                                                    </button>
                                                  </div>
                                                </>
                                              )
                                            )}
                                          </div>
                                        </div>
                                        <button
                                          className={
                                            item?.nudge_time?.length > 1
                                              ? "hoverNone btn btn-outline my-1.5"
                                              : "hoverNone btn btn-outline my-1.5"
                                          }
                                          hidden={
                                            item?.approval_time == 12
                                              ? item?.nudge_time?.length >= 3
                                              : item?.nudge_time?.length >= 4
                                          }
                                          onClick={(e) =>
                                            addMoreNudge(e, index)
                                          }
                                        >
                                          Add More
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
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
          {errors.stages ? (
            <div
              style={{ opacity: errors.stages ? 1 : 0 }}
              className={
                errors.stages
                  ? "stageErrorWorkflow error"
                  : "stageErrorWorkflow notError"
              }
            >
              <span
                className="text-[#D14F4F] flex justify-end"
                style={{
                  color: "#D14F4F",
                  opacity: errors.stages ? 1 : 0,
                }}
              >
                {errors.stages ?? "valid"}
              </span>
            </div>
          ) : (
            <div></div>
          )}
          <div className="flex justify-between pt-5">
            <div className="StageAddPlusB stage-action-btn-left ">
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
                className="btn btn-outline font-semibold text-lg max-w-[160px] w-full"
              >
                <Add />
                Add Stage
              </button>
            </div>

            <div className="workflow-heading stage-action-btn-right">
              <div className="AWokflowButton AWokflowButtonbtn flex gap-4">
                <button
                  className="btn btn-outline font-semibold text-lg w-[160px] "
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={goback}
                >
                  Cancel
                </button>
                {showbutton ? (
                  <button
                    className="btn btn-primary font-semibold text-lg w-[160px] "
                    type="button"
                    onClick={(e) => validateSubmit(e)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary font-semibold text-lg w-[160px]"
                    disabled
                  // type="hidden"
                  >
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
};

export default ApprovalWorkflow;
