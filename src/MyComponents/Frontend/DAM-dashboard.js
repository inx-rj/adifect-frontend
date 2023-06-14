import React, { useEffect, useState } from "react";
import LoadingSpinner from "./../../containers/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listAllJobs } from "../../redux/actions/job-actions";
import { ROLE } from "../../constants/other-constants";
import { defaultPageLoader } from "../../redux/actions/other-actions";
export default function DAMDashboard() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authReducer);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    dispatch(listAllJobs());
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <>
        <div className="Topallpage">
          <div className="ContentDiv TopM">
            <h1 className="WelcomeTitle">
              Welcome DAM Frontend
              <br />
            </h1>
          </div>
        </div>
        <div className="AllPageHight"></div>
      </>
    </>
  );
}
