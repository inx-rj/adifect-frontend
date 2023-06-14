import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listAgencyJobs } from "../../redux/actions/job-actions";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import swal from "sweetalert";
import moment from "moment";
import { Button } from "@mui/material";
import { deleteJob } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";
import { getJobDetails } from "../../redux/actions/job-actions";
import { JOB_DETAILS_RESET } from "../../constants/job-constants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
// import Pagination from "react-bootstrap/Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import {
  AGENCY_JOB_LIST_RESET,
  JOB_LIST_RESET,
} from "../../constants/job-constants";
import { useOutletContext } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import JobTypeSelectionPopup from "../Common/jobTypeSelectionPopup/JobTypeSelectionPopup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Agency_job_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();
  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );
  const [jobId, setJobId] = useState();
  const [publicvalue, setpublicvalue] = useState("all");
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
  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);
  const [jobDocuments, setJobDocuments] = useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] =
    useState([]);

  const [newJobDetails, setNewJobDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  // const [page, setPage] = useState(1);

  const [isFetching, setIsFetching] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [orderingInProgress, setOrderingInProgress] = useState("All Jobs");
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
  const [orderingName, setOrderingName] = useState("All Jobs");
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] =
    useState([]);
  const [searchfeedback, setSearchfeedback] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const [buttonVal, setButtonVal] = useState();
  // JobType Selection popup states
  const [openJobTypeSelectionPopup, setOpenJobTypeSelectionPopup] = useState(false);

  // const { jobData, loading, success } = useSelector(
  //   (state) => state.jobReducer
  // );
  const {
    // jobData,
    agencyJobData,
    count,
    loading: jobListLoading,
  } = useSelector((state) => state.agencyJobReducer);
  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const { loading } = useSelector((state) => state.loaderReducer);
  const handleClickInProgressSort = (event) => {
    setAnchorElInProgress(event.currentTarget);
  };

  // console.log("status", agencyJobData?.[0]?.users_applied_status?.[0]?.status);
  // console.log("all-data", agencyJobData);

  useEffect(() => {
    dispatch({ type: AGENCY_JOB_LIST_RESET });
    dispatch({ type: JOB_LIST_RESET });
    dispatch(defaultPageLoader());
    dispatch({ type: JOB_DETAILS_RESET });

    const formData = new FormData();

    formData.append("currentPage", currentPage);
    formData.append("headerCompany", headerCompany);
    formData.append("filter", orderingInProgress);
    formData.append("search", searchfeedback);

    dispatch(listAgencyJobs(formData));
  }, [success, currentPage, headerCompany, orderingInProgress, searchfeedback]);

  useEffect(() => {
    if (agencyJobData) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [agencyJobData, headerCompany, searchfeedback, orderingInProgress]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteHandler = (id) => {
    swal({
      title: "",
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
    // if (window.confirm("Are you sure you want to delete this job?")) {
    //   dispatch(deleteJob(id));
    // }
  };
  const videoStyle = {
    display: "block",
    width: "100%",
  };

  const openPopup = async (item_id) => {
    setJobId(item_id);
    dispatch(getJobDetails(item_id));
    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (job_detail_success) {
      setTitle(jobDetails.title);
      setJobDescription(jobDetails.description);
      // setJobDocuments(jobDetails.images);
      setDeliveryDate(jobDetails.expected_delivery_date);
      setOfferPrice(jobDetails.price);
      setTags(jobDetails.tags);
      setCategory(jobDetails.category);
      setSkills(jobDetails.skills);
      setIndustry(jobDetails.industry);
      setLevel(jobDetails.level);
      setJobType(jobDetails.get_jobType_details);
      setCompanyType(jobDetails.company_name);

      let arrJobDocuments = [];
      let arrvideoJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      let arrAdditionalvideoJobDocuments = [];
      let arrJobDocumentsThumbs = [];
      let arrvideoJobDocumentsThumbs = [];
      let arrAdditionalJobDocumentsThumbs = [];
      let arrvideoAdditionalJobDocumentsThumbs = [];
      // alert("Okay")
      // console.log("res.data.images -- ", res.data.images);
      if (jobDetails.images.length > 0) {
        for (let i = 0; i < jobDetails.images.length; i++) {
          if (jobDetails.images[i].is_video == false) {
            // console.log(jobDetails.images[i].job_images)
            arrJobDocuments.push(jobDetails.images[i].job_images);
            arrAdditionalJobDocuments.push(
              jobDetails.images[i].work_sample_images
            );
            arrJobDocumentsThumbs.push(
              jobDetails.images[i].job_images_thumbnail
            );
            arrAdditionalJobDocumentsThumbs.push(
              jobDetails.images[i].work_sample_thumbnail
            );
            setJobDocuments(arrJobDocuments.filter((x) => x !== null));
            setAdditionalJobDocuments(
              arrAdditionalJobDocuments.filter((x) => x !== null)
            );
            setJobDocumentsThumbs(
              arrJobDocumentsThumbs.filter((x) => x !== null)
            );
            setJobSampleDocumentsThumbs(
              arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
            );
          } else {
            arrvideoJobDocuments.push(jobDetails.images[i].job_images);
            arrAdditionalvideoJobDocuments.push(
              jobDetails.images[i].work_sample_images
            );
            arrvideoJobDocumentsThumbs.push(jobDetails.images[i].job_images);
            arrvideoAdditionalJobDocumentsThumbs.push(
              jobDetails.images[i].work_sample_thumbnail
            );
            setJobDocumentsvideo(
              arrvideoJobDocuments.filter((x) => x !== null)
            );
            setAdditionalvideoJobDocuments(
              arrAdditionalvideoJobDocuments.filter((x) => x !== null)
            );
            setJobDocumentsvideoThumbs(
              arrvideoJobDocumentsThumbs.filter((x) => x !== null)
            );
            setJobSamplevideoDocumentsThumbs(
              arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
            );
          }
        }
      }

      setNewJobDetails(false);
    }
  }, [job_detail_success, newJobDetails]);

  const closePopup = () => {
    // setIsLoading(true);
    // setTimeout(function () {
    //   setIsLoading(false);
    // }, 1200);

    setIsOpen(false);

    setJobId();
    setTitle();
    setJobDescription();
    setJobDocuments([]);
    setJobDocumentsvideo([]);
    setJobDocumentsvideoThumbs([]);
    setJobSamplevideoDocumentsThumbs([]);
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

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", prevpage);
    navigate(`/jobs/list?${urlParams}`);
  };
  // const publicvalue1 = (e) => {
  //   setpublicvalue(e.target.value);
  //   const formData = new FormData();

  //   formData.append("currentPage", currentPage);
  //   formData.append("headerCompany", headerCompany);
  //   formData.append("filter", e.target.value);

  //   dispatch(listAgencyJobs(formData));
  // };

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", nextpage);
    navigate(`/jobs/list?${urlParams}`);
  };

  const menuOptions = [
    { id: 1, name: "All Jobs" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Expired" },
    { id: 4, name: "Completed" },
  ];

  const handleCloseInProgressSort = () => {
    setAnchorElInProgress(null);
  };

  const menuHandleSort = (event, name) => {
    handleCloseInProgressSort();
    setOrderingInProgress(name);
    setOrderingName(name);
  };

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
  };

  // To open JobType Selection popup
  const handleJobTypeSelectionPopupOpen = () => {
    setOpenJobTypeSelectionPopup(true);
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : jobListLoading ? (
        <LoadingSpinner />
      ) : (
        <> */}
      <div className="Topallpage bak_h">
        <div className="ContentDiv TopM1 agencyjobtoppage">
          <div className="Fresh">
            <div className="Jobs Jobsnewdiv">
              <h1 className="Freshtitle_new">
                {userData?.user?.role == Object.keys(ROLE)[1]
                  ? "Fresh Jobs"
                  : "Job List"}
              </h1>

              {/* <div className="filtersAgencyJobListPage">
                    <button
                      className={
                        buttonVal === "Closed"
                          ? "buttonclosed1 Closedbtnjoblist1"
                          : "buttonclosed1"
                      }
                      onClick={() => {
                        setButtonVal("Closed");
                      }}
                    >
                      Closed
                    </button>
                    <button
                      className={
                        buttonVal === "Applied"
                          ? "buttonclosed2 Closedbtnjoblist1"
                          : "buttonclosed2"
                      }
                      onClick={() => {
                        setButtonVal("Applied");
                      }}
                    >
                      Applied
                    </button>
                    <button
                      className={
                        buttonVal === "Expired"
                          ? "buttonclosed3 Closedbtnjoblist1"
                          : "buttonclosed3"
                      }
                      onClick={() => {
                        setButtonVal("Expired");
                      }}
                    >
                      Expired
                    </button>
                  </div> */}

              <div className="searchActivityPublicP agencyjoblistsearchfilterjob">
                <input
                  className="newSearchActInputPp"
                  type="text"
                  value={searchfeedback}
                  placeholder="Search job"
                  onChange={(e) => setSearchfeedback(e.target.value)}
                />
                <img className="newSearchLogoPp" src="/img/newSearchIcon.png" />
              </div>

              <div className="Sort Sortnewdiv">
                <h6
                  style={{ cursor: "pointer" }}
                  onClick={handleClickInProgressSort}
                >
                  <img src="img/Sort.png" alt="" /> {orderingName}
                </h6>{" "}
                <Menu
                  id="long-menu"
                  MenuListProps={menuProps}
                  anchorEl={anchorElInProgress}
                  keepMounted
                  open={openMenuInProgress}
                  onClose={handleCloseInProgressSort}
                >
                  {menuOptions.map((option) => (
                    <MenuItem
                      className="agencyjobtp"
                      key={option.id}
                      onClick={(e) => menuHandleSort(e, option.name)}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </Menu>
                {/* <select
                      value={publicvalue}
                      onChange={publicvalue1}
                      className="company_contnet"
                    >
                      <option value="all">all</option>
                      <option value="Closed">Closed</option>
                      <option value="Applied">Applied</option>
                      <option value="Expired">Expired</option>
                    </select> */}
              </div>

              {userData?.user?.role !== Object.keys(ROLE)[1] &&
                <div className="FreshBtn FreshBtnag">
                  <button
                    className="all_jobs_poject_button"
                    type="button"
                    onClick={handleJobTypeSelectionPopupOpen}
                  >
                    {" "}
                    <AddIcon sx={{ fontSize: 20, mb: 0.25, mr: 0.625, fontWeight: "light" }} />
                    Create a Job{" "}
                  </button>
                </div>}
            </div>
          </div>

          {openJobTypeSelectionPopup && (
            <JobTypeSelectionPopup
              openJobTypeSelectionPopup={openJobTypeSelectionPopup}
              setOpenJobTypeSelectionPopup={setOpenJobTypeSelectionPopup}
            />
          )}

          {isLoading ? (
            <LoadingSpinner />
          ) : jobListLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className=" FreshJobTop FreshJobTopagencynewdiv">
                <Dialog
                  className="job-custom_popup"
                  open={isOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={closePopup}
                  aria-describedby="alert-dialog-slide-description "
                >
                  <DialogContent>
                    {/* {JSON.stringify(jobDetails)} */}
                    <div className="Topallpage joblisttopdiv">
                      <div className="MarketingDetails-popup ContentDiv border-radius">
                        <div className="Marketingcamaign">
                          <div className="CategorylistName">
                            <div className="jobdes_newdiv11">
                              <h2>{jobDetails?.title}</h2>
                            </div>

                            {/* <div className="submitcreatorlist">
                              <>
                                {jobDetails?.job_applied_status == "True" ? (
                                  <span className="jobappied">Job Applied</span>
                                ) : (
                                  <Link to={`/jobs/apply/${jobId}`}>
                                    <button
                                      type="button"
                                      className="btn btn-primary Small border-radius Small_new_bt"
                                    >
                                      Submit a Proposal
                                    </button>
                                  </Link>
                                )} */}
                            {/* <Link
                                className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                                to={`/jobs/apply/${jobId}`}
                              >
                                {" "}
                                Submit a Proposal{" "}
                              </Link> */}
                            {/* </>
                            </div> */}
                            {/* <div className="FreshBtn">
                              <Link
                                className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                                to={`/jobs/apply/${jobId}`}
                              >
                                {" "}
                                Submit{" "}
                              </Link>
                            </div> */}
                          </div>

                          <p className="duedate duedate_sec">
                            Due on: {jobDetails?.expected_delivery_date}
                          </p>
                          <div className="jobdetailsInProgress">
                            {jobDetails?.hired_users == "" ? (
                              <>
                                <Link
                                  className="jobdetailsInProgressBtn"
                                  to="#"
                                >
                                  Unassigned
                                </Link>
                              </>
                            ) : (
                              <>
                                <Link
                                  className="jobdetailsInProgressBtn"
                                  to="#"
                                >
                                  In Progress
                                </Link>
                              </>
                            )}
                          </div>
                          <p className=" INvehicula">
                            {jobDetails?.description}
                          </p>
                          <h5 className="ProvidedTitle">Provided Media:</h5>
                          {(jobDocuments?.length > 0 ||
                            jobvideoDocuments?.length > 0) && (
                              <>
                                <h6>Job Documents</h6>
                              </>
                            )}

                          <div className="mediaimg Providedmediaimg">
                            {jobDocuments?.map((item, index) => (
                              <div key={index}>
                                <a
                                  index_item={index}
                                  target="_blank"
                                  href={`${item}`}
                                // href={item}
                                >
                                  <li key={index}>
                                    <img
                                      className=""
                                      src={`${jobDocumentsThumbs[index]}`}
                                      alt=""
                                    />
                                  </li>
                                </a>
                              </div>
                            ))}

                            {jobvideoDocuments?.map((item, index) => (
                              <div key={index}>
                                <video className="videounderagency" controls>
                                  <source
                                    src={`${jobvideoDocumentsThumbs[index]}`}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            ))}
                          </div>

                          {/* {jobDocuments?.length < 1 && <div>N/A</div>} */}
                          {(additionalJobDocuments?.length > 0 ||
                            additionalvideoJobDocuments?.length > 0) && (
                              <>
                                <h6>Additional Job Documents</h6>
                              </>
                            )}

                          <div className="mediaimg Providedmediaimg">
                            {additionalJobDocuments?.map((item, index) => (
                              <div key={index}>
                                <a
                                  index_item={index}
                                  target="_blank"
                                  href={`${item}`}
                                // href={item}
                                >
                                  <li key={index}>
                                    <img
                                      className=""
                                      src={`${jobSampleDocumentsThumbs[index]}`}
                                      alt=""
                                    />
                                  </li>
                                </a>
                              </div>
                            ))}

                            {additionalvideoJobDocuments?.map((item, index) => (
                              <div key={index}>
                                <video className="videounderagency" controls>
                                  <source
                                    src={`${jobSamplevideoDocumentsThumbs[index]}`}
                                    type="video/mp4"
                                  />
                                </video>
                              </div>
                            ))}
                          </div>

                          {/* {additionalJobDocuments?.length < 1 && <div>N/A</div>} */}
                          {/* <div className="mediaimg">
                            {jobDetails?.images?.map((item, index) => (
                              <div key={index}>
                                {item.job_images
                                  ?.slice(
                                    ((item.job_images.lastIndexOf("/") - 1) >>>
                                      0) +
                                      2
                                  )
                                  .split(".")
                                  .pop()
                                  .match(/(jpg|jpeg|png|gif)$/i) && (
                                  <a
                                    index_item={index}
                                    target="_blank"
                                    href={`${item?.job_images}`}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        src={`${item?.job_images}`}
                                        alt=""
                                      />
                                    </li>
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                          {jobDetails?.images?.map((item, index) => (
                            <div key={index}>
                              {!item.job_images
                                ?.slice(
                                  ((item.job_images.lastIndexOf("/") - 1) >>>
                                    0) +
                                    2
                                )
                                .split(".")
                                .pop()
                                .match(/(jpg|jpeg|png|gif)$/i) && (
                                <p className="mt-3 f-16" key={index}>
                                  <img
                                    className="mr-2"
                                    src="/img/Document.png"
                                    alt=""
                                  />
                                  <a
                                    index_item={index}
                                    // href={item.job_images}
                                    href={`${item.job_images}`}
                                    target="_blank"
                                    download
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span>
                                      {item.job_images?.slice(
                                        ((item.job_images.lastIndexOf("/") -
                                          1) >>>
                                          0) +
                                          2
                                      )}
                                    </span>
                                  </a>
                                </p>
                              )}
                            </div>
                          ))}
                          {!jobDetails?.images?.length && <>N/A</>} */}
                        </div>
                        <hr className="b-top" />
                        <table>
                          <tr className="Pricetable">
                            <td>
                              <h5 className="colortype">Job Type:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {jobDetails?.get_jobType_details}
                              </p>
                            </td>
                            <td>
                              <h5 className="colortype">Industry:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {jobDetails?.industry_name
                                  ? jobDetails?.industry_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                          {jobDetails?.price && (
                            <tr className="Pricetable">
                              <td>
                                <h5 className="colortype">Offered Price:</h5>
                              </td>
                              <td>
                                <p className="fixedpriceDetail">
                                  ${jobDetails?.price}
                                </p>
                              </td>
                              <td>
                                <h5 className="colortype">Level:</h5>
                              </td>
                              <td>
                                <p className="fixedpriceDetail">
                                  {jobDetails?.level?.level_name}
                                </p>
                              </td>
                            </tr>
                          )}
                        </table>
                        <hr className="b-top" />
                        <table>
                          <tr className="Pricetable">
                            <td>
                              <h5 className="colortype CompanyName">
                                Company:
                              </h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail CompanyNameIn">
                                {jobDetails?.company_name
                                  ? jobDetails?.company_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        {jobDetails?.skills?.length > 0 && (
                          <>
                            <div className="Skill">
                              <h5 className="skillsjobde mb-4">Skills:</h5>
                              {jobDetails?.skills?.map((skill, index) => (
                                <li key={index}>
                                  <Link to="#">{skill.skill_name}</Link>
                                </li>
                              ))}
                              {/* {jobDetails?.skills?.length < 1 && (
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          )} */}
                              {/* {jobDetails?.skills?.map((item) => (
                            <li>
                              <Link to="">{item.skill_name}</Link>
                            </li>
                          ))} */}
                            </div>
                          </>
                        )}
                        {jobDetails?.tags?.length > 0 && (
                          <>
                            <div className="Skill skill169">
                              <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                              {/* {jobDetails?.tags?.split(",").map((tag, index) => (
                            <li key={index}>
                              <Link to="#">{tag}</Link>
                            </li>
                          ))} */}
                              {jobDetails?.tags
                                ?.split(",")
                                .map((tag, index) => (
                                  <li key={index}>
                                    <Link to="#">{tag}</Link>
                                  </li>
                                ))}
                              {/* {jobDetails?.tags?.length < 1 && (
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          )} */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closePopup}>Close</Button>
                  </DialogActions>
                </Dialog>

                {agencyJobData?.map((item, index) => (
                  <div
                    className="agencyjoblistdiv agencyjoblistdivNewHeight"
                    key={index}
                  >
                    {item.is_expire ? (
                      <div className="expiredJobListFilter"></div>
                    ) : item?.users_applied_status?.status == 2 ||
                      item?.users_applied_status?.status == 3 ? (
                      <div className="inProgressJoblistFilter"></div>
                    ) : item?.users_applied_status?.status == 4 ? (
                      <div className="completedJoblistFilter"></div>
                    ) : (
                      <div className="inProgressJoblistFilter"></div>
                    )}

                    <div className="Remotagencylistlistagency">
                      <div className="bt-Title">
                        <div className="joblistTop">
                          <Link to={`/jobs/details/${item.id}`}>
                            <div className="expdiv titleagencyjoblist">
                              <h3>
                                {item.title.length > 15
                                  ? item.title.substring(0, 15) + "..."
                                  : item.title}
                              </h3>

                              <div className="expiredcloseddiv">
                                {/* {item.is_expire && (
                                  <p className="expire expirebak">Expired</p>
                                )} */}
                                {item?.flag && item?.is_expire ? (
                                  <>
                                    <p className="expire">Late</p>
                                  </>
                                ) : (
                                  item?.is_expire &&
                                  agencyJobData?.[0]?.users_applied_status?.[0]
                                    ?.status == 0 && (
                                    <p className="expire expirebak">Expired</p>
                                  )
                                )}
                                {item?.is_active && item.is_expire == false && (
                                  <>
                                    <p className="expire open">Open</p>
                                  </>
                                )}
                                {agencyJobData?.[0]?.users_applied_status?.[0]
                                  ?.status == 4 && (
                                    <>
                                      <p className="expire open">Complete</p>
                                    </>
                                  )}
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="tobbtnjoblist tobbtnjoblistnewagency">
                          <Link to="#">
                            <button
                              type="button"
                              hidden={
                                userData?.user?.role == Object.keys(ROLE)[0] ||
                                userData?.user?.role == Object.keys(ROLE)[2]
                              }
                              className="btn btn-primary Small border-radius"
                            >
                              Apply Now
                            </button>
                          </Link>
                          <button
                            type="button"
                            hidden={
                              userData?.user?.role == Object.keys(ROLE)[1]
                            }
                            className="delJobedeidtbtn "
                            onClick={() => openPopup(item.id)}
                          >
                            <img
                              className="viewicon"
                              src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                              alt=""
                            />
                          </button>
                          {/* <Link to={`/jobs/details/${item.id}`}>
                          <button
                            type="button"
                            // hidden={userData?.user?.role == Object.keys(ROLE)[1]}
                            className="delJobedeidtbtn "
                          >
                            <img
                              className="viewicon"
                              src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                              alt=""
                            />
                          </button>
                        </Link> */}
                          {item?.is_edit && (
                            <>
                              <Link to={`/jobs/${item.id}`} className="flex">
                                <button
                                  type="button"
                                  hidden={
                                    userData?.user?.role == Object.keys(ROLE)[1]
                                  }
                                  className=" delJobedeidtbtn"
                                >
                                  <img
                                    className="editicon"
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/img/editicon.png"
                                    }
                                    alt=""
                                  />
                                </button>
                              </Link>
                              <a
                                onClick={() => deleteHandler(item.id)}
                                className="flex"
                              >
                                <button
                                  type="button"
                                  hidden={
                                    userData?.user?.role == Object.keys(ROLE)[1]
                                  }
                                  className=" delJobedeidtbtn"
                                >
                                  <img
                                    className="editicon"
                                    src={
                                      process.env.PUBLIC_URL + "/img/delet.png"
                                    }
                                    alt=""
                                  />
                                </button>
                              </a>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="jobListDetailsAreaAndTaskbox1">
                        <div className="RemoteText ">
                          <p className="PostedDate">
                            Posted on:{" "}
                            {moment(item?.created).format("yyyy-MM-DD")}
                          </p>
                          <div className="PostedDesc">
                            {item.description?.length > 200
                              ? item.description.substring(0, 200) + "..."
                              : item.description}
                          </div>
                          {item.price && (
                            <>
                              <div className="Budget-Title">
                                <li>
                                  <h5>Budget:</h5>
                                </li>
                                <li>
                                  <h5>${item.price}</h5>
                                </li>
                              </div>

                              <div className="Budget-Title">
                                <li>
                                  <h5>Level:</h5>
                                </li>
                                <li>
                                  <h5>{item?.level?.level_name}</h5>
                                </li>
                              </div>
                            </>
                          )}
                          {item?.skills?.length > 0 && (
                            <>
                              <div className="Skill mt-2 Budget-Title Budget-Title-wrap">
                                <li>
                                  <h5>Skills:</h5>
                                </li>
                                {item?.skills?.length > 0 &&
                                  item?.skills?.map((skill, index) => (
                                    <li key={index}>
                                      <Link to="#">{skill.skill_name}</Link>
                                    </li>
                                  ))}
                                {item?.skills?.length < 1 && (
                                  <li>
                                    <h3 className="colorOnNA">N/A</h3>
                                  </li>
                                )}
                              </div>
                            </>
                          )}
                          {item.tags?.length > 0 && (
                            <>
                              <div className="Skill mt-2 Budget-Title Budget-Title-wrap">
                                <li>
                                  <h5>Tags:</h5>
                                </li>
                                {item.tags?.length > 0 &&
                                  item.tags?.split(",").map((tag, index) => (
                                    <li key={index}>
                                      <Link to="#">{tag}</Link>
                                    </li>
                                  ))}
                                {item.tags?.length < 1 && (
                                  <li>
                                    <h3 className="colorOnNA">N/A</h3>
                                  </li>
                                )}
                                {/* {item.tags?.split(",").map((tag, index) => (
                          <li key={index}>
                            <Link to="#">{tag}</Link>
                          </li>
                        ))} */}
                              </div>
                            </>
                          )}

                          {item?.jobtasks_job?.length > 0 && (
                            <div className="taskBoxJobListCard1414">
                              <div className="taskBoxJobListCardFirstHead">
                                <div className="taskBoxJobListCardFirstNoBg">
                                  <h3 className="taskMember1">Task</h3>
                                  <h3 className="taskMemberd2">Date</h3>
                                </div>
                                <div className="taskBoxJobListCardDetailsDate1">
                                  {item?.jobtasks_job.map((task) => {
                                    return (
                                      <>
                                        <div className="tasksecdiv1">
                                          <div className="tasktitlesec1">
                                            {task?.title}
                                          </div>
                                          <div className="tasktitlesec2">
                                            {task?.due_date}
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="ApplyButton_2">
                            <button
                              type="button"
                              className="btn btn-primary Small border-radius"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {!agencyJobData?.length && (
                  <div className="Topallpage Custompage">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="Topallpage"></div>
      {pages > 1 && (
        <div className="adminjobpagination paginationAdifect">
          <Stack spacing={2}>
            <Pagination
              page={currentPage}
              shape="rounded"
              size="large"
              count={pages}
              onChange={(e, page) => {
                pageHandler(page);
              }}
              color="primary"
            />
          </Stack>
        </div>
      )}
      {/* {pages > 1 && (
            <div className="adminjobpagination">
              <Pagination>
                <Pagination.Prev
                  disabled={currentPage == 1}
                  onClick={() => goToPrevPage(currentPage - 1)}
                />
                {[...Array(pages).keys()].map((x) => (
                  <>
                    <LinkContainer
                      key={x + 1}
                      to={`/jobs/list?page=${x + 1}`}
                      onClick={() => pageHandler(x + 1)}
                    >
                      <Pagination.Item active={x + 1 === currentPage}>
                        {x + 1}
                      </Pagination.Item>
                    </LinkContainer>
                  </>
                ))}
                <Pagination.Next
                  disabled={currentPage == pages}
                  onClick={() => goToNextPage(currentPage + 1)}
                />
              </Pagination>
            </div>
          )} */}
      {/* </>
      )} */}
    </>
  );
}
