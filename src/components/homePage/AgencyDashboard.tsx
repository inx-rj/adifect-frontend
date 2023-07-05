import React, { useEffect, useState } from "react";

// import { Chart, registerables } from "chart.js";
import AgencyDashboardAnalyticsPerformanceChart from "./AgencyDashboardAnalyticsPerformanceChart";
import AgencyDashboardAnalyticsAdsList from "./AgencyDashboardAnanlyticsAdsList";
import AgencyDashboardInProgress from "./AgencyDashboardInProgress";
import AgencyDashboardInReview from "./AgencyDashboardInReview";
import Title from "../common/pageTitle/Title";
import LoadingSpinner from "components/common/loadingSpinner/Loader";

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
      {isLoading && <LoadingSpinner />}

      {/* <div className="pb-5"> // Hide as per client requirement
        <Title title="Analytics" />
      </div> */}
      <div className=" grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        {/* <div className="rounded-md bg-white p-6 shadow-[0_4px_40px_#2472fc0f]">
          <AgencyDashboardAnalyticsPerformanceChart /> // Hide as per client requirement
        </div>
        <div className="rounded-md bg-white p-6 shadow-[0_4px_40px_#2472fc0f]">
          <AgencyDashboardAnalyticsAdsList /> // Hide as per client requirement
        </div> */}
        <div className="">
          <AgencyDashboardInProgress />
        </div>
        <div className="">
          <AgencyDashboardInReview />
        </div>
      </div>
    </>
  );
};

export default AgencyDashboard;
