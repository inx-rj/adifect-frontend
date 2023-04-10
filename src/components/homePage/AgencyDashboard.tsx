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

      <div className="Topallpage_sec">
        <div className="creatordashbordtab ">
          <div className="pb-5">
            <Title title="Analytics" />
          </div>
          <div className="Work-D grid md:grid-cols-2 sm:grid-cols-1 gap-4 gap-y-9">
            <div className="card">
              <AgencyDashboardAnalyticsPerformanceChart />
            </div>
            <div className="card">
              <AgencyDashboardAnalyticsAdsList />
            </div>
            <div className="inProgressDashboardComponent">
              <AgencyDashboardInProgress />
            </div>
            <div className="inReviewDashboardComponent">
              <AgencyDashboardInReview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyDashboard;
