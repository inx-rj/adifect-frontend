import React, { useState } from "react";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../containers/LoadingSpinner";

export default function Admin_agency_users_list() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="Category_p">
        <div className="CategorylistName">
          <h1>Earningss</h1>
        </div>
      </div>
      <div className="Topallpage Custompage">
        <div className="ContentDiv">
          <div className="allpageTitle">
            <h2>COMING SOON</h2>
          </div>
        </div>
      </div>
    </>
  );
}
