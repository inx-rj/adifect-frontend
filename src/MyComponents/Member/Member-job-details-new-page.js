import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getJobDetailsMember } from "../../redux/actions/job-actions";
import moment from "moment";

const Member_job_details_new_page = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();

  const { success: job_detail_success, jobDetails } = useSelector(
    (state) => state.jobDetailsMemberReducer
  );

  const { success } = useSelector((state) => state.jobDeleteReducer);

  useEffect(() => {
    dispatch(getJobDetailsMember(jobId));
  }, [success]);

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
    if (jobDetails) {
      setItemData(jobDetails?.jobtasks_job);
      let newArray = jobDetails?.sample_work_url?.split(",");
      setFormSampleUrls(newArray);
      let newArray1 = jobDetails?.image_url?.split(",");
      setFormUrls(newArray1);
    }
  }, []);

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

      // let arrJobDocuments = [];
      // let arrAdditionalJobDocuments = [];
      // if (jobDetails.images.length > 0) {
      //   for (let i = 0; i < jobDetails.images.length; i++) {
      //     arrJobDocuments.push(jobDetails.images[i].job_images);
      //     arrAdditionalJobDocuments.push(
      //       jobDetails.images[i].work_sample_images
      //     );
      //   }
      // }

      // setJobDocuments(arrJobDocuments.filter((x) => x !== null));
      // setAdditionalJobDocuments(
      //   arrAdditionalJobDocuments.filter((x) => x !== null)
      // );
      // setNewJobDetails(false);
    }
  }, [job_detail_success]);

  return (
    <>
      <div className="jobDetailsNewPgaeMainDiv">
        <div className="progressShareEditMain">
          <div className="inProgressJobNew">
            {jobDetails?.users_applied_status?.slice(-1)[0]?.status === 2 ? (
              <div className="inProgressJobNew job-in-progress">
                <span className="inProgressJobNewtext">In Progress</span>
              </div>
            ) : jobDetails?.users_applied_status?.slice(-1)[0]?.status === 3 ? (
              <div className="inProgressJobNew job-in-review">
                <span className="inProgressJobNewtext">In Review</span>
              </div>
            ) : jobDetails?.users_applied_status?.slice(-1)[0]?.status === 4 ? (
              <div className="inProgressJobNew job-success">
                <span className="inProgressJobNewtext">Complete</span>
              </div>
            ) : (
              <></>
            )}
            {/* <span className="inProgressJobNewtext">IN PROGRESS </span> */}
          </div>
          <div className="shareEditButtonsNew">
            {/* <div className="shareButtonNewJobDiv">
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
                  <h2>
                    Share {jobDetails.title}{" "}
                    <span className="closebuttonsec" onClick={handleClose}>
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                  </h2>
                </DialogTitle>
                <div className="dialogcontent_and_actions_new">
                  <DialogContent className="enterNameInputNewD">
                    <div>
                      <h3 className="nameOrEmailText">Enter Name or Email</h3>
                      <input
                        className="NameorEmailNewPop"
                        type="text"
                        placeholder="Name or Email"
                      />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <div className="Copylink">
                      <Button onClick={handleClose}>
                        <img src="/img/link-h.png" /> Copy link
                      </Button>
                    </div>
                    <div className="cancelButtonnew">
                      <button
                        className="canceButtonnewPop"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <Button className="shareNewPop">Share</Button>
                    </div>
                  </DialogActions>
                </div>
              </Dialog>
            </div> */}
            {/* <div className="editButtonNewJobDiv">
              <div className="editNewLogo"></div>
              <Link to={`/jobs/${jobId}`}>
                <button type="button" className="editButtonNewJob">
                  <img src="/img/editnew.png" alt="" />
                  Edit
                </button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="newJobDetailsParaTextBox">
          <div className="newJobDetailsParaTextDiv">
            <p>{jobDescription}</p>
          </div>
          <div className="twoBoxCreatedJobTaskBox">
            <div className="jobDetailsCompanyDateBoxMain">
              <div className="jobDetailsCompanyDateBox">
                <div className="jobDetailsBoxItemOne">
                  <p>Created</p>
                  <p>Due Date</p>
                  {jobDetails?.price && (
                    <>
                      <p>Pricing Type</p>
                      <p>Price</p>
                    </>
                  )}
                  <p>Created by</p>
                  <p>Company</p>
                  <p>Job assigned to</p>
                </div>
                <div className="jobDetailsBoxItemTwo">
                  <p> {moment(jobDetails?.created).format("MMMM Do YYYY")} </p>
                  <p>{deliveryDate}</p>
                  {jobDetails?.price && (
                    <>
                      <p>{jobDetails?.get_jobType_details} </p>
                      <p>
                        <b>$</b>
                        {jobDetails?.price}
                      </p>
                    </>
                  )}
                  <p>
                    <b>{jobDetails?.username} </b>
                  </p>
                  <p>
                    <b> {jobDetails?.company_name} </b>
                  </p>
                  <p>
                    {jobDetails?.hired_users?.length > 0 &&
                      jobDetails?.hired_users?.map((item, index) => (
                        <b key={index}>
                          {(index ? ", " : "") + item.user__username}{" "}
                        </b>
                      ))}
                    {jobDetails?.hired_users?.length < 1 && <b>N/A</b>}
                  </p>
                </div>
              </div>
            </div>



            {jobDetails?.jobtasks_job?.length > 0 && (
              <>
                <div className="jobTasksCompanyDateBoxMain">
                <h3 className="skillsNeededHead">Task</h3>
                  {/* <div className="headDateAndTask">
              
                {itemData.map[0]?.title && <>    <h3 className="headingTaskOftaskBox">Task</h3></>}
                {itemData.map[0]?.due_date && <>    <h3 className="headingDateOftaskBox headingDateDate">Date</h3> </>}
              </div> */}
                  <ul className="JobTaskAndDateOnLine">
                    {jobDetails?.jobtasks_job?.map((elem, index) => {
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
          <h3 className="assertstextJobDetail">Assets Link</h3>
          <div className="galleryLinkJobDetailsOne">
            {formSampleUrls?.map((element, index) => (
              <div className="form-inline" key={index}>
                {element && (
                  <div className="assertDustbinLink">
                    <img className="linkicon" src="/img/asserLink.png" />
                    <a className="adifecttesturl">{element}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="jobDetailsAssertmain">
          <h3 className="assertstextJobDetail">Sample Assets Link</h3>
          <div className="galleryLinkJobDetailsOne">
            {formUrls?.map((element, index) => (
              <div className="form-inline" key={index}>
                {element && (
                  <div className="assertDustbinLink">
                    <img className="linkicon" src="/img/asserLink.png" />
                    <a className="adifecttesturl">{element}</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="skillsNeededMainDiv">
          <h3 className="skillsNeededHead">Skills Needed</h3>
          <div className="crossItemsLogoText">
            {jobDetails?.skills?.length > 0 &&
              jobDetails?.skills?.map((item, index) => (
                <li
                  key={index}
                  className="detailsnewpageskill detailsnewpageskill"
                >
                  <Link to="">{item.skill_name}</Link>
                </li>
              ))}
            {jobDetails?.skills?.length < 1 && (
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
            {jobDetails?.tags?.length > 0 &&
              jobDetails?.tags?.split(",")?.map((tag, index) => (
                <li className="tagnewpage" key={index}>
                  <Link to="#">{tag}</Link>
                </li>
              ))}
            {jobDetails?.tags?.length < 1 && (
              <>
                <li className="tagnewpage">
                  <h3 className="colorOnNA">N/A</h3>
                </li>
              </>
            )}
          </div>
        </div> */}
        
        {jobDetails?.image_url?.length > 0 && (
          <div className="jobDetailsAssertmain">
            <h3 className="assertstextJobDetail">Assets Link</h3>
            <div className="galleryLinkJobDetailsOne">
              {formSampleUrls?.map((element, index) => (
                <div className="form-inline" key={index}>
                  {element && (
                    <div className="assertDustbinLink">
                      <img className="linkicon" src="/img/asserLink.png" />
                      <a className="adifecttesturl">{element}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {jobDetails?.image_url?.length > 0 && (
          <div className="jobDetailsAssertmain">
            <h3 className="assertstextJobDetail">Sample Assets Link</h3>
            <div className="galleryLinkJobDetailsOne">
              {formUrls?.map((element, index) => (
                <div className="form-inline" key={index}>
                  {element && (
                    <div className="assertDustbinLink">
                      <img className="linkicon" src="/img/asserLink.png" />
                      <a className="adifecttesturl">{element}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {jobDetails?.skills?.length > 0 && (
          <div className="skillsNeededMainDiv">
            <h3 className="skillsNeededHead">Skills Needed</h3>
            <div className="crossItemsLogoText">
              {jobDetails?.skills?.map((item, index) => (
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

        {jobDetails?.tags?.length > 0 && (
          <div className="tagsLogoMainDiv">
            <h3 className="skillsNeededHead">Tags</h3>
            <div className="Skill skill169">
              {jobDetails?.tags?.split(",")?.map((tag, index) => (
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

export default Member_job_details_new_page;
