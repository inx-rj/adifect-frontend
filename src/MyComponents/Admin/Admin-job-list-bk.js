import React, { useState, useEffect, useRef } from "react";
import { BACKEND_API_URL } from "../../environment";
import axios from "axios";
import { validations } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
import { JOB_DETAILS_RESET } from "../../constants/job-constants";
import { getJobDetails } from "../../redux/actions/job-actions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import api from "../../utils/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Admin_job_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate(`/jobs/add`);
  };

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const {
    jobData,
    next,
    previous,
    count,
    loading: jobLoading,
  } = useSelector((state) => state.jobReducer);
  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsReducer
  );

  const [jobId, setJobId] = useState();
  const [title, setTitle] = useState();
  const [offerPrice, setOfferPrice] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [deliveryDate, setDeliveryDate] = useState();
  const [jobDocuments, setJobDocuments] = useState([]);
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState();
  const [skills, setSkills] = useState([]);
  const [industry, setIndustry] = useState();
  const [level, setLevel] = useState();
  const [job_type, setJobType] = useState();
  const [company_type, setCompanyType] = useState();

  const [currPage, setCurrPage] = useState(1); // storing current page number
  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [jobList, setJobList] = useState([]); // storing list
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  const [isFetching, setIsFetching] = useState(false);
  const listInnerRef = useRef();

  // const { loading } = useSelector((state) => state.loaderReducer);

  // useEffect(async () => {
  //   // dispatch(defaultPageLoader());
  //   dispatch({ type: JOB_DETAILS_RESET });
  //   dispatch(listAllJobs());
  // }, [success]);

  useEffect(() => {
    setJobList(jobData);
  }, [jobData]);

  const deleteHandler = (id) => {
    swal({
      title: "Warning",
      text: "Are you sure you want to delete this job?",
      className: "errorAlert",
      icon: "/img/WarningAlert.png",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteJob(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/SuccessAlert.png",
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
  const openPopup = async (item_id) => {
    await dispatch(getJobDetails(item_id));
    if (job_detail_success) {
      setJobId(item_id);
      setTitle(jobDetails.title);
      setJobDescription(jobDetails.description);
      setJobDocuments(jobDetails.images);
      setDeliveryDate(jobDetails.expected_delivery_date);
      setOfferPrice(jobDetails.price);
      setTags(jobDetails.tags);
      setCategory(jobDetails.category);
      setSkills(jobDetails.skills);
      setIndustry(jobDetails.industry);
      setLevel(jobDetails.level);
      setJobType(jobDetails.get_jobType_details);
      setCompanyType(jobDetails.company);
    }
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
    setJobDocuments();
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

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
    // setCurrPage(currPage + 1);
  };

  // useEffect(() => {
  //   if (!isFetching) return;
  //   fetchMoreListItems();
  // }, [isFetching, currPage, wasLastList, prevPage, jobList, success]);

  // const fetchMoreListItems = () => {
  //   const fetchData = async () => {
  //     let response = await api.get(`${BACKEND_API_URL}jobs/?page=${currPage}`);
  //     if (!response.data.results.length) {
  //       setWasLastList(true);
  //       // setIsFetching(false);
  //       return;
  //     }
  //     setPrevPage(currPage);

  //     setTimeout(() => {
  //       setJobList([...jobList, ...response.data.results]);
  //     }, 1500);
  //     // setCurrPage(currPage + 1);
  //   };
  //   if (!wasLastList && prevPage !== currPage) {
  //     fetchData();
  //   }
  // };

  useEffect(() => {
    dispatch({ type: JOB_DETAILS_RESET });

    const fetchData = async () => {
      const response = await api.get(
        `${BACKEND_API_URL}jobs/?page=${currPage}`
        // `https://api.instantwebtools.net/v1/passenger?page=${currPage}&size=10`
      );
      console.log("<<<", response.data.results);
      if (!response.data.results.length) {
        console.log("if");
        setWasLastList(true);
        return;
      }
      setPrevPage(currPage);
      setJobList([...jobList, ...response.data.results]);
      console.log("end");
    };
    if (!wasLastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, wasLastList, prevPage, jobList, success]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
            <div
              className="ContentDiv TopM"
              onScroll={onScroll}
              ref={listInnerRef}
            >
              {/* <div className="Fresh">
                <h1>
                  Hello {userData.user.first_name} {userData.user.last_name}
                </h1>
              </div> */}
              <div className="Fresh">
                <div className="Jobs">
                  <h1 className="Freshtitle joblisttitle">Job List</h1>

                  {/* <div className="Status"></div> */}
                  <div className="FreshBtn">
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
              <div
                className="AllPageHight FreshJobTop"
                // onScroll={onScroll}
                // ref={listInnerRef}
              >
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
                          <div className="mediaimg">
                            {jobDetails?.images?.map((item, index) => (
                              <div key={index}>
                                {item.job_images
                                  .slice(
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
                                .slice(
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
                                      {item.job_images.slice(
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
                                {company_type ? company_type.name : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        <div className="Skill">
                          <h5 className="skillsjobde mb-4">Skills:</h5>
                          {jobDetails?.skills?.map((item, index) => (
                            <li key={index}>
                              <Link to="">{item.skill_name}</Link>
                            </li>
                          ))}
                        </div>
                        <div className="Skill">
                          <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                          {jobDetails?.tags?.split(",").map((tag, index) => (
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

                {/* <div onScroll={onScroll} ref={listInnerRef}> */}
                {jobList?.map((item, index) => (
                  <div className="Remotemarkeitng" key={index}>
                    <div className="bt-Title">
                      <div
                        className="TitleRequired A-1"
                        onClick={() => openPopup(item.id)}
                      >
                        <Link to={`/jobs/details/${item.id}`}>
                          <h2>{item.title}</h2>
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
                          <button type="button" className="delJobedeidtbtn ">
                            <img
                              className="editicon"
                              src={process.env.PUBLIC_URL + "/img/editicon.png"}
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
                    <div
                      className="RemoteText"
                      onClick={() => openPopup(item.id)}
                    >
                      <p className="PostedDate">
                        Posted on: {item.expected_delivery_date}
                      </p>
                      <div
                        className="PostedDesc"
                        onClick={() => openPopup(item.id)}
                      >
                        {item?.description?.length > 300
                          ? item?.description?.substring(0, 300) + "..."
                          : item?.description}
                      </div>
                      <div
                        className="Budget-Title"
                        onClick={() => openPopup(item.id)}
                      >
                        <li>
                          <h5>Budget:</h5>
                        </li>
                        <li>
                          <h5>${item.price}</h5>
                        </li>
                      </div>
                      <div
                        className="Budget-Title"
                        onClick={() => openPopup(item.id)}
                      >
                        <li>
                          <h5>Level:</h5>
                        </li>
                        <li>
                          <h5>{item?.level?.level_name}</h5>
                        </li>
                      </div>

                      <div
                        className="Skill mt-4"
                        onClick={() => openPopup(item.id)}
                      >
                        <li>
                          <h5>Skills:</h5>
                        </li>

                        {item.skills?.map((item, index) => (
                          <li key={index}>
                            <Link to="">{item.skill_name}</Link>
                          </li>
                        ))}
                      </div>
                      {/* </div> */}
                      <div
                        className="Skill mt-4"
                        onClick={() => openPopup(item.id)}
                      >
                        <li>
                          <h5>Tags:</h5>
                        </li>
                        {/* {JSON.stringify(item.tags)} */}
                        {item.tags?.split(",").map((tag, index) => (
                          <li key={index}>
                            <Link to="#">{tag}</Link>
                          </li>
                        ))}
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
                  </div>
                ))}
                {!jobList?.length && (
                  <div className="Topallpage Custompage ">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div className="Topallpage"></div> */}
          {isFetching && prevPage == currPage && "Loading..."}
          {/* {isFetching && "Fetching more list items..."} */}
        </>
      )}
    </>
  );
}
