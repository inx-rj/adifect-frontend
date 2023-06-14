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
  listAllStatus,
  // listAllJobs,
  Blockjobs,
} from "../../redux/actions/Agency-data-actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function Admin_Agency_InReview() {
  const [usersForRender, setUsersForRender] = useState([]);

  const {
    statusjobs,
    success: successList,
    count,
  } = useSelector((state) => state.StatusjobReducer);

  const { jobuser } = useSelector((state) => state.alljobReducer);

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
    if (statusjobs) {
      let numberPages = Math.ceil(count / 6);
      setPages(numberPages);
    }
  }, [statusjobs]);

  //   useEffect(() => {
  //     dispatch(listAllJobs(companyid, agencyId, currentPage));
  //   }, [success, currentPage]);

  useEffect(() => {
    dispatch(listAllStatus(companyid, agencyId, 3, currentPage));
  }, [success, currentPage]);

  useEffect(() => {
    if (!isFetching) return;
  }, [isFetching]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const openPopup = async (item_id) => {
    setJobId(item_id);
    dispatch(getJobDetails(item_id));
    setNewJobDetails(true);

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (successList) {
      setTitle(statusjobs?.title);
      setJobDescription(statusjobs?.description);
      // setJobDocuments(statusjobs.images);
      setDeliveryDate(statusjobs?.expected_delivery_date);
      setOfferPrice(statusjobs?.job_bid_price);
      setTags(statusjobs?.tags);
      setCategory(statusjobs?.category);
      setSkills(statusjobs?.skills);
      setIndustry(statusjobs?.industry);
      setLevel(statusjobs?.level);
      setJobType(statusjobs?.get_jobType_details);
      setCompanyType(statusjobs?.company_name);

      //     let arrJobDocuments = [];
      //     let arrAdditionalJobDocuments = [];
      //     // if (statusjobs?.images.length > 0) {
      //     //   for (let i = 0; i < statusjobs?.images.length; i++) {
      //     //     arrJobDocuments.push(statusjobs?.images[i].job_images);
      //     //     arrAdditionalJobDocuments.push(statusjobs?.images[i].work_sample_images);
      //     //   }
      //     // }

      //     setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      //     setAdditionalJobDocuments(
      //       arrAdditionalJobDocuments.filter((x) => x !== null)
      //     );
      //     setNewJobDetails(false);
    }
  }, [successList, statusjobs]);

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

  const {
    blockjob,
    success: successUpdate,
    error: errorUpdate,
  } = useSelector((state) => state.blockJobsReducer);

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

  return (
    <>
      {/* {isLoading && <LoadingSpinner />} */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* {JSON.stringify(statusjobs)} */}
          <div className="AllPageHight FreshJobTop">
            {/* <div>
              <h1>testtt{statusjobs?.job?.title}</h1>
              {statusjobs?.map((item) => (
                <div>
                  <h1>{item.id}</h1>
                  <div>{item?.job?.title}</div>
                </div>
              ))}
            </div> */}

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
                          <h2>{statusjobs?.title}</h2>
                        </div>
                      </div>

                      <p className="duedate duedate_sec">
                        Due on: {statusjobs?.expected_delivery_date}
                      </p>
                      <div className="jobdetailsInProgress">
                        <Link className="jobdetailsInProgressBtn" to="#">
                          In Progress
                        </Link>
                      </div>
                      <p className=" INvehicula">{statusjobs?.description}</p>
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
                                  <img className="" src={`${item}`} alt="" />
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
                                  <img className="" src={`${item}`} alt="" />
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
                            {statusjobs?.get_jobType_details}
                          </p>
                        </td>
                        <td>
                          <h5 className="colortype">Industry:</h5>
                        </td>
                        <td>
                          <p className="fixedpriceDetail">
                            {statusjobs?.industry_name
                              ? statusjobs?.industry_name
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
                            ${statusjobs?.job_bid_price}
                          </p>
                        </td>
                        <td>
                          <h5 className="colortype">Level:</h5>
                        </td>
                        <td>
                          <p className="fixedpriceDetail">
                            {statusjobs?.level?.level_name}
                          </p>
                        </td>
                      </tr>
                    </table>
                    <hr className="b-top" />
                    <table>
                      <tr className="Pricetable">
                        <td>
                          <h5 className="colortype CompanyName">Company:</h5>
                        </td>
                        <td>
                          <p className="fixedpriceDetail CompanyNameIn">
                            {statusjobs?.company_name
                              ? statusjobs?.company_name
                              : "N/A"}
                          </p>
                        </td>
                      </tr>
                    </table>
                    <hr className="b-top" />
                    <div className="Skill">
                      <h5 className="skillsjobde mb-4">Skills:</h5>
                      {statusjobs?.skills?.map((item) => (
                        <li>
                          <Link to="">{item.skill_name}</Link>
                        </li>
                      ))}
                    </div>
                    <div className="Skill skill169">
                      <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                      {statusjobs?.tags?.split(",").map((tag, index) => (
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

            {statusjobs?.map((item, index) => (
              <div className="Remotemarkeitng" key={index}>
                <div className="bt-Title">
                  <div className="joblistTop">
                    <Link to={`/jobs/details/${item?.job?.id}`}>
                      <div className="expdiv">
                        <h2>
                          {item?.job?.title.length > 50
                            ? item?.job?.title.substring(0, 50) + "..."
                            : item?.job?.title}
                        </h2>
                        {item?.job?.is_blocked && (
                          <p className="expire expirebak blocked">Blocked</p>
                        )}
                        {/* {item?.job?.is_expire && (
                          <p className="expire expirebak">Expired</p>
                        )}
                        {item?.job?.is_active == false && (
                          <>
                            <p className="expire">Closed</p>
                          </>
                        )}
                        {item?.job?.is_active && item?.job?.is_expire == false && (
                          <>
                            <p className="expire open">Open</p>
                          </>
                        )} */}

                        {item?.job?.flag && (
                          <Link
                            style={{ marginLeft: "5px" }}
                            to="#"
                            className="progresstext Review lateFlagProjects"
                          >
                            Late
                          </Link>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className="tobbtnjoblist">
                    {/* <button
                      type="button"
                      hidden={userData?.user?.role == Object.keys(ROLE)[1]}
                      className="delJobedeidtbtn "
                      onClick={() => openPopup(item?.job?.id)}
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
                        setJobTitle(item?.job?.title);
                        setJobID(item?.job?.id);
                        setUserStatus(item?.job?.is_blocked);
                      }}
                    >
                      <img src="/img/Settings.png" />
                    </Button> */}
                  </div>
                </div>
                <div className="RemoteText">
                  <p className="PostedDate">
                    Posted on: {moment(item?.job?.created).format("yyyy-MM-DD")}
                  </p>
                  <div className="PostedDesc">
                    {item?.job?.description.length > 200
                      ? item?.job?.description.substring(0, 200) + "..."
                      : item?.job?.description}
                  </div>
                  <div className="Budget-Title">
                    <li>
                      <h5>Budget:</h5>
                    </li>
                    <li>
                      <h5>${item?.job?.price}</h5>
                    </li>
                  </div>
                  <div className="Budget-Title">
                    <li>
                      <h5>Level:</h5>
                    </li>
                    <li>
                      <h5>{item?.job?.level?.level_name}</h5>
                    </li>
                  </div>
                  <div className="Skill mt-4">
                    <li>
                      <h5>Skills:</h5>
                    </li>
                    {item?.job?.skills?.map((skill, index) => (
                      <li key={index}>
                        <Link to="#">{skill.skill_name}</Link>
                      </li>
                    ))}
                  </div>
                  <div className="Skill mt-4 ">
                    <li>
                      <h5>Tags:</h5>
                    </li>
                    {item?.job?.tags.split(",").map((tag, index) => (
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
                    <i className="fa-solid fa-xmark" onClick={handleClose}></i>
                  </span>
                </div>
              </DialogTitle>
              <div className="dialogcontent_and_actions_new">
                <DialogContent className="enterNameInputNewD">
                  <div className="userforminput Roleuserpage">
                    <label>Job Status</label>
                    <Select
                      className={
                        userStatus === ""
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
            {!statusjobs?.length && (
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
                      to={`/companydata/${companyid}/${agencyId}?page=${x + 1}`}
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
      )}
    </>
  );
}

export default Admin_Agency_InReview;
