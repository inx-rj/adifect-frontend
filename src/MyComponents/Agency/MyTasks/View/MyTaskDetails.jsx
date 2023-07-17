import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { getMyTasksDetails } from "../../../../redux/actions/My-Tasks-actions";
import TaskDetails from "./TaskDetails";
import TaskQueAndAns from "./TaskQueAndAns";
import LoadingSpinner from "../../../../containers/LoadingSpinner";
import TaskAssets from "./TaskAssets";
import { BusinessCenterOutlined } from "@mui/icons-material";

const MyTaskDetails = () => {
  const { myTaskId } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [value, setValue] = useState("1");

  const {
    loading: jobLoading,
    success,
    myTaskDetails,
  } = useSelector((state) => state.myTasksDetailsAgencyReducer);

  const { success: updateJobSuccess } = useSelector(
    (state) => state.updateJobReducer
  );

  useEffect(() => {
    dispatch(getMyTasksDetails(myTaskId));
    window.scrollTo(0, 0);
  }, [updateJobSuccess, myTaskId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const imageTwo = (
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4.83288H10.3733C10.3269 4.82656 10.2798 4.82656 10.2333 4.83288H10.12C10.0851 4.85276 10.0517 4.87503 10.02 4.89954C9.98286 4.92405 9.94724 4.95077 9.91331 4.97954C9.89106 5.0068 9.87099 5.03578 9.85331 5.06621C9.82277 5.10821 9.79599 5.15282 9.77331 5.19954L8.70665 8.13954L5.92665 0.606209C5.87993 0.477509 5.79473 0.366311 5.68261 0.28773C5.57049 0.209148 5.43689 0.166992 5.29998 0.166992C5.16306 0.166992 5.02947 0.209148 4.91735 0.28773C4.80523 0.366311 4.72003 0.477509 4.67331 0.606209L3.13331 4.83288H0.99998C0.823169 4.83288 0.653599 4.90311 0.528575 5.02814C0.403551 5.15316 0.333313 5.32273 0.333313 5.49954C0.333313 5.67635 0.403551 5.84592 0.528575 5.97095C0.653599 6.09597 0.823169 6.16621 0.99998 6.16621H3.61331H3.76665H3.86665C3.90454 6.14797 3.94031 6.12561 3.97331 6.09954C4.01044 6.07503 4.04605 6.04832 4.07998 6.01954L4.13998 5.93288C4.17176 5.8917 4.19861 5.84696 4.21998 5.79954L5.29998 2.77954L8.07331 10.3929C8.1199 10.5217 8.20505 10.6331 8.31718 10.7118C8.42931 10.7905 8.56297 10.8328 8.69998 10.8329C8.83699 10.8328 8.97065 10.7905 9.08278 10.7118C9.19491 10.6331 9.28006 10.5217 9.32665 10.3929L10.86 6.16621H13C13.1768 6.16621 13.3464 6.09597 13.4714 5.97095C13.5964 5.84592 13.6666 5.67635 13.6666 5.49954C13.6666 5.32273 13.5964 5.15316 13.4714 5.02814C13.3464 4.90311 13.1768 4.83288 13 4.83288Z"
        fill="#71757B"
      />
    </svg>
  );
  const imageThree = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6667 4.16701H8.48001L8.26668 3.50034C8.12838 3.10916 7.87184 2.77068 7.53261 2.53178C7.19338 2.29289 6.78825 2.16541 6.37334 2.16701H3.33334C2.80291 2.16701 2.2942 2.37772 1.91913 2.75279C1.54406 3.12787 1.33334 3.63657 1.33334 4.16701V12.8337C1.33334 13.3641 1.54406 13.8728 1.91913 14.2479C2.2942 14.623 2.80291 14.8337 3.33334 14.8337H12.6667C13.1971 14.8337 13.7058 14.623 14.0809 14.2479C14.456 13.8728 14.6667 13.3641 14.6667 12.8337V6.16701C14.6667 5.63657 14.456 5.12787 14.0809 4.75279C13.7058 4.37772 13.1971 4.16701 12.6667 4.16701ZM13.3333 12.8337C13.3333 13.0105 13.2631 13.1801 13.1381 13.3051C13.0131 13.4301 12.8435 13.5003 12.6667 13.5003H3.33334C3.15653 13.5003 2.98696 13.4301 2.86194 13.3051C2.73691 13.1801 2.66668 13.0105 2.66668 12.8337V4.16701C2.66668 3.9902 2.73691 3.82063 2.86194 3.6956C2.98696 3.57058 3.15653 3.50034 3.33334 3.50034H6.37334C6.51311 3.49998 6.64945 3.54355 6.7631 3.6249C6.87674 3.70625 6.96195 3.82126 7.00668 3.95367L7.36668 5.04701C7.4114 5.17942 7.49661 5.29443 7.61026 5.37578C7.72391 5.45713 7.86025 5.5007 8.00001 5.50034H12.6667C12.8435 5.50034 13.0131 5.57058 13.1381 5.6956C13.2631 5.82063 13.3333 5.9902 13.3333 6.16701V12.8337Z"
        fill="#71757B"
      />
    </svg>
  );

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {myTaskDetails ? (
            <>
              <div className="Category_p TopMJobPgag">
                <div className="CategorylistName">
                  <div className="backbtntop">
                    <div className="creatortoptitlebutt1">
                      <h1>{myTaskDetails?.name}</h1>
                      <button
                        className="backbuttonJobDetailsPage"
                        onClick={() => navigate(-1)}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Topallpage">
                <div className=" ContentDiv border-radius agencyjobde">
                  <div className="Activitysec agencyjobdetailspage">
                    <Box sx={{ width: "100%" }}>
                      <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                          <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                          >
                            <Tab
                              className={
                                value == "1" ? "lab active8 " : " lab "
                              }
                              icon={<BusinessCenterOutlined />}
                              iconPosition="start"
                              label="Task details"
                              value="1"
                            />
                            <Tab
                              className={
                                value == "2" ? "lab active8 " : " lab "
                              }
                              icon={imageTwo}
                              iconPosition="start"
                              label="Assets"
                              value="2"
                            />
                          </TabList>
                        </Box>
                        <TabPanel value="1">
                          <TaskDetails />
                        </TabPanel>
                        <TabPanel value="2">
                          <TaskAssets
                            myTaskDetails={
                              myTaskDetails?.form_submission?.submission_data
                            }
                          />
                        </TabPanel>
                        <TabPanel value="3">
                          <TaskQueAndAns
                            genericForm={
                              myTaskDetails?.form_submission?.submission_data
                            }
                          />
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="job_no_access">Task does not exist</div>
          )}
        </>
      )}
    </>
  );
};

export default MyTaskDetails;
