import React, { useState, useEffect } from "react";

// JOB DETAILS NEW TABS
// import Agency_job_details_new from "./Agency-job-details-new";
import Creator_Activity from "./Creator-activity";
import Creator_job_detail_files from "./Creator-job-detail-files";
// import Creator_job_detail_proposal from "./Creator-job-detail-proposal";
import Creator_job_detail_ques_ans from "./Creator-job-detail-ques-ans";
import Creator_job_details_new_page from "./Creator-job-details-new-page";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getJobDetailsCreator } from "../../redux/actions/job-actions";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import {
  listAllProposals,
  proposalsSeenCount,
} from "../../redux/actions/proposals-action";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { JOB_DETAILS_CREATOR_RESET } from "../../constants/job-constants";
import {
  getJobCompletedUsers,
  getJobSubmitStatus,
} from "../../redux/actions/activity-actions";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   text: {
//     color: "pink",
//     textTransform: "capitalize",
//   },
// });

const Creator_job_details = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  // const classes = useStyles();
  const [value, setValue] = useState("1");
  const [isUserHired, setIsUserHired] = useState(false);

  const [submitjobopen, setSubmitjobopen] = useState(false);

  const [userJobComplete, setUserJobComplete] = useState(false);

  const {
    loading: jobLoading,
    success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsCreatorReducer);

  const { success: proposalSeenSuccess } = useSelector(
    (state) => state.proposalsSeenReducer
  );

  const { not_seen_count } = useSelector(
    (state) => state.proposalsSeenCountReducer
  );

  const { jobSubmitStatus, success: jobSubmitStatusSuccess } = useSelector(
    (state) => state.jobSubmitStatusReducer
  );

  const { jobCompletedUsers, success: successJobCompletedUsers } = useSelector(
    (state) => state.getJobCompletedUsersReducer
  );

  const { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    dispatch({ type: JOB_DETAILS_CREATOR_RESET });
    dispatch(getJobDetailsCreator(jobId));
    dispatch(getJobSubmitStatus({ job: jobId, user: userData.user.user_id }));

    window.scrollTo(0, 0);
  }, [value]);

  useEffect(() => {
    dispatch(proposalsSeenCount(jobId));
    dispatch(getJobCompletedUsers({ job: jobId }));
  }, [proposalSeenSuccess]);

  useEffect(() => {
    if (jobDetails) {
      if (
        jobDetails?.hired_users !== "" &&
        jobDetails?.hired_users?.length > 0
      ) {
        for (let index = 0; index < jobDetails?.hired_users?.length; index++) {
          if (jobDetails.hired_users[index].user_id === userData.user.user_id) {
            setIsUserHired(true);
          }
        }
      }
    } else {
      dispatch({ type: JOB_DETAILS_CREATOR_RESET });
    }
  }, [success]);

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

  const handleCloseSubmit = () => {
    setSubmitjobopen(false);
  };

  const handleOpenSubmit = () => {
    if (value !== "2") {
      setValue("2");
    }
    setSubmitjobopen(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imageOne = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3334 6.45967C13.3264 6.39843 13.313 6.3381 13.2934 6.27967V6.21967C13.2613 6.15113 13.2185 6.08812 13.1667 6.03301V6.03301L9.16669 2.03301C9.11158 1.98115 9.04857 1.9384 8.98002 1.90634H8.92002C8.8523 1.8675 8.7775 1.84257 8.70002 1.83301H4.66669C4.13625 1.83301 3.62755 2.04372 3.25247 2.41879C2.8774 2.79387 2.66669 3.30257 2.66669 3.83301V13.1663C2.66669 13.6968 2.8774 14.2055 3.25247 14.5806C3.62755 14.9556 4.13625 15.1663 4.66669 15.1663H11.3334C11.8638 15.1663 12.3725 14.9556 12.7476 14.5806C13.1226 14.2055 13.3334 13.6968 13.3334 13.1663V6.49967C13.3334 6.49967 13.3334 6.49967 13.3334 6.45967ZM9.33335 4.10634L11.06 5.83301H10C9.82321 5.83301 9.65364 5.76277 9.52862 5.63775C9.40359 5.51272 9.33335 5.34315 9.33335 5.16634V4.10634ZM12 13.1663C12 13.3432 11.9298 13.5127 11.8048 13.6377C11.6797 13.7628 11.5102 13.833 11.3334 13.833H4.66669C4.48988 13.833 4.32031 13.7628 4.19528 13.6377C4.07026 13.5127 4.00002 13.3432 4.00002 13.1663V3.83301C4.00002 3.6562 4.07026 3.48663 4.19528 3.3616C4.32031 3.23658 4.48988 3.16634 4.66669 3.16634H8.00002V5.16634C8.00002 5.69677 8.21073 6.20548 8.58581 6.58056C8.96088 6.95563 9.46959 7.16634 10 7.16634H12V13.1663Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageTwo = (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4.83288H10.3733C10.3269 4.82656 10.2798 4.82656 10.2333 4.83288H10.12C10.0851 4.85276 10.0517 4.87503 10.02 4.89954C9.98286 4.92405 9.94724 4.95077 9.91331 4.97954C9.89106 5.0068 9.87099 5.03578 9.85331 5.06621C9.82277 5.10821 9.79599 5.15282 9.77331 5.19954L8.70665 8.13954L5.92665 0.606209C5.87993 0.477509 5.79473 0.366311 5.68261 0.28773C5.57049 0.209148 5.43689 0.166992 5.29998 0.166992C5.16306 0.166992 5.02947 0.209148 4.91735 0.28773C4.80523 0.366311 4.72003 0.477509 4.67331 0.606209L3.13331 4.83288H0.99998C0.823169 4.83288 0.653599 4.90311 0.528575 5.02814C0.403551 5.15316 0.333313 5.32273 0.333313 5.49954C0.333313 5.67635 0.403551 5.84592 0.528575 5.97095C0.653599 6.09597 0.823169 6.16621 0.99998 6.16621H3.61331H3.76665H3.86665C3.90454 6.14797 3.94031 6.12561 3.97331 6.09954C4.01044 6.07503 4.04605 6.04832 4.07998 6.01954L4.13998 5.93288C4.17176 5.8917 4.19861 5.84696 4.21998 5.79954L5.29998 2.77954L8.07331 10.3929C8.1199 10.5217 8.20505 10.6331 8.31718 10.7118C8.42931 10.7905 8.56297 10.8328 8.69998 10.8329C8.83699 10.8328 8.97065 10.7905 9.08278 10.7118C9.19491 10.6331 9.28006 10.5217 9.32665 10.3929L10.86 6.16621H13C13.1768 6.16621 13.3464 6.09597 13.4714 5.97095C13.5964 5.84592 13.6666 5.67635 13.6666 5.49954C13.6666 5.32273 13.5964 5.15316 13.4714 5.02814C13.3464 4.90311 13.1768 4.83288 13 4.83288Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageThree = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6667 4.16701H8.48001L8.26668 3.50034C8.12838 3.10916 7.87184 2.77068 7.53261 2.53178C7.19338 2.29289 6.78825 2.16541 6.37334 2.16701H3.33334C2.80291 2.16701 2.2942 2.37772 1.91913 2.75279C1.54406 3.12787 1.33334 3.63657 1.33334 4.16701V12.8337C1.33334 13.3641 1.54406 13.8728 1.91913 14.2479C2.2942 14.623 2.80291 14.8337 3.33334 14.8337H12.6667C13.1971 14.8337 13.7058 14.623 14.0809 14.2479C14.456 13.8728 14.6667 13.3641 14.6667 12.8337V6.16701C14.6667 5.63657 14.456 5.12787 14.0809 4.75279C13.7058 4.37772 13.1971 4.16701 12.6667 4.16701ZM13.3333 12.8337C13.3333 13.0105 13.2631 13.1801 13.1381 13.3051C13.0131 13.4301 12.8435 13.5003 12.6667 13.5003H3.33334C3.15653 13.5003 2.98696 13.4301 2.86194 13.3051C2.73691 13.1801 2.66668 13.0105 2.66668 12.8337V4.16701C2.66668 3.9902 2.73691 3.82063 2.86194 3.6956C2.98696 3.57058 3.15653 3.50034 3.33334 3.50034H6.37334C6.51311 3.49998 6.64945 3.54355 6.7631 3.6249C6.87674 3.70625 6.96195 3.82126 7.00668 3.95367L7.36668 5.04701C7.4114 5.17942 7.49661 5.29443 7.61026 5.37578C7.72391 5.45713 7.86025 5.5007 8.00001 5.50034H12.6667C12.8435 5.50034 13.0131 5.57058 13.1381 5.6956C13.2631 5.82063 13.3333 5.9902 13.3333 6.16701V12.8337Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageFour = (
    <svg
      width="30"
      height="25"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.33333 8.50065H6.66667C6.84348 8.50065 7.01305 8.43041 7.13807 8.30539C7.2631 8.18036 7.33333 8.0108 7.33333 7.83398C7.33333 7.65717 7.2631 7.4876 7.13807 7.36258C7.01305 7.23756 6.84348 7.16732 6.66667 7.16732H5.33333C5.15652 7.16732 4.98695 7.23756 4.86193 7.36258C4.7369 7.4876 4.66667 7.65717 4.66667 7.83398C4.66667 8.0108 4.7369 8.18036 4.86193 8.30539C4.98695 8.43041 5.15652 8.50065 5.33333 8.50065ZM11.3333 4.50065H8V3.16732H8.66667C8.84348 3.16732 9.01305 3.09708 9.13807 2.97206C9.2631 2.84703 9.33333 2.67746 9.33333 2.50065C9.33333 2.32384 9.2631 2.15427 9.13807 2.02925C9.01305 1.90422 8.84348 1.83398 8.66667 1.83398H7.33333C7.15652 1.83398 6.98695 1.90422 6.86193 2.02925C6.7369 2.15427 6.66667 2.32384 6.66667 2.50065V4.50065H4.66667C3.95942 4.50065 3.28115 4.7816 2.78105 5.2817C2.28095 5.7818 2 6.46007 2 7.16732V11.1673C2 11.3441 2.07024 11.5137 2.19526 11.6387C2.32029 11.7637 2.48986 11.834 2.66667 11.834H6.66667V14.5007C6.66667 14.6775 6.7369 14.847 6.86193 14.9721C6.98695 15.0971 7.15652 15.1673 7.33333 15.1673C7.51014 15.1673 7.67971 15.0971 7.80474 14.9721C7.92976 14.847 8 14.6775 8 14.5007V11.834H13.3333C13.5101 11.834 13.6797 11.7637 13.8047 11.6387C13.9298 11.5137 14 11.3441 14 11.1673V7.16732C14 6.46007 13.719 5.7818 13.219 5.2817C12.7189 4.7816 12.0406 4.50065 11.3333 4.50065ZM8.66667 7.16732V10.5007H3.33333V7.16732C3.33333 6.8137 3.47381 6.47456 3.72386 6.22451C3.97391 5.97446 4.31304 5.83398 4.66667 5.83398H9.04C8.79763 6.23665 8.66864 6.69734 8.66667 7.16732ZM12.6667 10.5007H10V7.16732C10 6.8137 10.1405 6.47456 10.3905 6.22451C10.6406 5.97446 10.9797 5.83398 11.3333 5.83398C11.687 5.83398 12.0261 5.97446 12.2761 6.22451C12.5262 6.47456 12.6667 6.8137 12.6667 7.16732V10.5007Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageFive = (
    <svg
      width="24"
      height="20"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.84667 4.41333C9.99974 4.50025 10.181 4.52309 10.3508 4.47688C10.5207 4.43067 10.6654 4.31915 10.7533 4.16667C10.8261 4.03824 10.9395 3.93759 11.0756 3.88052C11.2117 3.82344 11.3629 3.81317 11.5056 3.8513C11.6482 3.88943 11.7741 3.97381 11.8636 4.09121C11.953 4.20861 12.001 4.35239 12 4.5C12 4.67681 11.9298 4.84638 11.8047 4.9714C11.6797 5.09643 11.5101 5.16667 11.3333 5.16667C11.1565 5.16667 10.987 5.2369 10.8619 5.36193C10.7369 5.48695 10.6667 5.65652 10.6667 5.83333C10.6667 6.01014 10.7369 6.17971 10.8619 6.30474C10.987 6.42976 11.1565 6.5 11.3333 6.5C11.6844 6.49977 12.0291 6.40717 12.333 6.23149C12.6369 6.05581 12.8892 5.80324 13.0646 5.49917C13.2399 5.19509 13.3322 4.85022 13.332 4.4992C13.3319 4.14818 13.2394 3.80338 13.0638 3.49944C12.8882 3.19551 12.6357 2.94315 12.3316 2.76771C12.0276 2.59227 11.6827 2.49994 11.3317 2.5C10.9807 2.50006 10.6359 2.5925 10.3319 2.76803C10.0279 2.94356 9.77551 3.19601 9.6 3.5C9.55592 3.57609 9.52733 3.66015 9.51587 3.74733C9.50442 3.83452 9.51032 3.92311 9.53325 4.008C9.55618 4.0929 9.59567 4.17241 9.64946 4.24198C9.70325 4.31154 9.77027 4.36978 9.84667 4.41333ZM12.7133 9.16667C12.5383 9.14395 12.3615 9.19155 12.2215 9.29902C12.0815 9.40649 11.9899 9.56507 11.9667 9.74C11.8268 10.8701 11.2785 11.9101 10.4251 12.664C9.57168 13.4179 8.47207 13.8338 7.33333 13.8333H3.60667L4.04 13.4C4.16417 13.2751 4.23386 13.1061 4.23386 12.93C4.23386 12.7539 4.16417 12.5849 4.04 12.46C3.38997 11.8074 2.94759 10.977 2.76859 10.0735C2.5896 9.16998 2.68199 8.23368 3.03413 7.38255C3.38627 6.53143 3.98241 5.80355 4.74746 5.29059C5.51251 4.77764 6.41224 4.50256 7.33333 4.5C7.51014 4.5 7.67971 4.42976 7.80474 4.30474C7.92976 4.17971 8 4.01014 8 3.83333C8 3.65652 7.92976 3.48695 7.80474 3.36193C7.67971 3.2369 7.51014 3.16667 7.33333 3.16667C6.20615 3.17137 5.1031 3.49349 4.15053 4.09613C3.19796 4.69877 2.43442 5.55755 1.94738 6.57408C1.46033 7.59061 1.26948 8.72379 1.3967 9.84377C1.52391 10.9638 1.96404 12.0253 2.66667 12.9067L1.52667 14.0267C1.43416 14.1204 1.3715 14.2395 1.34658 14.3688C1.32166 14.4981 1.33561 14.6319 1.38667 14.7533C1.43668 14.8751 1.52161 14.9793 1.63076 15.0529C1.7399 15.1264 1.86838 15.166 2 15.1667H7.33333C8.7943 15.1669 10.2051 14.634 11.3012 13.668C12.3973 12.7021 13.1032 11.3694 13.2867 9.92C13.2989 9.83284 13.2937 9.74412 13.2714 9.65898C13.2491 9.57383 13.2102 9.49393 13.1569 9.4239C13.1036 9.35386 13.037 9.29507 12.9609 9.25093C12.8847 9.20678 12.8006 9.17814 12.7133 9.16667ZM11.5867 7.21333C11.4653 7.15964 11.3307 7.14339 11.2 7.16667L11.08 7.20667L10.96 7.26667L10.86 7.35333C10.8 7.41477 10.7525 7.4872 10.72 7.56667C10.6806 7.64982 10.6623 7.74141 10.6667 7.83333C10.6647 7.92224 10.6806 8.01065 10.7133 8.09333C10.7478 8.17334 10.7976 8.24582 10.86 8.30667C10.9223 8.36845 10.9962 8.41734 11.0774 8.45051C11.1586 8.48369 11.2456 8.50051 11.3333 8.5C11.5101 8.5 11.6797 8.42976 11.8047 8.30474C11.9298 8.17971 12 8.01014 12 7.83333C12.0023 7.74588 11.984 7.65912 11.9467 7.58C11.875 7.4198 11.7469 7.29163 11.5867 7.22V7.21333Z"
        fill="#71757B"
      />
    </svg>
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {jobDetails ? (
            <>
              <div className="Category_p TopMJobPgag">
                <div className="CategorylistName">
                  <div className="backbtntop">
                    <div className="creatortoptitlebutt">
                      <h1>{jobDetails?.title}</h1>
                      <button
                        className="backbuttonJobDetailsPage"
                        onClick={() => navigate('/jobs/list')}
                      >
                        Back
                      </button>
                      <div className="jobtitle_new_f job-left_btn">
                        {jobDetails?.job_applied_status == "False" && (
                          //   <span className="jobappied">Job Applied</span>
                          // ) : (
                          <Link to={`/jobs/apply/${jobId}`}>
                            <button
                              type="button"
                              className="btn btn-primary Small border-radius Small_new_bt"
                            >
                              Apply Now
                            </button>
                          </Link>
                        )}
                        {jobDetails?.job_applied_modified == true &&
                          jobDetails?.is_active == true && (
                            <button
                              type="button"
                              className="btn btn-primary Small border-radius applynowbtn_M"
                              onClick={() => navigate(`/jobs/apply/${jobId}`)}
                            >
                              Edit Proposal
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                  {/* <div className="jobtitle_new_f">
                    {jobDetails?.job_applied_status == "False" && (
                      //   <span className="jobappied">Job Applied</span>
                      // ) : (
                      <Link to={`/jobs/apply/${jobId}`}>
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius Small_new_bt"
                        >
                          Apply Now
                        </button>
                      </Link>
                    )}
                    {jobDetails?.job_applied_modified == true &&
                      jobDetails?.is_active == true && (
                        <button
                          type="button"
                          className="btn btn-primary Small border-radius applynowbtn_M"
                          onClick={() => navigate(`/jobs/apply/${jobId}`)}
                        >
                          Edit Proposal
                        </button>
                      )}
                  </div> */}
                </div>
              </div>
              <div className="Topallpage">
                <div className=" ContentDiv border-radius agencyjobde">
                  <div className="Activitysec agencyjobdetailspage">
                    <Box sx={{ width: "100%" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              className={
                                value == "1" ? "lab active8 " : " lab "
                              }
                              icon={imageOne}
                              iconPosition="start"
                              label="job details"
                              value="1"
                            />
                            <Tab
                              className={
                                value == "2" ? "lab active8 " : " lab "
                              }
                              icon={imageTwo}
                              iconPosition="start"
                              label="Activity"
                              value="2"
                            />
                            <Tab
                              className={
                                value == "3" ? "lab active8 " : " lab "
                              }
                              icon={imageThree}
                              iconPosition="start"
                              label="files"
                              value="3"
                            />
                            <Tab
                              className={
                                value == "4" ? "lab active8 " : " lab "
                              }
                              icon={imageFive}
                              iconPosition="start"
                              label="Questions and Answers"
                              value="4"
                            />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <Creator_job_details_new_page tabValue={value} />
                        </TabPanel>
                        <TabPanel value="2">
                          <Creator_Activity
                            jobName={jobDetails.title}
                            jobCreatedAt={jobDetails.created}
                            jobDueDate={jobDetails.expected_delivery_date}
                            jobPrice={jobDetails.price}
                            isUserHired={isUserHired}
                            handleCloseSubmit={handleCloseSubmit}
                            handleOpenSubmit={handleOpenSubmit}
                            submitjobopen={submitjobopen}
                          />
                        </TabPanel>
                        <TabPanel value="3">
                          <Creator_job_detail_files />
                        </TabPanel>
                        <TabPanel value="4">
                          <Creator_job_detail_ques_ans
                            job_applied_id={jobDetails?.job_applied_id}
                          />
                        </TabPanel>
                      </TabContext>
                      {!jobSubmitStatus && !userJobComplete && (
                        <span className="jobAppliedJobDetailsCreator">
                          <button
                            onClick={handleOpenSubmit}
                            className="approveViewButtonBlue"
                          >
                            Submit Job for Approval
                          </button>
                        </span>
                      )}
                      {/* {jobDetails?.job_applied_id != "False" &&
                        jobSubmitStatus && (
                          <span className="jobAppliedJobDetailsCreator">
                            Job Applied
                          </span>
                        )} */}
                    </Box>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="job_no_access">Job does not exist</div>
          )}
        </>
      )}
    </>
  );
};

export default Creator_job_details;
