import React, { useState } from "react";
import MemberDasboardInReview from "./memberDashboard/MemberDasboardInReview";
import MemeberDashBoardInProgress from "./memberDashboard/MemeberDashBoardInProgress";
import { Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_DATA } from "redux/reducers/auth/auth.slice";
import { useSingleEffect, useUpdateEffect } from "react-haiku";
import {
  GET_MEMEBERS_APPROVAL_JOBLIST,
  GET_MEMEBERS_FRESHERS_JOBLIST,
  GET_MEMEBERS_FRESHERS_LATEST_JOBLIST,
} from "redux/actions/homePage/adminHomePage.actions";
import { FRESHERS_JOBS_DATA } from "redux/reducers/homePage/fresherJobsList.slice";
import {
  CLEAR_MEMBERS_APPROVAL_JOBS,
  MEMBERS_APPROVAL_JOBS_DATA,
} from "redux/reducers/homePage/membersApprovalJobsList.slice";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";

const AgencyMemberDashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(GET_USER_DATA);
  const freshJob = useAppSelector(FRESHERS_JOBS_DATA);
  const memberApprovalJobList = useAppSelector(MEMBERS_APPROVAL_JOBS_DATA);

  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);

  const [showBlueBox, setShowBlueBox] = useState(true);
  const handleClick = () => {
    // $(".fresh_job_section_close");
    // $(".fresh_job_section").toggle(400);
  };

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const openPopup = async (item_id) => {};

  useSingleEffect(() => {
    const data = {
      // id: headerCompany ?? "",
      status: "2",
      page: 1,
      ordering: currentPage,
    };
    dispatch(GET_MEMEBERS_APPROVAL_JOBLIST(data));
    if (userData?.data?.user?.user_level === 4) {
      dispatch(GET_MEMEBERS_FRESHERS_JOBLIST());
    } else {
      dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
    }
  });

  useUpdateEffect(() => {
    dispatch(CLEAR_MEMBERS_APPROVAL_JOBS);
    if (userData?.data?.user?.user_level === 3) {
      dispatch(GET_MEMEBERS_APPROVAL_JOBLIST(currentPage));
    }
  }, [currentPage]);
  useUpdateEffect(() => {
    if (userData?.data?.user?.user_level === 4) {
      dispatch(GET_MEMEBERS_FRESHERS_JOBLIST());
    } else {
      dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
    }
  }, []);
  console.log("freshJob", freshJob?.data?.data);
  return (
    <div>
      <>
        {userData?.data?.user?.user_level ? (
          // !showBlueBox ? (
          <>
            <div className="Topallpage bak_h">
              <div className="ContentDiv TopM fresh_job_section">
                <div className="FreshTitl">
                  <div className="p-5 text-center font-bold text-2xl">
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
                      // disabled={!showBlueBox}
                      onClick={handleClick}
                      src="img/close.png"
                    />
                  </div>
                </div>
                <>
                  {freshJob?.freshJobMessage == "No jobs to show" ? (
                    <h2 className="nojob"> No Latest Job Found</h2>
                  ) : (
                    <div
                      className="FreshJobTop ss"
                      onClick={() => openPopup(`${freshJob?.data?.data?.id}`)}
                    >
                      <div className="p-5">
                        <div className="">
                          <Link
                            to={`/jobs/details/${freshJob?.data?.data?.id}`}
                          >
                            <h2 className="text-base font-semibold">
                              {freshJob?.data?.data?.title}
                            </h2>
                          </Link>
                        </div>
                        <div className="jobListDetailsAreaAndTaskbox">
                          <div className="RemoteText RemoteTextEightyWidth">
                            <p
                              className="text-base font-semibold"
                              onClick={() =>
                                openPopup(`${freshJob?.data?.data?.id}`)
                              }
                            >
                              Posted on:{" "}
                              {formateISODateToLocaleString(
                                freshJob?.data?.data?.created
                              )}
                            </p>
                            <p
                              className="jobdescr"
                              onClick={() =>
                                openPopup(`${freshJob?.data?.data?.id}`)
                              }
                            >
                              {freshJob?.data?.data?.description?.substring(
                                0,
                                300
                              )}
                              .....
                            </p>
                            {freshJob?.data?.data?.price && (
                              <>
                                <div
                                  className="Budget-Title Skilldashbordnew"
                                  onClick={() =>
                                    openPopup(`${freshJob?.data?.id}`)
                                  }
                                >
                                  <li>
                                    <span className="flex gap-2 text-base font-semibold">
                                      Budget:{" "}
                                      <h5 className="text-base font-medium">
                                        ${freshJob?.data?.data?.price}
                                      </h5>
                                    </span>
                                  </li>
                                  {/* <li>
                                <h5>${freshJob?.data?.data?.price}</h5>

                                {!freshJob[0]?.price && (
                                  <>
                                    <h3 className="colorOnNA">N/A</h3>
                                  </>
                                )}
                              </li> */}
                                </div>
                              </>
                            )}
                            {freshJob?.data?.data?.level?.level_name && (
                              <>
                                <div
                                  className="Budget-Title  Skilldashbordnew"
                                  onClick={() =>
                                    openPopup(`${freshJob?.data?.data?.id}`)
                                  }
                                >
                                  <li>
                                    <span className="flex gap-2 text-base font-semibold">
                                      Level:{" "}
                                      <h5 className="text-base font-medium">
                                        {
                                          freshJob?.data?.data?.level
                                            ?.level_name
                                        }
                                      </h5>
                                    </span>
                                  </li>
                                </div>
                              </>
                            )}
                            {freshJob?.data?.data?.skills?.length > 0 && (
                              <>
                                <div className="Skill mt-2 Skilldashbordnew">
                                  <li>
                                    <span className="text-base font-semibold">
                                      Skills:{" "}
                                      {freshJob?.data?.data?.skills?.map(
                                        (freshJob, index) => (
                                          <li
                                            key={index}
                                            className="font-medium pl-10"
                                          >
                                            <Link to="#">
                                              {freshJob?.skill_name}
                                            </Link>
                                          </li>
                                        )
                                      )}
                                    </span>
                                  </li>
                                </div>
                              </>
                            )}

                            <div
                              className="Skill mt-2 Skilldashbordnew"
                              onClick={() => openPopup(`${freshJob?.data?.id}`)}
                            >
                              {freshJob?.data?.data?.tags?.length > 0 && (
                                <>
                                  <li>
                                    <span className="text-base font-semibold">
                                      Tags:{" "}
                                      {freshJob?.data?.data?.tags
                                        ?.split(",")
                                        .map((tag, index) => (
                                          <li
                                            key={index}
                                            className="font-medium pl-10"
                                          >
                                            <Link to="#">{tag}</Link>
                                          </li>
                                        ))}
                                    </span>
                                  </li>
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
        ) : (
          // ) : null
          <div className="p-10">
            <div className="bg-white rounded-xl mb-5">
              <h1 className="p-5 text-center font-bold text-2xl">
                Welcome {userFirstName} {userLastName}
                <br />
                {/* {userData?.user?.user_level === 4 ? (
        <>In-house User</>
      ) : ( */}
                <>Permission Level - {userData?.data?.user?.user_level}</>
                {/* )} */}
                <br />
              </h1>
            </div>
          </div>
        )}
        <div className=" FreshJobTop">
          {memberApprovalJobList?.data?.length > 0 &&
            userData?.data?.user?.user_level === 3 &&
            memberApprovalJobList?.data?.map((item, index) => (
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

                        <p className="openappro">Waiting Approval</p>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="jobListDetailsAreaAndTaskbox">
                  <div className="RemoteText RemoteTextEightyWidth">
                    <p className="PostedDate">
                      Posted on: {formateISODateToLocaleString(item?.created)}
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
                        <h5>{item?.level ? item?.level?.level_name : "N/A"}</h5>
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
          {memberApprovalJobList?.data?.length < 0 &&
            userData?.data?.user?.user_level === 3 && (
              <div className="Topallpage Custompage">
                <h2 className="nonew">NO MORE APPROVALS TO DISPLAY</h2>
              </div>
            )}
        </div>

        {userData?.data?.user?.user_level === 4 && (
          <div className="AllPageHight">
            <div className="Topallpage_sec">
              <div className="Work-D  grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="inProgressDashboardComponent">
                  <MemberDasboardInReview />
                </div>
                <div className="inReviewDashboardComponent">
                  <MemeberDashBoardInProgress />
                </div>{" "}
              </div>
            </div>
          </div>
        )}
        {(userData?.data?.user?.user_level === 1 ||
          userData?.data?.user?.user_level === 2) && (
          <div className="AllPageHight">
            <div className="Topallpage_sec">
              <div className="Work-D grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                <div className="inProgressDashboardComponent">
                  <MemberDasboardInReview />
                </div>
                <div className="inReviewDashboardComponent">
                  <MemeberDashBoardInProgress />
                </div>{" "}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default AgencyMemberDashboard;
