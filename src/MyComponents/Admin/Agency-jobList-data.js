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
import Select  from "@mui/material/Select";

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
import InProgresssjobs from "./InProgresssjobs";
import Admin_Agency_InReview from "./Admin-Agency-InReview";
import Admin_Agency_Done from "./Admin-Agency-DoneJob";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Agency_jobList_data() {
  const [usersForRender, setUsersForRender] = useState([]);

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

  const { success } = useSelector((state) => state.jobDeleteReducer);
  const { userData } = useSelector((state) => state.authReducer);

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
    dispatch(getJobDetails(item_id));
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

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="CreatorProjectAdmindiv maindiv">
            <div className="creatorProjectbtn agencyFilterProjectPage agencyFilterProjectPagejoblist">
              <button
                onClick={() => {
                  setMyVar("Applied");
                }}
                className={
                  myVar == "Applied"
                    ? "all_jobs_poject_buttonnewdiv active1"
                    : "all_jobs_poject_buttonnewdiv"
                }
              >
                All Jobs
              </button>
              <button
                onClick={() => {
                  setMyVar("In Progress");
                }}
                className={
                  myVar == "In Progress"
                    ? "all_jobs_poject_buttonnewdiv active1"
                    : "all_jobs_poject_buttonnewdiv"
                }
              >
                In Progress
              </button>
              <button
                onClick={() => {
                  setMyVar("In Review");
                }}
                className={
                  myVar == "In Review"
                    ? "all_jobs_poject_buttonnewdiv active1"
                    : "all_jobs_poject_buttonnewdiv"
                }
              >
                In Review
              </button>
              <button
                onClick={() => {
                  setMyVar("Done");
                }}
                className={
                  myVar == "Done"
                    ? "all_jobs_poject_buttonnewdiv active1"
                    : "all_jobs_poject_buttonnewdiv"
                }
              >
                Done
              </button>
            </div>
          </div>
          {myVar == "Applied" ? (
            <>
              <div className="AllPageHight FreshJobTop">
                <Dialog
                  className="job-custom_popup"
                  open={isOpen}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={closePopup}
                  aria-describedby="alert-dialog-slide-description "
                >
                  <DialogContent>
                    <div className="Topallpage joblisttopdiv">
                      <div className="MarketingDetails-popup ContentDiv border-radius">
                        <div className="Marketingcamaign">
                          <div className="CategorylistName">
                            <div className="jobdes_newdiv11">
                              <h2>{jobuser?.title}</h2>
                            </div>
                          </div>

                          <p className="duedate duedate_sec">
                            Due on: {jobuser?.expected_delivery_date}
                          </p>
                          <div className="jobdetailsInProgress">
                            <Link className="jobdetailsInProgressBtn" to="#">
                              In Progress
                            </Link>
                          </div>
                          <p className=" INvehicula">{jobuser?.description}</p>
                          <h5 className="ProvidedTitle">Provided Media:</h5>
                          <h6>Job Documents</h6>

                          <div className="mediaimg Providedmediaimg">
                            {jobDocuments?.length > 0 &&
                              jobDocuments?.map((item, index) => (
                                <div key={index}>
                                  <a
                                    index_item={index}
                                    target="_blank"
                                    href={`${item}`}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        src={`${item}`}
                                        alt=""
                                      />
                                    </li>
                                  </a>
                                </div>
                              ))}
                          </div>
                          {jobDocuments?.length < 1 && <div>N/A</div>}
                          <h6>Additional Job Documents</h6>
                          <div className="mediaimg Providedmediaimg">
                            {additionalJobDocuments?.length > 0 &&
                              additionalJobDocuments?.map((item, index) => (
                                <div key={index}>
                                  <a
                                    index_item={index}
                                    target="_blank"
                                    href={`${item}`}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        src={`${item}`}
                                        alt=""
                                      />
                                    </li>
                                  </a>
                                </div>
                              ))}
                          </div>
                          {additionalJobDocuments?.length < 1 && <div>N/A</div>}
                        </div>
                        <hr className="b-top" />
                        <table>
                          <tr className="Pricetable">
                            <td>
                              <h5 className="colortype">Job Type:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {jobuser?.get_jobType_details}
                              </p>
                            </td>
                            <td>
                              <h5 className="colortype">Industry:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {jobuser?.industry_name
                                  ? jobuser?.industry_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                          <tr className="Pricetable">
                            <td>
                              <h5 className="colortype">Offered Price:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                ${jobuser?.price}
                              </p>
                            </td>
                            <td>
                              <h5 className="colortype">Level:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {jobuser?.level?.level_name}
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
                                {jobuser?.company_name
                                  ? jobuser?.company_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        <div className="Skill">
                          <h5 className="skillsjobde mb-4">Skills:</h5>
                          {jobuser?.skills?.map((item) => (
                            <li>
                              <Link to="">{item.skill_name}</Link>
                            </li>
                          ))}
                        </div>
                        <div className="Skill skill169">
                          <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                          {jobuser?.tags?.split(",").map((tag, index) => (
                            <li key={index}>
                              <Link to="#">{tag}</Link>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closePopup}>Close</Button>
                  </DialogActions>
                </Dialog>
                {/* job list start here */}

                {/* {JSON.stringify(jobuser)} */}
                {jobuser?.map((item, index) => (
                  <div className="Remotemarkeitng" key={index}>
                    <div className="bt-Title">
                      <div className="joblistTop">
                        <Link to={`/jobs/details/${item.id}`}>
                          <div className="expdiv">
                            <h2>
                              {item.title.length > 50
                                ? item.title.substring(0, 50) + "..."
                                : item.title}
                            </h2>
                            {item.is_blocked && (
                              <p className="expire expirebak blocked">
                                Blocked
                              </p>
                            )}
                            {item.is_expire && (
                              <p className="expire expirebak">Expired</p>
                            )}
                            {item?.is_active == false && (
                              <>
                                <p className="expire">Closed</p>
                              </>
                            )}
                            {item?.is_active && item.is_expire == false && (
                              <>
                                <p className="expire open">Open</p>
                              </>
                            )}
                          </div>
                        </Link>
                      </div>
                      <div className="tobbtnjoblist">
                        <button
                          type="button"
                          hidden={userData?.user?.role == Object.keys(ROLE)[1]}
                          className="delJobedeidtbtn "
                          onClick={() => openPopup(item.id)}
                        >
                          <img
                            className="viewicon"
                            src={process.env.PUBLIC_URL + "/img/viewicon.png"}
                            alt=""
                          />
                        </button>
                        <Button
                          title="Setting"
                          className="blockbutto"
                          onClick={() => {
                            handleClickOpen();
                            setJobTitle(item.title);
                            setJobID(item.id);
                            setUserStatus(item.is_blocked);
                          }}
                        >
                          <img src="/img/Settings.png" />
                        </Button>
                      </div>
                    </div>
                    <div className="RemoteText">
                      <p className="PostedDate">
                        Posted on: {moment(item?.created).format("yyyy-MM-DD")}
                      </p>
                      <div className="PostedDesc">
                        {item.description.length > 200
                          ? item.description.substring(0, 200) + "..."
                          : item.description}
                      </div>
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
                      <div className="Skill mt-4">
                        <li>
                          <h5>Skills:</h5>
                        </li>
                        {item?.skills?.map((skill, index) => (
                          <li key={index}>
                            <Link to="#">{skill.skill_name}</Link>
                          </li>
                        ))}
                      </div>
                      <div className="Skill mt-4 ">
                        <li>
                          <h5>Tags:</h5>
                        </li>
                        {item.tags.split(",").map((tag, index) => (
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

                <Dialog
                  className="profileImgDialogagency"
                  open={open}
                  onClose={handleClose}
                >
                  <DialogTitle className="profileImgHeadingAnew">
                    <div className="Ajobshare">
                      <h2>{jobTitle}</h2>

                      <span className="closebuttonsec">
                        <i
                          className="fa-solid fa-xmark"
                          onClick={handleClose}
                        ></i>
                      </span>
                    </div>
                  </DialogTitle>
                  <div className="dialogcontent_and_actions_new">
                    <DialogContent className="enterNameInputNewD">
                      <div className="userforminput Roleuserpage">
                        <label>Job Status</label>
                        <Select
                        className={
                          userStatus === "null"
                          ? "selectinputcolor"
                          : "menuiteminputcolor"
                          }
                          value={userStatus}
                          onChange={(e) => setUserStatus(e.target.value)}
                        >
                          <MenuItem value={false}>Active</MenuItem>
                          <MenuItem value={true}> Block</MenuItem>
                        </Select>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <div className="sharebuttonjobcontent">
                        <div className="cancelButtonnew">
                          <button
                            className="canceButtonnewPop"
                            onClick={handleClose}
                          >
                            Cancel
                          </button>
                          <Button
                            title="Setting"
                            onClick={() => {
                              validateSubmit();
                            }}
                            className="shareNewPop"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </DialogActions>
                  </div>
                </Dialog>
                {!jobuser?.length && (
                  <div className="Topallpage Custompage">
                    <h2 className="nonew">NO DATA FOUND</h2>
                  </div>
                )}
              </div>
              <div className="Topallpage"></div>
              {pages > 1 && (
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
                          to={`/companydata/${companyid}/${agencyId}?page=${
                            x + 1
                          }`}
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
              )}
            </>
          ) : myVar == "In Progress" ? (
            <>
              {" "}
              <InProgresssjobs />
            </>
          ) : myVar == "In Review" ? (
            <>
              <Admin_Agency_InReview />
            </>
          ) : myVar == "Done" ? (
            <>
              <Admin_Agency_Done />
            </>
          ) : (
            <div>Page not found</div>
          )}
        </>
      )}
    </>
  );
}

export default Agency_jobList_data;
