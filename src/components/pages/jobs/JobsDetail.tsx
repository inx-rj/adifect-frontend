import React, { useEffect } from "react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleEffect, useUpdateEffect } from "react-haiku";

//import redux
import { useAppDispatch, useAppSelector } from "redux/store";
import { TAB_NAVIGATION_CONFIG } from "redux/reducers/config/tabbing/tabbing.slice";
import { GET_USER_PROFILE_DATA } from "redux/reducers/auth/auth.slice";
import { TRIGGER_NAVIGATION_TAB_CONFIG } from "redux/actions/config/tabbing/tabbing.actions";

//import helper files
import {
  JobDetailsTabHeaders,
  JobDetailsTabTitle,
} from "helper/config/tabbing";
import { ProfilePageAccess } from "helper/config/config";

//import components
import TabbingLayout from "layouts/TabbingLayout";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import {
  GET_CREATOR_AVAILABLE_DETAIL_JOB_DATA,
  GET_DETAIL_JOB_DATA,
  GET_JOB_APPLIED_DETAIL_DATA,
  GET_JOB_COMPLETED_USER,
  GET_JOB_MEMEBER_DETAIL_DATA,
  GET_JOB_SUBMIT_STATUS,
} from "redux/actions/jobs/jobs.actions";
import { GET_JOBS_DETAILS } from "redux/reducers/jobs/jobsList.slice";
import JobsDetailInfo from "./JobsDetailInfo";
import JobsActivityInfo from "./JobsActivityInfo";
import JobsDetailFiles from "./JobsDetailFiles";
import JobsProposalsDetails from "./JobsProposalsDetails";
import JobsDetailQuestionAnswer from "./JobsDetailQuestionAnswer";
import { ROLES } from "helper/config";
import {
  CREATOR_JOB_APPLIED_ID_DETAILS,
  MEMBER_VIEW_WORK_APPROVAL_DETAILS,
} from "redux/actions/jobs/jobsActivity.actions";
import { GET_JOBS_COMPLETED_USERS_DETAILS } from "redux/reducers/jobs/jobsCompletedUsers.slice";
import { GET_JOBS_SUBMIT_STATUS_DETAILS } from "redux/reducers/jobs/jobsSubmitStatus.slice";
import Creator_Activity from "./CreatorActivityInfo";
import { API_URL } from "helper/env";
import SubmitJobForApproval from "./SubmitJobForApproval";
import { SET_OPEN_SUBMIT_JOB_WORK_MODAL } from "redux/reducers/jobs/creatorActivity.slice";
import { CREATOR_JOB_APPLIED_DATA } from "redux/reducers/jobs/jobsApplied.slice";
import { GET_JOBS_WORK_APPROVAL_DETAILS } from "redux/reducers/jobs/workApproval.slice";
import ViewApproval from "./ViewApproval";

