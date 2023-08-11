import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default function AdminAnalytics() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["", "", "", "Days", "", "", ""],
        datasets: [
          {
            label: "#",
            data: [0, 1, 2, 4, 3, 5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 3,
            tension: 0.1,
          },
          {
            label: "#",
            data: [0, 2, 1, 2, 4, 5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 3,
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <h1 className="Analyticstitle">Analytics</h1>
        <div className="Analyticstitleadminpage">
          <div className="Performanceads">
            <div className="PerformanceadsGRPh PerformanceadsGRPh2">
              <h2>Ads Performance</h2>
              <canvas id="myChart" width="200"></canvas>
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
          </div>
        </div>
      </>
    </>
  );
}
