import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Link } from "react-router-dom";
import { updateJobStatus } from "../../redux/actions/job-actions";
import {
  getJobDetailsAgency,
  getShareDetails,
  getJobDetailsAdmin,
  getJobDetailsAdminNewPageAction,
} from "../../redux/actions/job-actions";
import moment from "moment";
import { SHARE_RESET } from "../../constants/job-constants";

import { defaultPageLoader } from "../../redux/actions/other-actions";
import swal from "sweetalert";
import { validations } from "../../utils";
import { BACKEND_API_URL, Frontend_URL } from "../../environment";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { deleteJob } from "../../redux/actions/job-actions";

const Admin_job_details_new_page = (props) => {
  // const { getAdminJob,adminJobSuccess } = props;
  const [open, setOpen] = React.useState(false);
  const { jobId } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [name, setName] = useState("Copy link");
  const [email, setemail] = useState("");
  const [errors, setErrors] = useState({
    email: null,
  });

  let buff = new Buffer(jobId);
  let encryptedJobId = buff.toString("base64");

  const detailsLink = `${Frontend_URL}guest-job/${encryptedJobId}/copy`;

  function doublefunction() {
    setTimeout(() => {
      setName("Copy link");
    }, 2000);
    setName("Copied");
    navigator.clipboard.writeText(detailsLink).then(() => { });
  }

  // const { success: job_detail_success, jobDetails } = useSelector(
  //   (state) => state.AdminDetailsJobReducer
  // );

  const { success, error } = useSelector((state) => state.detailsSharereducer);

  const { success: updateJobSuccess } = useSelector(
    (state) => state.updateJobStatusReducer
  );

  useEffect(() => {
    if (success) {
      swal({
        title: "Successfully Complete",
        text: "Invitation has been sent successfully!",
        className: "successAlert",
        icon: "/img/logonew.svg",
        buttons: false,
        timer: 5000,
      });
      setOpen(false);
    }
    if (error) {
      swal({
        title: "Error",
        text: "Please try again.",
        className: "errorAlert",
        icon: "/img/logonew-red.svg",
        buttons: false,
        timer: 5000,
      });
      setOpen(false);
    }
    dispatch({ type: SHARE_RESET });
  }, [dispatch, success, error]);

  // const { success } = useSelector((state) => state.jobDeleteReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // const {
  //   loading: jobLoadingAdmin,
  //   success: adminJobSuccess,
  //   getAdminJob,
  // } = useSelector((state) => state.AdminDetailsJobReducer);

  const {
    loading: jobLoadingAdmin,
    success: adminJobSuccess,
    getAdminJobNewPage,
  } = useSelector((state) => state.AdminDetailsJobNewPageReducer);


  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   dispatch(getJobDetailsAgency(jobId));
  // }, [success]);

  useEffect(() => {
    dispatch(getJobDetailsAdminNewPageAction(jobId));
    window.scrollTo(0, 0);
  }, [success, updateJobSuccess]);

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

  const [itemData, setItemData] = useState([]);
  const [formSampleUrls, setFormSampleUrls] = useState([""]);
  const [formUrls, setFormUrls] = useState([""]);

  useEffect(() => {
    if (adminJobSuccess) {
      setTitle(getAdminJobNewPage.title);
      setJobDescription(getAdminJobNewPage.description);
      setDeliveryDate(getAdminJobNewPage.expected_delivery_date);
      setOfferPrice(getAdminJobNewPage.price);
      setTags(getAdminJobNewPage.tags);
      setCategory(getAdminJobNewPage.category);
      setSkills(getAdminJobNewPage.skills);
      setIndustry(getAdminJobNewPage.industry);
      setLevel(getAdminJobNewPage.level);
      setJobType(getAdminJobNewPage.get_jobType_details);
      setCompanyType(getAdminJobNewPage.company_name);

      setItemData(getAdminJobNewPage?.jobtasks_job);
      let newArray = getAdminJobNewPage?.sample_work_url?.split(",");
      setFormSampleUrls(newArray);
      let newArray1 = getAdminJobNewPage?.image_url?.split(",");
      setFormUrls(newArray1);
    }
  }, [adminJobSuccess]);

  const validateSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {
      email: validations.email(email),
    };
    setErrors(tempErrors);
    if (Object.values(tempErrors).filter((value) => value).length) {
      return;
    }
    submitHandler();
  };

  const submitHandler = (e) => {
    dispatch(
      getShareDetails({
        email: email,
        id: jobId,
      })
    );
  };

  const handleAcceptProposal = (id) => {
    swal({
      title: "",
      text: "Do you want to Close this job?",
      className: "noticeAlert",
      icon: "/img/logonew.svg",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then((willDelete) => {
      if (willDelete) {
        // dispatch(acceptJobProposal(id, { status: 2, id: id }));
        dispatch(updateJobStatus(id, 0));
        props.setUpdateData(true)
        swal({
          title: "Successfully Complete",
          text: "Job closed for more applications!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 4000,
        });
        // props.handleChangeTab("e", "2");
      }
      // else {
      // dispatch(updateJobStatus(jobId, 0));
      // dispatch(acceptJobProposal(id, { status: 2, id: id }));
      //   swal({
      //     title: "Successfully Complete",
      //     text: "Job closed for more applications!",
      //     className: "successAlert",
      //     icon: "/img/logonew.svg",
      //     buttons: false,
      //     timer: 4000,
      //   });
      //   // props.handleChangeTab(e, "2");
      // }
    });
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
        dispatch(deleteJob(id));
        swal({
          title: "Successfully Complete",
          text: "Successfully Deleted!",
          className: "successAlert",
          icon: "/img/logonew.svg",
          buttons: false,
          timer: 1500,
        });
        navigate("/jobs/list");
      }
    });
  };

  return (
    <>
      <div className="jobDetailsNewPgaeMainDiv">
        <div className="progressShareEditMain">
          <div className="inProgressJobNew">
            {getAdminJobNewPage?.users_applied_status?.slice(-1)[0]?.status === 2 ? (
              <div className="inProgressJobNew job-in-progress">
                <span className="inProgressJobNewtext">In Progress</span>
              </div>
            ) : getAdminJobNewPage?.users_applied_status?.slice(-1)[0]?.status ===
              3 ? (
              <div className="inProgressJobNew job-in-review">
                <span className="inProgressJobNewtext">In Review</span>
              </div>
            ) : getAdminJobNewPage?.users_applied_status?.slice(-1)[0]?.status ===
              4 ? (
              <div className="inProgressJobNew job-success">
                <span className="inProgressJobNewtext">Complete</span>
              </div>
            ) : (
              <></>
            )}
            {/* {jobDetails?.hired_users == "" ? (
              <>
                <span className="inProgressJobNewtext">Unassigned</span>
              </>
            ) : (
              <>
                <span className="inProgressJobNewtext">In Progress</span>
              </>
            )} */}
          </div>
          <div className="shareEditButtonsNew">
            <div className="shareButtonNewJobDiv">
              <div className="shareAltLogo">
                <img src="/img/share-alt.png" alt="" />
              </div>
              <button onClick={handleClickOpen} className="shareButtonNewJob">
                Share
              </button>

              <Dialog
                className="profileImgDialogagency"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle className="profileImgHeadingAnew">
                  <div className="Ajobshare">
                    <h2>Share {getAdminJobNewPage?.title}</h2>

                    <span className="closebuttonsec" onClick={handleClose}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </div>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="enterNameInputNewD">
                    <div
                      className={
                        errors.email
                          ? "inputCntnr error"
                          : "inputCntnr CategoryinputH"
                      }
                    >
                      <h3 className="nameOrEmailText">Enter Name or Email</h3>
                      <input
                        className="NameorEmailNewPop"
                        type="email"
                        placeholder="Name or Email"
                        onChange={(e) => {
                          setemail(e.target.value);
                          setErrors({ ...errors, email: null });
                        }}
                        value={email}
                        required
                      />
                      <input
                        className="NameorEmailNewPop"
                        value={detailsLink}
                        disabled
                        type="hidden"
                        placeholder="Name or Email"
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
                  </DialogContent>
                  <DialogActions>
                    <div className="sharebuttonjobcontent">
                      <div className="Copylink">
                        <div className="copy-area">
                          <Button type="button" onClick={doublefunction}>
                            <img src="/img/link-h.png" />
                            {name}
                          </Button>
                        </div>
                      </div>
                      <div className="cancelButtonnew">
                        <button
                          className="canceButtonnewPop"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <Button
                          onClick={validateSubmit}
                          className="shareNewPop"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div>
            <div className="editButtonNewJobDiv">
              <div className="editNewLogo"></div>
              {getAdminJobNewPage?.is_edit ? (
                <>
                  <Link to={`/jobs/${jobId}`}>
                    <button type="button" className="editButtonNewJob">
                      <img src="/img/editnew.png" alt="" />
                      Edit
                    </button>
                  </Link>
                  <a onClick={() => deleteHandler(getAdminJobNewPage.id)}>
                    <button type="button" className="editButtonNewJob del-Job">
                      <img
                        className="editicon"
                        src={"/img/deletebtnblue.png"}
                        alt=""
                      />
                      Delete
                    </button>
                  </a>
                </>
              ) : (
                <>
                  {getAdminJobNewPage?.is_active && (
                    <a onClick={() => handleAcceptProposal(getAdminJobNewPage.id)}>
                      <button
                        type="button"
                        className="editButtonNewJob del-Job"
                      >
                        Done Hiring
                      </button>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="newJobDetailsParaTextBox">
          <div className="newJobDetailsParaTextDiv">
            <p>{getAdminJobNewPage?.description}</p>
          </div>
          <div className="twoBoxCreatedJobTaskBox">
            <div className="jobDetailsCompanyDateBoxMain">
              <div className="jobDetailsCompanyDateBox">
                <div className="jobDetailsBoxItemOne">
                  <p>Created</p>
                  <p>Due Date</p>
                  <p>Pricing Type</p>
                  <p>Price</p>
                  <p>Created by</p>
                  <p>Company</p>
                  <p>Job assigned to</p>
                </div>
                <div className="jobDetailsBoxItemTwo">
                  <p> {moment(getAdminJobNewPage?.created).format("MMMM Do YYYY")} </p>
                  <p>{deliveryDate}</p>
                  <p>{getAdminJobNewPage?.get_jobType_details} </p>
                  <p>
                    <b>$</b>
                    {getAdminJobNewPage?.price}
                  </p>
                  <p>
                    <b>{getAdminJobNewPage?.username} </b>
                  </p>
                  <p>
                    <b> {getAdminJobNewPage?.company_name} </b>
                  </p>
                  <p>
                    {getAdminJobNewPage?.hired_users?.length > 0 &&
                      getAdminJobNewPage?.hired_users?.map((item, index) => (
                        <b>{(index ? ", " : "") + item.user__username} </b>
                      ))}
                    {getAdminJobNewPage?.hired_users?.length < 1 && <b>N/A</b>}
                  </p>
                </div>
              </div>
            </div>

            {getAdminJobNewPage?.jobtasks_job?.length > 0 && (
              <>
                <div className="jobTasksCompanyDateBoxMain">
                  <h3 className="skillsNeededHead">Task</h3>
                  {/* <div className="headDateAndTask">
              
                {itemData.map[0]?.title && <>    <h3 className="headingTaskOftaskBox">Task</h3></>}
                {itemData.map[0]?.due_date && <>    <h3 className="headingDateOftaskBox headingDateDate">Date</h3> </>}
              </div> */}
                  <ul className="JobTaskAndDateOnLine">
                    {getAdminJobNewPage?.jobtasks_job?.map((elem, index) => {
                      return (
                        <div key={index}>
                          <li className="taskOneLineN">{elem.title}</li>
                          <li className="dateOneLineN">{elem.due_date}</li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}

            {/* {itemData.map[0]?.title || itemData.map[0]?.due_date &&  <>
            <div className="jobTasksCompanyDateBoxMain">
              <div className="headDateAndTask">
              
                {itemData.map[0]?.title && <>    <h3 className="headingTaskOftaskBox">Task</h3></>}
                {itemData.map[0]?.due_date && <>    <h3 className="headingDateOftaskBox headingDateDate">Date</h3> </>}
              </div>
              <ul className="JobTaskAndDateOnLine">
                {itemData?.map((elem, index) => {
                  return (
                    <div key={index}>
                      <li className="taskOneLineN">{elem.title}</li>
                      <li className="dateOneLineN">{elem.due_date}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
            </>} */}
          </div>
        </div>

        {/* <div className="jobDetailsAssertmain">
          <h3 className="assertstextJobDetail">Assets Link </h3>
          <div className="galleryLinkJobDetailsOne">
            {formUrls != "" ? (
              <>
                {formUrls?.map((element, index) => (
                  <div className="form-inline" key={index}>
                    {element && (
                      <div className="assertDustbinLink">
                        <img className="linkicon" src="/img/asserLink.png" />
                        <a
                          target="_blank"
                          className="adifecttesturl"
                          href={element}
                        >
                          {element}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>None</>
            )}
          </div>
        </div>

        <div className="jobDetailsAssertmain">
          <h3 className="assertstextJobDetail">Sample Assets Link</h3>
          <div className="galleryLinkJobDetailsOne">
            {formSampleUrls != "" ? (
              <>
                {formSampleUrls?.map((element, index) => (
                  <div className="form-inline" key={index}>
                    {element && (
                      <div className="assertDustbinLink">
                        <img className="linkicon" src="/img/asserLink.png" />
                        <a
                          target="_blank"
                          className="adifecttesturl"
                          href={element}
                        >
                          {element}
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>None</>
            )}
          </div>
        </div>

        <div className="skillsNeededMainDiv">
          <h3 className="skillsNeededHead">Skills Needed</h3>
          <div className="crossItemsLogoText">
            {getAdminJob?.skills?.length > 0 &&
              getAdminJob?.skills?.map((item, index) => (
                <li
                  key={index}
                  className="detailsnewpageskill detailsnewpageskill"
                >
                  <Link to="">{item.skill_name}</Link>
                </li>
              ))}
            {getAdminJob?.skills?.length < 1 && (
              <>
                <li className="detailsnewpageskill detailsnewpageskill">
                  <h3 className="colorOnNA">N/A</h3>
                </li>
              </>
            )}
          </div>
        </div>

        <div className="tagsLogoMainDiv">
          <h3 className="skillsNeededHead">Tags</h3>
          <div className="Skill skill169">
            {getAdminJob?.tags?.length > 0 &&
              getAdminJob?.tags?.split(",")?.map((tag, index) => (
                <li className="tagnewpage" key={index}>
                  <Link to="#">{tag}</Link>
                </li>
              ))}
            {getAdminJob?.tags?.length < 1 && (
              <>
                <li className="tagnewpage">
                  <h3 className="colorOnNA">N/A</h3>
                </li>
              </>
            )}
          </div>
        </div> */}

        {getAdminJobNewPage?.image_url?.length > 0 && (
          <div className="jobDetailsAssertmain">
            <h3 className="assertstextJobDetail">Assets Link</h3>
            <div className="galleryLinkJobDetailsOne">
              {formUrls?.map((element, index) => (
                <div className="form-inline" key={index}>
                  {element && (
                    <div className="assertDustbinLink">
                      <img className="linkicon" src="/img/asserLink.png" />
                      <a
                        target="_blank"
                        className="adifecttesturl"
                        href={element}
                      >
                        {element}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {getAdminJobNewPage?.sample_work_url?.length > 0 && (
          <div className="jobDetailsAssertmain">
            <h3 className="assertstextJobDetail">Sample Assets Link</h3>
            <div className="galleryLinkJobDetailsOne">
              {formSampleUrls?.map((element, index) => (
                <div className="form-inline" key={index}>
                  {element && (
                    <div className="assertDustbinLink">
                      <img className="linkicon" src="/img/asserLink.png" />
                      <a
                        target="_blank"
                        className="adifecttesturl"
                        href={element}
                      >
                        {element}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {getAdminJobNewPage?.skills?.length > 0 && (
          <div className="skillsNeededMainDiv">
            <h3 className="skillsNeededHead">Skills Needed</h3>
            <div className="crossItemsLogoText">
              {getAdminJobNewPage?.skills?.map((item, index) => (
                <li
                  key={index}
                  className="detailsnewpageskill detailsnewpageskill"
                >
                  <Link to="">{item.skill_name}</Link>
                </li>
              ))}
            </div>
          </div>
        )}

        {getAdminJobNewPage?.tags?.length > 0 && (
          <div className="tagsLogoMainDiv">
            <h3 className="skillsNeededHead">Tags</h3>
            <div className="Skill skill169">
              {getAdminJobNewPage?.tags?.split(",")?.map((tag, index) => (
                <li className="tagnewpage" key={index}>
                  <Link to="#">{tag}</Link>
                </li>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin_job_details_new_page;
