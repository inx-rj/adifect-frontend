import React, { useState } from "react";
import AdminDashboardInProgress from "./adminDashboard/AdminDashboardInProgress";
import AdminDashboardInReview from "./adminDashboard/AdminDashboardInReview";
import LoadingSpinner from "components/common/loadingSpinner/Loader";
import { Notify } from "components/common/swal/SwalToast";
// import LoadingSpinner from "./../../containers/LoadingSpinner";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);


  const handleSwalTest = () => {
    Notify({text: 'Testing this text', title: "Please find this title",  timer: 4000})
  }

  return (
    <>

    <button type="button" onClick={() => handleSwalTest()}>Testing swal types</button>

      {isLoading && <LoadingSpinner />}
      <div className="bg-white rounded-xl mb-5">
        <h1 className="p-5 text-center font-bold text-2xl">
          Welcome Admin
          <br />
        </h1>
      </div>
      {/* <div className="AllPageHight"></div> */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
        <div className="">
          <AdminDashboardInProgress />
        </div>
        <div className="">
          <AdminDashboardInReview />
        </div>{" "}
      </div>
    </>
  );
}
