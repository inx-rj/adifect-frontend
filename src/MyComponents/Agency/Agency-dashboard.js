import React, { useEffect, useState } from "react";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { ROLE } from "../../constants/other-constants";
import { Link } from "react-router-dom";

import { Chart, registerables } from "chart.js";
import Agency_dashboard_in_progress from "./Agency-dashboard-in-progress";
import Agency_dashboard_in_review from "./Agency-dashboard-in-review";
Chart.register(...registerables);
export default function AgencyDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData } = useSelector((state) => state.authReducer);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  // useEffect(() => {
  //   const ctx = document.getElementById("myChart");
  //   const myChart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: ["", "", "", "Days", "", "", ""],
  //       datasets: [
  //         {
  //           label: "#",
  //           data: [0, 1, 2, 4, 3, 5],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 3,
  //           tension: 0.1,
  //         },
  //         {
  //           label: "#",
  //           data: [0, 2, 1, 2, 4, 5],
  //           backgroundColor: [
  //             "rgba(255, 99, 132, 0.2)",
  //             "rgba(54, 162, 235, 0.2)",
  //             "rgba(255, 206, 86, 0.2)",
  //             "rgba(75, 192, 192, 0.2)",
  //             "rgba(153, 102, 255, 0.2)",
  //             "rgba(255, 159, 64, 0.2)",
  //           ],
  //           borderColor: [
  //             "rgba(255, 99, 132, 1)",
  //             "rgba(54, 162, 235, 1)",
  //             "rgba(255, 206, 86, 1)",
  //             "rgba(75, 192, 192, 1)",
  //             "rgba(153, 102, 255, 1)",
  //             "rgba(255, 159, 64, 1)",
  //           ],
  //           borderWidth: 3,
  //           tension: 0.1,
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  // }, []);

  // const { loading } = useSelector((state) => state.loaderReducer);

  return (
    <>
      {/* {loading ? <LoadingSpinner /> : <></>} */}
      {isLoading && <LoadingSpinner />}
      {/* <div className="Topallpage">
            <div className="ContentDiv mt-4 pb-5">
              <h1 className="WelcomeTitle">
                Welcome{" "}
                {userData?.user?.role == Object.keys(ROLE)[0]
                  ? "Admin"
                  : userData?.user?.role == Object.keys(ROLE)[1]
                  ? "Creator"
                  : "Agency"}
                <br />
                {userData.user.first_name} {userData.user.last_name}
              </h1>
            </div>
          </div> */}
      {/* <div className="AllPageHight">

          </div> */}
      {/* <h1 className="Analyticstitle Analyticspagetitle">Analytics</h1>
      <div className="Performanceads ">
        <div className="PerformanceadsGRPh PerformanceadsGRPh2">
          <h2>Ads Performance</h2>
          <canvas id="myChart" width="200"></canvas>
          <img className="grphsec" src="img/grph2.png" alt="" />
        </div>
        <div className="PerformanceadsGRPh PerformanceadsGRPh1 ">
          <h2>Top Ads List</h2>
          <div className="adstitle">
            <div className="adstitle1">
              <h5>Ads</h5>
              <ul>
                <li className="MarketingCampaignJob">
                  <span>
                    <img src="img/ads1.png" alt="" />
                  </span>
                  <label>Marketing Campaign Job 1</label>
                </li>
                <li className="MarketingCampaignJob">
                  <span>
                    <img src="img/ads2.png" alt="" />
                  </span>
                  <label>Marketing Campaign Job 1</label>
                </li>
                <li className="MarketingCampaignJob">
                  <span>
                    <img src="img/ads3.png" alt="" />
                  </span>
                  <label>Marketing Campaign Job 1</label>
                </li>
              </ul>
            </div>
            <div className="adstitle2">
              <div className="Reach">
                <h5>Reach</h5>
                <ul className="Reach">
                  <li>13,510</li>
                  <li>10,900</li>
                  <li>9,420</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="Topallpage_sec">
        <div className="InProgress-4 creatordashbordtab">
          <div className="Work-D">
            <div className="inProgressDashboardComponent">
              <Agency_dashboard_in_progress />
            </div>
            <div className="inReviewDashboardComponent">
              <Agency_dashboard_in_review />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
    // )}
    // </>
  );
}
