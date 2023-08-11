import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Slide from "@mui/material/Slide";
import { LinkContainer } from "react-router-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import LoadingSpinner from "../../containers/LoadingSpinner";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import axios from "axios";
// import {listAgencyJobs } from "../../redux/actions/job-actions";
import swal from "sweetalert";
import { Button } from "@mui/material";
import { deleteJob } from "../../redux/actions/job-actions";
// import { defaultPageLoader } from "../../redux/actions/other-actions";
import { getJobDetails } from "../../redux/actions/job-actions";

import {
  listAllJobs,
  Blockjobs,
} from "../../redux/actions/Agency-data-actions";
import { listAllCompaniesdesc } from "../../redux/actions/company-actions";
import { validations } from "../../utils";
import { data } from "jquery";
import { updateCompanyDetails } from "../../redux/actions/company-actions";
import { memberApproverCompanyDataAction } from "../../redux/actions/Member-Approver-comapny-action";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Member_Approver_Company_information() {
  const [usersForRender, setUsersForRender] = useState([]);
  const [email, setemail] = useState("");
  const [websiteData, setWebsiteData] = useState("");
  const [languageData, setLanguageData] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errors, setErrors] = useState({
    email: null,
    phoneNum: null,
    websiteData: null,
    languageData: null,
    // currPassword: null,
    // password: null,
    // comPassword: null,
  });
  // console.log("########################################",props.showIcon)
  const {
    jobuser,
    success: successList,
    count,
  } = useSelector((state) => state.alljobReducer);

  const {
    blockjob,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.blockJobsReducer);

  const {
    companyData,
    success: comUpSuccess,
    error: compUpError,
  } = useSelector((state) => state.companyUpdateReducer);

  const { companyid, agencyId } = useParams();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );
  const [jobId, setJobId] = useState();
  const [jobStatus, setJobStatus] = useState(false);
  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();

  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);

  const [newJobDetails, setNewJobDetails] = useState(false);
  const {
    agencyJobData,

    loading: jobLoading,
  } = useSelector((state) => state.agencyJobReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  const [page, setPage] = useState(1);

  const [isFetching, setIsFetching] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1500);

  // -------------my changes start-------------------

  // const { companiesDec, loading: companyLoading } = useSelector(
  //   (state) => state.companydecpReducer
  // );

  const { memberCompanyData } = useSelector(
    (state) => state.memberApproverComapnyDataReducer
  );
  // console.log("memberCompanyData",memberCompanyData);

  useEffect(() => {
    dispatch(memberApproverCompanyDataAction(companyid));
  }, []);

  // useEffect(() => {
  //   dispatch(listAllCompaniesdesc(companyid));
  // }, [comUpSuccess]);

  // -------------my changes start-------------------

  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  //   console.log("--------------------------", userData?.user?.name);
  //   console.log("--------------------------", userData?.user?.user_id);

  const { loading } = useSelector((state) => state.loaderReducer);

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };
  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", prevpage);
    navigate(`/companydata/${companyid}?${urlParams}`);
  };

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", nextpage);
    navigate(`/companydata/${companyid}?${urlParams}`);
  };

  useEffect(() => {
    if (jobuser) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [jobuser]);

  useEffect(() => {
    if (!isFetching) return;
  }, [isFetching]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const { agencyadminData } = useSelector((state) => state.agencyAdminReducer);

  const [rerender, setRerender] = useState(false);
  const [jobIds, setJobID] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [userStatus, setUserStatus] = useState(false);

  const [myVar, setMyVar] = useState("Applied");

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="allContenOfPrivateAbout">
            <div className="AboutMeTitleDigitalM">
              <h3 className="comapany_text_profle">Owner</h3>
              <p>{memberCompanyData?.agency_name}</p>
            </div>
            <div className="AboutMeTitleDigitalM">
              <h3>Email</h3>
              <p>{memberCompanyData?.company_email}</p>
            </div>
            <div className="AboutMeTitleDigitalM">
              <h3>Phone</h3>
              <p>{memberCompanyData?.company_phone_number}</p>
            </div>
            <div className="AboutMeTitleDigitalM">
              <h3>Website</h3>
              <p>
                {memberCompanyData?.company_website}{" "}
                <img src="/img/external-link-alt.png" />
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Member_Approver_Company_information;