const JobsDetail = () => {
  const { jobId } = useParams();

  const dispatch = useAppDispatch();
  const currentJobData = useAppSelector(GET_JOBS_DETAILS);

  const activeUserTab = useAppSelector(TAB_NAVIGATION_CONFIG);
  const userProfile = useAppSelector(GET_USER_PROFILE_DATA);
  const creatorAppliedId = useAppSelector(CREATOR_JOB_APPLIED_DATA);

  const [contentLoad, setContentLoad] = useState<boolean>(false);
  const [submitjobopen, setSubmitjobopen] = useState(false);
  const [value, setValue] = useState("1");
  const [appliedId, setAppliedId] = useState();

  useSingleEffect(() => {
    if (userProfile?.data?.role === ROLES.CREATOR) {
      dispatch(GET_CREATOR_AVAILABLE_DETAIL_JOB_DATA(jobId));
      // To get jobpplied ID
      dispatch(CREATOR_JOB_APPLIED_ID_DETAILS(jobId));
    } else {
      dispatch(
        GET_DETAIL_JOB_DATA(
          jobId,
          userProfile?.data?.role === ROLES.MEMBER
            ? `${API_URL.JOBS.MEMBERS_JOBS_LIST}`
            : `${API_URL.JOBS.JOBS_LIST}`
        )
      );
      if (userProfile?.data?.role === ROLES.MEMBER) {
        dispatch(
          MEMBER_VIEW_WORK_APPROVAL_DETAILS(jobId, userProfile?.data?.id)
        );
      }
    }
  });

  useUpdateEffect(() => {
    setContentLoad(currentJobData?.loading);
  }, [currentJobData?.loading]);

  //set initial active tab
  useUpdateEffect(() => {
    if (userProfile.data?.role >= 0) {
      const initialActiveTab = JobDetailsTabHeaders?.find((item) =>
        item?.permission.includes(userProfile.data?.role)
      );
      dispatch(
        TRIGGER_NAVIGATION_TAB_CONFIG(
          ProfilePageAccess.JOBS,
          initialActiveTab?.name
        )
      );
    }
  }, [userProfile.data?.role, dispatch]);

  //prepare the company profile data to display on the profile
  const profileData = useMemo(() => {
    return {
      jobId: currentJobData?.details?.company_id,
      profileImg: currentJobData?.details?.company_profile_img,
      title: currentJobData?.details?.name,
      description: currentJobData?.details?.description,
      companyEmail: currentJobData?.details?.company_email,
      companyPhone: currentJobData?.details?.company_phone_number,
      companyWebsite: currentJobData?.details?.company_website,
      industry: currentJobData?.details?.industry,
      industryName: currentJobData?.details?.industry_name,
      countList: [{ title: "Total Jobs", value: 368 }],
    };
  }, [
    currentJobData?.details?.company_profile_img,
    currentJobData?.details?.name,
    currentJobData?.details?.company_id,
    currentJobData?.details?.company_email,
    currentJobData?.details?.company_phone_number,
    currentJobData?.details?.industry,
    currentJobData?.details?.industry_name,
    currentJobData?.details?.description,
    currentJobData?.details?.company_website,
  ]);

  const [submitjobMultipleopen, setSubmitjobMultipleopen] = useState(false);
  const [submitjobMultipleopen1, setSubmitjobMultipleopen1] = useState(false);

  const [userJobComplete, setUserJobComplete] = useState(false);

  // const {
  //   loading: jobLoading,
  //   success,
  //   jobDetails,
  // } = useSelector((state) => state.jobDetailsMemberReducer);

  // const { memberJobDetails } = useSelector(
  //   (state) => state.getMemberJobDetailsReducer
  // );

  // const { success: proposalSeenSuccess } = useSelector(
  //   (state) => state.proposalsSeenReducer
  // );

  const jobCompletedUsers = useAppSelector(GET_JOBS_COMPLETED_USERS_DETAILS);

  const jobSubmitStatus = useAppSelector(GET_JOBS_SUBMIT_STATUS_DETAILS);
  const workApproval = useAppSelector(GET_JOBS_WORK_APPROVAL_DETAILS);
  console.log("jobstatus ", jobSubmitStatus, userJobComplete);

  // const { not_seen_count } = useSelector(
  //   (state) => state.proposalsSeenCountReducer
  // );
  const [isUserHired, setIsUserHired] = useState(false);

  useEffect(() => {
    if (currentJobData?.details) {
      if (
        currentJobData?.details?.hired_users !== "" &&
        currentJobData?.details?.hired_users?.length > 0
      ) {
        for (
          let index = 0;
          index < currentJobData?.details?.hired_users?.length;
          index++
        ) {
          if (
            currentJobData?.details.hired_users[index].user_id ===
            userProfile.data.id
          ) {
            setIsUserHired(true);
          }
        }
      }
    } else {
      // dispatch({ type: JOB_DETAILS_CREATOR_RESET });
    }
  }, [currentJobData?.details]);

  useUpdateEffect(() => {
    if (jobCompletedUsers?.data) {
      let filterUser = jobCompletedUsers?.data?.filter(
        (item) => item.user_id === userProfile?.data?.id
      );
      if (filterUser?.length > 0) {
        setUserJobComplete(true);
      }
    }
  }, [jobCompletedUsers.success]);

  useUpdateEffect(() => {
    if (userProfile?.data?.role === ROLES.CREATOR) {
      dispatch(GET_JOB_MEMEBER_DETAIL_DATA(jobId));
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (creatorAppliedId?.data) {
      setAppliedId(creatorAppliedId?.data?.id);
      dispatch(GET_JOB_APPLIED_DETAIL_DATA(creatorAppliedId?.data?.id));
    }
  }, [creatorAppliedId?.success, creatorAppliedId?.data]);

  useUpdateEffect(() => {
    if (userProfile?.data?.user_level === 4) {
      dispatch(
        GET_JOB_SUBMIT_STATUS({ job: jobId, user: userProfile?.data?.id })
      );
      GET_JOB_SUBMIT_STATUS({ job: jobId, user: userProfile?.data?.id });

      dispatch(GET_JOB_COMPLETED_USER({ job: jobId }));

      // return () => {
      //   // dispatch({ type: MEMBER_INHOUSE_JOB_LIST_RESET });
      // };
    }
  }, []);

  useUpdateEffect(() => {
    dispatch(MEMBER_VIEW_WORK_APPROVAL_DETAILS(jobId, userProfile?.data?.id));
  }, [jobId]);

  // useUpdateEffect(() => {
  //   dispatch(proposalsSeenCount(jobId));
  // }, [proposalSeenSuccess]);

  const handleCloseSubmit = () => {
    setSubmitjobopen(false);
    dispatch(SET_OPEN_SUBMIT_JOB_WORK_MODAL(false));
  };

  const handleOpenSubmit = () => {
    if (value !== "2") {
      setValue("2");
    }
    setSubmitjobopen(true);
    // dispatch(SET_OPEN_SUBMIT_JOB_WORK_MODAL(true));
  };

  const handleCloseMultipleSubmit = () => {
    setSubmitjobMultipleopen(false);
  };

  const handleOpenMultipleSubmit = () => {
    setSubmitjobMultipleopen(true);
  };

  const handleCloseMultipleSubmit1 = () => {
    setSubmitjobMultipleopen1(false);
  };

  const handleOpenMultipleSubmit1 = () => {
    if (value !== "2") {
      setValue("2");
    }
    setSubmitjobMultipleopen1(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Suspense>
        {(userProfile?.data?.role === ROLES.CREATOR ||
          userProfile?.data?.user_level === 4) &&
          !jobSubmitStatus?.data?.Disable &&
          !userJobComplete && (
            <span className="jobAppliedJobDetailsCreator absolute top-[10px] right-[21px]">
              <button
                onClick={handleOpenSubmit}
                className="approveViewButtonBlue btn btn-primary"
              >
                Submit Job for Approval
              </button>
            </span>
          )}
        {submitjobopen && userProfile?.data?.role === ROLES.CREATOR && (
          <SubmitJobForApproval
            handleCloseSubmit={handleCloseSubmit}
            handleOpenSubmit={handleOpenSubmit}
            submitjobopen={submitjobopen}
            appliedId={appliedId}
          />
        )}
        <span className="jobAppliedJobDetailsCreator absolute top-[10px] right-[21px]">
          {userProfile?.data?.user_level !== 4 &&
            workApproval?.data?.length > 0 &&
            workApproval?.data?.length <= 1 &&
            userProfile?.data?.user_level != 2 && (
              <button
                onClick={handleOpenSubmit}
                className="approveViewButtonBlue btn btn-primary"
              >
                View Approval
              </button>
            )}
          {/* Multiple Approvals */}
          {userProfile?.data?.user_level !== 4 &&
            workApproval?.data?.length > 1 &&
            userProfile?.data?.user_level != 2 && (
              <button
                onClick={handleOpenMultipleSubmit1}
                className="approveViewButtonBlue btn btn-primary"
              >
                View Approval
              </button>
            )}

          {(submitjobMultipleopen || submitjobMultipleopen1 || submitjobopen) &&
            userProfile?.data?.role !== ROLES.CREATOR && (
              <ViewApproval
                jobName={currentJobData?.details?.title}
                handleCloseSubmit={handleCloseSubmit}
                handleOpenSubmit={handleOpenSubmit}
                submitjobopen={submitjobopen}
                setSubmitjobopen={setSubmitjobopen}
                submitjobMultipleopen={submitjobMultipleopen}
                submitjobMultipleopen1={submitjobMultipleopen1}
                handleCloseMultipleSubmit={handleCloseMultipleSubmit}
                handleOpenMultipleSubmit={handleOpenMultipleSubmit}
                handleCloseMultipleSubmit1={handleCloseMultipleSubmit1}
                handleOpenMultipleSubmit1={handleOpenMultipleSubmit1}
              />
            )}
        </span>
        <TabbingLayout
          navType={ProfilePageAccess.JOBS}
          tabData={profileData}
          tabHeadArr={JobDetailsTabHeaders}
          tabBodyTitle={activeUserTab?.job_details?.active}
          isLoading={contentLoad}
          companyInfoPage={false}
          jobsDetailsPage={true}
          currentJobData={currentJobData}
        >
          {currentJobData?.loading && (
            <div className="card border p-4 z-[1] relative min-h-[300px] [&>.spinner-container-bg]:bg-white">
              <LoadingSpinner />
            </div>
          )}

          {!currentJobData?.loading &&
            JobDetailsTabHeaders?.filter(
              (item) =>
                item?.name === activeUserTab.job_details.active &&
                item?.permission.includes(userProfile.data?.role)
            )?.map((item, index) => {
              if (
                activeUserTab?.job_details?.active ===
                JobDetailsTabTitle.ACTIVITY
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    {userProfile?.data?.role === ROLES.CREATOR ? (
                      //  || submitjobopen
                      <Creator_Activity
                        jobName={currentJobData?.details?.title}
                        jobCreatedAt={currentJobData?.details?.created}
                        jobDueDate={
                          currentJobData?.details?.expected_delivery_date
                        }
                        jobPrice={currentJobData?.details?.price}
                        isUserHired={isUserHired}
                        handleCloseSubmit={handleCloseSubmit}
                        handleOpenSubmit={handleOpenSubmit}
                        submitjobopen={submitjobopen}
                      />
                    ) : (
                      <JobsActivityInfo
                        setSubmitjobopen={setSubmitjobopen}
                        submitjobopen={submitjobopen}
                        jobName={currentJobData?.details?.title}
                        jobCreatedAt={currentJobData?.details?.created}
                        jobDueDate={
                          currentJobData?.details?.expected_delivery_date
                        }
                        jobPrice={currentJobData?.details?.price}
                        submitjobMultipleopen={submitjobMultipleopen}
                        submitjobMultipleopen1={submitjobMultipleopen1}
                        handleCloseSubmit={handleCloseSubmit}
                        handleOpenSubmit={handleOpenSubmit}
                        handleCloseMultipleSubmit={handleCloseMultipleSubmit}
                        handleOpenMultipleSubmit={handleOpenMultipleSubmit}
                        handleCloseMultipleSubmit1={handleCloseMultipleSubmit1}
                        handleOpenMultipleSubmit1={handleOpenMultipleSubmit1}
                      ></JobsActivityInfo>
                    )}
                  </Suspense>
                );
              }
              if (
                activeUserTab?.job_details?.active === JobDetailsTabTitle.FILES
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <JobsDetailFiles />
                  </Suspense>
                );
              }
              if (
                activeUserTab?.job_details?.active ===
                JobDetailsTabTitle.PROPOSALS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <JobsProposalsDetails
                      jobProposalDate={
                        currentJobData?.details?.expected_delivery_date
                      }
                      jobProposalPrice={currentJobData?.details?.price}
                      handleChangeTab={handleChange}
                      statusJob={currentJobData?.details?.is_active}
                    ></JobsProposalsDetails>
                  </Suspense>
                );
              }
              if (
                activeUserTab?.job_details?.active ===
                JobDetailsTabTitle.QUESTION_ANSWERS
              ) {
                return (
                  <Suspense fallback="" key={index}>
                    <JobsDetailQuestionAnswer
                      agencyID={
                        userProfile?.data?.role === ROLES.ADMIN &&
                        currentJobData?.details?.user
                      }
                      job_applied_id={currentJobData?.details?.job_applied_id}
                    ></JobsDetailQuestionAnswer>
                  </Suspense>
                );
              }

              return (
                <Suspense fallback={<LoadingSpinner />} key={index}>
                  <JobsDetailInfo companyData={currentJobData} />
                </Suspense>
              );
            })}
        </TabbingLayout>
      </Suspense>
    </>
  );
};

export default JobsDetail;
