import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import LoadingSpinner from "../../containers/LoadingSpinner";
export default function AdminEarnings() {
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
          <h1>Earnings</h1>
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
