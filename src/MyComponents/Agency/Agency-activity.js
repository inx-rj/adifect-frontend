import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import Carousel from "react-bootstrap/Carousel";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import swal from "sweetalert";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";

import {
  getMemberJobDetailsAction,
  MemberViewApproveAction,
} from "../../redux/actions/activity-member-actions";
import {
  completeJobActivity,
  getAgencyActivityDetails,
  getInvitedUsersList,
  getJobCompletedUsers,
  postActivityChat,
  AgencyActivityRatingAction,
} from "../../redux/actions/activity-actions";
import {
  AGENCY_ACTIVITY_RESET,
  COMPLETE_JOB_ACTIVITY_RESET,
  GET_JOB_COMPLETED_USERS_RESET,
  INVITED_USERS_LIST_RESET,
  POST_ACTIVITY_CHAT_RESET,
} from "../../constants/activity-constants";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { acceptJobProposal } from "../../redux/actions/proposals-action";

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

export default function Agency_Activity(props) {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const [filter, setFilter] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [open3, setOpen3] = useState(false);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [dataText, setDataText] = useState("");

  const [chatbox, setChatbox] = useState("");
  const [attachfiles, setAttachfiles] = useState([]);

  const [orderName, setOrderName] = useState("Oldest Activity First");
  const [orderValue, setOrderValue] = useState("created");

  const [invitedUsersMap, setInvitedUsersMap] = useState([]);

  const [openCompleteJobUsers, setOpenCompleteJobUsers] = useState(false);

  const [errors, setErrors] = useState({
    chatboxOrFile: null,
    description: null,
  });

  const [rationValue, setRatingValue] = useState(1);
  const [description, setDescription] = useState("");
  const [userAppliedId, setUserAppliedId] = useState();
  const [userIdData, setUserIdData] = useState();

  // console.log("userAppliedId",userAppliedId);

  const {
    agencyActivityDetails,
    success: agencyActivityDetailsSuccess,
    loading: agencyActivityLoading,
  } = useSelector((state) => state.agencyActivityReducer);

  const {
    success: inviteUsersListSuccess,
    invitedUsers,
    error: inviteUsersListError,
    loading: inviteUsersListLoading,
  } = useSelector((state) => state.getInvitedUsersListReducer);

  const { success: successPost, loading: postActivityLoading } = useSelector(
    (state) => state.postActivityReducer
  );

  const {
    success: approveSuccess,
    memberApprove,
    error: approveError,
    loading: approveLoading,
  } = useSelector((state) => state.MemberViewApproveReducer);

  const { memberJobDetails } = useSelector(
    (state) => state.getMemberJobDetailsReducer
  );

  const { jobCompletedUsers, success: successJobCompletedUsers } = useSelector(
    (state) => state.getJobCompletedUsersReducer
  );

  const {
    completeJobData,
    success: successCompleteJob,
    error: errorCompleteJob,
    loading: loadingSuccessCompleteJob,
  } = useSelector((state) => state.completeJobActivityReducer);

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    // setTimeout(() => {
    dispatch({ type: AGENCY_ACTIVITY_RESET });
    dispatch({ type: POST_ACTIVITY_CHAT_RESET });
    dispatch({ type: INVITED_USERS_LIST_RESET });
    dispatch({ type: GET_JOB_COMPLETED_USERS_RESET });
    dispatch({ type: COMPLETE_JOB_ACTIVITY_RESET });

    // setIsLoading(false);
    if (filter) {
      dispatch(getAgencyActivityDetails(jobId, orderValue, filter));
    } else {
      dispatch(getAgencyActivityDetails(jobId, orderValue));
    }

    dispatch(getInvitedUsersList(jobId));

    // Get job completed status for button
    dispatch(getJobCompletedUsers({ job: jobId }));

    dispatch(getMemberJobDetailsAction(jobId, userData?.user?.user_id));
    // }, 100);
  }, [successPost, approveSuccess, orderValue, filter, successCompleteJob]);

  useEffect(() => {
    if (invitedUsers) {
      const unique = [
        ...new Map(invitedUsers.map((item) => [item["user"], item])).values(),
      ];
      setInvitedUsersMap(unique);
    }
  }, [inviteUsersListSuccess]);

  useEffect(() => {
    setChatbox("");
    setAttachfiles([]);
  }, [successPost]);

  useEffect(() => {
    if (successCompleteJob) {
      swal({
        title: "Successfully Complete",
        text: "Job completed!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 4000,
      });
    }
    if (errorCompleteJob) {
      swal({
        title: "",
        text: errorCompleteJob,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 4000,
      });
    }
    dispatch({ type: COMPLETE_JOB_ACTIVITY_RESET });
  }, [successCompleteJob, errorCompleteJob]);

  const handleCompleteJobActivity = (jobAppliedId, userId) => {
    // console.log("jobAppliedId", jobAppliedId);
    setUserAppliedId(jobAppliedId);
    setUserIdData(userId);
    // dispatch(completeJobActivity(jobAppliedId, { status: 4 }));
    setOpen3(true);
  };

  const handleCloseCompleteJobUsersDialog = () => {
    setOpenCompleteJobUsers(false);
  };

  const handleOpenCompleteJobUsersDialog = () => {
    setOpenCompleteJobUsers(true);
  };

  const handleCloseSubmit = () => {
    props.setSubmitjobopen(false);
  };

  const handleOpenSubmit = () => {
    props.setSubmitjobopen(true);
  };

  const handleFilterActivity = (event) => {
    setFilter(event.target.value);
  };

  const handleDateDiff = (firstDate, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffDays + " days");
    return diffDays;
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

    setIsLoading(true);
    dispatch(postActivityChat(formData));
  };

  const handleRejectMemeber = (id) => {
    dispatch(MemberViewApproveAction(id, { status: 2, message: dataText }));
    setDataText("");
    props.setSubmitjobopen(false);
    swal({
      title: "Successfully Complete",
      text: "Job requested for approval!",
      className: "successAlert",
      icon: "/img/logonew.svg",
      buttons: false,
      timer: 3000,
    });
  };
  const handleApproveMemeber = (id) => {
    dispatch(MemberViewApproveAction(id, { status: 1, message: dataText }));
    setDataText("");
    props.setSubmitjobopen(false);
    swal({
      title: "Successfully Complete",
      text: "Job successfully approved!",
      className: "successAlert",
      icon: "/img/logonew.svg",
      buttons: false,
      timer: 3000,
    });
  };

  // Dropzone

  const onDrop = useCallback(
    (acceptedFiles) => {
      setAttachfiles([
        ...attachfiles,
        ...acceptedFiles.map((file) =>
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
    const newFiles = [...attachfiles];
    newFiles.splice(newFiles.indexOf(file), 1);
    setAttachfiles(newFiles);
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

  const thumbs = attachfiles.map((file) => (
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

  // --------------RATION DIALOG BOX  FUCTIONS START------------------------
  const handleClose3 = () => {
    setOpen3(false);
    setRatingValue(1);
    setDescription("");
    setErrors({ description: null });
    setUserAppliedId();
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

    formData.append("receiver_user", userIdData);
    formData.append("sender_user", userData?.user?.user_id);
    formData.append("rating", rationValue);
    formData.append("feedback", description);
    formData.append("job", jobId);
    dispatch(AgencyActivityRatingAction(formData));
    dispatch(completeJobActivity(userAppliedId, { status: 4 }));
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
  // --------------RATION DIALOG BOX  FUCTIONS START------------------------

  return (
    <>
      {agencyActivityLoading ||
      postActivityLoading ||
      isLoading ||
      loadingSuccessCompleteJob ||
      approveLoading ? (
        <LoadingSpinner />
      ) : (
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
                <img className="newSearchLogo" src="/img/newSearchIcon.png" />
              </div>
              <div className="activitySelectNew">
                <Select
                  className={
                    filter === null ? "selectinputcolor" : "menuiteminputcolor"
                  }
                  value={filter}
                  onChange={handleFilterActivity}
                  displayEmpty
                >
                  <MenuItem className="displayFirstSelect" value={null}>
                    All Activity
                  </MenuItem>
                  {invitedUsersMap?.map((user) => (
                    <MenuItem key={user.user} value={user.user}>
                      {user.user_full_name}
                    </MenuItem>
                  ))}
                </Select>
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
            {agencyActivityDetails &&
              agencyActivityDetails?.map((activity, index) => (
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
                          {agencyActivityDetails?.length !== index + 1 && (
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
                        {agencyActivityDetails?.length !== index + 1 && (
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
                        {agencyActivityDetails?.length !== index + 1 && (
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
                          {agencyActivityDetails?.length !== index + 1 && (
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
                        {agencyActivityDetails?.length !== index + 1 && (
                          <div className="ActivityBFirst"></div>
                        )}
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
                          {agencyActivityDetails?.length !== index + 1 && (
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
                                {activity?.job_applied_data[0]?.cover_letter}{" "}
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
                                        1.5 * props?.jobPrice
                                          ? "TonnyProposedPrice"
                                          : activity.job_applied_data[0]
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
                              {activity?.job_applied_data[0]?.links?.length >
                                0 &&
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
                                activity?.job_applied_data[0]?.job_applied_attachments?.map(
                                  (item, index) => (
                                    <>
                                      <img src="/img/Projects.png" alt="" />
                                      <a
                                        href={item}
                                        target="_blank"
                                        className="TonyBannerAdPitch"
                                      >
                                        {activity?.job_applied_data[0]
                                          ?.job_applied_attachments_name[index]
                                          .length > 20
                                          ? `${activity?.job_applied_data[0]?.job_applied_attachments_name[
                                              index
                                            ].substring(0, 20)}...`
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

                  {/* ------------------------- JOB APPROVED NOTIFICATION ?? ------------------------- */}
                  {/* {activity.activity_type === 3 && activity.activity_status === 0 && (
                    <div className="newAgencyActivity">
                      <div className="MessImg">
                        <img src="/img/mess2.png" alt="" />
                        {agencyActivityDetails?.length !== index + 1 && (
                            <div className="ActivityBFirst"></div>
                          )}
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
                          {activity?.activity_job_work[0]?.approver_image ? (
                            <img
                              src={
                                activity?.activity_job_work[0]?.approver_image
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
                          {activity?.activity_job_work[0]?.approver_message && (
                            <h3
                              style={{ whiteSpace: "pre-line" }}
                              className="rachelRejectSecLine"
                            >
                              {" "}
                              {urlify(
                                activity?.activity_job_work[0]?.approver_message
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
                                style={{ whiteSpace: "pre-line" }}
                                className="letsDoJohn"
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
                                  //     <img src="/img/assertgallery.png" alt="" />
                                  //     <span className="firstBannerLink">
                                  //       <a
                                  //         href={item?.chat_attachment}
                                  //         target="_blank"
                                  //       >
                                  //         {item?.image_name?.length > 35
                                  //           ? `${item?.image_name?.substring(
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
                    activity?.activity_status === 1 && (
                      <div className="ActivityBSixth">
                        <div className="tonnyJohnDoe">
                          <h3>John Doe</h3>
                          <h3 className="letsGofontW">Let’s do 4:5.</h3>
                        </div>
                        <h3 className="coolThanks">Cool,thanks</h3>
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
                            {activity?.activity_job_work[0]?.message_work ? (
                              <div className="letsDotext">
                                <p
                                  style={{ whiteSpace: "pre-line" }}
                                  className="letsDoJohn"
                                >
                                  {urlify(
                                    activity?.activity_job_work[0]?.message_work
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
                                        activity?.activity_job_work[0]?.job_work
                                          ?.task_details?.title
                                      }
                                    </h5>
                                  </div>
                                ) : (
                                  <div
                                    style={{ marginTop: "5px" }}
                                    className="jobSubmitTaskTitleActivity"
                                  >
                                    <h5>
                                      <strong>Task submitted:</strong> Entire
                                      Job
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
                                ?.job_work_activity_attachments?.length > 0 &&
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
                                          {item?.attachment_name?.length > 15
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
                                    //       <img src="/img/willisbanner.png" alt="" />
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
                        {agencyActivityDetails?.length !== index + 1 && (
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
                            {moment(activity?.created).format("MMMM D, h:mm A")}
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
                          {agencyActivityDetails?.length !== index + 1 && (
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
                                activity?.activity_job_work[0]?.work_activity
                                  ?.approver_image
                              }
                              alt=""
                            />
                          ) : (
                            <img src="/img/avataruser.png" alt="" />
                          )}
                          {agencyActivityDetails?.length !== index + 1 && (
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
                          <h4
                            style={{ whiteSpace: "pre-line" }}
                            className="approvermessageActivity"
                          >
                            {urlify(
                              activity?.activity_job_work[0]?.approver_message
                            )}
                          </h4>
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
                    Object.keys(activity?.job_rating_receiver)?.length > 0 && (
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
                                value={activity?.job_rating_receiver?.rating}
                              />
                              <h5>{activity?.job_rating_receiver?.feedback}</h5>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                  {/* ------------------------- JOB RATING NOTIFICATION SENDER ------------------------- */}
                  {activity?.activity_type === 7 &&
                    Object.keys(activity?.job_rating_sender)?.length > 0 && (
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
                              {activity?.job_rating_sender?.sender_user_details}{" "}
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
                              <h5>{activity?.job_rating_sender?.feedback}</h5>
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
                        {agencyActivityDetails?.length !== index + 1 && (
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
                            {moment(activity?.created).format("MMMM D, h:mm A")}
                          </label>
                        </h3>
                      </div>
                    </div>
                  )}
                </>
              ))}

            {/* {memberJobDetails?.length > 0 && userData?.user?.user_level != 2 && (
              <div className="submitjobApprovelPopup">
                <button
                  onClick={handleOpenSubmit}
                  className="approveViewButtonBlue"
                >
                  View Approval
                </button>
              </div>
            )} */}

            {/* <Dialog
              className="profileImgDialogagencyApprovel"
              open={props.submitjobopen}
              onClose={handleCloseSubmit}
            >
              {memberJobDetails?.map((imagess, index) => (
                <>
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2>View Job Approval - {props?.jobName}</h2>

                      <span
                        className="closebuttonsec"
                        onClick={handleCloseSubmit}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </span>
                    </div>
                  </DialogTitle>

                  <DialogContent className="crouselImageContent">
                    {imagess?.job_work?.job_submit_Work?.length > 0 && (
                      <Carousel>
                        <Carousel.Item>
                          <img
                            className="CarouselImagesSlideShow"
                            src={
                              imagess?.job_work?.job_submit_Work[0]
                                ?.work_attachments
                            }
                            alt="First slide"
                          />
                          <div className="bannerandApprovelTasksD">
                            <span className="BannerAd16_span">
                              {
                                imagess?.job_work?.job_submit_Work[0]
                                  ?.work_attachments_name
                              }
                            </span>

                            <p className="approvelForTask">
                              This approval is for task:
                              <span className="DimensionsSpan">
                                {" "}
                                16:9 Dimensions
                              </span>
                            </p>
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    )}

                    <div className="sendButtontextArea">
                      <div className="textareacommentsSlider">
                        <textarea
                          id="storynewSlider"
                          name="story"
                          maxLength={4000}
                          value={dataText}
                          onChange={(e) => setDataText(e.target.value)}
                          rows="5"
                          cols="33"
                        ></textarea>
                        <span
                          style={{
                            color: dataText?.length === 4000 && "#D14F4F",
                          }}
                          className="limitWordsNew"
                        >
                          {dataText?.length}/4000
                        </span>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="cancelButtonnewWithSave">
                        <button
                          className="canceButtonnewPop"
                          onClick={() => handleRejectMemeber(imagess.id)}
                          disabled={dataText.length === 0}
                        >
                          Request Edit
                        </button>
                        <button
                          className="shareNewPopPublic"
                          onClick={() => handleApproveMemeber(imagess.id)}
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </DialogActions>
                </>
              ))}
            </Dialog> */}

            {/* ------------------------- JOB COMPLETE BUTTON ------------------------- */}
            {jobCompletedUsers?.length > 0 &&
              jobCompletedUsers?.length == 1 && (
                <div className="wouldYouLikeJobDiv">
                  <p className="wouldYouLikeJobPara">
                    Would you like to complete this job?
                  </p>
                  <button
                    onClick={() =>
                      handleCompleteJobActivity(
                        jobCompletedUsers[0]?.job_applied,
                        jobCompletedUsers[0]?.user_id
                      )
                    }
                    className="wouldYouLikeJobButton"
                  >
                    Complete Job
                  </button>
                </div>
              )}

            {/* ------------------------- JOB COMPLETE BUTTON ------------------------- */}
            {jobCompletedUsers?.length > 1 && (
              <div className="wouldYouLikeJobDiv">
                <p className="wouldYouLikeJobPara">
                  Would you like to complete this job?
                </p>
                <button
                  onClick={() => handleOpenCompleteJobUsersDialog()}
                  className="wouldYouLikeJobButton"
                >
                  Complete Job
                </button>
              </div>
            )}

            {/* ----------------------------- Display users to complete the job ------------------------------ */}
            <Dialog
              className="multipleDialogActivityApproval"
              open={openCompleteJobUsers}
              onClose={handleCloseCompleteJobUsersDialog}
            >
              <DialogTitle>
                <div className="divMultipleDialogApproval">
                  <h2>Below, select which user to complete the job for</h2>

                  <span
                    className="spanMultipleDialogApproval"
                    onClick={handleCloseCompleteJobUsersDialog}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </DialogTitle>

              <DialogContent>
                {jobCompletedUsers?.map((users, index) => (
                  <>
                    <ListItem button>
                      <ListItemText
                        onClick={() => {
                          handleCloseCompleteJobUsersDialog();
                          handleCompleteJobActivity(
                            users.job_applied,
                            users.user_id
                          );
                        }}
                      >
                        {users.username}
                      </ListItemText>
                    </ListItem>
                  </>
                ))}
              </DialogContent>
            </Dialog>

            {/* ----------------------------- Display users to complete the job ------------------------------ */}
            {/* ------------------------------RATE DIALOG START-------------------------------- */}
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
                          This feedback will be publicly visible on the content
                          creator’s profile, and visible to anyone who has
                          access to the job activity feed.
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
                          <h4 className="Describetext_agency_text">Comments</h4>
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

            {/* ------------------------------RATE DIALOG END-------------------------------- */}

            <div className="attachAssertspopDivfirst">
              <aside style={thumbsContainer}>{thumbs}</aside>
              {fileRejectionItems?.length > 0 && (
                <>
                  <ul className="errorData_drop_zone">{fileRejectionItems}</ul>
                </>
              )}
            </div>

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
                <span {...getRootProps()}>
                  <input {...getInputProps()} />

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
      )}
    </>
  );
}
