import React, { useEffect } from "react";
import LoadingSpinner from "../../containers/LoadingSpinner";

import { Chart, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { agencyAdsChartAction } from "../../redux/actions/Agency-analytics-actions";
Chart.register(...registerables);

function Agency_dashboard_analytics_performance_chart() {
  const { loading: loadingAgencyAdsChart, agencyAdsChartData } = useSelector(
    (state) => state.AgencyAnalyticsChartReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(agencyAdsChartAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("adsChart");
    const adsChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        datasets: agencyAdsChartData,
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
  }, [agencyAdsChartData]);

  return (
    <>
      {loadingAgencyAdsChart ? (
        <div className="projectsLoaderCreatorPage">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="Work-In h-100">
          <div className="jobnotfound-analytics h-100 flex-column p-8 m-0 rounded">
            <h2>Ads Performance</h2>
            <div className="chart-container">
              <canvas id="adsChart" width={200} height={100}></canvas>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Agency_dashboard_analytics_performance_chart;
