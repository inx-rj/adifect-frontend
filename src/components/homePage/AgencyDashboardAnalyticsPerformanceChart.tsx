import React, { useEffect } from "react";

import { Chart, registerables } from "chart.js";
import Title from "../common/pageTitle/Title";

Chart.register(...registerables);

const AgencyDashboardAnalyticsPerformanceChart = () => {
  // const { data } = api.get(`${BACKEND_API_URL}agency-topads-list/`, config);
  const data = [
    {
      data: [65, 59, 80, 81, 26, 55, 40],
      fill: false,
      borderWidth: 5.82,
      tension: 0.8,
      borderColor: "#C315FF",
    },
    {
      data: [0, 9, 0, 8, 2, 55, 10],
      fill: false,
      borderWidth: 5.82,
      tension: 0.8,
      borderColor: "#2472FC",
    },
    {
      data: [0, 55, 80, 88, 21, 55, 44],
      fill: false,
      borderWidth: 5.82,
      tension: 0.8,
      borderColor: "#D99836",
    },
  ];

  useEffect(() => {
    const ctx: any = document.getElementById("adsChart");
    const adsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        datasets: data,
      },
      options: {
        responsive: true,
        scales: {
          yAxis: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "REACH",
            },
          },
          xAxis: {
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
            title: {
              display: true,
              text: "DAYS",
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
    return () => {
      adsChart.destroy();
    };
  }, [data]);
  return (
    <>
      <div className=" h-full max-h-[540px]">
        <Title title="Ads Performance" />
        <div className="chart-container mt-2">
          <canvas id="adsChart" className="h-full max-h-[250px]"></canvas>
        </div>
      </div>
    </>
  );
};

export default AgencyDashboardAnalyticsPerformanceChart;
