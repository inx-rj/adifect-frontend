import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MDBDataTable } from "mdbreact";
import { ROLE } from "../../constants/other-constants";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Agency_company_information(props) {
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

  const { companiesDec, loading: companyLoading } = useSelector(
    (state) => state.companydecpReducer
  );

  useEffect(() => {
    dispatch(listAllCompaniesdesc(companyid));
  }, [comUpSuccess]);

  // -------------my changes start-------------------

  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  // console.log("--------------------------", userData?.user?.name);
  // console.log("--------------------------", userData?.user?.user_id);

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
    dispatch(listAllJobs(companyid, agencyId, currentPage));
  }, [currentPage, successUpdate]);

  // useEffect(() => {
  //   dispatch(listAllJobs());
  // }, [successUpdate]);

  useEffect(() => {
    if (!isFetching) return;
  }, [isFetching]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this job?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteJob(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = async (item_id) => {
    setJobId(item_id);
    await dispatch(getJobDetails(item_id));
    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (successList) {
      setTitle(jobuser.title);
      setJobDescription(jobuser.description);
      // setJobDocuments(jobuser.images);
      setDeliveryDate(jobuser.expected_delivery_date);
      setOfferPrice(jobuser.price);
      setTags(jobuser.tags);
      setCategory(jobuser.category);
      setSkills(jobuser.skills);
      setIndustry(jobuser.industry);
      setLevel(jobuser.level);
      setJobType(jobuser.get_jobType_details);
      setCompanyType(jobuser.company_name);

      let arrJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      // if (jobuser.images.length > 0) {
      //   for (let i = 0; i < jobuser.images.length; i++) {
      //     arrJobDocuments.push(jobuser.images[i].job_images);
      //     arrAdditionalJobDocuments.push(jobuser.images[i].work_sample_images);
      //   }
      // }

      setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      setAdditionalJobDocuments(
        arrAdditionalJobDocuments.filter((x) => x !== null)
      );
      setNewJobDetails(false);
    }
  }, [jobuser, successList]);

  const closePopup = () => {
    setIsOpen(false);
    // setJobId();
    setTitle();
    setJobDescription();
    setJobDocuments([]);
    setAdditionalJobDocuments([]);
    setDeliveryDate();
    setOfferPrice();
    setTags();
    setCategory();
    setSkills();
    setIndustry();
    setLevel();
    setJobType();
    setCompanyType();
  };

  const { agencyadminData } = useSelector((state) => state.agencyAdminReducer);

  const [rerender, setRerender] = useState(false);
  const [jobIds, setJobID] = useState(null);
  const [jobTitle, setJobTitle] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [userStatus, setUserStatus] = useState(false);

  const validateSubmit = () => {
    dispatch(Blockjobs({ job_id: jobIds, status: userStatus }));
    handleClose();
    setRerender(true);
  };

  useEffect(() => {
    // dispatch(Blockjobs());
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (successUpdate && rerender) {
      swal({
        title: "Successfully Complete",
        text: "Job updated successfully!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 1500,
      });
      setRerender(false);
    }
    if (errorUpdate && rerender) {
      swal({
        title: "Error",
        text: "Something went wrong!",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 1500,
      });
      setRerender(false);
    }
  }, [dispatch, successUpdate, errorUpdate]);

  const [myVar, setMyVar] = useState("Applied");
  useEffect(() => {
    const switchTab = localStorage.getItem("projectsTab");
    if (switchTab) {
      localStorage.removeItem("projectsTab");
      setMyVar(switchTab);
    }
  }, []);

  const handleClickOpen7 = () => {
    setOpen7(true);
  };
  const handleClose7 = () => {
    setOpen7(false);
  };
  const handleClickOpen4 = () => {
    setOpen4(true);
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClickOpen5 = () => {
    setOpen5(true);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClickOpen6 = () => {
    setOpen6(true);
  };
  const handleClose6 = () => {
    setOpen6(false);
  };

  const validationSubmit7 = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler7();
  };
  const submitHandler7 = () => {
    dispatch(
      updateCompanyDetails(companyid, {
        company_email: email,
        name: userData?.user?.name,
      })
    );
    setOpen7(false);
  };

  const validationSubmit4 = (e) => {
    e.preventDefault();
    const tempErrors = {
      phoneNum: validations.phoneNumber1(phoneNum),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler4();
  };

  const submitHandler4 = () => {
    dispatch(
      updateCompanyDetails(companyid, {
        company_phone_number: phoneNum,
        name: userData?.user?.name,
      })
    );
    setOpen4(false);
  };

  const validationSubmit5 = (e) => {
    e.preventDefault();
    const tempErrors = {
      websiteData: !websiteData && "Please Enter the website",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler5();
  };

  const submitHandler5 = () => {
    dispatch(
      updateCompanyDetails(companyid, {
        company_website: websiteData,
        name: userData?.user?.name,
      })
    );
    setOpen5(false);
  };

  const validationSubmit6 = (e) => {
    e.preventDefault();
    const tempErrors = {
      languageData: !languageData && "Please Enter the website",
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      console.log(
        "..values",
        Object.values(tempErrors).filter((value) => value)
      );
      return;
    }
    submitHandler6();
  };

  const submitHandler6 = () => {
    dispatch(
      updateCompanyDetails(companyid, {
        company_Language: languageData,
        name: userData?.user?.name,
      })
    );
    setOpen6(false);
  };

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
              <p>{companiesDec?.agency_name}</p>
            </div>
            {/* -----------------------------------------email---------------------------------------------             */}
            <div className="AboutMeTitleDigitalM">
              <h3>Email</h3>
              <p>
                {companiesDec?.company_email == "null"
                  ? ""
                  : companiesDec?.company_email}
              </p>
              {props.showIcon && (
                <div className="editIconShowOrHideD">
                  {" "}
                  <img
                    onClick={handleClickOpen7}
                    src="/img/editicon.png"
                    alt=""
                  />
                </div>
              )}
              <div className="aboutMeDesFullW">
                <Dialog
                  className="aboutmediv"
                  open={open7}
                  onClose={handleClose7}
                >
                  <DialogTitle className="profileImgHeading">
                    Email
                    <span onClick={handleClose7}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions aboutMeDesFullW">
                    <DialogContent className="profile_title_description">
                      <div>
                        <h3 className="ChangeCurrentEmailPop">Current Email</h3>
                        <p className="ChangeCurrentEmNamelPop">
                          {companiesDec?.company_email == "null"
                            ? ""
                            : companiesDec?.company_email}
                        </p>
                        <div className="NewMailNameAndInput">
                          <div
                            className={
                              errors.email
                                ? "inputCntnr error"
                                : "inputCntnr CategoryinputH"
                            }
                          >
                            <h3 className="nameOrEmailText">New Email</h3>
                            <input
                              className="NameorEmailNewPop"
                              type="email"
                              placeholder="Email Address"
                              onChange={(e) => {
                                setemail(e.target.value);
                                setErrors({ ...errors, email: null });
                              }}
                              value={email}
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
                        </div>
                      </div>
                    </DialogContent>
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
                            onClick={validationSubmit7}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>
              </div>
            </div>
            {/* ----------------------------------------phone------------------------------------------             */}
            <div className="AboutMeTitleDigitalM">
              <h3>Phone</h3>
              <p>
                {companiesDec?.company_phone_number == "null"
                  ? ""
                  : companiesDec?.company_phone_number}
              </p>
              {props.showIcon && (
                <div className="editIconShowOrHideD">
                  {" "}
                  <img
                    onClick={handleClickOpen4}
                    src="/img/editicon.png"
                    alt=""
                  />
                </div>
              )}
              <div className="aboutMeDesFullW">
                <Dialog
                  className="aboutmediv"
                  open={open4}
                  onClose={handleClose4}
                >
                  <DialogTitle className="profileImgHeading">
                    Phone
                    <span onClick={handleClose4}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions aboutMeDesFullW">
                    <DialogContent className="profile_title_description">
                      <div>
                        <h3 className="ChangeCurrentEmailPop">Current phone</h3>
                        <p className="ChangeCurrentEmNamelPop">
                          {companiesDec?.company_phone_number == "null"
                            ? ""
                            : companiesDec?.company_phone_number}
                        </p>
                        <div className="NewMailNameAndInput">
                          <div
                            className={
                              errors.phoneNum
                                ? "inputCntnr error"
                                : "inputCntnr CategoryinputH"
                            }
                          >
                            <h3 className="nameOrEmailText">New phone</h3>
                            <input
                              className="NameorEmailNewPop"
                              type="tel"
                              placeholder="Email Address"
                              onChange={(e) => {
                                setPhoneNum(e.target.value);
                                setErrors({ ...errors, phoneNum: null });
                              }}
                              value={phoneNum}
                              required
                              autoComplete="nope"
                            />
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.phoneNum ? 1 : 0,
                              }}
                            >
                              {errors.phoneNum ?? "valid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <div className="sharebuttonjobcontent">
                        <div className="cancelButtonnewWithSave">
                          <button
                            onClick={handleClose4}
                            className="canceButtonnewPop"
                          >
                            Cancel
                          </button>
                          <button
                            className="shareNewPopPublic"
                            onClick={validationSubmit4}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>
              </div>
            </div>
            {/* -----------------------------------website------------------------------------------- */}
            <div className="AboutMeTitleDigitalM">
              <h3>Website</h3>
              <p>
                {companiesDec?.company_website == "null"
                  ? ""
                  : companiesDec?.company_website}{" "}
                <img src="/img/external-link-alt.png" />
              </p>

              {props.showIcon && (
                <div className="editIconShowOrHideD">
                  {" "}
                  <img
                    onClick={handleClickOpen5}
                    src="/img/editicon.png"
                    alt=""
                  />
                </div>
              )}
              <div className="aboutMeDesFullW">
                <Dialog
                  className="aboutmediv"
                  open={open5}
                  onClose={handleClose5}
                >
                  <DialogTitle className="profileImgHeading">
                    Website
                    <span onClick={handleClose5}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions aboutMeDesFullW">
                    <DialogContent className="profile_title_description">
                      <div>
                        <h3 className="ChangeCurrentEmailPop">
                          Current website
                        </h3>
                        <p className="ChangeCurrentEmNamelPop">
                          {companiesDec?.company_website == "null"
                            ? ""
                            : companiesDec?.company_website}
                        </p>
                        <div className="NewMailNameAndInput">
                          <div
                            className={
                              errors.websiteData
                                ? "inputCntnr error"
                                : "inputCntnr CategoryinputH"
                            }
                          >
                            <h3 className="nameOrEmailText">New Website</h3>
                            <input
                              className="NameorEmailNewPop"
                              type="email"
                              placeholder="Email Address"
                              onChange={(e) => {
                                setWebsiteData(e.target.value);
                                setErrors({ ...errors, websiteData: null });
                              }}
                              value={websiteData}
                              required
                              autoComplete="nope"
                            />
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.websiteData ? 1 : 0,
                              }}
                            >
                              {errors.websiteData ?? "valid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <div className="sharebuttonjobcontent">
                        <div className="cancelButtonnewWithSave">
                          <button
                            onClick={handleClose5}
                            className="canceButtonnewPop"
                          >
                            Cancel
                          </button>
                          <button
                            className="shareNewPopPublic"
                            onClick={validationSubmit5}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>
              </div>
            </div>
            <div className="AboutMeTitleDigitalM">
              {/* {JSON.stringify(companiesDec)} */}
              <h3>Industry</h3>
              <p>
                {companiesDec?.industry_name == "null"
                  ? ""
                  : companiesDec?.industry_name}{" "}
              </p>
            </div>

            {/* -----------------------------------language---------------------------------------------- */}
            <div className="AboutMeTitleDigitalM">
              {/* <h3>Language</h3>
              <p>{companiesDec?.company_Language}</p>
              {props.showIcon && (
                <div className="editIconShowOrHideD">
                  {" "}
                  <img
                    onClick={handleClickOpen6}
                    src="/img/editicon.png"
                    alt=""
                  />
                </div>
              )} */}
              <div className="aboutMeDesFullW">
                <Dialog
                  className="aboutmediv"
                  open={open6}
                  onClose={handleClose6}
                >
                  <DialogTitle className="profileImgHeading">
                    Language
                    <span onClick={handleClose6}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions aboutMeDesFullW">
                    <DialogContent className="profile_title_description">
                      <div>
                        <h3 className="ChangeCurrentEmailPop">
                          Current Language
                        </h3>
                        <p className="ChangeCurrentEmNamelPop">
                          {companiesDec?.company_Language}
                        </p>
                        <div className="NewMailNameAndInput">
                          <div
                            className={
                              errors.languageData
                                ? "inputCntnr error"
                                : "inputCntnr CategoryinputH"
                            }
                          >
                            <h3 className="nameOrEmailText">New Email</h3>
                            <input
                              className="NameorEmailNewPop"
                              type="email"
                              placeholder="Email Address"
                              onChange={(e) => {
                                setLanguageData(e.target.value);
                                setErrors({ ...errors, languageData: null });
                              }}
                              value={languageData}
                              required
                              autoComplete="nope"
                            />
                            <span
                              style={{
                                color: "#D14F4F",
                                opacity: errors.languageData ? 1 : 0,
                              }}
                            >
                              {errors.languageData ?? "valid"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <div className="sharebuttonjobcontent">
                        <div className="cancelButtonnewWithSave">
                          <button
                            onClick={handleClose6}
                            className="canceButtonnewPop"
                          >
                            Cancel
                          </button>
                          <button
                            className="shareNewPopPublic"
                            onClick={validationSubmit6}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Agency_company_information;
