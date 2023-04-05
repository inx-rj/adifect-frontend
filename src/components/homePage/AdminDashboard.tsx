import React, { useEffect, useState } from "react";
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
          <div className="ContentDiv TopM">
            <h1 className="WelcomeTitle">
              Welcome Admin
              <br />
            </h1>
          </div>
        </div>
        {/* <div className="AllPageHight"></div> */}
        {/* <div className="Topallpage_sec">
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
        </div> */}
      </>
    </>
  );
}
