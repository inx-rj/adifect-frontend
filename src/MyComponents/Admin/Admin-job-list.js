import React, { useState, useEffect } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { listAllJobs, listAgencyJobs } from "../../redux/actions/job-actions";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Frontend_URL } from "../../environment";
import { Button } from "@mui/material";
import { deleteJob } from "../../redux/actions/job-actions";
import { defaultPageLoader } from "../../redux/actions/other-actions";

// import Pagination from "react-bootstrap/Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import { getJobDetails } from "../../redux/actions/job-actions";
import { LinkContainer } from "react-router-bootstrap";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useOutletContext } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

import { JOB_LIST_RESET } from "../../constants/job-constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Admin_job_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [headerCompany, setHeaderCompany] = useOutletContext();

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate(`/jobs/add`);
  };

  const [anchorElInProgress, setAnchorElInProgress] = React.useState(null);
  const openMenuInProgress = Boolean(anchorElInProgress);
  const [orderingName, setOrderingName] = useState("All Jobs");
  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const menuHandleSort = (event, name) => {
    handleCloseInProgressSort();
    setOrderingInProgress(name);
    setOrderingName(name);
  };

  const handleCloseInProgressSort = () => {
    setAnchorElInProgress(null);
  };

  const handleClickInProgressSort = (event) => {
    setAnchorElInProgress(event.currentTarget);
  };

  const menuOptions = [
    { id: 1, name: "All Jobs" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Expired" },
    { id: 4, name: "Completed" },
  ];

  const [usersForRender, setUsersForRender] = useState([]);

  // const { jobData, loading, success } = useSelector(
  //   (state) => state.jobReducer
  // );
  const {
    jobData,
    next,
    previous,
    count,
    loading: jobLoading,
  } = useSelector((state) => state.jobReducer);
  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const {
    loading: job_detail_loading,
    success: job_detail_success,
    jobDetails,
  } = useSelector((state) => state.jobDetailsReducer);

  const [jobId, setJobId] = useState();
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
  const [orderingInProgress, setOrderingInProgress] = useState("All Jobs");
  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [jobvideoDocumentsThumbs, setJobDocumentsvideoThumbs] = useState([]);
  const [jobDocumentsThumbs, setJobDocumentsThumbs] = useState([]);
  const [jobSampleDocumentsThumbs, setJobSampleDocumentsThumbs] = useState([]);
  const [jobSamplevideoDocumentsThumbs, setJobSamplevideoDocumentsThumbs] = useState([]);
  const [jobvideoDocuments, setJobDocumentsvideo] = useState([]);
  const [additionalvideoJobDocuments, setAdditionalvideoJobDocuments] = useState([]);
  const [newJobDetails, setNewJobDetails] = useState(false);
  const [searchfeedback, setSearchfeedback] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  // const [page, setPage] = useState(1);

  // const { loading } = useSelector((state) => state.loaderReducer);

  useEffect(async () => {
    // await dispatch(listAllJobs(currentPage, headerCompany));

    return () => {
      dispatch({ type: JOB_LIST_RESET });
    };
  }, [success, currentPage, headerCompany]);

  useEffect(() => {
    if (jobData) {
      let numberPages = Math.ceil(count / 5);
      setPages(numberPages);
    }
  }, [jobData]);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this job?",
      className: "errorAlert",
      icon: "/img/logonew-red.svg",

      buttons: true,
      dangerMode: true,
      timer: 1500,
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (jobData) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [jobData, headerCompany]);

  const openPopup = async (item_id) => {
    await dispatch(getJobDetails(item_id));

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
            console.log(jobDetails.images[i].job_images)
            arrJobDocuments.push(jobDetails.images[i].job_images);      
          arrAdditionalJobDocuments.push(
            jobDetails.images[i].work_sample_images
          );
          arrJobDocumentsThumbs.push(jobDetails.images[i].job_images_thumbnail);
          arrAdditionalJobDocumentsThumbs.push(
            jobDetails.images[i].work_sample_thumbnail
          );
          setJobDocuments(arrJobDocuments.filter((x) => x !== null));
          setAdditionalJobDocuments(
            arrAdditionalJobDocuments.filter((x) => x !== null)
          );
          setJobDocumentsThumbs(arrJobDocumentsThumbs.filter((x) => x !== null));
          setJobSampleDocumentsThumbs(
            arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
          );
        }
        else {
          arrvideoJobDocuments.push(jobDetails.images[i].job_images);      
        arrAdditionalvideoJobDocuments.push(
          jobDetails.images[i].work_sample_images
        );
        arrvideoJobDocumentsThumbs.push(jobDetails.images[i].job_images);
        arrvideoAdditionalJobDocumentsThumbs.push(
          jobDetails.images[i].work_sample_thumbnail
        );
        setJobDocumentsvideo(arrvideoJobDocuments.filter((x) => x !== null));
        setAdditionalvideoJobDocuments(
          arrAdditionalvideoJobDocuments.filter((x) => x !== null)
        );
        setJobDocumentsvideoThumbs(arrvideoJobDocumentsThumbs.filter((x) => x !== null));
        setJobSamplevideoDocumentsThumbs(
          arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
        );
      }
      }
      }

      setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      setJobDocumentsvideo(arrvideoJobDocuments.filter((x) => x !== null));
      setAdditionalJobDocuments(
        arrAdditionalJobDocuments.filter((x) => x !== null)
      );
      setAdditionalvideoJobDocuments(
        arrAdditionalvideoJobDocuments.filter((x) => x !== null)
      );
      setJobDocumentsThumbs(arrJobDocumentsThumbs.filter((x) => x !== null));
      setJobDocumentsvideoThumbs(arrvideoJobDocumentsThumbs.filter((x) => x !== null));
      setJobSampleDocumentsThumbs(
        arrAdditionalJobDocumentsThumbs.filter((x) => x !== null)
      );
      setJobSamplevideoDocumentsThumbs(
        arrvideoAdditionalJobDocumentsThumbs.filter((x) => x !== null)
      );
      setNewJobDetails(false);
    }
  }, [job_detail_success, newJobDetails]);

  useEffect(() => {
    dispatch(defaultPageLoader());
    dispatch({ type: JOB_LIST_RESET });

    const formData = new FormData();

    formData.append("currentPage", currentPage);
    formData.append("headerCompany", headerCompany);
    formData.append("filter", orderingInProgress);
    formData.append("search", searchfeedback);

    dispatch(listAllJobs(formData));
  }, [success, currentPage, headerCompany, orderingInProgress, searchfeedback]);

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
    setJobDocumentsvideoThumbs([])
    setJobSamplevideoDocumentsThumbs([])
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
  // var ignoreClickOnMeElement = document.getElementById('popup-box');
  // document.addEventListener('click', function(event) {
  //     var isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
  //     if (!isClickInsideElement) {
  //         //Do something click is outside specified element
  //     }
  // });

  // window.addEventListener('click', function(e){
  //   if (document.getElementById('popup-box').contains(e.target)){
  //     // Clicked in box
  //   } else{
  //     setIsOpen(false);
  //   }
  // });
  // document.getElementById("Topdivallpage").onclick = (e) => {
  //   if (e.target !== document.getElementById("popup-box")) {
  //     console.log("You clicked outside");
  //   } else {
  //     console.log("You clicked inside");
  //   }
  // };

  const pageHandler = (gotopage) => {
    setCurrentPage(gotopage);
  };

  const menuProps = {
    variant: "menu",
    disableScrollLock: true,
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

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {/* {isLoading ? (
        <LoadingSpinner />
      ) : (
        <> */}
      {/* {JSON.stringify(jobData)} */}
      {/* <div className="Category_p">
              <div className="CategorylistName">
                <h1>Jobs List</h1>
              </div>
            </div>
            <div className="Topallpage AllPageHight">
              <div className="ContentDiv Categoriesdiv1">
                <div className="Status"></div>
                <div className="savebtn Categorybtn">
                  <Link
                    className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                    to={`/job/add`}
                  >
                    {" "}
                    Create a Job{" "}
                  </Link>
                </div>
                <MDBDataTable
                  style={{}}
                  responsive
                  striped
                  bordered
                  small
                  data={data}
                />
              </div>
            </div> */}

      <div className="Topallpage bak_h">
        <div className="ContentDiv agencyjobtoppage">
          {/* <div className="Fresh">
                <h1>
                  Hello {userData.user.first_name} {userData.user.last_name}
                </h1>
              </div> */}
          <div className="Fresh">
            <div className="Jobs Jobsnewdiv">
              <h1 className="Freshtitle joblisttitle">Job List</h1>
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
                  MenuProps={menuProps}
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
              </div>

              <div className="FreshBtn adminbtnjob">
                <Link
                  className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                  to={`/jobs/add`}
                >
                  {" "}
                  Create a Job{" "}
                </Link>
              </div>
            </div>
          </div>
          {/* {isLoading || job_detail_loading ? (
            <LoadingSpinner />
          ) : ( */}
          {isLoading ? (
            <LoadingSpinner />
          ) : jobLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="AllPageHight FreshJobTop adminjoblistpage">
                {/* <input type="button" value="Click to Open Popup" onClick={togglePopup} /> */}
                <Dialog
                  className="job-custom_popup"
                  open={isOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={closePopup}
                  aria-describedby="alert-dialog-slide-description "
                >
                  {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                  <DialogContent>
                    <div className="Topallpage">
                      <div className="MarketingDetails-popup ContentDiv border-radius">
                        <div className="Marketingcamaign">
                          <div className="CategorylistName">
                            <div className="jobdesadminjoblist1">
                              <h2>{jobDetails?.title}</h2>
                            </div>
                            {/* <div className="FreshBtn">
                                  <Link
                                    className="MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-1o8ezb2-MuiButtonBase-root-MuiButton-root"
                                    to={`/jobs/apply/${jobId}`}
                                  >
                                    {" "}Submit{" "}
                                  </Link>
                                </div> */}
                          </div>

                          <p className="duedate duedate_sec">
                            Due on: {jobDetails?.expected_delivery_date}
                          </p>
                          <div className="jobdetailsInProgress">
                            <Link className="jobdetailsInProgressBtn" to="#">
                              In Progress
                            </Link>
                          </div>
                          <p className=" INvehicula">
                            {jobDetails?.description}
                          </p>
                          <h5 className="ProvidedTitle">Provided Media:</h5>
                          {(jobDocuments?.length > 0 || jobvideoDocuments?.length > 0) &&(
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
                                       <video       className="videounderagency"
                                            controls>
              <source   src={`${jobvideoDocumentsThumbs[index]}`} type="video/mp4" />
            </video>
                                  </div>
                                ))}
                              </div>
                               
                          {/* {jobDocuments?.length < 1 && <div>N/A</div>} */}
                          {(additionalJobDocuments?.length > 0 ||additionalvideoJobDocuments?.length > 0) && (
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
                                     <video       className="videounderagency"
                                            controls>
              <source   src={`${jobSamplevideoDocumentsThumbs[index]}`} type="video/mp4" />
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
                                    href={`${item?.job_images}`}
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
                                {jobDetails?.industry?.industry_name}
                              </p>
                            </td>
                          </tr>
                          {jobDetails?.price && (
                            <>
                              <div className="Budget-Title">
                                <li>
                                  <h5>Budget:</h5>
                                </li>
                                <li>
                                  <h5>${jobDetails.price}</h5>
                                </li>
                              </div>
                              <div className="Budget-Title">
                                <li>
                                  <h5>Level:</h5>
                                </li>
                                <li>
                                  <h5>{jobDetails?.level?.level_name}</h5>
                                </li>
                              </div>
                            </>
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
                                {jobDetails.company_name
                                  ? jobDetails.company_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        {jobDetails?.skills?.length > 0 && (
                          <>
                            <div className="Skill Budget-Title">
                              <h5 className="skillsjobde mb-4">Skills:</h5>
                              {jobDetails?.skills?.map((item) => (
                                <li>
                                  <Link to="">{item.skill_name}</Link>
                                </li>
                              ))}
                            </div>
                          </>
                        )}
                        {jobDetails?.tags?.length > 0 && (
                          <>
                            <div className="Skill Budget-Title">
                              <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                              {jobDetails?.tags
                                ?.split(",")
                                .map((tag, index) => (
                                  <li key={index}>
                                    <Link to="#">{tag}</Link>
                                  </li>
                                ))}
                              {/* {tags.split(",")?.map((tag, index) => (
                                <li key={index}>
                                  <Link to="#">{tag}</Link>
                                </li>
                              ))} */}
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

                {/* {isOpen && (
                  <>
                    <div className="job-popup-box" id="popup-box">
                      <div class="job-blocker" onClick={closePopup}></div>
                      <div className="job-box">
                        {/* <span className="close-icon" onClick={closePopup}>x</span> */}
                {/* {JSON.stringify(jobDetails)} 
                        

                      </div>
                    </div>
                  </>
                )} */}

                {jobData?.map((item, index) => (
                  <div className="agencyjoblistdiv agencyjoblistdivhi">
                    <div className="agencylist14"></div>

                    <div className="Remotagencylistlistagency">
                      <div className="bt-Title">
                        <div
                          className="TitleRequired A-1"
                          key={index}
                          onClick={() => openPopup(item.id)}
                        >
                          <Link to={`/jobs/details/${item.id}`}>
                            {/* <h2>{item.title}</h2> */}

                            <h3>
                              {item.title.length > 15
                                ? item.title.substring(0, 15) + "..."
                                : item.title}
                            </h3>
                          </Link>
                        </div>
                        <div className="ApplyButton A-2">
                          <button
                            type="button"
                            className="delJobedeidtbtn "
                            onClick={() => openPopup(item.id)}
                          >
                            <img
                              className="viewicon"
                              src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                              alt=""
                            />
                          </button>
                          <Link to={`/jobs/${item.id}`}>
                            <button
                              type="button"
                              className="delJobedeidtbtn "
                              key={index}
                              onClick={() => openPopup(item.id)}
                            >
                              <img
                                className="editicon"
                                src={
                                  process.env.PUBLIC_URL + "/img/editicon.png"
                                }
                                alt=""
                              />
                            </button>
                          </Link>
                          <a onClick={() => deleteHandler(item.id)}>
                            <button type="button" className="delJob">
                              <img
                                className="editicon"
                                src={process.env.PUBLIC_URL + "/img/delet.png"}
                                alt=""
                              />
                            </button>
                          </a>
                        </div>
                      </div>
                      <div className="jobListDetailsAreaAndTaskbox jobListadmin">
                        <div className="RemoteText RemoteTextEightyWidth1">
                          <p className="PostedDate">
                            Posted on:{" "}
                            {moment(item?.created).format("yyyy-MM-DD")}
                          </p>
                          <div className="PostedDesc">
                            {item?.description?.length > 300
                              ? item?.description?.substring(0, 300) + "..."
                              : item?.description}
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
                            {item.skills?.length < 1 && (
                              <>
                                <li>
                                  <h3 className="colorOnNA">N/A</h3>
                                </li>
                              </>
                            )}
                          </div>
                          {/* </div> */}
                          <div className="Skill mt-2 Budget-Title">
                            <li>
                              <h5>Tags:</h5>
                            </li>
                            {/* {JSON.stringify(item.tags)} */}
                            {item.tags?.length > 0 &&
                              item.tags?.split(",").map((tag, index) => (
                                <li key={index}>
                                  <Link to="#">{tag}</Link>
                                </li>
                              ))}
                            {item.tags?.length < 1 && (
                              <>
                                <li>
                                  <h3 className="colorOnNA">N/A</h3>
                                </li>
                              </>
                            )}
                          </div>
                          <div className="ApplyButton_2">
                            <button
                              type="button"
                              className="btn btn-primary Small border-radius"
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                        {jobData?.jobtasks_job?.length > 0 && (
                          <div className="taskBoxJobListCard">
                            <div className="taskBoxJobListCardFirstHead">
                              <div className="taskBoxJobListCardFirstNoBg">
                                <h3 className="taskBoxJobListCardFirstTask">
                                  Task
                                </h3>
                                <h3 className="taskBoxJobListCardFirstDate">
                                  Date
                                </h3>
                              </div>
                              <div className="taskBoxJobListCardDetailsDate">
                                {jobData?.jobtasks_job?.map((task) => {
                                  return (
                                    <>
                                      <h3 className="taskBoxJobListfirstTaskDetail">
                                        {task?.jobtasks_job}
                                      </h3>
                                      <h3 className="taskBoxJobListFirstDateDetail">
                                        {task?.due_date}
                                      </h3>
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
                {!jobData?.length && (
                  <div className="Topallpage Custompage ">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {pages > 1 && (
        <div className="adminjobpagination adminpagintionpage">
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
      {/* <div className="Topallpage"></div> */}
      {/* </>
      )} */}
    </>
  );
}
