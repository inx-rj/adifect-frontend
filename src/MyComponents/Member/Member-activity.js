import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Carousel from "react-bootstrap/Carousel";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import {
  getMemberJobDetailsAction,
  MemberViewApproveAction,
} from "../../redux/actions/activity-member-actions";
import {
  getInvitedUsersList,
  getMemberActivityDetails,
  postActivityChat,
} from "../../redux/actions/activity-actions";
import {
  INVITED_USERS_LIST_RESET,
  MEMBER_ACTIVITY_RESET,
  MEMEBER_JOBDETAILS_RESET,
  POST_ACTIVITY_CHAT_RESET,
} from "../../constants/activity-constants";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { useDropzone } from "react-dropzone";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";
import Rating from "@mui/material/Rating";

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

export default function Member_Activity(props) {
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const refMapData = useRef(null);

  const [filter, setFilter] = useState(null);

  const [approvalDetailsDialog, setApprovalDetailsDialog] = useState();

  const [chatbox, setChatbox] = useState("");
  const [attachfiles, setAttachfiles] = useState([]);

  // const [submitjobopen, setSubmitjobopen] = useState(false);

  const [errors, setErrors] = useState({ chatboxOrFile: null });
  const [dataText, setDataText] = useState("");

  const [invitedUsersMap, setInvitedUsersMap] = useState([]);

  const [orderName, setOrderName] = useState("Oldest Activity First");
  const [orderValue, setOrderValue] = useState("created");

  const {
    memberActivityDetails,
    success: memberActivityDetailsSuccess,
    loading: memberActivityLoading,
  } = useSelector((state) => state.memberActivityReducer);

  const { success: successPost, loading: postActivityLoading } = useSelector(
    (state) => state.postActivityReducer
  );

  const { userData } = useSelector((state) => state.authReducer);
  const { memberJobDetails, success: successMemberJobDetails } = useSelector(
    (state) => state.getMemberJobDetailsReducer
  );

  const {
    success: approveSuccess,
    memberApprove,
    error: approveError,
  } = useSelector((state) => state.MemberViewApproveReducer);

  const {
    memberCompanyAdmin,
    agecyIdCompany,
    agecyNameCompany,
    success: successCompanyList,
  } = useSelector((state) => state.memberAdminCompanyListReducer);

  const {
    success: inviteUsersListSuccess,
    invitedUsers,
    error: inviteUsersListError,
    loading: inviteUsersListLoading,
  } = useSelector((state) => state.getInvitedUsersListReducer);

  useEffect(() => {
    dispatch({ type: MEMBER_ACTIVITY_RESET });
    dispatch({ type: POST_ACTIVITY_CHAT_RESET });
    dispatch({ type: INVITED_USERS_LIST_RESET });
    if (filter) {
      dispatch(getMemberActivityDetails(jobId, orderValue, filter));
    } else {
      dispatch(getMemberActivityDetails(jobId, orderValue));
    }
    dispatch(getInvitedUsersList(jobId));
  }, [successPost, approveSuccess, orderValue, filter]);

  useEffect(() => {
    dispatch({ type: MEMEBER_JOBDETAILS_RESET });

    dispatch(getMemberJobDetailsAction(jobId, userData?.user?.user_id));
  }, [approveSuccess]);

  useEffect(() => {
    setChatbox("");
    setAttachfiles([]);
  }, [successPost]);

  useEffect(() => {
    if (invitedUsers) {
      const unique = [
        ...new Map(invitedUsers.map((item) => [item["user"], item])).values(),
      ];
      setInvitedUsersMap(unique);
    }
  }, [inviteUsersListSuccess]);

  useEffect(() => {
    dispatch(memberAdminCompanyListAction());
  }, []);

  useEffect(() => {
    refMapData.current = memberJobDetails;
  }, [memberJobDetails, approveSuccess]);

  const handleApprovalData = (approvalId) => {
    const filterData = memberJobDetails?.filter(
      (item) => item.id === approvalId
    );
    refMapData.current = filterData;
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
      return;
    }

    const formData = new FormData();

    formData.append("job", jobId);
    formData.append("activity_status", 1);
    formData.append("activity_job_chat[0]sender", agecyIdCompany);

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

  const handleRejectMemeber = (id) => {
    dispatch(MemberViewApproveAction(id, { status: 2, message: dataText }));
    setDataText("");
    props.handleCloseSubmit();
    props.handleCloseMultipleSubmit();
    props.handleCloseMultipleSubmit1();
    swal({
      title: "Successfully Complete",
      text: "Job requested for edit!",
      className: "successAlert",
      icon: "/img/logonew.svg",
      buttons: false,
      timer: 3000,
    });
  };
  const handleApproveMemeber = (id) => {
    dispatch(MemberViewApproveAction(id, { status: 1, message: dataText }));
    setDataText("");
    props.handleCloseSubmit();
    props.handleCloseMultipleSubmit();
    props.handleCloseMultipleSubmit1();
    swal({
      title: "Successfully Complete",
      text: "Job successfully approved!",
      className: "successAlert",
      icon: "/img/logonew.svg",
      buttons: false,
      timer: 3000,
    });
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

  return (
    <>
      {memberActivityLoading ||
        postActivityLoading ||
        inviteUsersListLoading ? (
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
            {memberActivityDetails &&
              memberActivityDetails?.map((activity, index) => (
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
                          {memberActivityDetails?.length !== index + 1 && (
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
                              {moment(props.jobCreatedAt).format(
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
                        {memberActivityDetails?.length !== index + 1 && (
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
                        {memberActivityDetails?.length !== index + 1 && (
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
                          {memberActivityDetails?.length !== index + 1 && (
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
                              {moment(activity.created).format(
                                "MMMM D, h:mm A"
                              )}
                            </label>
                          </h3>
                        </div>
                      </div>
                    )}

                  {/* ------------------------- JOB CHAT ------------------------- */}
                  {/* {activity?.activity_type === 1 &&
                    activity?.activity_status === 0 && (
                      <>
                        <div className="andersonBrown">
                          {/* <h3>Rachel Anderson</h3>
                          <h3>{activity?.user_full_name?.user_name}</h3>
                          <h3 className="rachelRejectSecLine">
                               4:5 is correct, but is this low-res?
                            Something doesn’t look right.
                          </h3>
                        </div>
                        <div className="rachelBadLine">

                          <h3>My bad, I exported at 1x. Here you go at 2x</h3>
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
                                {moment(activity?.created).format(
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
                        {memberActivityDetails?.length !== index + 1 && (
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
                          {memberActivityDetails?.length !== index + 1 && (
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
                            activity?.user_full_name.id ? (
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
                    activity?.activity_status === 1 && (
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
                        {memberActivityDetails?.length !== index + 1 && (
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
                          {memberActivityDetails?.length !== index + 1 && (
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
                          {memberActivityDetails?.length !== index + 1 && (
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
                              activity?.activity_job_work[0]?.approver_message
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
                        {memberActivityDetails?.length !== index + 1 && (
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
            {memberJobDetails?.length > 0 &&
              memberJobDetails?.length <= 1 &&
              userData?.user?.user_level != 2 && (
                <div className="submitjobApprovelPopup">
                  <button
                    onClick={props.handleOpenSubmit}
                    className="approveViewButtonBlue"
                  >
                    View Approval
                  </button>
                </div>
              )}

            {memberJobDetails?.length > 1 &&
              userData?.user?.user_level != 2 && (
                <div className="submitjobApprovelPopup">
                  <button
                    onClick={props.handleOpenMultipleSubmit1}
                    className="approveViewButtonBlue"
                  >
                    View Approval
                  </button>
                </div>
              )}

            {/* -----------------------------Single approval------------------------------ */}
            <Dialog
              className="profileImgDialogagencyApprovel"
              open={props.submitjobopen}
              onClose={props.handleCloseSubmit}
            >
              {refMapData?.current?.map((imagess, index) => (
                <>
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2>View Job Approval - {props?.jobName}</h2>

                      <span
                        className="closebuttonsec"
                        onClick={props.handleCloseSubmit}
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

                            {/* <p className="approvelForTask">
                              This approval is for task:
                              <span className="DimensionsSpan">
                                {" "}
                                16:9 Dimensions
                              </span>
                            </p> */}
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    )}
                    {Object.keys(imagess?.job_work?.task_details)?.length >
                      0 ? (
                      <>
                        <p
                          style={{ marginLeft: "25px" }}
                          className="approvelForTask"
                        >
                          User:
                          <span className="DimensionsSpan">
                            {" "}
                            {imagess?.job_work?.user_details?.user_name}
                            {/* 16:9 Dimensions */}
                          </span>
                        </p>
                        <p
                          style={{ marginLeft: "25px" }}
                          className="approvelForTask"
                        >
                          This approval is for task:
                          <span className="DimensionsSpan">
                            {" "}
                            {imagess?.job_work?.task_details?.title}
                            {/* 16:9 Dimensions */}
                          </span>
                        </p>
                      </>
                    ) : (
                      <p
                        style={{ marginLeft: "25px" }}
                        className="approvelForTask"
                      >
                        This approval is for task:
                        <span className="DimensionsSpan">
                          {" "}
                          Entire Job
                          {/* 16:9 Dimensions */}
                        </span>
                      </p>
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
            </Dialog>
            {/* -----------------------------Single approval------------------------------ */}

            {/* -----------------------------Multiple approvals------------------------------ */}
            <Dialog
              className="multipleDialogActivityApproval"
              open={props.submitjobMultipleopen1}
              onClose={props.handleCloseMultipleSubmit1}
            >
              <DialogTitle>
                <div className="divMultipleDialogApproval">
                  <h2>Select an approval</h2>

                  <span
                    className="spanMultipleDialogApproval"
                    onClick={props.handleCloseMultipleSubmit1}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </DialogTitle>

              <DialogContent>
                {memberJobDetails?.map((imagess, index) => (
                  <>
                    <ListItem button>
                      <ListItemAvatar>
                        {imagess?.job_work?.user_details?.user_pic ? (
                          <img
                            style={{ width: "50px" }}
                            src={imagess?.job_work?.user_details?.user_pic}
                          />
                        ) : (
                          <img
                            style={{ width: "50px" }}
                            src="/img/avataruser.png"
                            alt=""
                          />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        onClick={() => {
                          props.handleCloseMultipleSubmit1();
                          props.handleOpenMultipleSubmit();
                          handleApprovalData(imagess.id);
                        }}
                      >
                        {imagess?.job_work?.user_details?.user_name}{" "}
                        {imagess?.job_work?.task_details?.title
                          ? `('${imagess?.job_work?.task_details?.title}' task)`
                          : `(Entire Job)`}
                      </ListItemText>
                    </ListItem>
                  </>
                ))}
              </DialogContent>
            </Dialog>

            <Dialog
              className="profileImgDialogagencyApprovel"
              open={props.submitjobMultipleopen}
              onClose={props.handleCloseMultipleSubmit}
            >
              {refMapData?.current?.map((imagess, index) => (
                <>
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2>View Job Approval - {props?.jobName}</h2>

                      <span
                        className="closebuttonsec"
                        onClick={props.handleCloseMultipleSubmit}
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
                          </div>
                        </Carousel.Item>
                      </Carousel>
                    )}
                    {Object.keys(imagess?.job_work?.task_details)?.length >
                      0 ? (
                      <>
                        <p
                          style={{ marginLeft: "25px" }}
                          className="approvelForTask"
                        >
                          User:
                          <span className="DimensionsSpan">
                            {" "}
                            {imagess?.job_work?.user_details?.user_name}
                            {/* 16:9 Dimensions */}
                          </span>
                        </p>
                        <p
                          style={{ marginLeft: "25px" }}
                          className="approvelForTask"
                        >
                          This approval is for task:
                          <span className="DimensionsSpan">
                            {" "}
                            {imagess?.job_work?.task_details?.title}
                            {/* 16:9 Dimensions */}
                          </span>
                        </p>
                      </>
                    ) : (
                      <p
                        style={{ marginLeft: "25px" }}
                        className="approvelForTask"
                      >
                        This approval is for task:
                        <span className="DimensionsSpan">
                          {" "}
                          Entire Job
                          {/* 16:9 Dimensions */}
                        </span>
                      </p>
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
            </Dialog>
            {/* -----------------------------Multiple approvals------------------------------ */}

            <div className="attachAssertspopDivfirst">
              <aside style={thumbsContainer}>{thumbs1}</aside>
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
      )}
    </>
  );
}
