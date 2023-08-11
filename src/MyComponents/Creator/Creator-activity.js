import React, { useCallback, useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from "react-dropzone";
import swal from "sweetalert";
import { getJobAppliedDetails } from "../../redux/actions/job-actions";
import Rating from "@mui/material/Rating";

import {
  getCreatorActivityDetails,
  postActivityChat,
  creatorAppliedJobIdAction,
  creatorActivityJobSubmitAction,
  getJobSubmitStatus,
  isApprovalRejectedStatus,
  getJobCompletedUsers,
  getCompletedTaskList,
  CreatorActivityRatingAction,
  CreatorActivityGetRatingAction,
} from "../../redux/actions/activity-actions";
import {
  CREATOR_ACTIVITY_RESET,
  CREATOR_ACTIVITY_JOBSUBMIT_RESET,
  POST_ACTIVITY_CHAT_RESET,
  IS_APPROVAL_REJECTED_STATUS_RESET,
  COMPLETED_JOB_LIST_RESET,
} from "../../constants/activity-constants";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { getJobDetailsCreator } from "../../redux/actions/job-actions";

// DropZone Style Start
const baseStyle = {
  flex: 1,
  // display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  border: "1px solid #00000047",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const thumbsContainer = {
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  borderRadius: 2,
  marginBottom: 8,
  marginRight: 8,
  fontSize: "13px",
};

const thumbInner = {
  // display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};
// DropZone Style End

export default function Creator_Activity(props) {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [filter, setFilter] = useState("");

  const [chatbox, setChatbox] = useState("");
  const [attachfiles, setAttachfiles] = useState([]);

  const [orderName, setOrderName] = useState("Oldest Activity First");
  const [orderValue, setOrderValue] = useState("created");

  // Submit Job varibles
  const [filesDrop, setFilesDrop] = useState([]);
  const [formUrls, setFormUrls] = useState([]);
  const [selectData, setSelectData] = useState(null);
  const [appliedId, setAppliedId] = useState();
  const [jobTextData, setJobTextData] = useState("");
  const [renderPage, setRenderPage] = useState(false);
  const [itemData, setItemData] = useState([]);

  const [userJobComplete, setUserJobComplete] = useState(false);

  const [errors, setErrors] = useState({
    chatboxOrFile: null,
    description: null,
  });

  const [rationValue, setRatingValue] = useState(1);
  const [description, setDescription] = useState("");
  const [userAppliedId, setUserAppliedId] = useState();
  const [userIdData, setUserIdData] = useState();
  const [open3, setOpen3] = useState(false);

  const [openCompleteJobUsers, setOpenCompleteJobUsers] = useState(false);

  const {
    creatorActivityDetails,
    success: creatorActivityDetailsSuccess,
    loading: creatorActivityLoading,
  } = useSelector((state) => state.creatorActivityReducer);

  const { success: successPost, loading: postActivityLoading } = useSelector(
    (state) => state.postActivityReducer
  );

  const {
    creatorAppliedId,
    error: appliedError,
    success: appliedIdSucces,
  } = useSelector((state) => state.creatorAppliedJobIdReducer);

  // console.log("creatorAppliedIdcreatorAppliedId--------",creatorAppliedId);

  const { jobSubmitStatus, success: jobSubmitStatusSuccess } = useSelector(
    (state) => state.jobSubmitStatusReducer
  );

  const {
    creatorActivityJob,
    success: jobSubmitSuccess,
    error: jobSubmitError,
    loading: activitySubmitLoading,
  } = useSelector((state) => state.creatorActivityJobSubmitReducer);

  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsCreatorReducer
  );

  const { jobAppliedDetails, success: creatorSuccessapplied } = useSelector(
    (state) => state.jobAppliedDetailsReducer
  );

  // console.log("jobDetails", jobAppliedDetails?.status);
  // console.log("jobDetails", jobAppliedDetails);

  const { success: rejected_Status_success, isApprovalRejectedData } =
    useSelector((state) => state.isApprovalRejectedStatusReducer);

  const { success: CreatorRatingActivitySuccess, CreatorRatingActivity } =
    useSelector((state) => state.CreatorActivityRatingReducers);

  const {
    success: CreatorRatingGetActivitySuccess,
    creatorActivityGetRatingDetails,
  } = useSelector((state) => state.CreatorActivityGetRatingReducer);

  // console.log("creatorActivityRatingDetails", creatorActivityGetRatingDetails);

  const { jobCompletedUsers, success: successJobCompletedUsers } = useSelector(
    (state) => state.getJobCompletedUsersReducer
  );

  const { completedTaskList, success: successCompletedTaskList } = useSelector(
    (state) => state.getCompletedTaskListReducer
  );

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch({ type: CREATOR_ACTIVITY_RESET });
    dispatch({ type: IS_APPROVAL_REJECTED_STATUS_RESET });
    dispatch({ type: POST_ACTIVITY_CHAT_RESET });
    dispatch({ type: COMPLETED_JOB_LIST_RESET });
    dispatch(getCreatorActivityDetails(jobId, orderValue));
    dispatch(getJobDetailsCreator(jobId));

    // To check if a job was rejected
    dispatch(
      isApprovalRejectedStatus({ job: jobId, user: userData?.user?.user_id })
    );

    dispatch(getJobCompletedUsers({ job: jobId }));

    // To get jobpplied ID
    dispatch(creatorAppliedJobIdAction(jobId));

    // To get completed tasks
    dispatch(getCompletedTaskList({ job: jobId, user: userData.user.user_id }));

    dispatch(getJobSubmitStatus({ job: jobId, user: userData.user.user_id }));
  }, [jobSubmitStatusSuccess, successPost, jobSubmitSuccess, orderValue]);

  useEffect(() => {
    if (completedTaskList?.length > 0 && jobDetails?.jobtasks_job?.length > 0) {
      const compData = completedTaskList?.slice()?.sort();
      const jobData = jobDetails?.jobtasks_job?.slice()?.sort();

      const results = jobData.filter(
        (item1) => !compData.some((item2) => item1.id === item2.task)
      );

      setItemData(results);
    }
    if (jobDetails?.jobtasks_job?.length > 0 && completedTaskList?.length < 1) {
      setItemData(jobDetails?.jobtasks_job);
    }
  }, [successCompletedTaskList, job_detail_success, jobSubmitStatusSuccess]);

  useEffect(() => {
    handleEmptyChat();
  }, [successPost]);

  // console.log("jobDetailsjobDetailsjobDetails",jobDetails);
  useEffect(() => {
    if (creatorAppliedId) {
      setAppliedId(creatorAppliedId?.id);
    }
  }, [appliedIdSucces]);

  useEffect(() => {
    if (creatorAppliedId) {
      dispatch(getJobAppliedDetails(creatorAppliedId?.id));
    }
  }, [appliedIdSucces]);

  useEffect(() => {
    if (jobId) {
      dispatch(CreatorActivityGetRatingAction(jobId));
    }
  }, [CreatorRatingActivitySuccess]);

  useEffect(() => {
    if (jobCompletedUsers) {
      let filterUser = jobCompletedUsers?.filter(
        (item) => item.user_id === userData?.user?.user_id
      );
      if (filterUser?.length > 0) {
        setUserJobComplete(true);
      }
    }
  }, [successJobCompletedUsers]);

  useEffect(() => {
    if (jobSubmitSuccess && renderPage) {
      swal({
        title: "Successfully Complete",
        text: creatorActivityJob,
        className: "successAlert-login",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 4000,
      });
      setRenderPage(false);
    }
    if (jobSubmitError && renderPage) {
      swal({
        title: "Error",
        text: "Something went wrong!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 4000,
      });

      setRenderPage(false);
    }
    dispatch({ type: CREATOR_ACTIVITY_JOBSUBMIT_RESET });
  }, [jobSubmitSuccess, jobSubmitError]);

  const handleEmptyChat = () => {
    setChatbox("");
    setAttachfiles([]);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFilesDrop([
        ...filesDrop,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
      // setErrors({ ...errors, chatboxOrFile: null });
    },
    [filesDrop]
  );

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop,
  });

  const removeFile = (file) => () => {
    const newFiles = [...filesDrop];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFilesDrop(newFiles);
  };

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li className="mapDataDiv" key={file.path}>
      <ul className="mapDataDiv2">
        {errors.map((e) => (
          <li className="mapDataDiv3" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = filesDrop.map((file) => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner}>
        <img className="attachAssertspopImage" src="/img/assertgallery.png" />
        {file.title}
        <button onClick={removeFile(file)} className="remove_button_delet">
          {" "}
          <img className="attachAssertspopDeleteI1" src="/img/deleterc.png" />
        </button>
      </div>
    </div>
  ));

  const onDrop1 = useCallback(
    (acceptedFilesAttachfiles) => {
      setAttachfiles([
        ...attachfiles,
        ...acceptedFilesAttachfiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            title: file.name,
          })
        ),
      ]);
      setErrors({ ...errors, chatboxOrFile: null });
    },
    [attachfiles]
  );

  const {
    getRootProps: getRootPropsAttachfiles,
    getInputProps: getInputPropsAttachfiles,
    acceptedFiles: acceptedFilesAttachfiles,
    fileRejections1,
    isFocused1,
    isDragAccept1,
    isDragReject1,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop: onDrop1,
  });

  const removeFile1 = (file) => () => {
    const newFiles = [...attachfiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setAttachfiles(newFiles);
  };

  const thumbs1 = attachfiles.map((file) => (
    <div style={thumb} key={file.id}>
      <div style={thumbInner}>
        <img className="attachAssertspopImage" src="/img/assertgallery.png" />
        {file.title}
        <button onClick={removeFile1(file)} className="remove_button_delet">
          {" "}
          <img className="attachAssertspopDeleteI1" src="/img/deleterc.png" />
        </button>
      </div>
    </div>
  ));

  let removeFormFieldsUrls = (i) => {
    let newFormValues = [...formUrls];
    newFormValues.splice(i, 1);
    setFormUrls(newFormValues);
  };

  const handleJobSumbitData = (e) => {
    e.preventDefault();
    let isValidUrl = "";
    let newFormValues = formUrls;
    setFormUrls(newFormValues);
    if (formUrls) {
      if (formUrls != "") {
        isValidUrl =
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
      }
    }
    const tempErrors = {
      jobTextData: jobTextData.length < 1 && "Please enter this field",
      // filesDrop: filesDrop.length < 1 && "Please enter this field",
      selectData:
        itemData?.length > 0 && !selectData && "Please enter this field",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    jobSumbmitData();
  };

  const jobSumbmitData = () => {
    const isPrevtask = isApprovalRejectedData?.find(
      (item) => item.task_details.id === selectData
    );

    const formData = new FormData();
    if (formUrls) {
      setFormUrls(formUrls.filter((item) => item));
      formData.append("submit_job_url", formUrls);
    }
    if (filesDrop) {
      for (const key of Object.keys(filesDrop)) {
        formData.append("work_attachments", filesDrop[key]);
        formData.append("work_activity_attachments", filesDrop[key]);
      }
    }
    formData.append("job_applied", appliedId);
    formData.append("message", jobTextData);
    if (selectData) {
      formData.append("task", selectData);
    }
    formData.append("status", 0);

    if (
      isApprovalRejectedData &&
      isApprovalRejectedData?.length > 0 &&
      isPrevtask
    ) {
      formData.append("put", true);
      formData.append("putId", isApprovalRejectedData[0].id);
    }

    dispatch(creatorActivityJobSubmitAction(formData));
    setRenderPage(true);
    props.handleCloseSubmit();
    setJobTextData("");
    setFilesDrop([]);
    setFormUrls([]);
    setSelectData(null);
    handleEmptyChat();
  };

  const handleFilterActivity = (event) => {
    setFilter(event.target.value);
  };

  const handlePostChat = (e) => {
    e.preventDefault();

    const tempErrors = {
      chatboxOrFile:
        !chatbox &&
        attachfiles.length == 0 &&
        "Please attach a file or input a message",
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }

    const formData = new FormData();

    formData.append("job", jobId);
    formData.append("user", userData?.user?.user_id);
    formData.append("activity_status", 1);
    formData.append("activity_job_chat[0]sender", userData?.user?.user_id);

    if (chatbox) {
      formData.append("activity_job_chat[0]messages", chatbox);
    }

    if (attachfiles && attachfiles.length > 0) {
      for (const key of Object.keys(attachfiles)) {
        formData.append("chat_attachments", attachfiles[key]);
      }
    }

    dispatch(postActivityChat(formData));
  };

  const handleDateDiff = (firstDate, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSort = () => {
    if (orderValue === "created") {
      setOrderValue("-created");
      setOrderName("Newest Activity First");
    } else {
      setOrderValue("created");
      setOrderName("Oldest Activity First");
    }
  };

  function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;

    if (text?.length > 0) {
      let parts = text?.split(urlRegex);
      for (let i = 1; i < parts?.length; i += 2) {
        parts[i] = (
          <a key={"link" + i} target="_blank" href={parts[i]}>
            {parts[i]}
          </a>
        );
      }
      return parts;
    } else {
      return text;
    }
  }

  //---------------------RATION RATING RATING------------------------------------

  const handleOpenCompleteJobUsersDialog = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
    setRatingValue(1);
    setDescription("");
    setErrors({ description: null });
  };
  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      description: !description && "Please Enter Comments",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    handleSubmitRating();
  };

  const handleSubmitRating = () => {
    const formData = new FormData();

    formData.append("receiver_user", jobDetails?.user);
    formData.append("sender_user", userData?.user?.user_id);
    formData.append("rating", rationValue);
    formData.append("feedback", description);
    formData.append("job", jobId);
    dispatch(CreatorActivityRatingAction(formData));
    //  dispatch(completeJobActivity(userAppliedId, { status: 4 }));
    // console.log("receiver_user", userIdData);
    // console.log("sender_user", userData?.user?.user_id);
    // console.log("rating", rationValue);
    // console.log("feedback", description);
    // console.log("job", jobId);
    // console.log("userAppliedId", userAppliedId);
    setOpen3(false);
    setRatingValue(1);
    setDescription("");
    setErrors({ description: null });
    setUserAppliedId();
    setUserIdData();
  };

  return (
    <>
      {creatorActivityLoading ||
      postActivityLoading ||
      activitySubmitLoading ||
      isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {props.isUserHired ? (
            <>
              <div className="MarketingcamaignagencyNew Marketingcamaignagency_1">
                <div className="activityDropdownButton">
                  <div className="activityDivIcon">
                    <input
                      className="newSearchActInput"
                      type="text"
                      disabled
                      placeholder="Search Activity"
                    />
                    <img
                      className="newSearchLogo"
                      src="/img/newSearchIcon.png"
                    />
                  </div>

                  <div className="activitySelectNew">
                    {/* <Select
                      className={
                        filter === ""
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                      }
                      value={filter}
                      onChange={handleFilterActivity}
                      displayEmpty
                    >
                      <MenuItem value="">All Activity</MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select> */}
                  </div>
                  <div className="oldestActivityDiv">
                    <img
                      className="activityArrowIcon"
                      src={
                        orderValue === "created"
                          ? "/img/activityarrowold.png"
                          : "/img/activityarrow.png"
                      }
                    />
                    <button
                      value={orderValue}
                      onClick={() => handleSort()}
                      className="oldestActivityBtn"
                    >
                      {orderName}
                    </button>
                  </div>
                </div>
              </div>
              <div className="newContentActivityJob">
                {creatorActivityDetails &&
                  creatorActivityDetails?.map((activity, index) => (
                    <>
                      {/* ------------------------- JOB CREATE ------------------------- */}
                      {activity?.activity_type === 0 &&
                        activity?.activity_status === 0 && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              {activity?.agency_img ? (
                                <img src={activity?.agency_img} alt="" />
                              ) : (
                                <img src="/img/avataruser.png" alt="" />
                              )}
                              {creatorActivityDetails?.length !== index + 1 && (
                                <div className="ActivityBFirst"></div>
                              )}
                            </div>
                            <div className="NewMessTextFirstLine">
                              <h3>
                                {activity?.agency_name?.agency_name}{" "}
                                <span className="newCeatedJobText">
                                  created job
                                </span>{" "}
                                {props?.jobName}
                                <label className="Mess_Agen_Date">
                                  {moment(props?.jobCreatedAt).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB WORKFLOW STAGE 1 ------------------------- */}
                      {/* {activity.activity_type === 0 && activity.activity_status === 0 && (
                    <div className="newAgencyActivity">
                      <div className="MessImg">
                        <img src="/img/adifectnewLogo.png" alt="" />
                        {creatorActivityDetails?.length !== index + 1 && (
                            <div className="ActivityBFirst"></div>
                          )}
                      </div>
                      <div className="NewMessText">
                        <h3>
                          <span className="jobMovedStageNew">Job moved to</span> Stage 1
                          <span className="jobMovedStage2">/2</span> - Marketing Team{" "}
                          <span className="jobMovedStageNew">of</span> Banner Ad
                          Approvals Workflow
                          <label className="Mess_Agen_Date">June 18 4:16 AM</label>
                        </h3>
                      </div>
                    </div>
                  )} */}

                      {/* ------------------------- JOB WORKFLOW STAGE 2 ------------------------- */}
                      {/* {activity.activity_type === 0 && activity.activity_status === 0 && (
                    <div className="newAgencyActivity">
                      <div className="MessImg">
                        <img src="/img/adifectnewLogo.png" alt="" />
                        {creatorActivityDetails?.length !== index + 1 && (
                            <div className="ActivityBFirst"></div>
                          )}
                      </div>
                      <div className="NewMessText">
                        <h3>
                          <span className="jobMovedStageNew">Job moved to</span> Stage 2
                          <span className="jobMovedStage2">/2</span> - Social Team{" "}
                          <span className="jobMovedStageNew">of</span> Banner Ad
                          Approvals Workflow
                          <label className="Mess_Agen_Date">June 18 4:16 AM</label>
                        </h3>
                      </div>
                    </div>
                  )} */}

                      {/* ------------------------- JOB MOVED TO IN PROGRESS ------------------------- */}
                      {activity?.activity_type === 1 &&
                        activity?.activity_status === 0 && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              <img src="/img/adifectnewLogo.png" alt="" />
                              {creatorActivityDetails?.length !== index + 1 && (
                                <div className="ActivityBFirst"></div>
                              )}
                            </div>
                            <div className="NewMessText">
                              <h3>
                                <span className="newCeatedJobText">
                                  {" "}
                                  Job moved to
                                </span>{" "}
                                In Progress
                                <label className="Mess_Agen_Date">
                                  {moment(activity?.created).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB CHAT ------------------------- */}
                      {/* {activity.activity_type === 1 &&
                        activity.activity_status === 0 && (
                          <>
                            <div className="andersonBrown">
                              {/* <h3>Rachel Anderson</h3>
                              <h3>{activity.user_full_name.user_name}</h3>
                              <h3 className="rachelRejectSecLine">
                                   4:5 is correct, but is this
                                low-res? Something doesn’t look right.
                              </h3>
                            </div>
                            <div className="rachelBadLine">
                                 

                              <h3>
                                My bad, I exported at 1x. Here you go at 2x
                              </h3>
                            </div>

                            <div className="rachelBannerLinkLogo">
                              <div className="rachelBannerLinkLogoD_F">
                                <img src="/img/willisbanner.png" alt="" />
                                <span className="firstBannerLink">
                                     
                                  BannerAdFinal_v2.jpeg{" "}
                                </span>
                              </div>
                            </div>
                            <div className="newAgencyActivityLast">
                              <div className="MessImg">
                                <img src="/img/circle-image.png" alt="" />
                              </div>
                              <div className="NewMessText">
                                <h3>
                                  John Doe
                                  <label className="Mess_Agen_Date">
                                    {moment(activity.created).format(
                                      "MMMM D, h:mm A"
                                    )}
                                  </label>
                                </h3>
                              </div>
                            </div>
                          </>
                        )} */}

                      {/* ------------------------- JOB SUBMITTED PROPOSAL ------------------------- */}
                      {activity?.activity_type === 2 &&
                        activity?.activity_status === 0 && (
                          <>
                            <div className="newAgencyActivity">
                              <div className="MessImg">
                                {activity?.user_img ? (
                                  <img src={activity?.user_img} alt="" />
                                ) : (
                                  <img src="/img/avataruser.png" alt="" />
                                )}
                              </div>
                              <div className="NewMessText">
                                <h3>
                                  {activity?.user_full_name?.user_name}{" "}
                                  <span className="newCeatedJobText">
                                    submitted a
                                  </span>{" "}
                                  proposal
                                  <label className="Mess_Agen_Date">
                                    {moment(activity?.created).format(
                                      "MMMM D, h:mm A"
                                    )}
                                  </label>
                                </h3>
                              </div>
                            </div>
                            {creatorActivityDetails?.length !== index + 1 && (
                              <div className="ActivityBFirst"></div>
                            )}
                          </>
                        )}

                      {/* ------------------------- JOB ACCEPTED A PROPOSAL ------------------------- */}
                      {activity?.activity_type === 3 &&
                        activity?.activity_status === 0 && (
                          <>
                            <div className="newAgencyActivity">
                              <div className="MessImg">
                                {activity?.agency_img ? (
                                  <img src={activity?.agency_img} alt="" />
                                ) : (
                                  <img src="/img/avataruser.png" alt="" />
                                )}
                                {/* <img src="/img/mess2.png" alt="" /> */}
                              </div>
                              <div className="NewMessTextThirdLine">
                                <h3>
                                  {activity?.agency_name?.agency_name}{" "}
                                  <span className="newCeatedJobText">
                                    accepted a proposal from{" "}
                                  </span>
                                  {activity?.user_full_name?.user_name}
                                  <label className="Mess_Agen_Date">
                                    {moment(activity?.created).format(
                                      "MMMM D, h:mm A"
                                    )}
                                  </label>
                                  {/* <label className="Mess_Agen_Date">June 18 4:45 PM</label>created */}
                                </h3>
                              </div>
                            </div>
                            <div className="tonnyWillisChatBoxFinal">
                              <div className="tonnyWillisContentBoxColor">
                                <div className="willisNameDate">
                                  <div className="willisNameImg">
                                    {activity?.user_img ? (
                                      <img
                                        src={activity?.user_img}
                                        className="willisLogo"
                                        alt=""
                                      />
                                    ) : (
                                      <img
                                        src="/img/avataruser.png"
                                        className="willisLogo"
                                        alt=""
                                      />
                                    )}
                                    {/* <img
                               className="willisLogo"
                               src="/img/tonnywillis2.png"
                               alt=""
                             /> */}
                                    <span className="tonnyWillisName">
                                      {activity?.user_full_name?.user_name}
                                    </span>
                                  </div>
                                  <label className="Tonny_Agen_Date">
                                    Submitted{" "}
                                    {moment(
                                      activity?.job_applied_data[0]?.modified
                                    ).format("MMMM D, h:mm A")}
                                    {/* Submitted June 18 3:25 PM */}
                                  </label>
                                </div>
                                <div className="tonnyWillisParaOfferPrice">
                                  <p className="willisParaFinal">
                                    {
                                      activity?.job_applied_data[0]
                                        ?.cover_letter
                                    }{" "}
                                  </p>
                                  <div className="tonnyProposedPriceDateFinal">
                                    <div className="offerPriceDueDate">
                                      <div className="TonnyOfferPrice">
                                        <h3>Offer Price</h3>
                                        <p>${props?.jobPrice}</p>
                                      </div>

                                      <div className="tonnyDueDate">
                                        <h3>Offer Due Date</h3>
                                        <p>{props?.jobDueDate}</p>
                                      </div>
                                    </div>
                                    <div className="willisProposedDueDate">
                                      {activity?.job_applied_data[0]
                                        ?.proposed_price ? (
                                        <div
                                          className={
                                            activity?.job_applied_data[0]
                                              ?.proposed_price >
                                            1.5 * props.jobPrice
                                              ? "TonnyProposedPrice"
                                              : activity?.job_applied_data[0]
                                                  ?.proposed_price >
                                                1.25 * props?.jobPrice
                                              ? "orangeTonnyProposedPrice"
                                              : undefined
                                          }
                                        >
                                          <h3>Proposed Price</h3>
                                          <p>
                                            $
                                            {
                                              activity?.job_applied_data[0]
                                                ?.proposed_price
                                            }
                                          </p>
                                        </div>
                                      ) : (
                                        <div
                                          style={{ opacity: 0 }}
                                          className="TonnyProposedPrice"
                                        >
                                          <h3>Proposed Price</h3>
                                          <p>$</p>
                                        </div>
                                      )}

                                      {activity?.job_applied_data[0]
                                        ?.proposed_due_date && (
                                        <div
                                          className={
                                            handleDateDiff(
                                              props?.jobDueDate,
                                              activity?.job_applied_data[0]
                                                ?.proposed_due_date
                                            ) > 7
                                              ? "redProposedDueDate"
                                              : handleDateDiff(
                                                  props?.jobDueDate,
                                                  activity?.job_applied_data[0]
                                                    ?.proposed_due_date
                                                ) > 3
                                              ? "orangetonnyProposedDueDate"
                                              : "tonnyProposedDueDate"
                                          }
                                        >
                                          <h3>Proposed Due Date</h3>
                                          <p>
                                            {
                                              activity?.job_applied_data[0]
                                                ?.proposed_due_date
                                            }
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="tonnyBannerPortfolio">
                                  {activity?.job_applied_data[0]?.links
                                    ?.length > 0 &&
                                    activity?.job_applied_data[0]?.links
                                      ?.split(",")
                                      ?.map((link) => (
                                        <>
                                          <img src="/img/Projects.png" alt="" />
                                          <Link
                                            to="#"
                                            className="TonyBannerAdPitch"
                                          >
                                            {link}
                                          </Link>
                                        </>
                                      ))}
                                  {activity?.job_applied_data[0]
                                    ?.job_applied_attachments?.length > 0 &&
                                    activity.job_applied_data[0]?.job_applied_attachments?.map(
                                      (item, index) => (
                                        <>
                                          <img src="/img/Projects.png" alt="" />
                                          <a
                                            href={item}
                                            target="_blank"
                                            className="TonyBannerAdPitch"
                                          >
                                            {activity?.job_applied_data[0]
                                              ?.job_applied_attachments_name[
                                              index
                                            ]?.length > 20
                                              ? `${activity?.job_applied_data[0]?.job_applied_attachments_name[
                                                  index
                                                ]?.substring(0, 20)}...`
                                              : activity?.job_applied_data[0]
                                                  ?.job_applied_attachments_name[
                                                  index
                                                ]}
                                          </a>
                                        </>
                                      )
                                    )}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                      {/* ------------------------- JOB SUBMITTED FOR APPROVAL ?? ------------------------- */}
                      {/* {activity.activity_type === 2 && activity.activity_status === 0 && (
                    <div className="newAgencyActivity">
                      <div className="MessImg">
                        <img src="/img/tonnywillis.png" alt="" />
                      </div>
                      <div className="NewMessText">
                        <h3>
                          Tony Willis{" "}
                          <span className="submittedAprovel">
                            submitted job for approval
                          </span>
                          <label className="Mess_Agen_Date">June 19 9:45 AM</label>
                        </h3>
                      </div>
                    </div>
                  )} */}

                      {/* ------------------------- JOB SUBMITTED PROPOSAL (DUPLICATE) ------------------------- */}
                      {/* {activity.activity_type === 2 && activity.activity_status === 0 && (
                    <>
                      <div className="ActivityBFirst"></div>
                      <div className="newAgencyActivity">
                        <div className="MessImg">
                          <img src="/img/rachelsmith.png" alt="" />
                          {creatorActivityDetails?.length !== index + 1 && (
                            <div className="ActivityBFirst"></div>
                          )}
                        </div>
                        <div className="NewMessText">
                          <h3>
                            Rachel Smith{" "}
                            <span className="newCeatedJobText">submitted a</span>{" "}
                            proposal
                            <label className="Mess_Agen_Date">June 18 3:34 PM</label>
                          </h3>
                        </div>
                      </div>
                    </>
                  )} */}

                      {/* ------------------------- JOB APPROVED NOTIFICATION ?? ------------------------- */}
                      {/* {activity.activity_type === 3 && activity.activity_status === 0 && (
                    <div className="newAgencyActivity">
                      <div className="MessImg">
                        <img src="/img/mess2.png" alt="" />
                        <div className="ActivityBFirst"></div>
                      </div>
                      <div className="NewMessTexjohn">
                        <h3>
                          John Doe{" "}
                          <span className="newCeatedJobText">approved job for</span>{" "}
                          Stage 1 - Marketing Team
                          <label className="Mess_Agen_Date">June 18 01:00 PM</label>
                        </h3>
                      </div>
                    </div>
                  )} */}

                      {/* ------------------------- JOB REJECTED ------------------------- */}
                      {/* {activity.activity_type === 4 && activity.activity_status === 0 ( */}
                      {activity?.activity_status === 3 &&
                        activity?.activity_job_work[0]?.work_activity ===
                          "rejected" && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              {activity?.activity_job_work[0]
                                ?.approver_image ? (
                                <img
                                  src={
                                    activity?.activity_job_work[0]
                                      ?.approver_image
                                  }
                                  alt=""
                                />
                              ) : (
                                <img src="/img/avataruser.png" alt="" />
                              )}
                              <div className="ActivityBEighth"></div>
                            </div>
                            <div className="RachelNewMessText">
                              <h3>
                                {activity?.activity_job_work[0]?.approver_name}{" "}
                                <span className="rachelRejected">
                                  requested edit for{" "}
                                </span>
                                Stage{" "}
                                {activity?.activity_job_work[0]?.workflow
                                  ?.workflow_stage + 1}{" "}
                                -{" "}
                                {
                                  activity?.activity_job_work[0]?.workflow
                                    ?.stage_name
                                }
                                <label className="Mess_Agen_Date">
                                  {moment(
                                    activity?.activity_job_work[0]?.created
                                  ).format("MMMM D, h:mm A")}
                                </label>
                              </h3>
                              {activity?.activity_job_work[0]
                                ?.approver_message && (
                                <h3
                                  style={{ whiteSpace: "pre-line" }}
                                  className="rachelRejectSecLine"
                                >
                                  {" "}
                                  {urlify(
                                    activity?.activity_job_work[0]
                                      ?.approver_message
                                  )}
                                </h3>
                              )}
                              {activity?.activity_job_work[0]?.job_work
                                ?.task_details?.title ? (
                                <h6
                                  style={{ marginTop: "5px" }}
                                  className="rachelRejectTaskSecLine"
                                >
                                  <strong>Task submitted:</strong>{" "}
                                  {
                                    activity?.activity_job_work[0]?.job_work
                                      ?.task_details?.title
                                  }
                                </h6>
                              ) : (
                                <h6
                                  style={{ marginTop: "5px" }}
                                  className="rachelRejectTaskSecLine"
                                >
                                  <strong>Task submitted:</strong> Entire Job
                                </h6>
                              )}
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB CHAT ?? ------------------------- */}
                      {activity?.activity_status === 1 && (
                        <>
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              {activity?.activity_job_chat[0]?.sender ===
                              activity?.user_full_name?.id ? (
                                <img
                                  src={
                                    activity?.user_img
                                      ? activity?.user_img
                                      : "/img/avataruser.png"
                                  }
                                  alt=""
                                />
                              ) : activity?.activity_job_chat[0]?.sender ===
                                activity?.agency_name.id ? (
                                <img
                                  src={
                                    activity?.agency_img
                                      ? activity?.agency_img
                                      : "/img/avataruser.png"
                                  }
                                  alt=""
                                />
                              ) : (
                                <img src="/img/avataruser.png" alt="" />
                              )}
                              {/* {activity.agency_img ? (
                            <img src={ activity.agency_img} alt="" />
                          ) : (
                            <img src="/img/avataruser.png" alt="" />
                          )} */}
                            </div>
                            <div className="NewMessText">
                              <h3>
                                {activity?.activity_job_chat[0]?.sender ===
                                activity?.user_full_name?.id
                                  ? activity?.user_full_name?.user_name
                                  : activity?.activity_job_chat[0]?.sender ===
                                    activity?.agency_name?.id
                                  ? activity?.agency_name?.agency_name
                                  : "N/A"}
                                <label className="Mess_Agen_Date">
                                  {moment(activity?.created).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                            </div>
                          </div>
                          <div className="ActivityBFourth">
                            <div className="ActivityBFourthMessage">
                              {activity?.activity_job_chat[0]?.messages ? (
                                <div className="letsDotext">
                                  <p
                                    className="letsDoJohn"
                                    style={{ whiteSpace: "pre-line" }}
                                  >
                                    {urlify(
                                      activity?.activity_job_chat[0]?.messages
                                    )}
                                  </p>
                                </div>
                              ) : (
                                <div className="NoMessageWithAttachmentActivity"></div>
                              )}

                              <div className="jobSubmitAttachmentsActivity">
                                {activity?.activity_job_chat[0]
                                  ?.activity_job_attachments?.length > 0 &&
                                  activity?.activity_job_chat[0]?.activity_job_attachments?.map(
                                    (item) => (
                                      <div className="agencytopimgdiv">
                                        <div className="rachelBannerLinkLogoactivity agencycolorsec">
                                          <div className="rachelBannerLinkLogoD_F">
                                            <span className="firstBannerLink agencyacivityimg">
                                              <a
                                                href={item?.chat_attachment}
                                                target="_blank"
                                              >
                                                <img
                                                  className="activityagencyimage"
                                                  src={item.chat_attachment}
                                                  alt=""
                                                />
                                              </a>
                                            </span>
                                          </div>
                                          <p style={{ fontSize: "10px" }}>
                                            {" "}
                                            {item?.image_name?.length > 15
                                              ? `${item?.image_name?.substring(
                                                  0,
                                                  15
                                                )}...`
                                              : item?.image_name}{" "}
                                          </p>
                                        </div>
                                      </div>
                                      // <div className="rachelBannerLinkLogo">
                                      //   <div className="rachelBannerLinkLogoD_F">
                                      //     <img
                                      //       src="/img/assertgallery.png"
                                      //       alt=""
                                      //     />
                                      //     <span className="firstBannerLink">
                                      //       <a
                                      //         href={item?.chat_attachment}
                                      //         target="_blank"
                                      //       >
                                      //         {item?.image_name?.length > 35
                                      //           ? `${item?.image_name.substring(
                                      //               0,
                                      //               35
                                      //             )}...`
                                      //           : item?.image_name}{" "}
                                      //       </a>
                                      //     </span>
                                      //   </div>
                                      // </div>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* ------------------------- JOB CHAT ?? ------------------------- */}
                      {/* {activity?.activity_type === 0 &&
                        activity.activity_status === 1 && (
                          <div className="ActivityBSixth">
                            <div className="tonnyJohnDoe">
                              <h3>John Doe</h3>
                              <h3 className="letsGofontW">Let’s do 4:5.</h3>
                            </div>
                            <h3 className="coolThanks">Cool,thanks</h3>
                          </div>
                        )} */}

                      {/* ------------------------- JOB CHAT ?? ------------------------- */}
                      {/* {activity?.activity_type === 0 &&
                        activity?.activity_status === 1 && (
                          <div className="ActivityBSixth">
                            <div className="JohnDoeTonnyBackground">
                              <div className="JohnDoeTonny">
                                <h3>Tony Willis </h3>
                                <h3 className="letsGofontW">Cool,thanks</h3>
                              </div>
                              <h3 className="sureThingsText">
                                Sure thing. Hey, are you getting close to done?
                              </h3>
                            </div>
                          </div>
                        )} */}
                      {/* ------------------------- JOB SUBMITTED FOR APPROVE (CHAT) ------------------------- */}
                      {activity?.activity_type === 2 &&
                        activity?.activity_status === 1 && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              {activity?.user_img ? (
                                <img src={activity?.user_img} alt="" />
                              ) : (
                                <img src="/img/avataruser.png" alt="" />
                              )}
                              {/* <img src="/img/mess2.png" alt="" /> */}
                            </div>
                            <div className="NewMessText">
                              <h3>
                                John Doe
                                <label className="Mess_Agen_Date">
                                  {moment(activity?.created).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB REVIEW FOR APPROVE (CHAT) ------------------------- */}
                      {activity?.activity_type === 2 &&
                        activity?.activity_status === 1 && (
                          <>
                            <div className="ActivityBSecond"></div>
                            <div className="newAgencyActivity">
                              <div className="MessImg">
                                {activity?.user_img ? (
                                  <img src={activity?.user_img} alt="" />
                                ) : (
                                  <img src="/img/avataruser.png" alt="" />
                                )}
                                {/* <img src="/img/tonnywillis.png" alt="" /> */}
                              </div>
                              <div className="NewMessText">
                                <h3>
                                  Tony Willis{" "}
                                  <label className="Mess_Agen_Date">
                                    {moment(activity?.created).format(
                                      "MMMM D, h:mm A"
                                    )}
                                  </label>
                                </h3>
                              </div>
                            </div>
                          </>
                        )}

                      {/* ------------------------- JOB SUBMITTED FOR APPROVAL ------------------------- */}
                      <div className="newAgencyActivity">
                        {activity?.activity_status === 2 &&
                          activity?.activity_job_work[0]?.work_activity ===
                            "submit_approval" && (
                            <>
                              <div className="MessImg">
                                {activity?.user_img ? (
                                  <img src={activity?.user_img} alt="" />
                                ) : (
                                  <img src="/img/avataruser.png" alt="" />
                                )}
                              </div>
                              <div className="NewMessText">
                                <h3>
                                  {activity?.user_full_name?.user_name}{" "}
                                  <span className="submittedAprovel">
                                    submitted job for approval
                                  </span>
                                  <label className="Mess_Agen_Date">
                                    {moment(activity?.created).format(
                                      "MMMM D, h:mm A"
                                    )}
                                  </label>
                                </h3>
                              </div>
                            </>
                          )}
                      </div>

                      <div className="ActivityBFourth">
                        <div className="ActivityBFourthMessage">
                          {activity?.activity_status === 2 &&
                            activity?.activity_job_work[0]?.work_activity ===
                              "submit_approval" && (
                              <>
                                {activity?.activity_job_work[0]
                                  ?.message_work ? (
                                  <div className="letsDotext">
                                    <p
                                      style={{ whiteSpace: "pre-line" }}
                                      className="letsDoJohn"
                                    >
                                      {urlify(
                                        activity?.activity_job_work[0]
                                          ?.message_work
                                      )}
                                    </p>
                                    {activity?.activity_job_work[0]?.job_work
                                      ?.task_details?.title ? (
                                      <div
                                        style={{ marginTop: "5px" }}
                                        className="jobSubmitTaskTitleActivity"
                                      >
                                        <h5>
                                          <strong>Task submitted:</strong>{" "}
                                          {
                                            activity?.activity_job_work[0]
                                              ?.job_work?.task_details?.title
                                          }
                                        </h5>
                                      </div>
                                    ) : (
                                      <div
                                        style={{ marginTop: "5px" }}
                                        className="jobSubmitTaskTitleActivity"
                                      >
                                        <h5>
                                          <strong>Task submitted:</strong>{" "}
                                          Entire Job
                                        </h5>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="NoMessageWithAttachmentActivity"></div>
                                )}
                              </>
                            )}

                          <div className="jobSubmitAttachmentsActivity">
                            {activity?.activity_status === 2 &&
                              activity?.activity_job_work[0]?.work_activity ===
                                "submit_approval" && (
                                <>
                                  {activity?.activity_job_work[0]
                                    ?.job_work_activity_attachments?.length >
                                    0 &&
                                    activity?.activity_job_work[0]?.job_work_activity_attachments?.map(
                                      (item) => (
                                        <div className="agencytopimgdiv">
                                          <div className="rachelBannerLinkLogoactivity agencycolorsec">
                                            <div className="rachelBannerLinkLogoD_F">
                                              <span className="firstBannerLink agencyacivityimg">
                                                <a
                                                  href={item?.work_attachment}
                                                  target="_blank"
                                                >
                                                  <img
                                                    className="activityagencyimage"
                                                    src={item.work_attachment}
                                                    alt=""
                                                  />
                                                </a>
                                              </span>
                                            </div>
                                            <p style={{ fontSize: "10px" }}>
                                              {" "}
                                              {item?.attachment_name?.length >
                                              15
                                                ? `${item?.attachment_name?.substring(
                                                    0,
                                                    15
                                                  )}...`
                                                : item?.attachment_name}{" "}
                                            </p>
                                          </div>
                                        </div>
                                        // <div className="rachelBannerLinkLogo">
                                        //   <div className="rachelBannerLinkLogoD_F">
                                        //     <img
                                        //       className="attachAssertspopImage"
                                        //       src="/img/assertgallery.png"
                                        //     />
                                        //     <a
                                        //       href={item?.work_attachment}
                                        //       target="_blank"
                                        //     >
                                        //       <img
                                        //         src="/img/willisbanner.png"
                                        //         alt=""
                                        //       />
                                        //       <span className="firstBannerLink">
                                        //         {item?.attachment_name}
                                        //       </span>
                                        //     </a>
                                        //   </div>
                                        // </div>
                                      )
                                    )}
                                </>
                              )}
                          </div>
                        </div>
                      </div>

                      {/* ------------------------- JOB MOVED TO IN PROGRESS ------------------------- */}
                      {activity?.activity_type === 5 && (
                        <div className="newAgencyActivity">
                          <div className="MessImg">
                            <img src="/img/adifectnewLogo.png" alt="" />
                            {creatorActivityDetails?.length !== index + 1 && (
                              <div className="ActivityBFirst"></div>
                            )}
                          </div>
                          <div className="NewMessText">
                            <h3>
                              <span className="newCeatedJobText">
                                {" "}
                                Job moved to
                              </span>{" "}
                              In Progress
                              <label className="Mess_Agen_Date">
                                {moment(activity?.created).format(
                                  "MMMM D, h:mm A"
                                )}
                              </label>
                            </h3>
                          </div>
                        </div>
                      )}

                      {/* ------------------------- JOB MOVED TO STAGE ------------------------- */}
                      {activity?.activity_status === 3 &&
                        activity?.activity_job_work[0]?.work_activity ===
                          "moved" && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              <img src="/img/adifectnewLogo.png" alt="" />
                              {creatorActivityDetails?.length !== index + 1 && (
                                <div className="ActivityBFirst"></div>
                              )}
                            </div>
                            <div className="NewMessText">
                              <h3>
                                <span className="newCeatedJobText">
                                  {" "}
                                  Job moved to
                                </span>{" "}
                                Stage{" "}
                                {activity?.activity_job_work[0]?.workflow
                                  ?.workflow_stage + 1}
                                <span className="newCeatedJobText">
                                  /
                                  {
                                    activity?.activity_job_work[0]?.workflow
                                      ?.stage_count
                                  }
                                </span>{" "}
                                -{" "}
                                {
                                  activity?.activity_job_work[0]?.workflow
                                    ?.stage_name
                                }{" "}
                                <span className="newCeatedJobText">of</span>{" "}
                                {
                                  activity?.activity_job_work[0]?.workflow
                                    ?.workflow_name
                                }
                                <label className="Mess_Agen_Date">
                                  {moment(activity?.created).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB APPROVED NOTIFICATION ?? ------------------------- */}
                      {activity?.activity_status === 3 &&
                        activity?.activity_job_work[0]?.work_activity ===
                          "approved" && (
                          <div className="newAgencyActivity">
                            <div className="MessImg">
                              {activity?.activity_job_work[0]?.work_activity
                                ?.approver_image ? (
                                <img
                                  src={
                                    activity?.activity_job_work[0]
                                      ?.work_activity?.approver_image
                                  }
                                  alt=""
                                />
                              ) : (
                                <img src="/img/avataruser.png" alt="" />
                              )}
                              {creatorActivityDetails?.length !== index + 1 && (
                                <div className="ActivityBFirst"></div>
                              )}
                            </div>
                            <div className="NewMessTexjohn">
                              <h3>
                                {activity?.activity_job_work[0]?.approver_name}{" "}
                                <span className="newCeatedJobText">
                                  approved job for
                                </span>{" "}
                                Stage{" "}
                                {activity?.activity_job_work[0]?.workflow
                                  ?.workflow_stage + 1}{" "}
                                -{" "}
                                {
                                  activity?.activity_job_work[0]?.workflow
                                    ?.stage_name
                                }
                                {/* Stage 1 - Marketing Team */}
                                <label className="Mess_Agen_Date">
                                  {moment(activity?.created).format(
                                    "MMMM D, h:mm A"
                                  )}
                                </label>
                              </h3>
                              <h3
                                style={{ whiteSpace: "pre-line" }}
                                className="approvermessageActivity"
                              >
                                {urlify(
                                  activity?.activity_job_work[0]
                                    ?.approver_message
                                )}
                              </h3>
                              {activity?.activity_job_work[0]?.job_work
                                ?.task_details?.title ? (
                                <h6
                                  style={{ marginTop: "5px" }}
                                  className="approverTaskMessageActivity"
                                >
                                  <strong>Task submitted:</strong>{" "}
                                  {
                                    activity?.activity_job_work[0]?.job_work
                                      ?.task_details?.title
                                  }
                                </h6>
                              ) : (
                                <h6
                                  style={{ marginTop: "5px" }}
                                  className="approverTaskMessageActivity"
                                >
                                  <strong>Task submitted:</strong> Entire Job
                                </h6>
                              )}
                            </div>
                          </div>
                        )}

                      {/* ------------------------- JOB RATING NOTIFICATION RECIEVER ------------------------- */}
                      {activity?.activity_type === 7 &&
                        Object.keys(activity?.job_rating_receiver)?.length >
                          0 && (
                          <>
                            <div className="newAgencyActivity">
                              <div className="MessImg">
                                <img
                                  src={
                                    activity?.agency_img
                                      ? activity?.agency_img
                                      : "/img/avataruser.png"
                                  }
                                  alt=""
                                />

                                {/* {agencyActivityDetails?.length !== index + 1 && (
                              <div className="ActivityBFirst"></div>
                            )} */}
                              </div>

                              <div className="NewMessText">
                                <h3>
                                  {
                                    activity?.job_rating_receiver
                                      ?.sender_user_details
                                  }{" "}
                                  <span className="newCeatedJobText">
                                    rated job.
                                  </span>{" "}
                                  <label className="Mess_Agen_Date">
                                    {moment(
                                      activity?.job_rating_receiver?.created
                                    ).format("MMMM D, h:mm A")}
                                  </label>
                                </h3>
                              </div>
                            </div>
                            <div className="ActivityBFourth">
                              <div className="ActivityBFourthMessage">
                                <div className="letsDotext">
                                  <Rating
                                    readOnly
                                    name="simple-controlled"
                                    value={
                                      activity?.job_rating_receiver?.rating
                                    }
                                  />
                                  <h5>
                                    {activity?.job_rating_receiver?.feedback}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                      {/* ------------------------- JOB RATING NOTIFICATION SENDER ------------------------- */}
                      {activity?.activity_type === 7 &&
                        Object.keys(activity?.job_rating_sender)?.length >
                          0 && (
                          <>
                            <div className="newAgencyActivity">
                              <div className="MessImg">
                                <img
                                  src={
                                    activity?.user_img
                                      ? activity?.user_img
                                      : "/img/avataruser.png"
                                  }
                                  alt=""
                                />

                                {/* {agencyActivityDetails?.length !== index + 1 && (
                              <div className="ActivityBFirst"></div>
                            )} */}
                              </div>

                              <div className="NewMessText">
                                <h3>
                                  {
                                    activity?.job_rating_sender
                                      ?.sender_user_details
                                  }{" "}
                                  {/* {activity?.job_rating_details?.sender_user ===
                              activity?.user_full_name?.id
                                ? activity?.user_full_name?.user_name
                                : activity?.job_rating_details?.sender_user ===
                                  activity?.agency_name.id
                                ? activity?.agency_name?.agency_name
                                : "No name"}{" "} */}
                                  <span className="newCeatedJobText">
                                    rated job.
                                  </span>{" "}
                                  <label className="Mess_Agen_Date">
                                    {moment(
                                      activity?.job_rating_sender?.created
                                    ).format("MMMM D, h:mm A")}
                                  </label>
                                </h3>
                              </div>
                            </div>
                            <div className="ActivityBFourth">
                              <div className="ActivityBFourthMessage">
                                <div className="letsDotext">
                                  <Rating
                                    readOnly
                                    name="simple-controlled"
                                    value={activity?.job_rating_sender?.rating}
                                  />
                                  <h5>
                                    {activity?.job_rating_sender?.feedback}
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                      {/* ------------------------- JOB COMPLETED NOTIFICATION ?? ------------------------- */}
                      {activity?.activity_type === 6 && (
                        <div className="newAgencyActivity">
                          <div className="MessImg">
                            {activity?.agency_img ? (
                              <img src={activity?.agency_img} alt="" />
                            ) : (
                              <img src="/img/avataruser.png" alt="" />
                            )}
                            {creatorActivityDetails?.length !== index + 1 && (
                              <div className="ActivityBFirst"></div>
                            )}
                          </div>
                          <div className="NewMessText">
                            <h3>
                              {activity?.agency_name?.agency_name}
                              <span className="newCeatedJobText">
                                {" "}
                                moved job to
                              </span>{" "}
                              Completed{" "}
                              <label className="Mess_Agen_Date">
                                {moment(activity?.created).format(
                                  "MMMM D, h:mm A"
                                )}
                              </label>
                            </h3>
                          </div>
                        </div>
                      )}
                    </>
                  ))}

                {!jobSubmitStatus && !userJobComplete && (
                  <div
                    style={{ marginTop: "10px" }}
                    className="submitjobApprovelPopup"
                  >
                    <button
                      onClick={props.handleOpenSubmit}
                      className="submitJobforButton"
                    >
                      Submit Job for Approval
                    </button>
                  </div>
                )}

                <Dialog
                  className="profileImgDialogagency"
                  open={props.submitjobopen}
                  onClose={props.handleCloseSubmit}
                >
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2>Submit Job for Approval </h2>

                      <span
                        className="closebuttonsec"
                        onClick={props.handleCloseSubmit}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions_new">
                    <DialogContent className="ChangeEmailAContent">
                      <div className="updateEmailBelowPop">
                        <p>
                          Once submitted, this job will move to the next stage
                          of the approval workflow. Approvers will be able to
                          approve your submission, or reject it and request
                          modifications.
                        </p>
                      </div>

                      {itemData?.length > 0 && (
                        <div className="methodagencyProfilejob">
                          <div
                            className={
                              errors.selectData
                                ? "askYourQuestionInput error"
                                : "askYourQuestionInput  "
                            }
                          >
                            <p>Task</p>
                            <Select
                              className={
                                selectData === null
                                  ? "job-submit-task selectinputcolor"
                                  : "job-submit-task menuiteminputcolor"
                              }
                              // MenuProps={menuProps}
                              value={selectData}
                              onChange={(e) => {
                                setSelectData(e.target.value);
                                setErrors({ ...errors, selectData: null });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={null}>Select Task</MenuItem>
                              {itemData?.map((item) => (
                                <MenuItem key={item?.id} value={item?.id}>
                                  {item?.title}
                                </MenuItem>
                              ))}
                            </Select>
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.selectData ? 1 : 0,
                              }}
                            >
                              {errors.selectData ?? "valid"}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="NewMailNameAndInput">
                        <div
                          className={
                            errors.jobTextData
                              ? "askYourQuestionInput error"
                              : "askYourQuestionInput  "
                          }
                        >
                          <textarea
                            className="NameorEmailNewPop_textData"
                            type="text"
                            placeholder="Enter text here"
                            value={jobTextData}
                            maxLength={4000}
                            onChange={(e) => {
                              setJobTextData(e.target.value);
                              setErrors({ ...errors, jobTextData: null });
                            }}
                            rows="5"
                            cols="33"
                            required
                          ></textarea>
                          <span
                            style={{
                              color: jobTextData.length >= 4000 && "#D14F4F",
                            }}
                            className="limitWordsNew"
                          >
                            {jobTextData.length}/4000
                          </span>
                          <span
                            className="CoverCreator34"
                            style={{
                              color: "#D14F4F",
                              opacity: errors.jobTextData ? 1 : 0,
                            }}
                          >
                            {errors.jobTextData ?? "valid"}
                          </span>
                        </div>
                      </div>
                      <div className="attachAssertspopDiv">
                        <h3 className="attachAssertsHeading">
                          Attached Assets
                        </h3>
                        <div className="attachAssertspopDivfirst">
                          <aside style={thumbsContainer}>{thumbs}</aside>
                          {fileRejectionItems?.length > 0 && (
                            <>
                              <ul className="errorData_drop_zone">
                                {fileRejectionItems}
                              </ul>
                            </>
                          )}
                          <div className="drop_maindiv" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <button className="submitJobButtonOne1">
                              Attach file
                            </button>
                          </div>
                          {formUrls?.map((element, index) => (
                            <div className="form-inline" key={index}>
                              {element && (
                                <div className="assertDustbinLink1">
                                  <img
                                    className="linkicon"
                                    src="/img/asserLink.png"
                                  />
                                  <a className="adifecttesturl">{element}</a>
                                  <img
                                    className="assertbinLogo2"
                                    src="/img/assertbin.png"
                                    onClick={() => removeFormFieldsUrls(index)}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <div className="sharebuttonjobcontent">
                        <div className="cancelButtonnewWithSave">
                          <button
                            className="canceButtonnewPop"
                            onClick={props.handleCloseSubmit}
                          >
                            Cancel
                          </button>
                          <button
                            className="shareNewPopPublic"
                            onClick={handleJobSumbitData}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>

                <div className="attachAssertspopDivfirst">
                  <aside style={thumbsContainer}>{thumbs1}</aside>
                </div>

                {/* ---------------------------RATING---------------------------------------------------------- */}
                {jobAppliedDetails?.status === 4 &&
                  creatorActivityGetRatingDetails?.length < 1 && (
                    <div className="wouldYouLikeJobDiv">
                      <p className="wouldYouLikeJobPara">
                        Would you like to leave a rating
                      </p>
                      <button
                        onClick={() => handleOpenCompleteJobUsersDialog()}
                        className="wouldYouLikeJobButton"
                      >
                        Click here
                      </button>
                    </div>
                  )}

                {/* ------------------------------RATION DIALOG START-------------------------------- */}
                <Dialog
                  className="profileImgDialognew"
                  open={open3}
                  onClose={handleClose3}
                >
                  <DialogTitle className="profileImgHeading">
                    Rate Job
                    <span onClick={handleClose3}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </DialogTitle>
                  <div className="dialogcontent_and_actionsinvite">
                    <DialogContent className="image_and_namesinvite">
                      <div className="Topallpage-- AllPageHight--">
                        <div className="invitepage2">
                          <div className="invite1sec">
                            <p>
                              This feedback will be publicly visible on the
                              content creator’s profile, and visible to anyone
                              who has access to the job activity feed.
                            </p>

                            <Rating
                              name="simple-controlled"
                              value={rationValue}
                              onChange={(event, newValue) => {
                                setRatingValue(newValue);
                              }}
                            />
                            <div
                              className={
                                errors.description
                                  ? "text-content addjobtopdiv  error Describe_4"
                                  : "text-content addjobtopdiv  Describe_4"
                              }
                            >
                              {/* <h4 className="Describetext_agency_text">
                            Describe Your Job
                          </h4>
                          <p className="Describejobaddedit">
                            This could include dimensions, colors, how you plan
                            to use it, or anything else that the content creator
                            needs to know in order to meet your expectations.
                          </p> */}
                              <h4 className="Describetext_agency_text">
                                Comments
                              </h4>
                              <textarea
                                className="w-551 border-1 border-radius h-180 Textbox-textarea bkC2"
                                placeholder=""
                                maxLength={2000}
                                value={description}
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                  setErrors({ ...errors, description: null });
                                }}
                              />
                              <p className="deslimtsec_4">
                                <span
                                  style={{
                                    color:
                                      description?.length === 2000 && "#D14F4F",
                                  }}
                                >
                                  {description?.length ?? 0}
                                  /2000
                                </span>
                              </p>

                              <span
                                className="Ag_E"
                                style={{
                                  color: "#D14F4F",
                                  opacity: errors.description ? 1 : 0,
                                }}
                              >
                                {errors.description ?? "valid"}
                              </span>
                            </div>
                            {/* <div className="checkboxStatus"></div> */}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </div>
                  <DialogActions>
                    {/* <div className="invitepagenew"> */}

                    <button
                      onClick={handleClose3}
                      className="create-account-btn mt-2 border-radius CancelAddBtN workflowcancelbtn addeditbtninvitcancel"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={validateSubmit}
                      type="button"
                      className="btn-primary Small border-radius mt-2 addeditbtn addeditbtninvitesave"
                    >
                      Submit
                    </button>
                    {/* </div> */}
                  </DialogActions>
                </Dialog>
                {/* ---------------------------RATING---------------------------------------------------------- */}

                {/* ------------------------- JOB DROPZONE ------------------------- */}
                <div className="sendButtontextArea">
                  <div className="textareacommentsjobDetails">
                    <textarea
                      value={chatbox}
                      onChange={(e) => {
                        setChatbox(e.target.value);
                        setErrors({ ...errors, chatboxOrFile: null });
                      }}
                      id="storynew"
                      name="story"
                      rows="5"
                      cols="33"
                      maxLength={4000}
                    ></textarea>
                    <span
                      style={{ color: chatbox?.length >= 4000 && "#D14F4F" }}
                      className="limitWordsNew"
                    >
                      {chatbox?.length}/4000
                    </span>
                  </div>

                  <div className="drop_maindiv">
                    <button
                      style={{ marginTop: "5px" }}
                      className="sendButtonLimitFinal"
                      onClick={(e) => handlePostChat(e)}
                    >
                      Send
                    </button>
                    <span {...getRootPropsAttachfiles()}>
                      <input {...getInputPropsAttachfiles()} />
                      <button className="AttachButtonLimitFinal">
                        Attach File
                      </button>
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    color: "#D14F4F",
                    opacity: errors.chatboxOrFile ? 1 : 0,
                  }}
                >
                  {errors.chatboxOrFile ?? "valid"}
                </span>
              </div>
            </>
          ) : (
            <div className="jobActivityNotAccessible">
              <h3 className="jobActivityNotAccessibleh3">
                Job Activity is only accessible once you are hired for this job
              </h3>
            </div>
          )}
        </>
      )}
    </>
  );
}
