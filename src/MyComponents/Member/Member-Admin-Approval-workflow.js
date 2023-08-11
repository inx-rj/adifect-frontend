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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { workflowlistAlllevels } from "../../redux/actions/workflowslevel-action";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import api from "../../utils/api";
import {
  workflowdelete,
  workflowdelete1,
  workflowinvitememberlist,
  workflowinvitememberlistapprovers,
  workflowgetDetails,
  workflowgetMainDetails,
} from "../../redux/actions/workflow-action";
import { workflowStageDelete } from "../../redux/actions/workflow-action.js";
import { WORKFLOW_level_DETAILS_RESET } from "../../constants/workflowslevel-constants";
import { useOutletContext } from "react-router-dom";
// import {
//   workflowstagelistAllstages,
//   workflowstagedeletestage,
// } from "../../redux/actions/workflowstageskill-action";
import TextField from "@mui/material/TextField";
import $ from "jquery";
import Autocomplete from "@mui/material/Autocomplete";
import { validations } from "../../utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  memberAdminWorkflowApproverListAction,
  MemberAdminWorkflowApproverStagesDetailsAction,
} from "../../redux/actions/Member-Admin-Workflow-Actions";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function Member_Admin_Approval_workflow() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [workflowName, setWorkflowName] = useState("");
  const [stages, setStages] = useState([
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
      isOpenDeadline: false,
      is_nudge: false,
      nudgeOpen: [{ id: 1, open: false }],
      nudge_time: [{ id: 1, time: 3 }],
    },
  ]);
  const stagesRef = useRef([
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
      isOpenDeadline: false,
      is_nudge: false,
      nudgeOpen: [{ id: 1, open: false }],
      nudge_time: [{ id: 1, time: 3 }],
    },
  ]);
  // const [isOpenObservers, setIsOpenObservers] = useState(false);
  // const [isOpenApprovers, setIsOpenApprovers] = useState(false);
  const [deleteStageIds, setDeleteStageIds] = useState([]);

  const [nudgeChange, setNudgeChange] = useState(false);

  const [errors, setErrors] = useState({
    workflowName: null,
    companyvalue: null,
    stages: null,
    selects: null,
    observer: null,
    approver: null,
    stages: null,
  });

  const { workflowMemberData } = useSelector(
    (state) => state.workflowMemberReducer
  );
  const { workflowMemberApproversData } = useSelector(
    (state) => state.workflowMemberApproversReducer
  );
  const { success } = useSelector((state) => state.workflowDeleteReducer);
  const { successDeleteStage } = useSelector(
    (state) => state.workflowStageDeleteReducer
  );

  const { loading: flowLoading, workflowDetails } = useSelector(
    (state) => state.workflowDetailsReducer
  );

  const { stagesData } = useSelector(
    (state) => state.workflowstagestageReducer
  );

  //--------------------------------EDIT DATA MEWWWWWW----------------------------------
  const {
    memberAdmWorkfApr,
    success: memberAprWoSuccess,
    error: memberAprWoError,
  } = useSelector((state) => state.memberAdminWorkflowApproverListReducer);

  const {
    memberCompanyAdmin,
    agecyIdCompany,
    agecyNameCompany,
    success: successCompanyList,
  } = useSelector((state) => state.memberAdminCompanyListReducer);

  const { MemberworkflowDetails } = useSelector(
    (state) => state.MemberAdminWorkflowApproverStagesDetailsReduce
  );

  useEffect(() => {
    if (headerCompany) {
      dispatch(memberAdminWorkflowApproverListAction(headerCompany));
    }
  }, [headerCompany]);

  useEffect(() => {
    if (headerCompany) {
      setcompanyvalue(headerCompany);
    }
  }, [headerCompany]);

  useEffect(() => {
    dispatch(memberAdminCompanyListAction());
  }, []);

  useEffect(() => {
    if (workflowId) {
      dispatch(MemberAdminWorkflowApproverStagesDetailsAction(workflowId));
    }
  }, []);

  //--------------------------------EDIT DATA MEWWWWWW----------------------------------

  const [isOpen6, setIsOpen6] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOpen6(false);
      for (let index = 0; index < stagesRef?.current?.length; index++) {
        const list = [...stagesRef.current];
        list[index].isOpenDeadline = false;
        for (let i = 0; i < list[index].nudge_time?.length; i++) {
          list[index].nudgeOpen[i].open = false;
        }
        setStages(list);
        stagesRef.current = list;
      }
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
        is_all_approval: false,
        is_approval: false,
        approvals: [],
        is_observer: false,
        observer: [],
        order: "",
        approval_time: 12,
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
        isOpenDeadline: false,
        is_nudge: false,
        nudgeOpen: [{ id: 1, open: false }],
        nudge_time: [{ id: 1, time: 3 }],
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
          icon: "/img/logonew-red.svg",
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

  const handleNudge = (id) => {
    let prevRecord = stages[id].is_nudge;
    let newValues = [...stages];
    newValues[id].is_nudge = !prevRecord;
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

  const handleIsDeadlineChnge = (e, index) => {
    const { name, value } = e.target;
    const list = [...stages];
    let prevValue = list[index][name];
    list[index][name] = !prevValue;
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

  const removeNudge = (e, index, nudge_index) => {
    const list = stages;

    list[index]?.nudge_time?.splice(nudge_index, 1);

    setNudgeChange(true);
    setStages(list);
    stagesRef.current = list;
  };

  const addMoreNudge = (e, index) => {
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

  // Adding more nudges by using useEffect
  useEffect(() => {
    if (nudgeChange) {
      setStages(stages);
      stagesRef.current = stagesRef.current;
      setNudgeChange(false);
    }
  }, [nudgeChange]);

  const handleOpenDeadline = (index) => {
    // const { name, value } = e.target;
    const list = [...stages];
    list[index].isOpenDeadline = !list[index].isOpenDeadline;
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

  const handleOpenNudge = (index, nudge_index) => {
    const list = [...stages];
    list[index].nudgeOpen[nudge_index].open =
      !list[index].nudgeOpen[nudge_index].open;
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
    setErrors({ ...errors, approver: null });
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
    dispatch(workflowinvitememberlistapprovers());
    if (workflowId) {
      dispatch(workflowgetDetails(workflowId));
      dispatch(workflowgetMainDetails(workflowId));
    }
  }, [successDeleteStage]);

  useEffect(() => {
    let finalArr = [];

    if (!workflowId && headerCompany) {
      setcompanyvalue(headerCompany);
    }

    if (MemberworkflowDetails && workflowId) {
      if (MemberworkflowDetails.length > 0) {
        for (let i in MemberworkflowDetails) {
          const finalNudgeTimeArr = [];
          const finalNudgeOpenArr = [];
          if (
            MemberworkflowDetails[i]?.nudge_time &&
            MemberworkflowDetails[i]?.nudge_time?.length > 0
          ) {
            const nudgeTimeArr =
              MemberworkflowDetails[i]?.nudge_time?.split(",");
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
            stage_id: MemberworkflowDetails[i].id,
            stage_name: MemberworkflowDetails[i].name,
            is_all_approval: MemberworkflowDetails[i].is_all_approval,
            is_approval: MemberworkflowDetails[i].is_approval,
            approvals: MemberworkflowDetails[i].approvals_details,
            is_observer: MemberworkflowDetails[i].is_observer,
            observer: MemberworkflowDetails[i].observer_detail,
            order: MemberworkflowDetails[i].order,
            isDeadline: MemberworkflowDetails[i].approval_time ? true : false,
            approval_time: MemberworkflowDetails[i].approval_time
              ? MemberworkflowDetails[i].approval_time
              : 1,
            isOpenDeadline: false,
            is_nudge: MemberworkflowDetails[i].is_nudge,
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
  }, [MemberworkflowDetails]);

  const [showbutton, setshowbutton] = useState(true);

  useEffect(() => {
    if (workflowMainDetails && workflowId) {
      setWorkflowName(workflowMainDetails.name);
      setcompanyvalue(workflowMainDetails?.company);

      if (workflowMainDetails?.assigned_job == true) {
        setshowbutton(false);
      } else {
        setshowbutton(true);
      }
    }
  }, [workflowMainDetails]);

  const validateSubmit = (e, data) => {
    e.preventDefault();

    const tempErrors = {
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
    let tempErrors = {
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
          item.order = index;
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
          dispatch(workflowStageDelete(deleteStageIds[i]));
        }
      }
      if (workflowId) {
        const update = await api
          .put(`${BACKEND_API_URL}members/workflow/${workflowId}/`, {
            agency: agecyIdCompany,
            name: workflowName,
            stage: newArr,
            company: headerCompany,
          })
          .then((res) => {
            if (res.data.message == "error") {
              swal({
                title: "Error",
                text: "Workflow name already exists",
                className: "errorAlert",
                icon: "/img/logonew-red.svg",
                buttons: false,
                timer: 2000,
              });
            } else if (res?.data?.status == 400) {
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
            }
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
      } else {
        const success = await api
          .post(`${BACKEND_API_URL}members/workflow/`, {
            agency: agecyIdCompany,
            name: workflowName,
            stage: newArr,
            company: headerCompany,
          })
          .then((res) => {
            if (res.data.message == "Error!") {
              swal({
                title: "Error",
                text: "Workflow name already exists",
                className: "errorAlert",
                icon: "/img/logonew-red.svg",
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
      .get(`${BACKEND_API_URL}members/company/?is_active=1`, config)
      .then((res) => {
        // console.log(res);
        setcompanydata(res.data);
      })
      .catch((err) => {});
  }, []);

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
              <div
                className={
                  errors.companyvalue
                    ? "Approvalworkflowpage mt-3 error"
                    : "Approvalworkflowpage mt-3"
                }
              >
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
                      // disabled={!showbutton}
                      disabled
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
                        setErrors({ ...errors, companyvalue: null });
                        // {
                        //   e.target.value !== null &&
                        dispatch(workflowinvitememberlist(e.target.value));
                        // }
                      }}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                    >
                      {/* <MenuItem value={null}>Select Company</MenuItem> */}
                      {companydata?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>
                <span
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
                                          stagesRef.current.length < 2
                                            ? "disable_up_down"
                                            : ""
                                        }
                                        // className={
                                        //   index == 0 ? "disable_up_down" : ""
                                        // }
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
                                                      true
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
                                        className="EveryoneColor"
                                        htmlFor="is_all_approval"
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
                                          options={
                                            memberAdmWorkfApr?.length > 0
                                              ? memberAdmWorkfApr?.filter(
                                                  (item) => item.level === 3
                                                )
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
                                        <span
                                          className={"errorObservervalid"}
                                          style={{
                                            color: "#D14F4F",
                                            opacity: errors.approver ? 1 : 0,
                                          }}
                                        >
                                          {errors.approver ?? "valid"}
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
                                              options={memberAdmWorkfApr}
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
                                  <div
                                    style={{ marginTop: "10px" }}
                                    className="related-jobs-check-box"
                                  >
                                    <input
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
                                      className="EveryoneColor"
                                      htmlFor="isDeadline"
                                    >
                                      {" "}
                                      Do you want to add deadline for approvers?
                                    </label>
                                  </div>
                                  {item?.isDeadline && (
                                    <>
                                      <div className="deadlineWorkflow">
                                        <h5 className="Deadlinetitle">
                                          {/* Deadline for approval */}
                                          Deadline for approval - Approver will
                                          have the assigned time below to
                                          approve asset once they receive the
                                          approval request
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
                                          MenuProps={menuProps}
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
                                        <div className="Observers">
                                          <label className="switch">
                                            <input
                                              disabled={!showbutton}
                                              type="checkbox"
                                              checked={item.is_nudge}
                                            />
                                            <span
                                              className="slider round"
                                              disabled={!showbutton}
                                              onClick={() => {
                                                showbutton &&
                                                  handleNudge(index);
                                                // setErrors({
                                                //   ...errors,
                                                //   observer: null,
                                                // });
                                              }}
                                            ></span>
                                          </label>
                                          <h4>Nudge</h4>
                                          {/* <h4>Nudge</h4> */}
                                        </div>
                                      </div>
                                      {item?.is_nudge && (
                                        <>
                                          <div className="Observersskillssec">
                                            <div className="skills-input-container">
                                              <h5 className="Deadlinetitle">
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
                                                        MenuProps={menuProps}
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
                                                            (el) =>
                                                              el.time === 3
                                                          )}
                                                          value={3}
                                                        >
                                                          3 hrs before the
                                                          deadline
                                                        </MenuItem>
                                                        <MenuItem
                                                          hidden={item?.nudge_time?.some(
                                                            (el) =>
                                                              el.time === 6
                                                          )}
                                                          value={6}
                                                        >
                                                          6 hrs before the
                                                          deadline
                                                        </MenuItem>
                                                        <MenuItem
                                                          hidden={item?.nudge_time?.some(
                                                            (el) =>
                                                              el.time === 9
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
                                                        hidden={
                                                          nudge_index === 0
                                                        }
                                                        onClick={(e) =>
                                                          removeNudge(
                                                            e,
                                                            index,
                                                            nudge_index
                                                          )
                                                        }
                                                      >
                                                        <img src="/img/ErrorAlert.png" />

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
                                                ? "hoverNone"
                                                : "hoverNone"
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
                    // className={"errorObservervalid"}
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
              <div className="AWokflowButton AWokflowButtonbtn">
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
