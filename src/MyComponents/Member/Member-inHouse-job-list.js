import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../containers/LoadingSpinner";
import { ROLE } from "../../constants/other-constants";
import moment from "moment";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Pagination from "react-bootstrap/Pagination";
import { LinkContainer } from "react-router-bootstrap";
import { useOutletContext } from "react-router-dom";
import {
  MemberInHouseGetJobListAction,
  MemberInHouseGetJobDetailsAction,
} from "../../redux/actions/Member-Admin-Job-List-Actions";
import Slide from "@mui/material/Slide";

import { MEMBER_INHOUSE_JOB_LIST_RESET } from "../../constants/Member-Admin-job-list-constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Member_InHouse_job_list() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    success: member_InHouse_job_detail_success,
    memberInHouseJobDetails,
  } = useSelector((state) => state.MemberInHouseGetJobDetailsReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [headerCompany] = useOutletContext();

  const [jobDocuments, setJobDocuments] = useState([]);
  const [additionalJobDocuments, setAdditionalJobDocuments] = useState([]);
  const [newJobDetails, setNewJobDetails] = useState(false);

  const [isOpenInHouse, setIsOpenInHouse] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [searchfeedback, setSearchfeedback] = useState("");

  setTimeout(function () {
    setIsLoading(false);
  }, 1200);

  const { userData } = useSelector((state) => state.authReducer);

  const {
    memberInHouseJobList,
    success: memberInHouseJobListSuccess,
    error: memberInHouseJobListError,
    count: countInHouseJobList,
    loading: memberInHouseLoading,
  } = useSelector((state) => state.MemberInHouseGetJobListReducer);

  useEffect(() => {
    if (headerCompany) {
      dispatch(
        MemberInHouseGetJobListAction(
          headerCompany,
          currentPage,
          searchfeedback
        )
      );
    }
    return () => {
      dispatch({ type: MEMBER_INHOUSE_JOB_LIST_RESET });
    };
  }, [headerCompany, currentPage, searchfeedback]);

  useEffect(() => {
    if (memberInHouseJobList) {
      let numberPages = Math.ceil(countInHouseJobList / 6);
      setPages(numberPages);
    }
  }, [memberInHouseJobList]);

  useEffect(() => {
    if (member_InHouse_job_detail_success) {
      let arrJobDocuments = [];
      let arrAdditionalJobDocuments = [];
      if (memberInHouseJobDetails.images.length > 0) {
        for (let i = 0; i < memberInHouseJobDetails.images.length; i++) {
          arrJobDocuments.push(memberInHouseJobDetails.images[i].job_images);
          arrAdditionalJobDocuments.push(
            memberInHouseJobDetails.images[i].work_sample_images
          );
        }
      }

      setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      setAdditionalJobDocuments(
        arrAdditionalJobDocuments.filter((x) => x !== null)
      );
      setNewJobDetails(false);
    }
  }, [member_InHouse_job_detail_success, newJobDetails]);

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

  const openPopup = async (item_id) => {
    dispatch(MemberInHouseGetJobDetailsAction(item_id));
    setNewJobDetails(true);

    setIsOpenInHouse(!isOpenInHouse);
  };

  const closePopup = () => {
    setIsOpenInHouse(false);

    setJobDocuments([]);
    setAdditionalJobDocuments([]);
  };

  return (
    <>
      {/* {loading && <LoadingSpinner />} */}
      {/* {isLoading || memberInHouseLoading ? (
        <LoadingSpinner />
      ) : (
        <> */}
      {/* {JSON.stringify(userData)} */}
      <div className="Topallpage bak_h">
        <div className="ContentDiv agencyjobtoppage">
          <div className="Fresh">
            <div className="Jobs Jobsnewdiv jobmember">
              <h1 className="Freshtitle">Job List</h1>
              {/* <div className="FreshBtn"></div> */}
              <div className="searchActivityPublicPInhouse membericonSearch">
                <input
                  className="newSearchActInputPp"
                  type="text"
                  value={searchfeedback}
                  placeholder="Search job"
                  onChange={(e) => setSearchfeedback(e.target.value)}
                />
                <img className="membericon" src="/img/newSearchIcon.png" />
              </div>
            </div>
          </div>
          {isLoading || memberInHouseLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className=" FreshJobTop FreshJobTopagencynewdiv">
                {/* DIALOG INHOUSE */}
                <Dialog
                  className="job-custom_popup"
                  open={isOpenInHouse}
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
                              <h2>{memberInHouseJobDetails?.title}</h2>
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
                            {memberInHouseJobDetails?.expected_delivery_date}
                          </p>
                          <div className="jobdetailsInProgress">
                            {memberInHouseJobDetails?.hired_users == "" ? (
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
                            {memberInHouseJobDetails?.description}
                          </p>
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
                                    // href={item}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        // src={`${jobDocumentsThumbs[index]}`}
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
                                    // href={item}
                                  >
                                    <li key={index}>
                                      <img
                                        className=""
                                        // src={`${jobSampleDocumentsThumbs[index]}`}
                                        alt=""
                                      />
                                    </li>
                                  </a>
                                </div>
                              ))}
                          </div>
                          {additionalJobDocuments?.length < 1 && <div>N/A</div>}
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
                                {memberInHouseJobDetails?.get_jobType_details}
                              </p>
                            </td>
                            <td>
                              <h5 className="colortype">Industry:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {memberInHouseJobDetails?.industry_name
                                  ? memberInHouseJobDetails?.industry_name
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
                                ${memberInHouseJobDetails?.price}
                              </p>
                            </td>
                            <td>
                              <h5 className="colortype">Level:</h5>
                            </td>
                            <td>
                              <p className="fixedpriceDetail">
                                {memberInHouseJobDetails?.level?.level_name}
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
                                {memberInHouseJobDetails?.company_name
                                  ? memberInHouseJobDetails?.company_name
                                  : "N/A"}
                              </p>
                            </td>
                          </tr>
                        </table>
                        <hr className="b-top" />
                        <div className="Skill">
                          <h5 className="skillsjobde mb-4">Skills:</h5>
                          {memberInHouseJobDetails?.skills?.length > 0 &&
                            memberInHouseJobDetails?.skills?.map(
                              (skill, index) => (
                                <li key={index}>
                                  <Link to="#">{skill.skill_name}</Link>
                                </li>
                              )
                            )}
                          {memberInHouseJobDetails?.skills?.length < 1 && (
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          )}
                          {/* {jobDetails?.skills?.map((item) => (
                              <li>
                                <Link to="">{item.skill_name}</Link>
                              </li>
                            ))} */}
                        </div>
                        <div className="Skill skill169">
                          <h5 className="skillsjobde mb-4 mt-4">Tags:</h5>
                          {/* {jobDetails?.tags?.split(",").map((tag, index) => (
                              <li key={index}>
                                <Link to="#">{tag}</Link>
                              </li>
                            ))} */}
                          {memberInHouseJobDetails?.tags?.length > 0 &&
                            memberInHouseJobDetails?.tags
                              ?.split(",")
                              .map((tag, index) => (
                                <li key={index}>
                                  <Link to="#">{tag}</Link>
                                </li>
                              ))}
                          {memberInHouseJobDetails?.tags?.length < 1 && (
                            <li>
                              <h3 className="colorOnNA">N/A</h3>
                            </li>
                          )}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closePopup}>Close</Button>
                  </DialogActions>
                </Dialog>

                {/* INHOUSE MEMBER */}
                {userData?.user?.user_level === 4 &&
                  memberInHouseJobList?.map((item, index) => (
                    <div className="agencyjoblistdiv agencyjoblistdivhi ">
                      <div className="agencylist14"></div>
                      <div
                        className="Remotemarkeitng Remotagencylist memberinhosejoblist"
                        key={index}
                        // onClick={() => openPopup(item.id)}
                      >
                        <div className="bt-Title">
                          <div className="joblistcreator">
                            <Link to={`/jobs/details/${item.id}`}>
                              <h2>{item.title}</h2>
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
                                      process.env.PUBLIC_URL +
                                      "/img/viewicon.png"
                                    }
                                    alt=""
                                  />
                                </button>
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
                            {userData?.user?.user_level != 4 && (
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
                                <div className="Skill mt-2">
                                  <li>
                                    <h5>Skills:</h5>
                                  </li>

                                  {item.skills?.map((item, index) => (
                                    <li key={index}>
                                      <Link to="">{item.skill_name}</Link>
                                    </li>
                                  ))}
                                </div>
                              </>
                            )}
                            {/* </div> */}
                            {item?.tags?.length > 0 && (
                              <>
                                <div className="Skill mt-2">
                                  <li>
                                    <h5>Tags:</h5>
                                  </li>
                                  {item?.tags?.split(",")?.map((tag, index) => (
                                    <li key={index}>
                                      <Link to="#">{tag}</Link>
                                    </li>
                                  ))}
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
                                  {item?.jobtasks_job?.map((task) => {
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
                {!memberInHouseJobList?.length &&
                  userData?.user?.user_level === 4 && (
                    <div className="Topallpage Custompage">
                      <h2 className="nonew">NO DATA FOUND</h2>
                    </div>
                  )}
              </div>
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
              )}
            </>
          )}
        </div>
      </div>

      <div className="Topallpage"></div>
      {/* </>
      )} */}
    </>
  );
}
