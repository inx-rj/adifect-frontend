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
import Member_admin_workflow_companyData from "./Member-admin-workflow-companyData";
import { listAllJobs } from "../../redux/actions/Agency-data-actions";
import { listAllCompaniesdesc } from "../../redux/actions/company-actions";
import Member_Admin_company_information from "./Member-Admin-company-information";
import Member_Admin_company_Users from "./Member-Admin-company-Users";
import { ROLE } from "../../constants/other-constants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { validations } from "../../utils";
import { updateCompanyDetails } from "../../redux/actions/company-actions";
import { AgencygetIndustryAdd } from "../../redux/actions/industry-actions";
import swal from "sweetalert";
import { getIndustryDetails } from "../../redux/actions/job-actions";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Link } from "react-router-dom";
import {
  memberAdminGetDetailsCompanyListAction,
  memberAdminEditCompanyListAction,
} from "../../redux/actions/Member-Company-List-Action";
import { memberAdminCompanyListAction } from "../../redux/actions/Member-Company-List-Action";
// import Member_job_list from "./Member-job-list";
import Member_admin_joblist_companyData from "./Member-admin-joblist-companyData";
import Member_admin_company_template_list from "./Member-admin-company-template-list";

const Member_Admin_company_Datalist = () => {
  const [profile_img, setProfileImage] = useState("");
  const [showIcon, setShowIcon] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyDes, setCompanyDec] = useState("");
  const [email, setEmail] = useState("");
  const [websiteData, setWebsiteData] = useState("");
  const [languageData, setLanguageData] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [renderPage, setRenderPage] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [industryname, setindustryname] = useState(null);

  // Add industry
  const [industry_name, setIndustryName] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    phoneNum: null,
    websiteData: null,
    companyName: null,
    companyDes: null,
  });

  const { jobuseragency, In_progress_jobs, Total_Job_count } = useSelector(
    (state) => state.alljobcompanyReducer
  );
  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };
  const { userData } = useSelector((state) => state.authReducer);
  const { success: IndustryAddSuccess, industryAddData } = useSelector(
    (state) => state.AgencyindustryAddReducer
  );

  const { industryDetails } = useSelector(
    (state) => state.getIndustryDetailsReducer
  );

  const {
    companiesDec,
    success: companydecSucceess,
    error: companydecError,
    loading: companyLoading,
  } = useSelector((state) => state.companydecpReducer);

  // const {
  //   success: companydecUpdateSucceess,
  //   error: companydecUpdateError,
  //   loading: companyUpdateLoading,
  // } = useSelector((state) => state.companyUpdateReducer);

  // const { agencyadminData, loading: companyLoading } = useSelector(
  //   (state) => state.agencyAdminReducer
  // );

  const { success: editAdminCompanySuccess, error: editAdminCompanyError } =
    useSelector((state) => state.memberAdminEditCompanyListReducer);

  const {
    loading: AdmincompanyLoading,
    success: AdmincompanySuccess,
    AdminCompanyDetails,
  } = useSelector((state) => state.memberAdminGetDetailsCompanyListReducer);

  const [value, setValue] = useState("1");
  const { useradminDetails, loading: loadingUserDetails } = useSelector(
    (state) => state.UserAdminDetailsReducer
  );

  //AGENCY ID REDUX
  const {
    memberCompanyAdmin,
    agecyIdCompany,
    agecyNameCompany,
    success: successCompanyList,
  } = useSelector((state) => state.memberAdminCompanyListReducer);

  useEffect(() => {
    dispatch(memberAdminCompanyListAction());
  }, []);
  //AGENCY ID REDUX
  const dispatch = useDispatch();
  const { agencyid, companyid } = useParams();
  useEffect(() => {
    dispatch(getUserDetails(agencyid));
  }, []);

  useEffect(() => {
    // setProfileImage(user.profile_img);
  });
  // useEffect(() => {
  //   dispatch(listAllCompaniesdesc(companyid));
  // }, []);

  useEffect(() => {
    dispatch(memberAdminGetDetailsCompanyListAction(companyid));
  }, [editAdminCompanySuccess]);

  useEffect(() => {
    if (industryAddData) {
      setindustryname(industryAddData.id);
    }
  }, [IndustryAddSuccess]);

  useEffect(() => {
    if (AdminCompanyDetails) {
      setCompanyName(AdminCompanyDetails?.data?.name);
      setCompanyDec(AdminCompanyDetails?.data?.description);
      setEmail(AdminCompanyDetails?.data?.company_email);
      setWebsiteData(AdminCompanyDetails?.data?.company_website);
      setPhoneNum(AdminCompanyDetails?.data?.company_phone_number);
      setindustryname(AdminCompanyDetails?.data?.industry);
    }
  }, [AdminCompanyDetails]);

  useEffect(() => {
    if (editAdminCompanySuccess && renderPage) {
      swal({
        title: "Successfully Complete",
        text: "Company successfully updated!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setRenderPage(false);
    }
    if (editAdminCompanyError && renderPage) {
      swal({
        title: "",
        text: editAdminCompanyError,
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      setRenderPage(false);
    }
  }, [editAdminCompanySuccess, editAdminCompanyError]);

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
  const imageTwo = (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 6.94676C14.6246 6.82482 14.548 6.71772 14.4462 6.63843C14.3445 6.55915 14.2219 6.51109 14.0933 6.5001L10.3 5.94676L8.60001 2.5001C8.54542 2.38738 8.46018 2.29232 8.35406 2.22581C8.24795 2.1593 8.12524 2.12402 8.00001 2.12402C7.87477 2.12402 7.75206 2.1593 7.64595 2.22581C7.53983 2.29232 7.4546 2.38738 7.40001 2.5001L5.70001 5.9401L1.90667 6.5001C1.78329 6.51763 1.66729 6.56941 1.57184 6.64954C1.47639 6.72967 1.40531 6.83495 1.36667 6.95343C1.3313 7.06921 1.32813 7.19244 1.35749 7.30989C1.38685 7.42734 1.44764 7.53458 1.53334 7.6201L4.28667 10.2868L3.62001 14.0734C3.59621 14.1984 3.60867 14.3276 3.65592 14.4457C3.70317 14.5639 3.78324 14.666 3.88667 14.7401C3.98748 14.8122 4.10639 14.8547 4.23004 14.863C4.35369 14.8712 4.47719 14.8448 4.58667 14.7868L8.00001 13.0068L11.4 14.7934C11.4936 14.8462 11.5992 14.8738 11.7067 14.8734C11.8479 14.8739 11.9856 14.8296 12.1 14.7468C12.2034 14.6727 12.2835 14.5705 12.3308 14.4524C12.378 14.3343 12.3905 14.2051 12.3667 14.0801L11.7 10.2934L14.4533 7.62676C14.5496 7.54522 14.6207 7.43803 14.6585 7.31766C14.6963 7.19729 14.6991 7.06868 14.6667 6.94676ZM10.5667 9.61343C10.4885 9.68905 10.43 9.78266 10.3963 9.88608C10.3626 9.9895 10.3547 10.0996 10.3733 10.2068L10.8533 13.0001L8.34667 11.6668C8.25022 11.6154 8.14262 11.5885 8.03334 11.5885C7.92406 11.5885 7.81646 11.6154 7.72001 11.6668L5.21334 13.0001L5.69334 10.2068C5.71196 10.0996 5.70408 9.9895 5.67038 9.88608C5.63668 9.78266 5.57819 9.68905 5.50001 9.61343L3.50001 7.61343L6.30667 7.20676C6.41467 7.19174 6.51734 7.15046 6.60567 7.08653C6.69401 7.02261 6.76531 6.93799 6.81334 6.8401L8.00001 4.3001L9.25334 6.84676C9.30137 6.94466 9.37267 7.02927 9.46101 7.0932C9.54934 7.15712 9.65201 7.19841 9.76001 7.21343L12.5667 7.6201L10.5667 9.61343Z"
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
        d="M13.2667 8.94009C13.1598 8.81843 13.1008 8.66203 13.1008 8.50009C13.1008 8.33815 13.1598 8.18175 13.2667 8.06009L14.12 7.10009C14.214 6.9952 14.2724 6.86323 14.2868 6.7231C14.3012 6.58297 14.2708 6.44188 14.2 6.32009L12.8667 4.01343C12.7966 3.89177 12.6899 3.79534 12.5618 3.73788C12.4337 3.68042 12.2908 3.66486 12.1533 3.69343L10.9 3.94676C10.7405 3.97971 10.5745 3.95315 10.4333 3.87209C10.292 3.79103 10.1853 3.66108 10.1333 3.50676L9.72667 2.28676C9.68194 2.15435 9.59674 2.03934 9.48309 1.95799C9.36944 1.87664 9.2331 1.83307 9.09334 1.83343H6.42667C6.28129 1.82584 6.13742 1.86604 6.01705 1.9479C5.89667 2.02976 5.80639 2.14877 5.76 2.28676L5.38667 3.50676C5.33467 3.66108 5.22798 3.79103 5.08674 3.87209C4.9455 3.95315 4.77948 3.97971 4.62 3.94676L3.33334 3.69343C3.20304 3.67501 3.0702 3.69557 2.95157 3.75252C2.83293 3.80946 2.7338 3.90024 2.66667 4.01343L1.33334 6.32009C1.26078 6.44053 1.22815 6.58082 1.24012 6.72091C1.2521 6.861 1.30806 6.99372 1.4 7.10009L2.24667 8.06009C2.35355 8.18175 2.41249 8.33815 2.41249 8.50009C2.41249 8.66203 2.35355 8.81843 2.24667 8.94009L1.4 9.90009C1.30806 10.0065 1.2521 10.1392 1.24012 10.2793C1.22815 10.4194 1.26078 10.5597 1.33334 10.6801L2.66667 12.9868C2.73673 13.1084 2.84341 13.2048 2.9715 13.2623C3.09959 13.3198 3.24255 13.3353 3.38 13.3068L4.63333 13.0534C4.79281 13.0205 4.95884 13.047 5.10008 13.1281C5.24132 13.2092 5.348 13.3391 5.4 13.4934L5.80667 14.7134C5.85305 14.8514 5.94333 14.9704 6.06371 15.0523C6.18409 15.1341 6.32796 15.1743 6.47333 15.1668H9.14C9.27976 15.1671 9.41611 15.1235 9.52975 15.0422C9.6434 14.9608 9.72861 14.8458 9.77333 14.7134L10.18 13.4934C10.232 13.3391 10.3387 13.2092 10.4799 13.1281C10.6212 13.047 10.7872 13.0205 10.9467 13.0534L12.2 13.3068C12.3375 13.3353 12.4804 13.3198 12.6085 13.2623C12.7366 13.2048 12.8433 13.1084 12.9133 12.9868L14.2467 10.6801C14.3175 10.5583 14.3478 10.4172 14.3335 10.2771C14.3191 10.137 14.2607 10.005 14.1667 9.90009L13.2667 8.94009ZM12.2733 9.83343L12.8067 10.4334L11.9533 11.9134L11.1667 11.7534C10.6865 11.6553 10.187 11.7368 9.76306 11.9826C9.33908 12.2284 9.0201 12.6213 8.86667 13.0868L8.61333 13.8334H6.90667L6.66667 13.0734C6.51324 12.608 6.19426 12.2151 5.77027 11.9693C5.34629 11.7235 4.84682 11.6419 4.36667 11.7401L3.58 11.9001L2.71334 10.4268L3.24667 9.82676C3.57464 9.46008 3.75596 8.98538 3.75596 8.49343C3.75596 8.00147 3.57464 7.52677 3.24667 7.16009L2.71334 6.56009L3.56667 5.09343L4.35334 5.25343C4.83348 5.35157 5.33295 5.27001 5.75694 5.02422C6.18092 4.77844 6.4999 4.38553 6.65333 3.92009L6.90667 3.16676H8.61333L8.86667 3.92676C9.0201 4.3922 9.33908 4.7851 9.76306 5.03089C10.187 5.27668 10.6865 5.35824 11.1667 5.26009L11.9533 5.10009L12.8067 6.58009L12.2733 7.18009C11.949 7.54593 11.77 8.01788 11.77 8.50676C11.77 8.99564 11.949 9.46759 12.2733 9.83343ZM7.76 5.83343C7.23258 5.83343 6.71701 5.98982 6.27848 6.28284C5.83995 6.57586 5.49816 6.99233 5.29632 7.4796C5.09449 7.96687 5.04168 8.50305 5.14457 9.02033C5.24747 9.53762 5.50144 10.0128 5.87438 10.3857C6.24732 10.7587 6.72248 11.0126 7.23976 11.1155C7.75704 11.2184 8.29322 11.1656 8.78049 10.9638C9.26776 10.7619 9.68424 10.4201 9.97725 9.98161C10.2703 9.54308 10.4267 9.02751 10.4267 8.50009C10.4267 7.79285 10.1457 7.11457 9.64562 6.61447C9.14552 6.11438 8.46725 5.83343 7.76 5.83343ZM7.76 9.83343C7.49629 9.83343 7.23851 9.75523 7.01924 9.60872C6.79998 9.46221 6.62908 9.25397 6.52816 9.01034C6.42725 8.7667 6.40084 8.49861 6.45229 8.23997C6.50374 7.98133 6.63072 7.74375 6.81719 7.55728C7.00366 7.37081 7.24124 7.24383 7.49988 7.19238C7.75852 7.14093 8.02661 7.16734 8.27025 7.26825C8.51388 7.36917 8.72212 7.54007 8.86863 7.75933C9.01514 7.9786 9.09334 8.23638 9.09334 8.50009C9.09334 8.85371 8.95286 9.19285 8.70281 9.4429C8.45276 9.69295 8.11362 9.83343 7.76 9.83343Z"
        fill="#71757B"
      />
    </svg>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleDialogOpen = () => {
    setOpen4(true);
  };

  const handleDialogOpenA = () => {
    setOpen5(true);
    handleClose7();
  };
  const handleClose7 = () => {
    setOpen4(false);
  };

  const handleClose8 = () => {
    setOpen5(false);
  };

  const validateAddIndustry = (e) => {
    e.preventDefault();
    const tempErrors = {
      industry_name: validations.industry_name(industry_name),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    addindustryHandler();
  };

  const addindustryHandler = () => {
    dispatch(
      AgencygetIndustryAdd({
        industry_name,
        // description,
        // is_active: status,
      })
    );
    handleClose8();
    // TODO: Add sweetalert
    handleDialogOpen();
  };

  const validationSubmit7 = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
      // websiteData: !websiteData && "Please Enter the website",
      companyName: !companyName && "Please enter company name",
      // companyDes: !companyDes && "please Enter Desc",
      // phoneNum:!phoneNum && "please Enter Phone",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      // console.log(
      //   "..values",
      //   Object.values(tempErrors).filter((value) => value)
      // );
      return;
    }
    submitHandler7();
  };

  const submitHandler7 = () => {
    const formData = new FormData();

    formData.append("agency", userData?.user?.user_id);
    formData.append("name", companyName);
    formData.append("company_email", email);
    formData.append("description", companyDes);
    formData.append("company_phone_number", phoneNum);
    formData.append("company_website", websiteData);
    if (industryname) {
      formData.append("industry", industryname);
    } else {
      formData.append("industry", "");
    }

    dispatch(memberAdminEditCompanyListAction(formData, companyid));
    setRenderPage(true);
    setOpen4(false);
  };

  useEffect(() => {
    dispatch(getIndustryDetails());
  }, [IndustryAddSuccess]);

  return (
    <>
      {/* {JSON.stringify(industryDetails)} */}
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
                      src={AdminCompanyDetails?.data?.company_profile_img}
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
                  <h3>{AdminCompanyDetails?.data?.name}</h3>
                  <span className="fourPointEight">
                    <img src="/img/starProfile.png" />
                    4.8
                  </span>
                </div>

                <p>
                  {AdminCompanyDetails?.data?.description == "null"
                    ? ""
                    : AdminCompanyDetails?.data?.description}
                </p>
                <div className="jobsFourInProgress">
                  <div className="OnejobsFourInProgress">
                    <h5 className="oneEightJobs">
                      {AdminCompanyDetails?.Total_Job_count}
                      <br />
                      <span className="jobsOneZero">Jobs</span>
                    </h5>
                  </div>
                  {/* <div className="TwojobsFourInProgress">
                    <h5 className="oneEightJobs">
                      {In_progress_jobs}
                      <br />
                      <span className="jobsOneZero">In progress</span>
                    </h5>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="dotsMessagehireMain">
              <div className="threeDotsprofile">
                <img src="/img/imgvisit.png" alt="" />
              </div>
            </div> */}
            {userData?.user?.role == Object.keys(ROLE)[3] &&
              userData?.user?.user_level === 1 && (
                <>
                  <div className="dotsMessagehireMain">
                    <button
                      onClick={(e) => handleDialogOpen(e)}
                      className="hireMeBtnPProfile"
                    >
                      <img src="/img/editnew.png" />
                      Edit Profile
                    </button>
                  </div>
                </>
              )}

            <div className="aboutMeDesFullW">
              <Dialog
                className="aboutmediv profileImgDialogNewProWidth"
                open={open4}
                onClose={handleClose7}
              >
                <DialogTitle className="profileImgHeading">
                  Edit Profile
                  <span onClick={handleClose7}>
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </DialogTitle>
                <div className="dialogcontent_and_actions aboutMeDesFullW">
                  <DialogContent className="profile_title_description">
                    <div>
                      <div className="NewMailNameAndInput">
                        <div className="formGroupOneProfilePop">
                          <div
                            className={
                              errors.companyName
                                ? "inputCntnr profileinpProfilePop error"
                                : "inputCntnr profileinpProfilePop"
                            }
                          >
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Company Name
                            </h3>
                            <input
                              className="NameorEmailNewPop"
                              type="text"
                              placeholder="Enter Comapny Name"
                              onChange={(e) => setCompanyName(e.target.value)}
                              value={companyName}
                              required
                              autoComplete="nope"
                            />
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.companyName ? 1 : 0,
                              }}
                            >
                              {errors.companyName ?? "valid"}
                            </span>
                          </div>
                          <div className="inputCntnr profileinpProfilePop">
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Description
                            </h3>
                            <input
                              className="NameorEmailNewPop"
                              type="text"
                              placeholder="Enter Comapny Description"
                              onChange={(e) => setCompanyDec(e.target.value)}
                              value={companyDes}
                              required
                              autoComplete="nope"
                            />
                          </div>
                        </div>
                        <div className="formGroupOneProfilePop">
                          <div
                            className={
                              errors.email
                                ? "inputCntnr profileinpProfilePop error"
                                : "inputCntnr profileinpProfilePop"
                            }
                          >
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Email
                            </h3>
                            <input
                              className="NameorEmailNewPop"
                              type="email"
                              placeholder="Enter Email"
                              onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: null });
                              }}
                              value={email == "" ? "" : email}
                              required
                              autoComplete="nope"
                            />
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.email ? 1 : 0,
                              }}
                            >
                              {errors.email ?? "valid"}
                            </span>
                          </div>
                          <div className="inputCntnr profileinpProfilePop">
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Phone Number
                            </h3>
                            <input
                              className="NameorEmailNewPop"
                              type="tel"
                              placeholder="Enter Phone"
                              onChange={(e) => setPhoneNum(e.target.value)}
                              value={phoneNum == "null" ? "" : phoneNum}
                              required
                              autoComplete="nope"
                            />
                          </div>
                        </div>
                        <div className="formGroupOneProfilePop">
                          <div className="inputCntnr profileinpProfilePop">
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Website
                            </h3>
                            <input
                              className="NameorEmailNewPop"
                              type="text"
                              placeholder="Enter Website"
                              onChange={(e) => setWebsiteData(e.target.value)}
                              value={websiteData == "null" ? "" : websiteData}
                              required
                              autoComplete="nope"
                            />
                          </div>

                          <div className="inputCntnr profileinpProfilePop sameAllInputEditProfile">
                            {/* {JSON.stringify(industryname)} */}
                            <h3 className="nameOrEmailText nomarginCompanyorEmail">
                              Industry{" "}
                              <span className="addindustry">
                                <button
                                  onClick={(e) => handleDialogOpenA(e)}
                                  className="hireMeIndustry"
                                >
                                  + Add Industry
                                </button>
                                {/* <Link to="/AgencyIndustry">Add Industry</Link> */}
                              </span>
                            </h3>
                            <Select
                              className={
                                industryname === null
                                  ? "selectinputcolor"
                                  : "menuiteminputcolor"
                              }
                              open={isOpen2}
                              onOpen={() => {
                                setIsOpen2(true);
                              }}
                              onClose={() => {
                                setIsOpen2(false);
                              }}
                              MenuProps={menuProps}
                              value={industryname}
                              onChange={(e) => {
                                setindustryname(e.target.value);
                                // setErrors({ ...errors, level: null });
                              }}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                            >
                              <MenuItem value={null}>Select Industry</MenuItem>
                              {industryDetails?.map((item) =>
                                item.is_active ? (
                                  <MenuItem key={item.id} value={item.id}>
                                    {item?.industry_name}
                                  </MenuItem>
                                ) : null
                              )}
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </div>
                <DialogActions>
                  <div className="sharebuttonjobcontent">
                    <div className="cancelButtonnewWithSave">
                      <button
                        onClick={handleClose7}
                        className="canceButtonnewPop"
                      >
                        Cancel
                      </button>
                      <button
                        className="shareNewPopPublic"
                        onClick={(e) => validationSubmit7(e)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          <div className="agencyindiv">
            <Dialog
              className="aboutmediv agecnyProWidth"
              open={open5}
              onClose={handleClose8}
            >
              <DialogTitle className="profileImgHeading">
                Add Industry
                <span onClick={handleClose8}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </DialogTitle>
              <div className="Agncyjbin">
                <DialogContent className="Agncyjbin_description">
                  <div className="agncyinsec">
                    <input
                      className="addindu"
                      value={industry_name}
                      onChange={(e) => setIndustryName(e.target.value)}
                      type="text"
                      placeholder="Add Industry"
                    />
                    <div className="saveinde">
                      <button
                        onClick={validateAddIndustry}
                        className="inaddbtn"
                      >
                        Save
                      </button>

                      <button
                        onClick={handleClose8}
                        className="canceButtonnewPop"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </div>
            </Dialog>
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
                      <Tab
                        className={value == "2" ? "lab active8 " : " lab "}
                        icon={imageThree}
                        iconPosition="start"
                        label="Users"
                        value="2"
                      />
                      <Tab
                        className={value == "3" ? "lab active8 " : " lab "}
                        icon={imageThree}
                        iconPosition="start"
                        label="Approval workflows"
                        value="3"
                      />
                      <Tab
                        className={value == "4" ? "lab active8 " : " lab "}
                        icon={imageThree}
                        iconPosition="start"
                        label="Jobs"
                        value="4"
                      />
                      <Tab
                        className={value == "5" ? "lab active8 " : " lab "}
                        icon={imageThree}
                        iconPosition="start"
                        label="Job Template"
                        value="5"
                      />
                      {/* <Tab
                        className={value == "6" ? "lab active8 " : " lab "}
                        icon={imageThree}
                        iconPosition="start"
                        label="Account Setting"
                        value="6"
                      /> */}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {/* <Agency_company_information showIcon={showIcon} /> */}
                    <Member_Admin_company_information showIcon={showIcon} />
                  </TabPanel>
                  <TabPanel value="2">
                    {/* <Agency_company_users /> */}
                    <Member_Admin_company_Users />
                  </TabPanel>
                  <TabPanel value="3">
                    {/* <Agency_wokflow_companydata /> */}
                    <Member_admin_workflow_companyData />
                  </TabPanel>
                  <TabPanel value="4">
                    {/* <Agency_jobList_companydata /> */}
                    <Member_admin_joblist_companyData />
                  </TabPanel>
                  <TabPanel value="5">
                    {/* <Agency_company_template /> */}
                    <Member_admin_company_template_list />
                  </TabPanel>
                  {/* <TabPanel value="6">
                    <Agency_company_setting />
                  </TabPanel> */}
                </TabContext>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member_Admin_company_Datalist;
