import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Button } from "@mui/material";
import { MDBDataTable } from "mdbreact";
import { getUserDetails } from "../../redux/actions/user-actions";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoadingSpinner from "../../containers/LoadingSpinner";
// import Agency_jobList_companydata from "./Agency-jobList-companydata";
import Agency_jobList_companydata from "../Agency/Agency-jobList-companydata";
// import Agency_company_companydata from "./Agency-company-companydata";
import Agency_company_companydata from "../Agency/Agency-company-companydata";
// import Agency_inviteList_companydata from "./Agency-inviteList-companydata";
import Agency_inviteList_companydata from "../Agency/Agency-inviteList-companydata";
import { listAllJobs } from "../../redux/actions/Agency-data-actions";
import { listAllCompaniesdesc } from "../../redux/actions/company-actions";
// import Agency_company_information from "./Agency-company-information";
import Agency_company_information from "../Agency/Agency-company-information";
// import Agency_company_users from "./Agency-company-users";
import Agency_company_users from "../Agency/Agency-company-users";
// import Agency_company_template from "./Agency-company-template";
import Agency_company_template from "../Agency/Agency-company-template";
// import Agency_company_setting from "./Agency-company-setting";
import Agency_company_setting from "../Agency/Agency-company-setting";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { validations } from "../../utils";
import { updateCompanyDetails } from "../../redux/actions/company-actions";
import swal from "sweetalert";
import Member_Approver_Company_information from "./Member-Approver-Company-information";
import { memberApproverCompanyDataAction } from "../../redux/actions/Member-Approver-comapny-action";

const Member_Approver_Company_datalist = () => {
  //   const { jobuseragency, In_progress_jobs, Total_Job_count } = useSelector(
  //     (state) => state.alljobcompanyReducer
  //   );

  const { userData } = useSelector((state) => state.authReducer);

  const { memberCompanyData, memberCompanyTotalJobCount } = useSelector(
    (state) => state.memberApproverComapnyDataReducer
  );

  // const { agencyadminData, loading: companyLoading } = useSelector(
  //   (state) => state.agencyAdminReducer
  // );

  const [value, setValue] = useState("1");
  const { useradminDetails, loading: loadingUserDetails } = useSelector(
    (state) => state.UserAdminDetailsReducer
  );

  const dispatch = useDispatch();
  const { agencyid, companyid } = useParams();

  //   console.log(companyid);
  useEffect(() => {
    dispatch(memberApproverCompanyDataAction(companyid));
  }, []);

  const imageOne = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99998 7.8335C7.82317 7.8335 7.6536 7.90373 7.52858 8.02876C7.40355 8.15378 7.33332 8.32335 7.33332 8.50016V11.1668C7.33332 11.3436 7.40355 11.5132 7.52858 11.6382C7.6536 11.7633 7.82317 11.8335 7.99998 11.8335C8.17679 11.8335 8.34636 11.7633 8.47139 11.6382C8.59641 11.5132 8.66665 11.3436 8.66665 11.1668V8.50016C8.66665 8.32335 8.59641 8.15378 8.47139 8.02876C8.34636 7.90373 8.17679 7.8335 7.99998 7.8335ZM8.25332 5.22016C8.09101 5.15348 7.90896 5.15348 7.74665 5.22016C7.66482 5.25189 7.59005 5.29947 7.52665 5.36016C7.46776 5.42496 7.42041 5.49937 7.38665 5.58016C7.34933 5.65928 7.33106 5.74605 7.33332 5.8335C7.33281 5.92123 7.34963 6.00821 7.3828 6.08943C7.41598 6.17066 7.46486 6.24454 7.52665 6.30683C7.59145 6.36572 7.66586 6.41307 7.74665 6.44683C7.84765 6.48832 7.95729 6.50437 8.06595 6.49357C8.1746 6.48277 8.27894 6.44544 8.36979 6.38488C8.46064 6.32431 8.53523 6.24235 8.58699 6.14621C8.63875 6.05007 8.66611 5.94268 8.66665 5.8335C8.66419 5.65698 8.59514 5.48792 8.47332 5.36016C8.40991 5.29947 8.33515 5.25189 8.25332 5.22016ZM7.99998 1.8335C6.68144 1.8335 5.39251 2.22449 4.29618 2.95703C3.19985 3.68957 2.34537 4.73077 1.84079 5.94894C1.3362 7.16711 1.20418 8.50756 1.46141 9.80076C1.71865 11.094 2.35359 12.2819 3.28594 13.2142C4.21829 14.1466 5.40617 14.7815 6.69938 15.0387C7.99259 15.296 9.33303 15.1639 10.5512 14.6594C11.7694 14.1548 12.8106 13.3003 13.5431 12.204C14.2757 11.1076 14.6666 9.81871 14.6666 8.50016C14.6666 7.62468 14.4942 6.75778 14.1592 5.94894C13.8241 5.1401 13.3331 4.40517 12.714 3.78612C12.095 3.16706 11.36 2.676 10.5512 2.34097C9.74237 2.00593 8.87546 1.8335 7.99998 1.8335V1.8335ZM7.99998 13.8335C6.94515 13.8335 5.914 13.5207 5.03694 12.9347C4.15988 12.3486 3.47629 11.5157 3.07263 10.5411C2.66896 9.5666 2.56334 8.49425 2.76913 7.45968C2.97492 6.42512 3.48287 5.47481 4.22875 4.72893C4.97463 3.98305 5.92494 3.4751 6.9595 3.26931C7.99407 3.06352 9.06642 3.16914 10.041 3.57281C11.0155 3.97647 11.8485 4.66006 12.4345 5.53712C13.0205 6.41418 13.3333 7.44533 13.3333 8.50016C13.3333 9.91465 12.7714 11.2712 11.7712 12.2714C10.771 13.2716 9.41447 13.8335 7.99998 13.8335V13.8335Z"
        fill="#71757B"
      />
    </svg>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="profilePrivateViewmainDiv agencycompanyjobpag">
        <div className="profilePrivateHead">
          <h3>Company Info</h3>
        </div>
        <div className="privateProfileTonnyillis">
          <div className="inlineprivateProfileContent">
            <div className="privateProfileContent">
              <div className="PhotoprofileDiv">
                {useradminDetails?.profile_img ? (
                  <div className="userprofileimg">
                    <img
                      src={memberCompanyData?.company_profile_img}
                      className="profile_image_dynamicly"
                    />
                  </div>
                ) : (
                  <div className="userprofileimg">
                    <img
                      src="/img/avataruser.png"
                      className="profile_image_dynamicly"
                    />
                  </div>
                )}
              </div>
              <div className="privateProfileName">
                <div className="tonynameAnsStartpoint">
                  <h3>{memberCompanyData?.name}</h3>
                  {/* <span className="fourPointEight">
                    <img src="/img/starProfile.png" />
                    4.8
                  </span> */}
                </div>

                <p>{memberCompanyData?.description}</p>
                <div className="jobsFourInProgress">
                  <div className="OnejobsFourInProgress">
                    <h5 className="oneEightJobs">
                      {memberCompanyTotalJobCount ?? "0"}
                      <br />
                      <span className="jobsOneZero">Jobs</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="jobInfoAboutTabsmain">
            <div className="feedbackAboutAreaMainD">
              <Box sx={{ width: "100%" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        className={value == "1" ? "lab active8 " : " lab "}
                        icon={imageOne}
                        iconPosition="start"
                        label="Company Info"
                        value="1"
                      />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Member_Approver_Company_information />
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member_Approver_Company_datalist;
