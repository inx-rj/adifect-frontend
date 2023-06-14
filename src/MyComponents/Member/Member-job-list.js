import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import swal from "sweetalert";
import moment from "moment";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import Pagination from "react-bootstrap/Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useOutletContext } from "react-router-dom";
import {
  MemberAdminGetJobListAction,
  MemberAdminGetJobListDeleteAction,
  MemberAdminGetJobDetailsAction,
} from "../../redux/actions/Member-Admin-Job-List-Actions";
import Slide from "@mui/material/Slide";
import {
  AVAILABLE_JOB_LIST_RESET,
} from "../../constants/job-constants";
import { MEMBER_ADMIN_JOB_LIST_RESET } from "../../constants/Member-Admin-job-list-constants";
import AddIcon from '@mui/icons-material/Add';
import JobTypeSelectionPopup from "../Common/jobTypeSelectionPopup/JobTypeSelectionPopup";

// import { Item } from "react-bootstrap/lib/Breadcrumb";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Member_job_list() {
  const [isLoading1, setIsLoading1] = useState(true);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );

  const { success: member_Admin_job_detail_success, memberAdminJobDetails } =
    useSelector((state) => state.MemberAdminGetJobDetailsReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();

  const drop = useRef(null);

  const [headerCompany, setHeaderCompany] = useOutletContext();
  const [jobId, setJobId] = useState();
  const [number, setlink] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState();
  const [datepricewarning, setdatepricewarning] = useState(false);
  const [offerPrice, setOfferPrice] = useState();
  const [datewarning, setdateWarning] = useState(false);
  const [deliverydata, setdeliverydata] = useState("");
  const [formSampleUrls, setFormSampleUrls] = useState([]);
  const [jobDescription, setJobDescription] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState();

  const [proposedPrice, setProposedPrice] = useState();
  const [proposedDate, setProposedDate] = useState();
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();

  const [open3, setOpen3] = useState(false);
  const [daysdifference, setdaysdifference] = useState();
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);

  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] =
    useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] =
    useState([]);
  const [newJobDetails, setNewJobDetails] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [searchfeedback, setSearchfeedback] = useState("");
  // JobType Selection popup states
  const [openJobTypeSelectionPopup, setOpenJobTypeSelectionPopup] = useState(false);

  useEffect(() => {
    const start = startDate;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(start) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);
    setdaysdifference(Math.floor(diffInDays));
    if (diffInDate === 7) {
      setdateWarning(true);
    } else if (diffInDate > 7) {
      setdateWarning(true);
    } else {
      setdateWarning(false);
    }
  }, [startDate]);

  function btnClick() {
    setShow(true);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  // const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = startDate;
    let today = new Date(deliveryDate);
    const diffInMs = new Date(start) - new Date(today);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const diffInDate = Math.floor(diffInDays);
    if (diffInDate === 7) {
      setdateWarning(true);
    } else if (diffInDate > 7) {
      setdateWarning(true);
    } else {
      setdateWarning(false);
    }
  }, [startDate]);

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const { userData } = useSelector((state) => state.authReducer);

  const { success: memberAdminListDelet, error: memberAdminListDeleteError } =
    useSelector((state) => state.MemberAdminJobListDeleteReducer);

  const {
    memberJobList,
    success: memberJobSuccess,
    error: memberJobError,
    loading: memberLoading,
  } = useSelector((state) => state.getMemberJobListReducer);
  const {
    memberAdminJobList,
    success: memberAdminJobListSuccess,
    error: memberAdminJobListError,
    count,
    loading: memberAdminLoading,
  } = useSelector((state) => state.MemberAdminGetJobListReducer);

  useEffect(() => {
    dispatch({ type: AVAILABLE_JOB_LIST_RESET });
  }, []);

  // useEffect(() => {
  // dispatch(defaultPageLoader());
  // dispatch(getMemberJobListAction(currentPage));

  // dispatch(listAllAvailableJobs(currentPage));
  // }, [success, currentPage, rerender]);

  useEffect(() => {
    if (headerCompany) {
      dispatch(
        MemberAdminGetJobListAction(headerCompany, currentPage, searchfeedback)
      );
    }
    return () => {
      dispatch({ type: MEMBER_ADMIN_JOB_LIST_RESET });
    };
  }, [headerCompany, currentPage, memberAdminListDelet, searchfeedback]);

  useEffect(() => {
    if (memberAdminJobList) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [memberAdminJobList]);

  useEffect(() => {
    const handler = () => {
      setOpen3(false);
    };
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  useEffect(() => {
    if (member_Admin_job_detail_success) {
      setTitle(memberAdminJobDetails.title);
      setJobDescription(memberAdminJobDetails.description);
      // setJobDocuments(jobDetails.images);
      setDeliveryDate(memberAdminJobDetails.expected_delivery_date);
      setOfferPrice(memberAdminJobDetails.price);
      setTags(memberAdminJobDetails.tags);
      setCategory(memberAdminJobDetails.category);
      setSkills(memberAdminJobDetails.skills);
      setIndustry(memberAdminJobDetails.industry);
      setLevel(memberAdminJobDetails.level);
      setJobType(memberAdminJobDetails.get_jobType_details);
      setCompanyType(memberAdminJobDetails.company_name);

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
      if (memberAdminJobDetails.images.length > 0) {
        for (let i = 0; i < memberAdminJobDetails.images.length; i++) {
          if (memberAdminJobDetails.images[i].is_video == false) {
            arrJobDocuments.push(memberAdminJobDetails.images[i].job_images);
            arrAdditionalJobDocuments.push(
              memberAdminJobDetails.images[i].work_sample_images
            );
            arrJobDocumentsThumbs.push(
              memberAdminJobDetails.images[i].job_images_thumbnail
            );
            arrAdditionalJobDocumentsThumbs.push(
              memberAdminJobDetails.images[i].work_sample_thumbnail
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
            arrvideoJobDocuments.push(
              memberAdminJobDetails.images[i].job_images
            );
            arrAdditionalvideoJobDocuments.push(
              memberAdminJobDetails.images[i].work_sample_images
            );
            arrvideoJobDocumentsThumbs.push(
              memberAdminJobDetails.images[i].job_images
            );
            arrvideoAdditionalJobDocumentsThumbs.push(
              memberAdminJobDetails.images[i].work_sample_thumbnail
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
  }, [member_Admin_job_detail_success, newJobDetails]);

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const goToPrevPage = (prevpage) => {
    setCurrentPage(prevpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", prevpage);
    navigate(`/jobs/list?${urlParams}`);
  };

  const goToNextPage = (nextpage) => {
    setCurrentPage(nextpage);

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", nextpage);
    navigate(`/jobs/list?${urlParams}`);
  };

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
        dispatch(MemberAdminGetJobListDeleteAction(id));
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

  const openPopup = async (item_id) => {
    setJobId(item_id);
    dispatch(MemberAdminGetJobDetailsAction(item_id));
    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

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

  // To open JobType Selection popup
  const handleJobTypeSelectionPopupOpen = () => {
    setOpenJobTypeSelectionPopup(true);
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading || memberLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(userData)} */}
          <div className="Topallpage bak_h">
            <div className="ContentDiv TopM agencyjobtoppage">
              <div className="Fresh">
                <div className="Jobs Jobsnewdiv">
                  <h1 className="Freshtitle">Job List</h1>
                  {/* <div className="FreshBtn"></div> */}
                  {userData?.user?.user_level !== 3 &&
                    userData?.user?.user_level !== 4 && (
                      <>
                        <div className="searchActivityPublicP12">
                          <input
                            className="newSearchActInputPp"
                            type="text"
                            value={searchfeedback}
                            placeholder="Search job"
                            onChange={(e) => setSearchfeedback(e.target.value)}
                          />
                          <img
                            className="newSearchLogoPpAdminMember21"
                            src="/img/newSearchIcon.png"
                          />
                        </div>

                        <div className="FreshBtn">
                          <button
                            className="all_jobs_poject_button"
                            type="button"
                            onClick={handleJobTypeSelectionPopupOpen}
                          >
                            {" "}
                            <AddIcon sx={{ fontSize: 20, mb: 0.25, mr: 0.625, fontWeight: "light" }} />
                            Create a Job{" "}
                          </button>
                        </div>
                      </>
                    )}
                </div>
              </div>
              {openJobTypeSelectionPopup && (
                <JobTypeSelectionPopup
                  openJobTypeSelectionPopup={openJobTypeSelectionPopup}
                  setOpenJobTypeSelectionPopup={setOpenJobTypeSelectionPopup}
                />
              )}
              <div className="AllPageHight FreshJobTop FreshJobTopagencynewdiv">
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
                              <h2>{memberAdminJobDetails?.title}</h2>
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
                            Due on:{" "}
                            {memberAdminJobDetails?.expected_delivery_date}
                          </p>
                          <div className="jobdetailsInProgress">
                            {memberAdminJobDetails?.hired_users == "" ? (
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
                            {memberAdminJobDetails?.description}
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
                                <video
                                  className="videounderagency videoresizemember"
                                  controls
                                >
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
                                <video
                                  className="videounderagency videoresizemember"
                                  controls
                                >
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
                            {memberAdminJobDetails?.get_jobType_details && (
                              <>
                                <td>
                                  <h5 className="colortype">Job Type:</h5>
                                </td>
                                <td>
                                  <p className="fixedpriceDetail">
                                    {memberAdminJobDetails?.get_jobType_details}
                                  </p>
                                </td>
                              </>
                            )}
                            <td>
                              <h5 className="colortype">Industry:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {memberAdminJobDetails?.industry_name
                                  ? memberAdminJobDetails?.industry_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                          {memberAdminJobDetails?.price && (
                            <tr className="Pricetable">
                              <td>
                                <h5 className="colortype">Offered Price:</h5>
                              </td>
                              <td>
                                <p className="fixedpriceDetail">
                                  ${memberAdminJobDetails?.price}
                                </p>
                              </td>
                              <td>
                                <h5 className="colortype">Level:</h5>
                              </td>
                              <td>
                                <p className="fixedpriceDetail">
                                  {memberAdminJobDetails?.level?.level_name}
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
                                {memberAdminJobDetails?.company_name
                                  ? memberAdminJobDetails?.company_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        {memberAdminJobDetails?.skills?.length > 0 && (
                          <>
                            <div className="Skill">
                              <h5 className="skillsjobde mb-4">Skills:</h5>
                              {memberAdminJobDetails?.skills?.map(
                                (skill, index) => (
                                  <li key={index}>
                                    <Link to="#">{skill.skill_name}</Link>
                                  </li>
                                )
                              )}
                              {/* {memberAdminJobDetails?.skills?.length < 1 && (
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
                        {memberAdminJobDetails?.tags?.length > 0 && (
                          <>
                            <div className="Skill skill169">
                              <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                              {/* {jobDetails?.tags?.split(",").map((tag, index) => (
                            <li key={index}>
                              <Link to="#">{tag}</Link>
                            </li>
                          ))} */}
                              {memberAdminJobDetails?.tags
                                ?.split(",")
                                .map((tag, index) => (
                                  <li key={index}>
                                    <Link to="#">{tag}</Link>
                                  </li>
                                ))}
                              {/* {memberAdminJobDetails?.tags?.length < 1 && (
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
                {memberAdminJobList?.map((item, index) => (
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
                    <div
                      className="Remotagencylistlistagency"
                    // onClick={() => openPopup(item.id)}
                    >
                      <div className="bt-Title">
                        <div className="joblistcreator">
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
                                  memberAdminJobList?.[0]
                                    ?.users_applied_status?.[0]?.status ==
                                  0 && (
                                    <p className="expire expirebak">Expired</p>
                                  )
                                )}
                                {item?.is_active && item.is_expire == false && (
                                  <>
                                    <p className="expire open">Open</p>
                                  </>
                                )}
                                {memberAdminJobList?.[0]
                                  ?.users_applied_status?.[0]?.status == 4 && (
                                    <>
                                      <p className="expire open">Complete</p>
                                    </>
                                  )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="tobbtnjoblist tobbtnjoblistnewagency">
                        {userData?.user?.role == Object.keys(ROLE)[3] &&
                          userData?.user?.user_level === 1 &&
                          userData?.user?.user_level === 1 && (
                            <>
                              <button
                                type="button"
                                // hidden={userData?.user?.role == Object.keys(ROLE)[1]}
                                className="delJobedeidtbtn "
                                onClick={() => openPopup(item.id)}
                              >
                                <img
                                  className="viewicon"
                                  src={
                                    process.env.PUBLIC_URL + "/img/viewicon.png"
                                  }
                                  alt=""
                                />
                              </button>
                              <Link to={`/jobs/${item.id}`} className="flex">
                                <button
                                  type="button"
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
                      </div>
                      <div className="jobListDetailsAreaAndTaskbox1">
                        <div className="RemoteText ">
                          <p className="PostedDate">
                            {/* Posted on: {item.expected_delivery_date} */}
                            Posted on:{" "}
                            {moment(item?.created).format("yyyy-MM-DD")}
                          </p>
                          <div className="PostedDesc">
                            {item.description?.length > 200
                              ? item.description?.substring(0, 200) + "..."
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

                          {item.skills?.length > 0 && (
                            <>
                              <div className="Skill mt-2 Budget-Title">
                                <li>
                                  <h5>Skills:</h5>
                                </li>

                                {item.skills?.length > 0 &&
                                  item.skills?.map((item, index) => (
                                    <li key={index}>
                                      <Link to="">{item.skill_name}</Link>
                                    </li>
                                  ))}
                                {/* {item.skills?.length < 1 && (
                            <>
                              <li>
                                <h3 className="colorOnNA">N/A</h3>
                              </li>
                            </>
                          )} */}
                              </div>
                            </>
                          )}

                          {/* </div> */}
                          {item?.tags?.length > 0 && (
                            <>
                              <div className="Skill mt-2 Budget-Title">
                                <li>
                                  <h5>Tags:</h5>
                                </li>
                                {item?.tags?.length > 0 &&
                                  item?.tags?.split(",")?.map((tag, index) => (
                                    <li key={index}>
                                      <Link to="#">{tag}</Link>
                                    </li>
                                  ))}
                                {/* {item?.tags?.length < 1 && (
                            <>
                              <li>
                                <h3 className="colorOnNA">N/A</h3>
                              </li>
                            </>
                          )} */}
                              </div>
                            </>
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
                      </div>
                    </div>
                  </div>
                ))}
                {!memberAdminJobList?.length && (
                  <div className="Topallpage Custompage">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
            </div>
          </div>

          {pages > 1 && (
            <div className="adminjobpagination">
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

          <div className="Topallpage"></div>
        </>
      )}
    </>
  );
}
