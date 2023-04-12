import React, { useEffect, useState } from "react";

// import { Chart, registerables } from "chart.js";
import AgencyDashboardAnalyticsPerformanceChart from "./AgencyDashboardAnalyticsPerformanceChart";
import AgencyDashboardAnalyticsAdsList from "./AgencyDashboardAnanlyticsAdsList";
import AgencyDashboardInProgress from "./AgencyDashboardInProgress";
import AgencyDashboardInReview from "./AgencyDashboardInReview";
import Title from "../../components/common/PageTitle/Title";

// Chart.register(...registerables);
const AgencyDashboard = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <>
      {/* {loading ? <LoadingSpinner /> : <></>} */}
      {/* {isLoading && <LoadingSpinner />} */}

      <div className="pb-5">
        <Title title="Analytics" />
      </div>
      <div className="Work-D grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="rounded-md bg-white p-6 shadow-[0_4px_40px_#2472fc0f]">
          <AgencyDashboardAnalyticsPerformanceChart />
        </div>
        <div className="rounded-md bg-white p-6 shadow-[0_4px_40px_#2472fc0f]">
          <AgencyDashboardAnalyticsAdsList />
        </div>
        <div className="inProgressDashboardComponent">
          <AgencyDashboardInProgress />
        </div>
        <div className="inReviewDashboardComponent">
          <AgencyDashboardInReview />
        </div>
      </div>
    </>
  );
};

export default AgencyDashboard;
