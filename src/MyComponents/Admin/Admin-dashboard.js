import React, { useEffect, useState } from "react";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs } from "../../redux/actions/job-actions";
import { ROLE } from "../../constants/other-constants";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import Admin_Dashboard_In_Progress from "./Admin-Dashboard-In-Progress";
import Admin_Dashboard_In_Review from "./Admin-Dashboard-In-Review";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(listAllJobs());
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <div className="Topallpage">
          <div className="ContentDiv TopM">
            <h1 className="WelcomeTitle">
              Welcome Admin
              <br />
            </h1>
          </div>
        </div>
        {/* <div className="AllPageHight"></div> */}
        <div className="Topallpage_sec">
          <div className="InProgress-4 creatordashbordtab">
            <div className="Work-D">
              <div className="inProgressDashboardComponent">
                <Admin_Dashboard_In_Progress />
              </div>
              <div className="inReviewDashboardComponent">
                <Admin_Dashboard_In_Review />
              </div>{" "}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
