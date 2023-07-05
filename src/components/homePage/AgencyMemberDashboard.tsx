import React, { useState } from "react";
import MemberDasboardInReview from "./memberDashboard/MemberDasboardInReview";
import MemeberDashBoardInProgress from "./memberDashboard/MemeberDashBoardInProgress";
import { Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

import { FRESHERS_JOBS_DATA } from "redux/reducers/jobs/fresherJobsList.slice";
import {
  CLEAR_MEMBERS_APPROVAL_JOBS,
  MEMBERS_APPROVAL_JOBS_DATA,
} from "redux/reducers/jobs/membersApprovalJobsList.slice";
import { formateISODateToLocaleString } from "helper/utility/customFunctions";
import {
  GET_MEMEBERS_APPROVAL_JOBLIST,
  GET_MEMEBERS_FRESHERS_JOBLIST,
  GET_MEMEBERS_FRESHERS_LATEST_JOBLIST,
} from "redux/actions/jobs/jobs.actions";
import { API_URL } from "helper/env";
import BadgeUI from "components/common/badge/BadgeUI";
import { ROLES } from "helper/config";

const AgencyMemberDashboard = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(GET_USER_PROFILE_DATA);
  const freshJob = useAppSelector(FRESHERS_JOBS_DATA);
  const memberApprovalJobList = useAppSelector(MEMBERS_APPROVAL_JOBS_DATA);

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userLevel, setUserLevel] = useState("");

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

  const openPopup = async (item_id) => { };

  useSingleEffect(() => {
    window.scrollTo(0, 0);
    if (userData?.data?.user_level === 1) {
      setUserLevel("Admin");
    } else if (userData?.data?.user_level === 2) {
      setUserLevel("Marketer");
    } else if (userData?.data?.user_level === 3) {
      setUserLevel("Approver");
    }
    setUserFirstName(userData?.data?.first_name);
    setUserLastName(userData?.data?.last_name);
    const data = {
      // id: headerCompany ?? "",
      status: "2",
      page: 1,
      ordering: currentPage,
    };

    if (userData?.data?.user_level === 3) {
      dispatch(GET_MEMEBERS_APPROVAL_JOBLIST(data));
    } else {
      dispatch(
        GET_MEMEBERS_FRESHERS_LATEST_JOBLIST(
          userData?.data?.user_level === 4
            ? `${API_URL.JOBS.MEMBERS_LATEST_JOBS}`
            : `${API_URL.JOBS.LATEST_JOBS}`
        )
      );
    }
  });

  useUpdateEffect(() => {
    dispatch(CLEAR_MEMBERS_APPROVAL_JOBS);
    if (userData?.data?.user_level === 3) {
      dispatch(GET_MEMEBERS_APPROVAL_JOBLIST(currentPage));
    }
  }, [currentPage]);

  useUpdateEffect(() => {
    window.scrollTo(0, 0);
    if (userData?.data?.user_level === 1) {
      setUserLevel("Admin");
    } else if (userData?.data?.user_level === 2) {
      setUserLevel("Marketer");
    } else if (userData?.data?.user_level === 3) {
      setUserLevel("Approver");
    }
    setUserFirstName(userData?.data?.first_name);
    setUserLastName(userData?.data?.last_name);
  }, []);

  useUpdateEffect(() => {
    // if (memberApprovalJobList) {
    //   let numberPages = Math.ceil(memberApprovalJobList?.count / 6);
    //   setPages(numberPages);
    // }
  }, [memberApprovalJobList?.data?.count]);

  // useUpdateEffect(() => {
  //   if (userData?.data?.user?.user_level === 4) {
  //     dispatch(GET_MEMEBERS_FRESHERS_JOBLIST());
  //   } else {
  //     dispatch(GET_MEMEBERS_FRESHERS_LATEST_JOBLIST());
  //   }
  // }, []);
  console.log("freshJob", freshJob?.data?.data);
  return (
    <div>
      <>
        {userData?.data?.user_level === 4 ? (
          // !showBlueBox ? (
          <>
            <div className="">
              <div className="">
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
                        <Link to={`/jobs/details/${freshJob?.data?.data?.id}`}>
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
                                      {freshJob?.data?.data?.level?.level_name}
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
          </>
        ) : (
          // ) : null
          <>
            <div className="bg-white rounded-xl mb-5">
              <h1 className="p-5 text-center font-bold text-2xl">
                Welcome {userFirstName} {userLastName}
                <br />
                {/* {userData?.user?.user_level === 4 ? (
        <>In-house User</>
      ) : ( */}
                {/* <>Permission Level - {userLevel}</> */}
                {/* )} */}
                <br />
              </h1>
            </div>
          </>
        )}
        <div className=" FreshJobTop grid grid-cols-1 gap-2">
          {memberApprovalJobList?.data?.results?.length > 0 &&
            userData?.data?.user_level === 3 &&
            memberApprovalJobList?.data?.results?.map((item, index) => (
              <div
                className="Remotemarkeitng relative w-full bg-[#fdfdfd] border border-[rgba(36_114_252_0.16)] rounded-lg p-7"
                key={index}
              >
                {/* border: 1px solid rgba(36,114,252,.16); */}
                <div className="bt-Title">
                  <div className="joblistTop">
                    <Link to={`/jobs/details/${item.id}`}>
                      <div className="expdiv expdivMemberDash flex justify-between">
                        <h2 className="text-[#000] text-2xl font-bold">
                          {item.title.length > 50
                            ? item.title.substring(0, 50) + "..."
                            : item.title}
                        </h2>

                        <p className="openappro flex justify-center p-3 border border-[#59cf65] text-[#59cf65] rounded-full">
                          Waiting Approval
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="jobListDetailsAreaAndTaskbox flex gap-2">
                  <div className="RemoteText RemoteTextEightyWidth max-w-[calc(100 - 30%)] w-full">
                    <p className="PostedDate text-[#a0a0a0] mb-1 text-base font-normal">
                      Posted on: {formateISODateToLocaleString(item?.created)}
                    </p>
                    <div className="PostedDesc mb-2">
                      {item.description?.length > 200
                        ? item.description.substring(0, 200) + "..."
                        : item.description}
                    </div>
                    <div className="Budget-Title  flex gap-2 mb-2">
                      <h5 className="font-bold">Budget:</h5>
                      <h5 className="font-bold">
                        ${item.price ? item.price : "N/A"}
                      </h5>
                    </div>
                    <div className="Budget-Title flex gap-2 mb-2">
                      <h5 className="font-bold">Level:</h5>

                      <h5 className="font-bold">
                        {item?.level ? item?.level?.level_name : "N/A"}
                      </h5>
                    </div>
                    <div className="flex gap-2 my-3 items-center">
                      <span className="text-base font-medium text-[#A0A0A0]">
                        Skills:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item?.skills?.length > 0 &&
                          item?.skills?.map((skill, index) => (
                            <BadgeUI variant="primary" key={index}>
                              {skill?.skill_name}
                            </BadgeUI>
                          ))}
                        {item?.skills?.length < 1 && (
                          <>
                            <h3 className="colorOnNA">N/A</h3>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 my-3 items-center">
                      <span className="text-base font-medium text-[#A0A0A0]">
                        Tags:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item?.tags?.length > 0 &&
                          item?.tags?.split(",")?.map((tag, index) => (
                            <BadgeUI variant="primary" key={index}>
                              {tag}
                            </BadgeUI>
                          ))}
                        {item?.tags?.length < 1 && (
                          <>
                            <h3 className="colorOnNA">N/A</h3>
                          </>
                        )}
                      </div>
                    </div>
                    {userData?.data?.role !== ROLES.MEMBER && (
                      <div className="ApplyButton_2">
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius"
                        >
                          Apply Now
                        </button>
                      </div>
                    )}
                  </div>
                  {item?.jobtasks_job?.length > 0 && (
                    <>
                      <div className="taskBoxJobListCard1 max-w-[30%] w-full ">
                        <div className="taskBoxJobListCardFirstHead p-3 border-[rgb(36_114_252_0)] rounded-lg mt-4 shadow-[1px_1px_6px_#dddddd69]">
                          <div className="grid grid-cols-2">
                            <h3 className="taskMember1 text-[#000] font-bold text-xl">
                              Task
                            </h3>
                            <h3 className="taskMemberd2 text-[#000] font-bold text-xl">
                              Date
                            </h3>
                          </div>
                          <div className="taskBoxJobListCardDetailsDate1 ">
                            {item?.jobtasks_job?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="tasksecdiv1 grid grid-cols-2 "
                                    key={index}
                                  >
                                    <div className="tasktitlesec1">
                                      {item?.title}
                                    </div>
                                    <div className="tasktitlesec2">
                                      {item?.due_date}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
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
          {memberApprovalJobList?.data?.results?.length < 0 &&
            userData?.data?.user_level === 3 && (
              <div className="Topallpage Custompage">
                <h2 className="nonew">NO MORE APPROVALS TO DISPLAY</h2>
              </div>
            )}
        </div>

        {userData?.data?.user_level === 4 && (
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
        {(userData?.data?.user_level === 1 ||
          userData?.data?.user_level === 2) && (
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
