import React, { useEffect, useState } from "react";

import LoadingSpinner from "./../../containers/LoadingSpinner";
import Agency_dashboard_in_progress from "./Agency-dashboard-in-progress";
import Agency_dashboard_in_review from "./Agency-dashboard-in-review";
import Agency_dashboard_analytics_adslist from "./Agency-dashboard-analytics-adslist";
import Agency_dashboard_analytics_performance_chart from "./Agency-dashboard-analytics-performance-chart";
import { Chart, registerables } from "chart.js";
import api from "../../utils/api";

Chart.register(...registerables);
export default function AgencyDashboard() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  // OpnSesame API Code
  const shareOnSms = async () => {

    // const payloadData = {
    //   url: "auth/api-token-auth/",
    //   method: "POST",
    //   token: undefined
    // };

    const payloadData = {
      "url": "accounts/350",
      "method": "GET",
      "token": "1dbb41acd3140cfdada2a05c5ceb54ee73243b23"
    };

    // username: "zakhayes+dsdev@directsnd.com",
    // password: "admintest22!",

    const configs = {
      // withCredentials: false,
      headers: {
        // "Content-Type": "application/json",
        // Allow: ['GET', 'POST', 'OPTIONS'],
        // 'Accept': 'application/json',
        // 'Accept-Encoding': 'gzip, deflate, br',
        // 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        // 'Access-Control-Allow-Origin': '*',
        // Authorization: "Basic emFraGF5ZXMrZHNkZXZAZGlyZWN0c25kLmNvbTphZG1pbnRlc3QyMiE=",
        // Authorization: "",
        // Connection: "keep-alive",
        // Host: 'dev-api.opnsesame.com',
        // 'Content-length': 78,
        // Origin: 'https://dev-api.opnsesame.com',
        // Referer: 'https://localhost:3001/',
        // 'Sec-Fetch-Mode': 'cors',
        // 'Sec-Fetch-Site': 'cross-site',
        // 'X-Requested-With': 'application/json',
        // 'Vary': 'Accept',
        // 'cross-origin-resource-policy': 'cross-origin',
        // "Transfer-Encoding": "chunked",
        // 'Access-Control-Allow-Methods': '*',
        // 'Server': 'cloudflare',
        // 'x-content-type-options': 'nosniff',
        // 'strict-transport-security': 'max-age=7776000; includeSubDomains; preload',
        // 'Content-Encoding': 'gzip',
        // 'CF-RAY': '7c1f94281ad84390-EWR',
        // 'content-security-policy': "default-src 'self' opnsesame-media-dev.s3.amazonaws.com os-ui-resources.s3.amazonaws.com google.com maxcdn.bootstrapcdn.com www.googletagmanager.com *.opnsesame.com s3.amazonaws.com/static.opnsesame.com code.jquery.com www.google.com www.gstatic.com www.google-analytics.com cdn.datatables.net cdnjs.cloudflare.com ajax.googleapis.com d3js.org stats.g.doubleclick.net text.advantage.gop cdn.jsdelivr.net; media-src https://s3.amazonaws.com/opnsesame-media-dev/; script-src 'self' opnsesame-media-dev.s3.amazonaws.com os-ui-resources.s3.amazonaws.com google.com maxcdn.bootstrapcdn.com www.googletagmanager.com *.opnsesame.com s3.amazonaws.com/static.opnsesame.com code.jquery.com www.google.com www.gstatic.com www.google-analytics.com cdn.datatables.net cdnjs.cloudflare.com ajax.googleapis.com d3js.org stats.g.doubleclick.net text.advantage.gop cdn.jsdelivr.net; style-src * 'unsafe-inline' 'self'; img-src * 'self' 'unsafe-inline' 'unsafe-eval'; font-src *; worker-src 'self' blob:",
        // 'mode': 'no-cors',
        'Content-Type': 'application/json;charset=UTF-8',
        // "Accept": 'application/json',
        // "Authorization": "Basic emFraGF5ZXMrZHNkZXZAZGlyZWN0c25kLmNvbTphZG1pbnRlc3QyMiE=",
        // "Cache-Control": "no-cache",
        // "Postman" - Token: 63bfabd8 - f03c - 4c4f - bd3f - 560575c5906f,
        // "Host": "dev-api.opnsesame.com",
      },
    };

    try {

      // Via Python
      const response = await api.post(
        // "https://dev-api.opnsesame.com/auth/api-token-auth",
        "https://dev-api.adifect.com/community/open-sesame/",
        payloadData,
      );

      // console.log({ res1: response?.data?.data }, "OpnSesameRes");

      // // OpnSesame Account API with Token from 'response'
      // const response2 = await axios.get(
      //   // "https://cors-anywhere.herokuapp.com/https://dev-api.opnsesame.com/accounts",
      //   "https://dev-api.opnsesame.com/accounts",
      //   {
      //     headers: {
      //       Authorization: `Token ${JSON.parse(response?.data?.data).token || '1dbb41acd3140cfdada2a05c5ceb54ee73243b23'}`
      //     }
      //   }
      // );

      // console.log({ res1: JSON.parse(response?.data?.data), response2 }, "OpnSesameRes");

    } catch (err) {
      console.error(err);
    }
  };

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
          {/* <div className="InProgress">
            <div className="Work-P-Title analytics-title text-[#ca6aca]">
              <h1 className="lg:m-0" onClick={shareOnSms}>Analytics</h1>
            </div>
          </div>
          <div className="Work-D">
            <div className="inProgressDashboardComponent analyticsDashboardComponent">
              <Agency_dashboard_analytics_performance_chart />
            </div>
            <div className="inProgressDashboardComponent analyticsDashboardComponent">
              <Agency_dashboard_analytics_adslist />
            </div>
          </div> */}
          <div className="Work-D">
            <div className="inProgressDashboardComponent">
              <Agency_dashboard_in_progress />
            </div>
            <div className="inReviewDashboardComponent">
              <Agency_dashboard_in_review />
            </div>
          </div>
        </div>
      </div>
    </>
    // )}
    // </>
  );
}
