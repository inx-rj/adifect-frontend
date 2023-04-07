import React, { useEffect, useState } from "react";
import AdminDashboardInProgress from "./adminDashboard/AdminDashboardInProgress";
import AdminDashboardInReview from "./adminDashboard/AdminDashboardInReview";
// import LoadingSpinner from "./../../containers/LoadingSpinner";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      <>
        <div className="Topallpage">
          <div className="page-card TopM">
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
                <AdminDashboardInProgress />
              </div>
              <div className="inReviewDashboardComponent">
                <AdminDashboardInReview />
              </div>{" "}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
