import React, { useEffect, useState } from "react";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import $ from "jquery";
import { getMemberApprovalJobList } from "../../redux/actions/activity-member-actions";
import { MEMBER_APPROVAL_JOBLIST_RESET } from "../../constants/activity-constants";
import Member_dashboard_in_review from "./Member-dashboard-in-review";
import Member_dashboard_in_progress from "./Member-dashboard-in-progress";
import Member_Dashboard_Admin_In_Review from "./Member-Dashboard-Admin-In-Review";
import Member_Dashboard_Admin_In_Progress from "./Member-Dashboard-Admin_In-Progress";
import { FreshJobs } from "../../redux/actions/job-actions";

export default function AgencyMemberDashboard() {
  const dispatch = useDispatch();

  const [userLevel, setUserLevel] = useState();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();

  const [showBlueBox, setShowBlueBox] = useState(true);
  const [open, setOpen] = React.useState(false);

  const { userData } = useSelector((state) => state.authReducer);

  const {
    loading: memberApprovalJobListLoading,
    memberApprovalJobList: memberApprovalJobList,
    count,
    success: memberApprovalJobListSuccess,
  } = useSelector((state) => state.getMemberApprovalJobListReducer);

  const { freshJob, message: freshJobMessage } = useSelector(
    (state) => state.freshJobsListReducer
  );


  useEffect(() => {
    dispatch(FreshJobs());
  }, []);

  const openPopup = async (item_id) => {
  };

  const handleClick = () => {
    $(".fresh_job_section_close");
    $(".fresh_job_section").toggle(400);
  };

  useEffect(() => {
    dispatch({ type: MEMBER_APPROVAL_JOBLIST_RESET });
    if (userData?.user?.user_level === 3) {
      dispatch(getMemberApprovalJobList(currentPage));
    }
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userData?.user?.user_level === 1) {
      setUserLevel("Admin");
    } else if (userData?.user?.user_level === 2) {
      setUserLevel("Marketer");
    } else if (userData?.user?.user_level === 3) {
      setUserLevel("Approver");
    }
    setUserFirstName(userData?.user?.first_name);
    setUserLastName(userData?.user?.last_name);
  }, []);

  useEffect(() => {
    if (memberApprovalJobList) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [memberApprovalJobList]);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  return (
    <>
      {isLoading || memberApprovalJobListLoading ? (
        <LoadingSpinner />
      ) : (
        <>
            {userData?.user?.user_level === 4 ? (
            showBlueBox ? (
              <>
                <div className="Topallpage bak_h">
                  <div className="ContentDiv TopM fresh_job_section">
                    <div className="FreshTitl">
                      <div className="JobsDashborad">
                        <h1>
                          Newly Assign Job{" "}
                          <span>
                            <Link className="seeMore" to="/jobs/list">
                              See More
                            </Link>
                          </span>
                        </h1>
                      </div>
                      <div className="closeBtndasboard">
                        <img
                          disabled={!showBlueBox}
                          onClick={handleClick}
                          src="img/close.png"
                        />
                      </div>
                    </div>
                    <>
                      {freshJobMessage == "No jobs to show" ? (
                        <h2 className="nojob"> No Latest Job Found</h2>
                      ) : (
                        <div
                          className="FreshJobTop"
                          // onClick={() => openPopup(`${freshJob?.id}`)}
                        >
                          <div className="Remotemarkeitng">
                            <div className="bt-Title">
                              <div className="dashboardtoptitl">
                              <Link to={`/jobs/details/${freshJob[0]?.id}`}>
                                  <h2>{freshJob[0]?.title}</h2>
                                </Link>
                              </div>
                            </div>
                            <div className="jobListDetailsAreaAndTaskbox">
                              <div className="RemoteText RemoteTextEightyWidth">
                                <p
                                  className="PostedDate"
                                  onClick={() => openPopup(`${freshJob?.id}`)}
                                >
                                  Posted on:{" "}
                                  {moment(freshJob[0]?.created).format(
                                    "yyyy-MM-DD"
                                  )}
                                </p>
                                <p
                                  className="jobdescr"
                                  onClick={() => openPopup(`${freshJob?.id}`)}
                                >
                                  {freshJob[0]?.description?.substring(0, 300)}
                                  .....
                                </p>
                                {freshJob[0]?.price && (
                                  <>
                                    <div
                                      className="Budget-Title Skilldashbordnew"
                                      onClick={() =>
                                        openPopup(`${freshJob?.id}`)
                                      }
                                    >
                                      <li>
                                        <h5>Budget:</h5>
                                      </li>
                                      <li>
                                        <h5>${freshJob[0]?.price}</h5>

                                        {/* {!freshJob[0]?.price && (
                                <>
                                  <h3 className="colorOnNA">N/A</h3>
                                </>
                              )} */}
                                      </li>
                                    </div>
                                  </>
                                )}
                                {freshJob[0]?.level?.level_name && (
                                  <>
                                    <div
                                      className="Budget-Title  Skilldashbordnew"
                                      onClick={() =>
                                        openPopup(`${freshJob[0]?.id}`)
                                      }
                                    >
                                      <li>
                                        <h5>Level:</h5>
                                      </li>
                                      <li>
                                        <h5>
                                          {freshJob[0]?.level?.level_name}
                                        </h5>
                                      </li>
                                    </div>
                                  </>
                                )}
                                {freshJob[0]?.skills?.length > 0 && (
                                  <>
                                    <div className="Skill mt-2 Skilldashbordnew">
                                      <li>
                                        <h5>Skills:</h5>
                                      </li>
                                      {freshJob[0]?.skills?.map(
                                        (freshJob, index) => (
                                          <li key={index}>
                                            <Link to="#">
                                              {freshJob?.skill_name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </div>
                                  </>
                                )}

                                <div
                                  className="Skill mt-2 Skilldashbordnew"
                                  onClick={() => openPopup(`${freshJob?.id}`)}
                                >
                                  {freshJob[0]?.tags?.length > 0 && (
                                    <>
                                      <li>
                                        <h5>Tags:</h5>
                                      </li>
                                      {freshJob[0]?.tags
                                        ?.split(",")
                                        .map((tag, index) => (
                                          <li key={index}>
                                            <Link to="#">{tag}</Link>
                                          </li>
                                        ))}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                </div>
              </>
            ) : null
          ) : (
            <div className="Topallpage Memberdasboardtitle">
              <div className="ContentDiv TopM">
                <h1 className="WelcomeTitle">
                  Welcome {userFirstName} {userLastName}
                  <br />
                  {/* {userData?.user?.user_level === 4 ? (
                  <>In-house User</>
                ) : ( */}
                  <>Permission Level - {userLevel}</>
                  {/* )} */}
                  <br />
                </h1>
              </div>
            </div>
          )}
          <div className=" FreshJobTop">
            {memberApprovalJobList?.length > 0 &&
              userData?.user?.user_level === 3 &&
              memberApprovalJobList?.map((item, index) => (
                <div className="Remotemarkeitng" key={index}>
                  <div className="bt-Title">
                    <div className="joblistTop">
                      <Link to={`/jobs/details/${item.id}`}>
                        <div className="expdiv expdivMemberDash">
                          <h2>
                            {item.title.length > 50
                              ? item.title.substring(0, 50) + "..."
                              : item.title}
                          </h2>
                          {/* {item.is_expire && (
                            <p className="expire expirebak">Expired</p>
                          )} */}
                          {/* {item?.is_active == false && (
                            <>
                              <p className="expire">Closed</p>
                            </>
                          )} */}
                          {/* {item?.is_active && item.is_expire == false && (
                            <>
                              <p className="expire open">Open</p>
                            </>
                          )} */}
                          <p className="openappro">Waiting Approval</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="jobListDetailsAreaAndTaskbox">
                    <div className="RemoteText RemoteTextEightyWidth">
                      <p className="PostedDate">
                        Posted on: {moment(item?.created).format("yyyy-MM-DD")}
                      </p>
                      <div className="PostedDesc">
                        {item.description?.length > 200
                          ? item.description.substring(0, 200) + "..."
                          : item.description}
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Budget:</h5>
                        </li>
                        <li>
                          <h5>${item.price ? item.price : "N/A"}</h5>
                        </li>
                      </div>
                      <div className="Budget-Title">
                        <li>
                          <h5>Level:</h5>
                        </li>
                        <li>
                          <h5>
                            {item?.level ? item?.level?.level_name : "N/A"}
                          </h5>
                        </li>
                      </div>
                      <div className="Skill mt-4">
                        <li>
                          <h5>Skills:</h5>
                        </li>
                        {item?.skills?.length > 0 &&
                          item?.skills?.map((skill, index) => (
                            <li key={index}>
                              <Link to="#">{skill.skill_name}</Link>
                            </li>
                          ))}
                        {item?.skills?.length < 1 && (
                          <>
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          </>
                        )}
                      </div>
                      <div className="Skill mt-4 ">
                        <li>
                          <h5>Tags:</h5>
                        </li>
                        {item.tags?.length > 0 &&
                          item.tags?.split(",").map((tag, index) => (
                            <li key={index}>
                              <Link to="#">{tag}</Link>
                            </li>
                          ))}

                        {item.tags?.length < 1 && (
                          <>
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          </>
                        )}
                      </div>
                      <div className="ApplyButton_2">
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                    {item?.jobtasks_job?.length > 0 && (
                      <div className="taskBoxJobListCard">
                        <div className="taskBoxJobListCardFirstHead">
                          <div className="taskBoxJobListCardFirstNoBg">
                            <h3 className="taskMember1">Task</h3>
                            <h3 className="taskMemberd2">Date</h3>
                          </div>
                          <div className="taskBoxJobListCardDetailsDate1">
                            {item?.jobtasks_job?.map((task) => {
                              return (
                                <>
                                  <div className="tasksecdiv1">
                                    <div className="tasktitlesec1">
                                      {task?.title}
                                    </div>
                                    <div className="tasktitlesec2">
                                      {task?.due_date}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            {pages > 1 && (
              <div className="adminjobpagination">
                <Stack spacing={2}>
                  <Pagination
                    page={currentPage}
                    shape="rounded"
                    size="large"
                    count={pages}
                    onChange={(e, page) => {
                      pageHandler(page);
                    }}
                    color="primary"
                  />
                </Stack>
              </div>
            )}
            {!memberApprovalJobList?.length &&
              userData?.user?.user_level === 3 && (
                <div className="Topallpage Custompage">
                  <h2 className="nonew">NO MORE APPROVALS TO DISPLAY</h2>
                </div>
              )}
          </div>

          {userData?.user?.user_level === 4 && (
            <div className="AllPageHight">
              <div className="Topallpage_sec">
                <div className="InProgress-4 creatordashbordtab">
                  <div className="Work-D">
                    <div className="inProgressDashboardComponent">
                      <Member_dashboard_in_review />
                    </div>
                    <div className="inReviewDashboardComponent">
                      <Member_dashboard_in_progress />
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          )}
          {(userData?.user?.user_level === 1 ||
            userData?.user?.user_level === 2) && (
            <div className="AllPageHight">
              <div className="Topallpage_sec">
                <div className="InProgress-4 creatordashbordtab">
                  <div className="Work-D">
                    <div className="inProgressDashboardComponent">
                      <Member_Dashboard_Admin_In_Review />
                    </div>
                    <div className="inReviewDashboardComponent">
                      <Member_Dashboard_Admin_In_Progress />
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
